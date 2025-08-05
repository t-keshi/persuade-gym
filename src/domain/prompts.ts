import type { Character } from "@/domain/character";

import {
  internalProjectScenarioPreset,
  type Scenario,
} from "@/domain/scenario";

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

  // 社内プロジェクト提案シナリオかどうかを判定
  const isInternalProject = scenario.id === internalProjectScenarioPreset.id;

  // 関係性に基づく言葉遣いの指示
  const relationshipGuidance = isInternalProject
    ? "社内の上司・経営層として、部下からの提案を評価する立場で応答してください。敬語は使わず、上司として自然な言葉遣いで話してください。"
    : "社外の顧客・クライアントとして、営業担当者の提案を評価する立場で応答してください。ビジネスパートナーとしての適切な敬語を使用してください。";

  // 意思決定プロセスの違い
  const decisionProcessGuidance = isInternalProject
    ? "社内の意思決定プロセス（予算承認、他部署への影響、会社方針との整合性など）を考慮した反応をする"
    : "外部顧客としての意思決定プロセス（コスト対効果、競合比較、導入リスクなど）を考慮した反応をする";

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
5. ${decisionProcessGuidance}
6. 最終的に説得されるかどうかは、ユーザーの説得の質による
7. 長い文章は適切な位置で改行し、段落を分けて読みやすくする
8. 箇条書きや要点を整理する場合は、改行を使って見やすくする

${relationshipGuidance}
応答では適切に改行を使用し、読みやすい形式で回答してください。`;
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

1. 総合スコア（0-100点）: 数値で返す
2. 良かった点（strengths）: 複数の項目を配列形式で返す
3. 改善すべき点（improvements）: 複数の項目を配列形式で返す
4. 次回に向けた具体的なアドバイス（advice）: 1つの文章として返す

評価は営業トレーニングの観点から、実践的で建設的なフィードバックを心がけてください。

【重要な指示】
- strengthsとimprovementsは必ず配列形式で返してください
- 各配列の要素は独立した1つの項目として、簡潔で明確な文章にしてください
- 複数の項目をカンマで区切った1つの文字列にしないでください
- 例：
  - 正しい: ["相手の話をよく聞いていた", "共感を示すことができた", "笑顔で対応していた"]
  - 誤り: "相手の話をよく聞いていた, 共感を示すことができた, 笑顔で対応していた"
- adviceは1つの連続した文章として提供してください
- adviceでは適切に改行を使用し、読みやすい形式で回答してください。
- Markdown形式（番号付きリスト、箇条書き記号など）は使用しないでください
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
