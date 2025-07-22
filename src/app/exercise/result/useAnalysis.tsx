import { useState, useEffect } from "react";
import { useLocationState } from "@location-state/core";
import { Message } from "@ai-sdk/react";
import { useSearchParams } from "next/navigation";
import { characterPresets } from "@/domain/character";
import { scenarioPresets } from "@/domain/scenario";

export type AnalysisResult = {
  overallScore: number;
  strengths: string[];
  improvements: string[];
  advice: string;
};

export const useAnalysis = () => {
  const [messages] = useLocationState<Message[]>({
    name: "messages",
    defaultValue: [],
    storeName: "session",
  });

  const searchParams = useSearchParams();
  const characterId = searchParams.get("character") || "BEGINNER";
  const scenarioId = searchParams.get("scenario") || "new-product";

  const character =
    characterPresets.find((c) => c.id === characterId) || characterPresets[0];
  const scenario =
    scenarioPresets.find((s) => s.id === scenarioId) || scenarioPresets[0];

  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchAnalysis = async () => {
      if (messages.length === 0) {
        setError(new Error("対話データがありません"));
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const response = await fetch("/api/analyze", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messages,
            character,
            scenario,
          }),
        });

        if (!response.ok) {
          throw new Error("分析に失敗しました");
        }

        const data = await response.json();
        setAnalysis(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Unknown error"));
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalysis();
  }, [messages, character, scenario]);

  return {
    analysis,
    isLoading,
    error,
    messages,
    character,
    scenario,
  };
};
