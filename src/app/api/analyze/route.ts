import { openai } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { z } from "zod";
import { NextRequest } from "next/server";

// 分析結果のスキーマ
const analysisSchema = z.object({
  overallScore: z.number().min(0).max(100).describe("総合スコア（0-100）"),
  strengths: z.array(z.string()).describe("良かった点"),
  improvements: z.array(z.string()).describe("改善点"),
  advice: z.string().describe("次回に向けたアドバイス"),
});

export async function POST(req: NextRequest) {
  try {
    const { messages, character, scenario } = await req.json();

    // メッセージを整形
    const conversation = messages
      .map(
        (msg: { role: string; content: string }) =>
          `${msg.role === "user" ? "ユーザー" : character.name}: ${msg.content}`
      )
      .join("\n\n");

    const prompt = `
以下は、営業の説得力トレーニングでの対話記録です。

【シナリオ】
${scenario.title}: ${scenario.context}

【相手の特徴】
${character.name}: ${character.description}

【対話内容】
${conversation}

この対話を分析し、以下の観点から評価してください：

1. 総合スコア（0-100点）
2. 良かった点
3. 改善すべき点
4. 次回に向けた具体的なアドバイス

評価は営業トレーニングの観点から、実践的で建設的なフィードバックを心がけてください。
`;

    const result = await generateObject({
      model: openai("gpt-4o"),
      schema: analysisSchema,
      prompt,
    });

    return Response.json(result.object);
  } catch (error) {
    console.error("Analysis error:", error);
    return Response.json(
      { error: "分析中にエラーが発生しました" },
      { status: 500 }
    );
  }
}
