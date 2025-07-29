import { useChat } from "@ai-sdk/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { characterPresets } from "@/domain/character";
import { scenarioPresets } from "@/domain/scenario";
import { useMessageLocationState } from "@/utils/messageLocationState";

// 文字数に応じたポイント消費の計算
export const calculatePointCost = (text: string) => {
  const length = text.length;
  if (length <= 150) return 10;
  if (length <= 300) return 20;
  return 30;
};

const MAX_TEXT_LENGTH = 5000;

// ステージタイプ
export type Stage = "導入" | "課題確認" | "提案" | "クロージング";

export const usePersuadeChat = () => {
  const [_, setLocationState] = useMessageLocationState();

  const router = useRouter();
  const searchParams = useSearchParams();
  const characterId = searchParams.get("character") || "BEGINNER";
  const scenarioId = searchParams.get("scenario") || "new-product";

  const character =
    characterPresets.find((c) => c.id === characterId) || characterPresets[0];
  const scenario =
    scenarioPresets.find((s) => s.id === scenarioId) || scenarioPresets[0];

  const [remainingPoints, setRemainingPoints] = useState(100);
  const [currentStage, setCurrentStage] = useState<Stage>("導入");
  const [validationError, setValidationError] = useState<string | null>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const {
    messages,
    input,
    handleInputChange: handleInputChangeUseChat,
    handleSubmit: originalHandleSubmit,
    status,
    error,
    append,
  } = useChat({
    api: "/api/chat",
    body: {
      character: character,
      scenario: scenario,
    },
    onFinish: () => {
      if (textAreaRef.current) {
        textAreaRef.current.value = "";
      }
    },
  });
  const isLoading = status === "streaming";

  // 初回メッセージの送信
  useEffect(() => {
    if (messages.length === 0) {
      const initialMessage = `こんにちは、${character.name}です。${scenario.context}`;
      append({
        role: "assistant",
        content: initialMessage,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // スクロール位置を最下部に保つ
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  // ステージの自動判定（簡易版）
  useEffect(() => {
    const messageCount = messages.filter((m) => m.role === "user").length;
    if (messageCount >= 6) {
      setCurrentStage("クロージング");
    } else if (messageCount >= 4) {
      setCurrentStage("提案");
    } else if (messageCount >= 2) {
      setCurrentStage("課題確認");
    }
  }, [messages]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;

    if (value.length > MAX_TEXT_LENGTH) {
      setValidationError(
        `${MAX_TEXT_LENGTH.toLocaleString()}文字以内で入力してください`
      );
    } else {
      setValidationError(null);
    }

    handleInputChangeUseChat(e);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!input.trim() || isLoading || validationError) return;

    const cost = calculatePointCost(input);
    if (remainingPoints < cost) {
      alert("ポイントが不足しています。");
      return;
    }

    setRemainingPoints((prev) => prev - cost);
    originalHandleSubmit(e);
  };

  const handleFinish = () => {
    setLocationState({ messages });
    router.push(
      `/exercise/result?character=${characterId}&scenario=${scenarioId}`
    );
  };

  return {
    // 状態
    messages,
    input,
    isLoading,
    error,
    remainingPoints,
    currentStage,
    character,
    scenario,
    validationError,

    // refs
    scrollAreaRef,
    textAreaRef,

    // ハンドラー
    handleInputChange,
    handleSubmit,
    handleFinish,
  };
};
