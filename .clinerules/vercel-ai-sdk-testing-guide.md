# Vercel AI SDK テストガイド

## 概要

AI SDK を使用したコードのユニットテストを可能にするため、AI SDK Core にはモックプロバイダーとテストヘルパーが含まれています。言語モデルは非決定的で、呼び出しが遅く高価なため、これらのツールを使用することで、実際の言語モデルプロバイダーを呼び出すことなく、再現可能で決定的な方法でコードをテストできます。

## テストヘルパー

`ai/test` から以下のヘルパーをインポートできます：

### モックモデル

- **MockEmbeddingModelV2**: 埋め込みモデル v2 仕様を使用したモック埋め込みモデル
- **MockLanguageModelV2**: 言語モデル v2 仕様を使用したモック言語モデル

### ユーティリティ関数

- **mockId**: インクリメントする整数 ID を提供
- **mockValues**: 各呼び出しで配列の値を反復。配列が尽きると最後の値を返す
- **simulateReadableStream**: 遅延を伴う読み取り可能なストリームをシミュレート

## 実装例

### 1. generateText のテスト

```tsx
import { generateText } from "ai";
import { MockLanguageModelV2 } from "ai/test";

const result = await generateText({
  model: new MockLanguageModelV2({
    doGenerate: async () => ({
      finishReason: "stop",
      usage: { inputTokens: 10, outputTokens: 20, totalTokens: 30 },
      content: [{ type: "text", text: `Hello, world!` }],
      warnings: [],
    }),
  }),
  prompt: "Hello, test!",
});
```

### 2. streamText のテスト

```tsx
import { streamText, simulateReadableStream } from "ai";
import { MockLanguageModelV2 } from "ai/test";

const result = streamText({
  model: new MockLanguageModelV2({
    doStream: async () => ({
      stream: simulateReadableStream({
        chunks: [
          { type: "text-start", id: "text-1" },
          { type: "text-delta", id: "text-1", delta: "Hello" },
          { type: "text-delta", id: "text-1", delta: ", " },
          { type: "text-delta", id: "text-1", delta: "world!" },
          { type: "text-end", id: "text-1" },
          {
            type: "finish",
            finishReason: "stop",
            logprobs: undefined,
            usage: { inputTokens: 3, outputTokens: 10, totalTokens: 13 },
          },
        ],
      }),
    }),
  }),
  prompt: "Hello, test!",
});
```

### 3. generateObject のテスト

```tsx
import { generateObject } from "ai";
import { MockLanguageModelV2 } from "ai/test";
import { z } from "zod";

const result = await generateObject({
  model: new MockLanguageModelV2({
    doGenerate: async () => ({
      finishReason: "stop",
      usage: { inputTokens: 10, outputTokens: 20, totalTokens: 30 },
      content: [{ type: "text", text: `{"content":"Hello, world!"}` }],
      warnings: [],
    }),
  }),
  schema: z.object({ content: z.string() }),
  prompt: "Hello, test!",
});
```

### 4. streamObject のテスト

```tsx
import { streamObject, simulateReadableStream } from "ai";
import { MockLanguageModelV2 } from "ai/test";
import { z } from "zod";

const result = streamObject({
  model: new MockLanguageModelV2({
    doStream: async () => ({
      stream: simulateReadableStream({
        chunks: [
          { type: "text-start", id: "text-1" },
          { type: "text-delta", id: "text-1", delta: "{ " },
          { type: "text-delta", id: "text-1", delta: '"content": ' },
          { type: "text-delta", id: "text-1", delta: `"Hello, ` },
          { type: "text-delta", id: "text-1", delta: `world` },
          { type: "text-delta", id: "text-1", delta: `!"` },
          { type: "text-delta", id: "text-1", delta: " }" },
          { type: "text-end", id: "text-1" },
          {
            type: "finish",
            finishReason: "stop",
            logprobs: undefined,
            usage: { inputTokens: 3, outputTokens: 10, totalTokens: 13 },
          },
        ],
      }),
    }),
  }),
  schema: z.object({ content: z.string() }),
  prompt: "Hello, test!",
});
```

### 5. UI Message Stream のシミュレーション

テスト、デバッグ、デモンストレーション目的で UI Message Stream レスポンスをシミュレートできます：

```tsx
// app/api/test/route.ts
import { simulateReadableStream } from "ai";

export async function POST(req: Request) {
  return new Response(
    simulateReadableStream({
      initialDelayInMs: 1000, // 最初のチャンクまでの遅延
      chunkDelayInMs: 300, // チャンク間の遅延
      chunks: [
        `data: {"type":"start","messageId":"msg-123"}\n\n`,
        `data: {"type":"text-start","id":"text-1"}\n\n`,
        `data: {"type":"text-delta","id":"text-1","delta":"This"}\n\n`,
        `data: {"type":"text-delta","id":"text-1","delta":" is an"}\n\n`,
        `data: {"type":"text-delta","id":"text-1","delta":" example."}\n\n`,
        `data: {"type":"text-end","id":"text-1"}\n\n`,
        `data: {"type":"finish"}\n\n`,
        `data: [DONE]\n\n`,
      ],
    }).pipeThrough(new TextEncoderStream()),
    {
      status: 200,
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
        "x-vercel-ai-ui-message-stream": "v1",
      },
    }
  );
}
```

## テストのベストプラクティス

### 1. モックの設定

```tsx
// テスト用のモックプロバイダーを作成
const createMockModel = (response: string) => {
  return new MockLanguageModelV2({
    doGenerate: async () => ({
      finishReason: "stop",
      usage: { inputTokens: 10, outputTokens: 20, totalTokens: 30 },
      content: [{ type: "text", text: response }],
      warnings: [],
    }),
  });
};
```

### 2. ストリーミングのテスト

```tsx
// ストリーミングレスポンスのテスト
const testStreamingResponse = async () => {
  const chunks = [];
  const result = await streamText({
    model: new MockLanguageModelV2({
      doStream: async () => ({
        stream: simulateReadableStream({
          chunks: [
            { type: "text-start", id: "text-1" },
            { type: "text-delta", id: "text-1", delta: "Test" },
            { type: "text-end", id: "text-1" },
            { type: "finish", finishReason: "stop" },
          ],
        }),
      }),
    }),
    prompt: "Test prompt",
  });

  for await (const chunk of result.textStream) {
    chunks.push(chunk);
  }

  expect(chunks.join("")).toBe("Test");
};
```

### 3. エラーケースのテスト

```tsx
// エラーレスポンスのモック
const errorModel = new MockLanguageModelV2({
  doGenerate: async () => {
    throw new Error("Model error");
  },
});

// エラーハンドリングのテスト
await expect(
  generateText({
    model: errorModel,
    prompt: "Test",
  })
).rejects.toThrow("Model error");
```

### 4. ツール呼び出しのテスト

```tsx
const modelWithTools = new MockLanguageModelV2({
  doGenerate: async () => ({
    finishReason: "tool-calls",
    usage: { inputTokens: 10, outputTokens: 20, totalTokens: 30 },
    content: [
      {
        type: "tool-call",
        toolCallId: "call-1",
        toolName: "weather",
        args: { location: "Tokyo" },
      },
    ],
    warnings: [],
  }),
});
```

## 重要なポイント

1. **決定的なテスト**: モックプロバイダーを使用することで、テストの結果が予測可能になる
2. **高速な実行**: 実際の API を呼び出さないため、テストが高速に実行される
3. **コスト削減**: API コールが発生しないため、テストコストがかからない
4. **エッジケースのテスト**: 通常は再現が困難なシナリオも簡単にテストできる
5. **ストリーミングのシミュレーション**: リアルタイムのストリーミング動作を正確にテストできる

## 注意事項

- モックプロバイダーは実際のモデルの動作を完全には再現しない
- 統合テストでは実際のプロバイダーを使用することも検討する
- `simulateReadableStream` の遅延設定は実際の環境に近い値を使用する
- テストデータは実際のレスポンス形式に準拠させる
