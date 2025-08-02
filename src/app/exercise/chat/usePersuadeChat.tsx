import { useChat } from "@ai-sdk/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { characterPresets } from "@/domain/character";
import { scenarioPresets } from "@/domain/scenario";
import { useMessageLocationState } from "@/utils/messageLocationState";
import { getInitialMessage, MESSAGE_IDS } from "@/domain/message";

// 文字数に応じたポイント消費の計算
const calculatePointCost = (text: string) => {
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
    setMessages,
  } = useChat({
    api: "/api/chat",
    body: {
      character: character,
      scenario: scenario,
      isPointsExhausted: remainingPoints === 0,
    },
    onFinish: () => {
      if (textAreaRef.current) {
        textAreaRef.current.value = "";
      }
    },
  });
  const isLoading = status === "submitted";

  // // 初回メッセージの設定
  useEffect(() => {
    if (messages.length === 0) {
      const initialMessage = getInitialMessage(character, scenario);
      setMessages([
        {
          id: MESSAGE_IDS.INITIAL_MESSAGE_ID,
          role: "assistant",
          content: initialMessage,
        },
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
    const messageCount = messages.filter((m) => m.role === "user").length;
    if (messageCount >= 6) {
      return "クロージング";
    } else if (messageCount >= 4) {
      return "提案";
    } else if (messageCount >= 2) {
      return "課題確認";
    } else {
      return "導入";
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

    if (remainingPoints <= 0) {
      setMessages([
        {
          id: MESSAGE_IDS.END_MESSAGE_ID,
          role: "assistant",
          content: "おや、そろそろお時間のようですね。それでは、失礼致します。",
        },
      ]);
    }

    const cost = calculatePointCost(input);
    setRemainingPoints((prev) => prev - cost);
    originalHandleSubmit(e);
  };

  const handleFinish = () => {
    setLocationState({ messages });
    router.push(
      `/exercise/result?character=${characterId}&scenario=${scenarioId}`
    );
  };

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

    // refs
    scrollAreaRef,
    textAreaRef,

    // ハンドラー
    handleInputChange,
    handleSubmit,
    handleFinish,
  };
};
