import { generateObject } from "ai";
import { NextRequest, NextResponse } from "next/server";
import { openai } from "@ai-sdk/openai";
import { createAnalysisPrompt, formatConversation } from "@/domain/prompts";
import { analysisResultSchema } from "@/domain/analysis";

const middleware = <T>(asyncFn: (req: NextRequest) => Promise<T>) => {
  return async (req: NextRequest): Promise<T | NextResponse> => {
    return await asyncFn(req).catch((error) => {
      console.error("Analysis error:", error);
      return NextResponse.json(
        { error: "分析中にエラーが発生しました" },
        { status: 500 }
      );
    });
  };
};

export const POST = middleware(async (req: NextRequest) => {
  const { messages, character, scenario } = await req.json();

  const conversation = formatConversation(messages, character.name);

  const prompt = createAnalysisPrompt({
    scenarioTitle: scenario.title,
    scenarioContext: scenario.context,
    characterName: character.name,
    characterDescription: character.description,
    conversation,
  });

  const result = await generateObject({
    model: openai("gpt-4-turbo"),
    schema: analysisResultSchema,
    prompt,
  });

  return NextResponse.json(result.object);
});
