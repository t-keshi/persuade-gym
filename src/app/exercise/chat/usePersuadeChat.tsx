import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useRouter, useSearchParams } from "next/navigation";

import type { UIMessage } from "ai";

import { characterPresets } from "@/domain/character";
import { getInitialMessage, MESSAGE_IDS } from "@/domain/message";
import { scenarioPresets } from "@/domain/scenario";
import { useMessageLocationState } from "@/utils/messageLocationState";

// 文字数に応じたポイント消費の計算
const calculatePointCost = (text: string) => {
  const length = text.length;
  if (length <= 150) return 30;
  if (length <= 300) return 60;
  return 90;
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
  const [validationError, setValidationError] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const isExerciseEnded = remainingPoints <= 0;

  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const { messages, status, error, setMessages, sendMessage } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
      body: {
        character: character,
        scenario: scenario,
        isPointsExhausted: remainingPoints === 0,
      },
    }),
    onFinish: () => {
      if (textAreaRef.current) {
        textAreaRef.current.value = "";
      }
    },
  });
  const isLoading = status === "submitted" || status === "streaming";

  // 初回メッセージの設定
  useEffect(() => {
    if (messages.length === 0) {
      const initialMessage = getInitialMessage(character, scenario);
      setMessages([
        {
          id: MESSAGE_IDS.INITIAL_MESSAGE_ID,
          role: "assistant",
          parts: [{ type: "text", text: initialMessage }],
        } as UIMessage,
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // スクロール位置を最下部に保つ
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const currentStage: Stage = useMemo(() => {
    // 100ポイントから始まり、使用したポイントに基づいてステージを判定
    if (remainingPoints > 75) {
      return "導入";
    } else if (remainingPoints > 50) {
      return "課題確認";
    } else if (remainingPoints > 25) {
      return "提案";
    } else {
      return "クロージング";
    }
  }, [remainingPoints]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setInput(value);

    if (value.length > MAX_TEXT_LENGTH) {
      setValidationError(
        `${MAX_TEXT_LENGTH.toLocaleString()}文字以内で入力してください`
      );
    } else {
      setValidationError(null);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!input.trim() || isLoading || validationError) return;

    const cost = calculatePointCost(input);
    const newRemainingPoints = Math.max(0, remainingPoints - cost);
    setRemainingPoints(newRemainingPoints);

    // v5の新しい方式でメッセージを送信
    sendMessage({ text: input });
    setInput("");
  };

  const handleFinish = useCallback(() => {
    setLocationState({ messages });
    router.push(
      `/exercise/result?character=${characterId}&scenario=${scenarioId}`
    );
  }, [messages, setLocationState, router, characterId, scenarioId]);

  const hasEndMessage = useMemo(
    () => messages.some((message) => message.id === MESSAGE_IDS.END_MESSAGE_ID),
    [messages]
  );

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
    hasEndMessage,
    isExerciseEnded,

    // refs
    scrollAreaRef,
    textAreaRef,

    // ハンドラー
    handleInputChange,
    handleSubmit,
    handleFinish,
  };
};
