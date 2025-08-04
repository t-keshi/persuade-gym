import { useSearchParams } from "next/navigation";

import { characterPresets, beginnerCharacterPreset } from "@/domain/character";
import {
  scenarioPresets,
  SCENARIO_ID,
  newProductScenarioPreset,
} from "@/domain/scenario";
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
  const searchParams = useSearchParams();
  const characterId =
    searchParams.get("character") || beginnerCharacterPreset.id;
  const scenarioId = searchParams.get("scenario") || SCENARIO_ID.NEW_PRODUCT;

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
