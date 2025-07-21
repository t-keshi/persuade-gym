import { openai } from "@ai-sdk/openai";
import { streamText, Message } from "ai";
import { Character } from "@/domain/character";
import { Scenario } from "@/domain/scenario";

export const runtime = "edge";

export const POST = async (req: Request) => {
  const { messages, character, scenario } = (await req.json()) as {
    messages: Message[];
    character: Character;
    scenario: Scenario;
  };

  // キャラクターの性格特性を文字列に変換
  const personalityDescription = character.personality.join("、");

  const result = streamText({
    model: openai("gpt-4-turbo"),
    messages,
    system: `あなたは${character.name}（${character.job}、${
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
3. ${
      character.personality.includes("慎重")
        ? "慎重で懐疑的な"
        : character.personality.includes("革新的")
        ? "新しいアイデアに前向きな"
        : "バランスの取れた"
    }態度を示す
4. ユーザーの説得力に応じて徐々に態度を変化させる
5. 最終的に説得されるかどうかは、ユーザーの説得の質による

自然な日本語で、${character.job}として適切な言葉遣いで応答してください。`,
  });

  return result.toDataStreamResponse();
};
