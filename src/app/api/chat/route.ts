import { anthropic } from "@ai-sdk/anthropic";
import { convertToModelMessages, streamText } from "ai";

import type { Character } from "@/domain/character";
import type { Scenario } from "@/domain/scenario";
import type { UIMessage } from "ai";
import type { NextRequest } from "next/server";

import { createChatSystemPrompt } from "@/domain/prompts";
import { analyticsService } from "@/services/analyticsService";
import { middleware } from "@/utils/middleware";

export const POST = middleware(async (req: NextRequest) => {
  const { messages, character, scenario, sessionId, userId } =
    (await req.json()) as {
      messages: UIMessage[];
      character: Character;
      scenario: Scenario;
      sessionId: string;
      userId: string;
    };

  // セッションが存在しない場合は作成
  const sessionExists = await analyticsService.sessionExists(sessionId);
  if (!sessionExists) {
    await analyticsService.startSession({
      sessionId,
      character,
      scenario,
      userId,
      startedAt: new Date(),
    });
  }

  // ユーザーメッセージを保存
  const lastMessage = messages[messages.length - 1];
  if (lastMessage.role === "user") {
    await analyticsService.saveMessage(sessionId, {
      role: "user",
      content: lastMessage.parts
        .filter((part) => part.type === "text")
        .map((part) => (part.type === "text" ? part.text : ""))
        .join(""),
      timestamp: new Date(),
    });
  }

  const systemPrompt = createChatSystemPrompt({ character, scenario });

  const result = streamText({
    model: anthropic("claude-sonnet-4-20250514"),
    messages: convertToModelMessages(messages),
    system: systemPrompt,
    onFinish: async ({ text }) => {
      // AI レスポンスも保存（ストリーミング完了後）
      await analyticsService.saveMessage(sessionId, {
        role: "assistant",
        content: text,
        timestamp: new Date(),
      });
    },
  });

  return result.toUIMessageStreamResponse();
});
