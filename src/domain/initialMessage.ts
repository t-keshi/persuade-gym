import {
  beginnerCharacterPreset,
  expertCharacterPreset,
  intermediateCharacterPreset,
  type Character,
} from "@/domain/character";
import {
  internalProjectScenarioPreset,
  type Scenario,
} from "@/domain/scenario";

/**
 * シナリオとキャラクターに応じた初回メッセージを生成
 */
export const createInitialMessage = (
  character: Character,
  scenario: Scenario
): string => {
  const isInternalProject = scenario.id === internalProjectScenarioPreset.id;

  if (isInternalProject) {
    // 社内プロジェクト提案の場合は、上司として部下に対する言い方
    switch (character.id) {
      case beginnerCharacterPreset.id:
        return "おっ、佐藤だよ。何か新しい提案があるって聞いたけど？今ちょうど時間あるから聞くよ。まあ、うちの部署も色々と改善の余地はあるからね。どんな話？";

      case intermediateCharacterPreset.id:
        return "鈴木です。プロジェクトの提案があるって聞きました。まず概要から聞かせてもらえる？ただ、予算や人員の制約もあるから、その辺も考慮した現実的な提案を期待してるよ。";

      case expertCharacterPreset.id:
        return "高橋だ。君から提案があると聞いて時間を作った。うちの会社も変革の時期に来ているとは思うが、安易な変更は混乱を招く。しっかりとした根拠のある提案を聞かせてもらおう。";

      default:
        return character.initialMessage;
    }
  }

  // 社外向けシナリオの場合は、元のメッセージを使用
  return character.initialMessage;
};
