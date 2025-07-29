import { streamText, Message } from "ai";
import { Character } from "@/domain/character";
import { Scenario } from "@/domain/scenario";
import { errorHandler } from "@/utils/errorHandler";
import { openai } from "@ai-sdk/openai";
import { createChatSystemPrompt } from "@/domain/prompts";
import { NextRequest, NextResponse } from "next/server";

const middleware = <T>(asyncFn: (req: NextRequest) => Promise<T>) => {
  return async (req: NextRequest): Promise<T | NextResponse> => {
    return await asyncFn(req).catch((error) => {
      console.error("Chat error:", error);
      return NextResponse.json(
        { error: "チャット中にエラーが発生しました" },
        { status: 500 }
      );
    });
  };
};

export const POST = middleware(async (req: NextRequest) => {
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
