import { streamText, Message } from "ai";
import { Character } from "@/domain/character";
import { Scenario } from "@/domain/scenario";
import { errorHandler } from "@/utils/errorHandler";
import { openai } from "@ai-sdk/openai";
import { createChatSystemPrompt } from "@/domain/prompts";
import { NextRequest } from "next/server";
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
