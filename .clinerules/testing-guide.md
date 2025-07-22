# フロントエンド統合テストガイド

## 概要

このプロジェクトでは、Vitest + MSW + Testing Library を使用してフロントエンドの統合テストを実装しています。Vercel AI SDK のモック機能と組み合わせることで、実際の API を呼び出さずに、リアルなユーザー体験をテストできます。

## セットアップ

### 1. 依存関係のインストール

```bash
pnpm install
```

### 2. テストの実行

```bash
# テストを実行（ウォッチモード）
pnpm test

# テストを一度だけ実行
pnpm test:run

# UIモードでテストを実行
pnpm test:ui
```

## テストの構造

### ディレクトリ構成

```
src/
├── test/
│   ├── setup.ts          # テスト環境のセットアップ
│   └── mocks/
│       └── handlers.ts   # MSWのモックハンドラー
├── app/
│   └── exercise/
│       ├── chat/
│       │   └── __tests__/
│       │       └── ChatIntegration.test.tsx
│       └── result/
│           └── __tests__/
│               └── ResultIntegration.test.tsx
```

### モックハンドラーの実装

`src/test/mocks/handlers.ts` では、AI SDK のストリーミングレスポンスをシミュレートしています：

```typescript
// チャットAPIのストリーミングレスポンス
http.post("/api/chat", async () => {
  const stream = simulateReadableStream({
    initialDelayInMs: 100,
    chunkDelayInMs: 50,
    chunks: [
      // UI Message Stream形式のチャンク
    ],
  }).pipeThrough(new TextEncoderStream());

  return new HttpResponse(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "x-vercel-ai-ui-message-stream": "v1",
    },
  });
});
```

## 統合テストのベストプラクティス

### 1. ユーザー視点でのテスト

```typescript
it("メッセージを送信してAIからの応答を受け取る", async () => {
  // ユーザーの操作をシミュレート
  await user.type(textarea, "メッセージ");
  await user.click(sendButton);

  // ユーザーが見る結果を検証
  await waitFor(() => {
    expect(screen.getByText(/応答内容/)).toBeInTheDocument();
  });
});
```

### 2. ストリーミングのテスト

```typescript
// ストリーミングの開始を確認
await waitFor(() => {
  expect(screen.getByText(/最初の部分/)).toBeInTheDocument();
});

// ストリーミングの完了を確認
await waitFor(() => {
  expect(screen.getByText(/最後の部分/)).toBeInTheDocument();
});
```

### 3. エラーケースのテスト

```typescript
it("エラー時に適切なメッセージを表示", async () => {
  // エラーハンドラーを設定
  server.use(errorHandlers.chatError);

  // エラーメッセージの表示を確認
  await waitFor(() => {
    expect(screen.getByText(/エラーが発生しました/)).toBeInTheDocument();
  });
});
```

### 4. 状態管理のテスト

```typescript
it("ポイントが正しく消費される", async () => {
  // 初期状態の確認
  expect(screen.getByText("100 / 100")).toBeInTheDocument();

  // アクション後の状態変化を確認
  await user.click(sendButton);
  await waitFor(() => {
    expect(screen.getByText("90 / 100")).toBeInTheDocument();
  });
});
```

## AI SDK 特有のテストパターン

### 1. useChat フックのテスト

```typescript
// Next.jsのルーティングをモック
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
  useSearchParams: () => ({ get: () => "value" }),
}));

// useChatの動作をテスト
const { messages, sendMessage } = useChat();
```

### 2. ツール呼び出しのテスト

```typescript
// ツール呼び出しを含むレスポンスをモック
const toolCallChunks = [
  { type: "tool-call", toolCallId: "call-1", toolName: "analyze" },
  { type: "tool-result", toolCallId: "call-1", result: { score: 85 } },
];
```

### 3. メッセージパーツのテスト

```typescript
// 異なるタイプのメッセージパーツを検証
messages.forEach((message) => {
  message.parts.forEach((part) => {
    switch (part.type) {
      case "text":
        expect(part.text).toBeDefined();
        break;
      case "tool-result":
        expect(part.result).toBeDefined();
        break;
    }
  });
});
```

## トラブルシューティング

### 1. TypeScript エラー

依存関係をインストール後も型エラーが出る場合：

```bash
# TypeScriptのキャッシュをクリア
rm -rf node_modules/.cache
pnpm install
```

### 2. テストのタイムアウト

ストリーミングのテストでタイムアウトする場合：

```typescript
await waitFor(
  () => {
    /* assertion */
  },
  { timeout: 5000 } // タイムアウトを延長
);
```

### 3. MSW の警告

MSW が未処理のリクエストについて警告を出す場合：

```typescript
// setupファイルで警告を制御
server.listen({ onUnhandledRequest: "bypass" });
```

## まとめ

Vercel AI SDK のテストヘルパーと MSW を組み合わせることで、以下が実現できます：

1. **リアルなストリーミング体験のテスト** - simulateReadableStream で実際のストリーミングを再現
2. **決定的なテスト結果** - モックにより常に同じ結果を得られる
3. **高速な実行** - 実際の API を呼び出さないため高速
4. **エッジケースの網羅** - エラーケースも簡単にテスト可能

これにより、AI 機能を含むフロントエンドアプリケーションの品質を効率的に保証できます。
