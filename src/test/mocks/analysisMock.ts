import { analysisResultSchema } from "@/domain/analysis";
import { generateObject } from "ai";
import { MockLanguageModelV1 } from "ai/test";
import { http, HttpResponse } from "msw";

const mockLanguageModel = new MockLanguageModelV1({
  defaultObjectGenerationMode: "json",
  doGenerate: async () => ({
    rawCall: { rawPrompt: null, rawSettings: {} },
    finishReason: "stop",
    usage: { promptTokens: 10, completionTokens: 20 },
    text: JSON.stringify({
      overallScore: 85,
      strengths: [
        "論理的な説明ができていた",
        "相手の懸念事項に適切に対応した",
        "具体的な数値を用いて説得力を高めた",
      ],
      improvements: [
        "もう少し相手の感情に訴えかける要素があると良い",
        "クロージングがやや急ぎすぎた印象",
      ],
      advice:
        "次回は相手の感情面にも配慮しながら、段階的にクロージングに持っていくことを意識してみましょう。",
    }),
  }),
});

export const analysisMock = http.post("/api/analysis", async () => {
  const response = await generateObject({
    model: mockLanguageModel,
    schema: analysisResultSchema,
    prompt: "test",
  });

  return HttpResponse.json(response.object, { status: 200 });
});
