import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

import type { Character } from "@/domain/character";
import type { Scenario } from "@/domain/scenario";
import type { Message } from "ai";
import type { NextRequest } from "next/server";

import { createChatSystemPrompt } from "@/domain/prompts";
import { errorHandler } from "@/utils/errorHandler";
import { middleware } from "@/utils/middleware";

export const POST = middleware(async (req: NextRequest) => {
  console.log("he?");
  const { messages, character, scenario } = (await req.json()) as {
    messages: Message[];
    character: Character;
    scenario: Scenario;
  };

  const systemPrompt = createChatSystemPrompt({ character, scenario });

  const result = streamText({
    model: openai("gpt-4-turbo"),
    messages,
    system: systemPrompt,
  });

  return result.toDataStreamResponse({ getErrorMessage: errorHandler });
});
