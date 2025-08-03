# Vercel AI SDK v5 ガイド

## 概要

Vercel AI SDK v5 は、インタラクティブなチャット、テキスト補完、アシスタントアプリケーションを簡単に構築するためのフレームワーク非依存のツールキットです。v5 では、メッセージ型システムの改善、ストリーミングアーキテクチャの刷新、ツール呼び出しの強化など、多くの改善が行われています。

## Next.js App Router クイックスタート

### 前提条件

- Node.js 18+ と pnpm がインストールされていること
- OpenAI API キー

### セットアップ

#### 1. Next.js アプリケーションの作成

```bash
pnpm create next-app@latest my-ai-app
```

App Router と Tailwind CSS を使用するよう選択してください。

#### 2. 依存関係のインストール

```bash
pnpm add ai @ai-sdk/react @ai-sdk/openai zod
```

#### 3. OpenAI API キーの設定

`.env.local` ファイルを作成：

```bash
OPENAI_API_KEY=xxxxxxxxx
```

### 基本的な実装

#### Route Handler の作成

`app/api/chat/route.ts`:

```tsx
import { openai } from "@ai-sdk/openai";
import { streamText, UIMessage, convertToModelMessages } from "ai";

// ストリーミングレスポンスのタイムアウトを30秒に設定
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: openai("gpt-4o"),
    messages: convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}
```

重要なポイント：

- `UIMessage[]` は UI で使用するメッセージ型（タイムスタンプなどのメタデータを含む）
- `convertToModelMessages` で `ModelMessage[]` に変換（モデルが期待する形式）
- `toUIMessageStreamResponse()` でストリーミングレスポンスを返す

#### UI の実装（v5 の新しい方式）

`app/page.tsx`:

```tsx
"use client";

import { useChat } from "@ai-sdk/react";
import { useState } from "react";

export default function Chat() {
  const [input, setInput] = useState("");
  const { messages, sendMessage } = useChat();

  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      {messages.map((message) => (
        <div key={message.id} className="whitespace-pre-wrap">
          {message.role === "user" ? "User: " : "AI: "}
          {message.parts.map((part, i) => {
            switch (part.type) {
              case "text":
                return <div key={`${message.id}-${i}`}>{part.text}</div>;
            }
          })}
        </div>
      ))}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage({ text: input });
          setInput("");
        }}
      >
        <input
          className="fixed dark:bg-zinc-900 bottom-0 w-full max-w-md p-2 mb-8 border border-zinc-300 dark:border-zinc-800 rounded shadow-xl"
          value={input}
          placeholder="Say something..."
          onChange={(e) => setInput(e.currentTarget.value)}
        />
      </form>
    </div>
  );
}
```

**v5 の重要な変更点：**

- `useChat`は入力状態を管理しなくなりました（`input`、`handleInputChange`、`handleSubmit`が削除）
- メッセージは`content`プロパティの代わりに`parts`配列を使用
- `append`は`sendMessage`に名前変更

### ツールの実装（v5 の新しい方式）

#### Route Handler でツールを定義

```tsx
import { tool, stepCountIs } from "ai";
import { z } from "zod";

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: openai("gpt-4o"),
    messages: convertToModelMessages(messages),
    // v5: maxStepsの代わりにstopWhenを使用
    stopWhen: stepCountIs(5),
    tools: {
      weather: tool({
        description: "Get the weather in a location (fahrenheit)",
        // v5: parametersからinputSchemaに変更
        inputSchema: z.object({
          location: z.string().describe("The location to get the weather for"),
        }),
        execute: async ({ location }) => {
          const temperature = Math.round(Math.random() * (90 - 32) + 32);
          return {
            location,
            temperature,
          };
        },
      }),
      convertFahrenheitToCelsius: tool({
        description: "Convert a temperature in fahrenheit to celsius",
        inputSchema: z.object({
          temperature: z
            .number()
            .describe("The temperature in fahrenheit to convert"),
        }),
        execute: async ({ temperature }) => {
          const celsius = Math.round((temperature - 32) * (5 / 9));
          return {
            celsius,
          };
        },
      }),
    },
  });

  return result.toUIMessageStreamResponse();
}
```

#### UI でツール結果を表示（v5 の新しい方式）

```tsx
export default function Chat() {
  const [input, setInput] = useState("");
  const { messages, sendMessage } = useChat();
  // v5: maxStepsはクライアント側では削除され、サーバー側のstopWhenで制御

  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      {messages.map((message) => (
        <div key={message.id} className="whitespace-pre-wrap">
          {message.role === "user" ? "User: " : "AI: "}
          {message.parts.map((part, i) => {
            switch (part.type) {
              case "text":
                return <div key={`${message.id}-${i}`}>{part.text}</div>;
              case "tool-weather":
              case "tool-convertFahrenheitToCelsius":
                return (
                  <pre key={`${message.id}-${i}`}>
                    {JSON.stringify(part, null, 2)}
                  </pre>
                );
            }
          })}
        </div>
      ))}
      {/* フォーム部分は同じ */}
    </div>
  );
}
```

### 重要な概念

#### メッセージの parts 配列

各メッセージには `parts` 配列があり、モデルが生成したすべての内容を順序付きで含みます：

- `text`: テキストコンテンツ
- `tool-{toolName}`: ツール呼び出しと結果（v5 で型安全性が向上）
- `reasoning`: 推論内容
- `file`: ファイル添付
- `dynamic-tool`: 動的ツール呼び出し（v5 の新機能）

#### マルチステップツール呼び出し（v5 の変更）

v5 では`maxSteps`が削除され、`stopWhen`を使用します：

```tsx
// サーバー側で制御
const result = streamText({
  model: openai("gpt-4o"),
  messages,
  stopWhen: stepCountIs(5), // 5ステップで停止
  // または特定のツールが呼ばれたら停止
  // stopWhen: hasToolCall('finalizeTask'),
});
```

これにより、複雑な対話や連続的なツール使用が可能になります。

#### プログレッシブエンハンスメント

Server Components では JavaScript が読み込まれていない場合でもフォーム送信が可能です。Client Components では、JavaScript が読み込まれるまで送信がキューに入れられます。

## 主要なフック

### 1. useChat

リアルタイムでチャットメッセージをストリーミングし、チャット状態を管理します。

#### 基本的な使い方

```tsx
// クライアント側
import { useChat } from "@ai-sdk/react";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, status, error } =
    useChat({
      api: "/api/chat", // デフォルト
      streamProtocol: "data", // 'data' | 'text' (デフォルトは'data')
    });

  return (
    <>
      {messages.map((message) => (
        <div key={message.id}>
          {message.role}: {message.content}
        </div>
      ))}
      <form onSubmit={handleSubmit}>
        <input value={input} onChange={handleInputChange} />
        <button type="submit">送信</button>
      </form>
    </>
  );
}
```

```tsx
// サーバー側 (Next.js App Router)
import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: openai("gpt-4-turbo"),
    messages,
  });

  return result.toDataStreamResponse();
}
```

#### 高度な実装パターン（ai-chatbot より）

```tsx
import { DefaultChatTransport } from "ai";
import { useChat } from "@ai-sdk/react";

const {
  messages,
  setMessages,
  sendMessage,
  status,
  stop,
  regenerate,
  resumeStream,
} = useChat<ChatMessage>({
  id,
  messages: initialMessages,
  experimental_throttle: 100, // UIアップデートのスロットリング
  generateId: generateUUID,
  transport: new DefaultChatTransport({
    api: "/api/chat",
    fetch: fetchWithErrorHandlers,
    prepareSendMessagesRequest({ messages, id, body }) {
      return {
        body: {
          id,
          message: messages.at(-1),
          selectedChatModel: initialChatModel,
          selectedVisibilityType: visibilityType,
          ...body,
        },
      };
    },
  }),
  onData: (dataPart) => {
    // データストリームの処理
    setDataStream((ds) => (ds ? [...ds, dataPart] : []));
  },
  onFinish: () => {
    // 完了時の処理（例：キャッシュの更新）
    mutate(unstable_serialize(getChatHistoryPaginationKey));
  },
  onError: (error) => {
    if (error instanceof ChatSDKError) {
      toast({
        type: "error",
        description: error.message,
      });
    }
  },
});
```

#### 主要な機能

- **status**: 'submitted' | 'streaming' | 'ready' | 'error'
- **error**: エラーオブジェクト
- **stop()**: ストリーミングを中止
- **regenerate()**: 最後のメッセージを再生成
- **setMessages()**: メッセージを直接操作
- **append()**: 新しいメッセージを追加
- **sendMessage()**: カスタムメッセージ送信（role, parts 指定可能）
- **resumeStream()**: ストリームの再開（resumable streams 使用時）

### 2. useCompletion

テキスト補完を処理し、UI を自動更新します。

```tsx
const { completion, input, handleInputChange, handleSubmit } = useCompletion({
  api: "/api/completion",
});
```

### 3. useObject

構造化された JSON オブジェクトをストリーミングします。

```tsx
// スキーマ定義
import { z } from "zod";

const schema = z.object({
  notifications: z.array(
    z.object({
      name: z.string(),
      message: z.string(),
    })
  ),
});

// クライアント側
const { object, submit, isLoading, error } = useObject({
  api: "/api/object",
  schema,
});

// サーバー側
const result = streamObject({
  model: openai("gpt-4-turbo"),
  schema,
  prompt: "プロンプト",
});

return result.toTextStreamResponse();
```

## サーバー側の実装

### streamText の高度な使用法

```tsx
import { streamText, smoothStream, stepCountIs } from "ai";
import { createUIMessageStream, JsonToSseTransformStream } from "ai";

const stream = createUIMessageStream({
  execute: ({ writer: dataStream }) => {
    const result = streamText({
      model: myProvider.languageModel(selectedChatModel),
      system: systemPrompt({ selectedChatModel, requestHints }),
      messages: convertToModelMessages(uiMessages),
      stopWhen: stepCountIs(5), // 5ステップで停止
      experimental_activeTools: ["getWeather", "createDocument"],
      experimental_transform: smoothStream({ chunking: "word" }), // 日本語対応
      tools: {
        getWeather,
        createDocument: createDocument({ session, dataStream }),
        updateDocument: updateDocument({ session, dataStream }),
      },
      experimental_telemetry: {
        isEnabled: isProductionEnvironment,
        functionId: "stream-text",
      },
    });

    result.consumeStream();

    dataStream.merge(
      result.toUIMessageStream({
        sendReasoning: true, // 推論プロセスを送信
      })
    );
  },
  generateId: generateUUID,
  onFinish: async ({ messages }) => {
    // メッセージの保存処理
    await saveMessages({ messages });
  },
  onError: () => {
    return "Oops, an error occurred!";
  },
});

// SSE形式でレスポンスを返す
return new Response(stream.pipeThrough(new JsonToSseTransformStream()));
```

### Resumable Streams（中断可能なストリーム）

```tsx
import { createResumableStreamContext } from "resumable-stream";
import { after } from "next/server";

const globalStreamContext = createResumableStreamContext({
  waitUntil: after,
});

// ストリームIDを作成
const streamId = generateUUID();
await createStreamId({ streamId, chatId: id });

// 再開可能なストリームを返す
return new Response(
  await globalStreamContext.resumableStream(streamId, () =>
    stream.pipeThrough(new JsonToSseTransformStream())
  )
);
```

## 高度な機能

### 1. メッセージの部分（parts）

メッセージは`parts`プロパティを持ち、異なるタイプのコンテンツをサポート：

```tsx
sendMessage({
  role: "user",
  parts: [
    ...attachments.map((attachment) => ({
      type: "file" as const,
      url: attachment.url,
      name: attachment.name,
      mediaType: attachment.contentType,
    })),
    {
      type: "text",
      text: input,
    },
  ],
});
```

サポートされるパートタイプ：

- `text`: テキストコンテンツ
- `file`: ファイル（画像など）
- `tool-call`: ツール呼び出し
- `tool-result`: ツール結果
- `reasoning`: 推論内容
- `source`: ソース情報

### 2. 添付ファイル（Attachments）

```tsx
// ファイルアップロード処理
const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("/api/files/upload", {
    method: "POST",
    body: formData,
  });

  if (response.ok) {
    const { url, pathname, contentType } = await response.json();
    return { url, name: pathname, contentType };
  }
};

// FileListを使用
handleSubmit(event, {
  experimental_attachments: files,
});

// URLを使用
handleSubmit(event, {
  experimental_attachments: [
    {
      name: "image.png",
      contentType: "image/png",
      url: "https://example.com/image.png",
    },
  ],
});
```

### 3. 日本語テキストのスムーズなストリーミング

```tsx
import { smoothStream } from "ai";

// サーバー側
experimental_transform: smoothStream({ chunking: "word" });

// クライアント側（別の方法）
const {} = useChat({
  experimental_transform: smoothStream({
    chunking: /[\u3040-\u309F\u30A0-\u30FF]|\S+\s+/,
  }),
});
```

### 4. カスタムトランスポート

```tsx
import { DefaultChatTransport } from "ai";

const transport = new DefaultChatTransport({
  api: "/api/chat",
  fetch: fetchWithErrorHandlers,
  prepareSendMessagesRequest({ messages, id, body }) {
    return {
      body: {
        id,
        message: messages.at(-1),
        selectedChatModel: initialChatModel,
        selectedVisibilityType: visibilityType,
        ...body,
      },
    };
  },
});
```

### 5. ツール（Tools）の実装

```tsx
// ツール定義
const createDocument = ({ session, dataStream }) => ({
  description: 'Create a new document',
  parameters: z.object({
    title: z.string(),
    content: z.string(),
  }),
  execute: async ({ title, content }) => {
    const document = await saveDocument({ title, content });

    // データストリームにカスタムデータを送信
    dataStream.writeData({
      type: 'document-created',
      document,
    });

    return document;
  },
});

// streamTextで使用
tools: {
  createDocument: createDocument({ session, dataStream }),
}
```

## エラーハンドリング

### 1. カスタムエラークラス

```tsx
export class ChatSDKError extends Error {
  constructor(public code: string) {
    super(getErrorMessage(code));
  }

  toResponse() {
    return new Response(JSON.stringify({ error: this.message }), {
      status: getStatusCode(this.code),
    });
  }
}
```

### 2. エラー状態の表示

```tsx
{
  error && (
    <>
      <div>エラーが発生しました。</div>
      <button onClick={() => reload()}>再試行</button>
    </>
  );
}
```

### 3. エラーメッセージのカスタマイズ（サーバー側）

```tsx
return result.toDataStreamResponse({
  getErrorMessage: (error) => {
    if (error instanceof Error) {
      return error.message;
    }
    return "不明なエラー";
  },
});
```

## パフォーマンス最適化

### 1. UI アップデートのスロットリング

```tsx
const {} = useChat({
  experimental_throttle: 100, // 100msごとに更新
});
```

### 2. メモ化とパフォーマンス最適化

```tsx
export const MultimodalInput = memo(
  PureMultimodalInput,
  (prevProps, nextProps) => {
    if (prevProps.input !== nextProps.input) return false;
    if (prevProps.status !== nextProps.status) return false;
    if (!equal(prevProps.attachments, nextProps.attachments)) return false;
    return true;
  }
);
```

### 3. 使用状況情報の無効化

```tsx
return result.toDataStreamResponse({
  sendUsage: false,
});
```

## 実装のベストプラクティス

### 1. 自動リサイズテキストエリア

```tsx
const adjustHeight = () => {
  if (textareaRef.current) {
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height = `${
      textareaRef.current.scrollHeight + 2
    }px`;
  }
};
```

### 2. ローカルストレージとの同期

```tsx
const [localStorageInput, setLocalStorageInput] = useLocalStorage("input", "");

useEffect(() => {
  setLocalStorageInput(input);
}, [input, setLocalStorageInput]);
```

### 3. キーボードショートカット

```tsx
onKeyDown={(event) => {
  if (
    event.key === 'Enter' &&
    !event.shiftKey &&
    !event.nativeEvent.isComposing // 日本語入力中は無視
  ) {
    event.preventDefault();
    submitForm();
  }
}}
```

## 推奨事項

1. **セキュリティ**: エラーメッセージは汎用的なものを表示し、詳細な情報は漏らさない
2. **状態管理**: 制御/非制御コンポーネントを用途に応じて選択
3. **ストリーミング**: 大きなコンテンツには`lazyMount`を使用
4. **アクセシビリティ**: 適切な ARIA 属性とキーボード操作のサポート
5. **エラー処理**: `onError`コールバックと`error`状態の両方を活用
6. **パフォーマンス**: メモ化とスロットリングを適切に使用
7. **UX**: 送信中の状態表示、停止ボタン、再生成機能を提供

## 注意事項

- `useObject`は実験的機能で React のみ対応
- テキストストリームではツール呼び出しや使用状況情報は利用不可
- ファイル添付は`image/*`と`text/*`のみ自動変換される
- 日本語入力時は`isComposing`の確認が必要
- Resumable Streams を使用する場合は Redis URL の設定が必要
- AI SDK v5 では `@beta` タグを使用してインストールする必要がある
- `UIMessage` と `ModelMessage` の型の違いに注意（`convertToModelMessages` で変換）
- ツールパーツは `tool-{toolName}` の形式で命名される
