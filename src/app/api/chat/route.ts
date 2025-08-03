import { anthropic } from "@ai-sdk/anthropic";
import { convertToModelMessages, streamText } from "ai";

import type { Character } from "@/domain/character";
import type { Scenario } from "@/domain/scenario";
import type { UIMessage } from "ai";
import type { NextRequest } from "next/server";

import { createChatSystemPrompt } from "@/domain/prompts";
import { middleware } from "@/utils/middleware";

export const POST = middleware(async (req: NextRequest) => {
  console.log("he?");
  const { messages, character, scenario } = (await req.json()) as {
    messages: UIMessage[];
    character: Character;
    scenario: Scenario;
  };

  const systemPrompt = createChatSystemPrompt({ character, scenario });

  const result = streamText({
    model: anthropic("claude-sonnet-4-20250514"),
    messages: convertToModelMessages(messages),
    system: systemPrompt,
  });

  return result.toUIMessageStreamResponse();
});
