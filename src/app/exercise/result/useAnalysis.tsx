import { useSearchParams } from "next/navigation";

import { characterPresets, beginnerCharacterPreset } from "@/domain/character";
import { scenarioPresets, newProductScenarioPreset } from "@/domain/scenario";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useMessageLocationState } from "@/utils/messageLocationState";
import { useAsync } from "@/utils/useAsync";

export type AnalysisResult = {
  overallScore: number;
  strengths: string[];
  improvements: string[];
  advice: string;
};

export const useAnalysis = () => {
  const [{ messages, sessionId }] = useMessageLocationState();
  const [userId] = useLocalStorage<string>("userId", crypto.randomUUID());
  const searchParams = useSearchParams();
  const characterId =
    searchParams.get("character") || beginnerCharacterPreset.id;
  const scenarioId =
    searchParams.get("scenario") || newProductScenarioPreset.id;

  const character =
    characterPresets.find((c) => c.id === characterId) ||
    beginnerCharacterPreset;
  const scenario =
    scenarioPresets.find((s) => s.id === scenarioId) ||
    newProductScenarioPreset;

  const state = useAsync(async () => {
    if (messages.length === 0) {
      throw new Error("対話データがありません");
    }

    const response = await fetch("/api/analysis", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages,
        character,
        scenario,
        sessionId,
        userId,
      }),
    });

    if (!response.ok) {
      throw new Error("分析に失敗しました");
    }

    const data = await response.json();
    return data as AnalysisResult;
  }, [messages, character, scenario]);

  return {
    analysis: state.value,
    isLoading: state.loading,
    error: state.error,
    messages,
    character,
    scenario,
  };
};
