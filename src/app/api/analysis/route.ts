import { openai } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { NextResponse } from "next/server";

import type { NextRequest} from "next/server";

import { analysisResultSchema } from "@/domain/analysis";
import { createAnalysisPrompt, formatConversation } from "@/domain/prompts";
import { middleware } from "@/utils/middleware";

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
