import { anthropic } from "@ai-sdk/anthropic";
import { generateObject } from "ai";
import { NextResponse } from "next/server";

import type { UIMessage } from "ai";
import type { NextRequest } from "next/server";

import { analysisResultSchema } from "@/domain/analysis";
import { createAnalysisPrompt, formatConversation } from "@/domain/prompts";
import { analyticsService } from "@/services/analyticsService";
import { middleware } from "@/utils/middleware";

export const POST = middleware(async (req: NextRequest) => {
  const { messages, character, scenario, sessionId, userId } = await req.json();

  const conversation = formatConversation(messages, character.name);

  const prompt = createAnalysisPrompt({
    scenarioTitle: scenario.title,
    scenarioContext: scenario.context,
    characterName: character.name,
    characterDescription: character.description,
    conversation,
  });

  const result = await generateObject({
    model: anthropic("claude-sonnet-4-20250514"),
    schema: analysisResultSchema,
    prompt,
  });

  // セッション完了時にFirebaseに保存
  if (sessionId) {
    // セッションが存在しない場合は作成
    const sessionExists = await analyticsService.sessionExists(sessionId);
    if (!sessionExists) {
      await analyticsService.startSession({
        sessionId,
        character,
        scenario,
        userId: userId || "anonymous",
        startedAt: new Date(),
      });
    }

    const userMessages = messages.filter((m: UIMessage) => m.role === "user");
    await analyticsService.completeSession(sessionId, {
      analysisResult: result.object,
      completedAt: new Date(),
      totalMessagesCount: userMessages.length,
    });
  }

  return NextResponse.json(result.object);
});
