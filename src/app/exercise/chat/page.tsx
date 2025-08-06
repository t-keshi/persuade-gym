import { ChatExerciseClient } from "./ChatExerciseClient";

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
    title: `${character?.name || "AI"}との対話中`,
    description: `${scenario?.title || "シナリオ"}で${
      character?.name || "AI"
    }を説得中`,
    openGraph: {
      title: `${scenario?.title || "説得トレーニング"} - ${
        character?.name || "AI"
      }との対話`,
      description: `説得力を鍛える実践トレーニング中`,
    },
  };
};

const ChatExercisePage = () => {
  return <ChatExerciseClient />;
};

export default ChatExercisePage;
