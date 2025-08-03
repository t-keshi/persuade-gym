import type { Character } from "@/domain/character";
import type { Scenario } from "@/domain/scenario";

/**
 * チャット用システムプロンプトのテンプレート
 */
export const createChatSystemPrompt = ({
  character,
  scenario,
}: {
  character: Character;
  scenario: Scenario;
}) => {
  // キャラクターの性格特性を文字列に変換
  const personalityDescription = character.personality.join("、");

  // 性格に基づく態度の決定
  const attitudeDescription = character.personality.includes("慎重")
    ? "慎重で懐疑的な"
    : character.personality.includes("革新的")
    ? "新しいアイデアに前向きな"
    : "バランスの取れた";

  return `あなたは${character.name}（${character.job}、${
    character.age
  }歳）として振る舞います。

【あなたの背景】
${character.background}

【あなたの性格】
${character.description}
性格特性: ${personalityDescription}

【現在のシナリオ】
${scenario.context}

【説得の目標】
${scenario.goal}

【重要なポイント】
${scenario.keyPoints.join("\n")}

【応答の指針】
1. ${character.name}の性格や背景に基づいて、一貫性のある反応をする
2. 難易度レベル${character.difficultyLevel}に応じた説得の難しさを表現する
3. ${attitudeDescription}態度を示す
4. ユーザーの説得力に応じて徐々に態度を変化させる
5. 最終的に説得されるかどうかは、ユーザーの説得の質による

自然な日本語で、${character.job}として適切な言葉遣いで応答してください。`;
};

/**
 * 分析用プロンプトのテンプレート
 */
export const createAnalysisPrompt = ({
  scenarioTitle,
  scenarioContext,
  characterName,
  characterDescription,
  conversation,
}: {
  scenarioTitle: string;
  scenarioContext: string;
  characterName: string;
  characterDescription: string;
  conversation: string;
}) => {
  return `
以下は、営業の説得力トレーニングでの対話記録です。

【シナリオ】
${scenarioTitle}: ${scenarioContext}

【相手の特徴】
${characterName}: ${characterDescription}

【対話内容】
${conversation}

この対話を分析し、以下の観点から評価してください：

1. 総合スコア（0-100点）
2. 良かった点
3. 改善すべき点
4. 次回に向けた具体的なアドバイス

評価は営業トレーニングの観点から、実践的で建設的なフィードバックを心がけてください。
`;
};

/**
 * メッセージを対話形式の文字列に変換
 */
export const formatConversation = (
  messages: Array<{
    role: string;
    content?: string;
    parts?: Array<{ type: string; text?: string }>;
  }>,
  characterName: string
): string => {
  return messages
    .map((msg) => {
      // v5形式のメッセージ（parts配列）から内容を取得
      let messageContent = "";

      if (msg.parts && Array.isArray(msg.parts)) {
        // parts配列からテキストを抽出
        messageContent = msg.parts
          .filter((part) => part.type === "text" && part.text)
          .map((part) => part.text)
          .join("");
      } else if (msg.content) {
        // 旧形式のメッセージ（contentプロパティ）にも対応
        messageContent = msg.content;
      }

      if (!messageContent) {
        return null; // 内容がない場合はスキップ
      }

      return `${
        msg.role === "user" ? "ユーザー" : characterName
      }: ${messageContent}`;
    })
    .filter(Boolean) // nullを除外
    .join("\n\n");
};
