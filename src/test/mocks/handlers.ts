import { http, HttpResponse } from "msw";
import { simulateReadableStream } from "ai";

// チャットAPIのモックハンドラー
export const handlers = [
  // チャットエンドポイント
  http.post("/api/chat", async () => {
    const stream = simulateReadableStream({
      initialDelayInMs: 100,
      chunkDelayInMs: 50,
      chunks: [
        `data: {"type":"start","messageId":"msg-123"}\n\n`,
        `data: {"type":"text-start","id":"text-1"}\n\n`,
        `data: {"type":"text-delta","id":"text-1","delta":"こんにちは"}\n\n`,
        `data: {"type":"text-delta","id":"text-1","delta":"、お客様。"}\n\n`,
        `data: {"type":"text-delta","id":"text-1","delta":"ご提案について"}\n\n`,
        `data: {"type":"text-delta","id":"text-1","delta":"お聞きしたいです。"}\n\n`,
        `data: {"type":"text-end","id":"text-1"}\n\n`,
        `data: {"type":"finish"}\n\n`,
        `data: [DONE]\n\n`,
      ],
    }).pipeThrough(new TextEncoderStream());

    return new HttpResponse(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
        "x-vercel-ai-ui-message-stream": "v1",
      },
    });
  }),

  // 分析エンドポイント
  http.post("/api/analyze", async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // 遅延をシミュレート

    return HttpResponse.json({
      overallScore: 85,
      stageScores: {
        introduction: 90,
        problemIdentification: 85,
        proposal: 80,
        closing: 85,
      },
      techniques: [
        {
          name: "共感",
          count: 3,
          effectiveness: "高",
        },
        {
          name: "論理的説明",
          count: 5,
          effectiveness: "中",
        },
      ],
      feedback: {
        strengths: [
          "相手の立場に立った共感的なアプローチができていました",
          "具体的な数値を用いた説得力のある提案でした",
        ],
        improvements: [
          "クロージングでもう少し積極的に次のステップを提案しましょう",
          "相手の懸念事項をより深く掘り下げることができます",
        ],
      },
      pointEfficiency: {
        totalPointsUsed: 80,
        averagePointsPerStage: 20,
        efficiency: "良好",
      },
    });
  }),
];

// エラーケース用のハンドラー
export const errorHandlers = {
  chatError: http.post("/api/chat", () => {
    return new HttpResponse(null, { status: 500 });
  }),
  analyzeError: http.post("/api/analyze", () => {
    return new HttpResponse(null, { status: 500 });
  }),
};
