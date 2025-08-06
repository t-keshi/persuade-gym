import { ResultExerciseClient } from "./ResultExerciseClient";

import type { Metadata } from "next";

import { characterPresets } from "@/domain/character";
import { scenarioPresets } from "@/domain/scenario";

type Props = {
  searchParams: Promise<{ character?: string; scenario?: string }>;
};

export const generateMetadata = async ({
  searchParams,
}: Props): Promise<Metadata> => {
  const params = await searchParams;
  const character = characterPresets.find((c) => c.id === params.character);
  const scenario = scenarioPresets.find((s) => s.id === params.scenario);

  return {
    title: `${scenario?.title || "トレーニング"}の結果`,
    description: `${character?.name || "AI"}との${
      scenario?.title || "説得トレーニング"
    }の分析結果`,
    openGraph: {
      title: `説得力分析結果 - ${scenario?.title || "トレーニング"}`,
      description:
        "あなたの説得力を詳細に分析しました。強みと改善点を確認しよう。",
    },
  };
};

const ResultExercisePage = () => {
  return <ResultExerciseClient />;
};

export default ResultExercisePage;
