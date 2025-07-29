import { simulateReadableStream, streamText } from "ai";
import { MockLanguageModelV1 } from "ai/test";
import { http } from "msw";

const mockLanguageModel = new MockLanguageModelV1({
  doStream: async () => ({
    stream: simulateReadableStream({
      chunks: [
        { type: "text-delta", textDelta: "Hello" },
        { type: "text-delta", textDelta: ", " },
        { type: "text-delta", textDelta: `world!` },
        {
          type: "finish",
          finishReason: "stop",
          logprobs: undefined,
          usage: { completionTokens: 10, promptTokens: 3 },
        },
      ],
    }),
    rawCall: { rawPrompt: null, rawSettings: {} },
  }),
});

export const chatMock = http.post("/api/chat", () => {
  const response = streamText({ model: mockLanguageModel, prompt: "test" });

  return response.toDataStreamResponse();
});
