import { simulateReadableStream, streamText } from "ai";
import { MockLanguageModelV2 } from "ai/test";
import { http } from "msw";

// 会話の段階に応じた応答を定義
const conversationResponses = [
  // 1回目の応答：初期の懐疑的な反応
  "そうですね...正直なところ、今のシステムでも特に問題は感じていないんですよ。新しいツールを導入するとなると、また一から覚え直さないといけないですし、時間もかかりますよね。",

  // 2回目の応答：少し興味を示すが、まだ懐疑的
  "なるほど、効率化できるというのは魅力的ですね。でも、うちの会社の規模だと、そこまで大掛かりなシステムは必要ないかもしれません。コストもかかりそうですし...",

  // 3回目の応答：具体的な懸念を表明
  "確かに時間短縮は魅力的ですが、セキュリティ面が心配です。最近、情報漏洩のニュースもよく聞きますし、新しいシステムを導入することでリスクが増えるのではないでしょうか？",

  // 4回目の応答：前向きになりつつも、まだ決断には至らない
  "セキュリティ対策がしっかりしているのは安心ですね。実際の導入事例も参考になります。ただ、社内の承認を得るのに時間がかかりそうで...上司を説得する材料がもう少し欲しいところです。",

  // 5回目の応答：説得に応じる
  "分かりました。確かにおっしゃる通り、長期的に見れば投資する価値がありそうですね。特に競合他社も導入しているという話は説得力があります。前向きに検討させていただきます。",
];

let responseIndex = 0;

const createMockLanguageModel = (responseText: string) => {
  // 日本語の自然な会話のために、文節ごとに区切る
  const chunks = responseText
    .split(/([、。！？])/g)
    .filter((chunk) => chunk.length > 0);

  return new MockLanguageModelV2({
    doStream: async () => ({
      stream: simulateReadableStream({
        initialDelayInMs: 300, // 初回の遅延を追加してリアルさを演出
        chunkDelayInMs: 80, // チャンク間の遅延で自然な速度を再現
        chunks: [
          { type: "text-start" as const, id: "text-1" },
          ...chunks.map((chunk) => ({
            type: "text-delta" as const,
            id: "text-1",
            delta: chunk,
          })),
          { type: "text-end" as const, id: "text-1" },
          {
            type: "finish" as const,
            finishReason: "stop" as const,
            logprobs: undefined,
            usage: {
              inputTokens: 50,
              outputTokens: responseText.length,
              totalTokens: 50 + responseText.length,
            },
          },
        ],
      }),
    }),
  });
};

export const chatMock = http.post("/api/chat", async (req) => {
  // リクエストボディから会話の内容を取得（実際の実装では使用可能）
  const body = await req.request.json();
  console.log("Chat API called with:", body);

  // 現在の応答インデックスに基づいて応答を選択
  const currentResponse =
    conversationResponses[responseIndex % conversationResponses.length];
  responseIndex++;

  const mockLanguageModel = createMockLanguageModel(currentResponse);
  const response = streamText({
    model: mockLanguageModel,
    prompt: "test",
  });

  return response.toUIMessageStreamResponse();
});
