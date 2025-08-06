import { NewExerciseClient } from "./NewExerciseClient";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "トレーニング開始",
  description: "キャラクターとシナリオを選んで説得力トレーニングを始めましょう",
  openGraph: {
    title: "説得力トレーニングを開始 | Persuade Gym",
    description: "様々な性格のキャラクターと実践的なシナリオで説得力を鍛えよう",
  },
};

const NewExercisePage = () => {
  return <NewExerciseClient />;
};

export default NewExercisePage;
