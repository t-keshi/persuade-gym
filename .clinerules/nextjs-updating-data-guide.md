# Next.js データ更新ガイド

## 概要

Next.js App Router では、React の Server Functions（Server Actions）を使用してサーバー上でデータを安全に更新できます。Server Functions は、クライアントからネットワークリクエストを通じて呼び出される非同期関数です。

## Server Functions とは

- **Server Function**: サーバー上で実行される非同期関数
- **Server Action**: action や mutation のコンテキストで使用される Server Function
- 自動的に `startTransition` と組み合わされる（form の action prop や button の formAction prop で使用時）
- Next.js のキャッシングアーキテクチャと統合され、更新された UI と新しいデータを単一のサーバーラウンドトリップで返す
- 内部的には POST メソッドを使用し、この HTTP メソッドでのみ呼び出し可能

## Server Functions の作成

### 基本的な定義方法

`use server` ディレクティブを使用して定義：

```tsx
// app/lib/actions.ts
export async function createPost(formData: FormData) {
  "use server";
  const title = formData.get("title");
  const content = formData.get("content");

  // データの更新
  // キャッシュの再検証
}

export async function deletePost(formData: FormData) {
  "use server";
  const id = formData.get("id");

  // データの更新
  // キャッシュの再検証
}
```

### Server Components での使用

Server Components 内で直接定義可能：

```tsx
// app/page.tsx
export default function Page() {
  // Server Action
  async function createPost(formData: FormData) {
    "use server";
    // ...
  }

  return <></>;
}
```

**利点**: Server Components はプログレッシブエンハンスメントをデフォルトでサポート（JavaScript が読み込まれていない場合でもフォーム送信が可能）

### Client Components での使用

Client Components では Server Functions を定義できないが、インポートして使用可能：

```tsx
// app/actions.ts
"use server";

export async function createPost() {}

// app/ui/button.tsx
("use client");

import { createPost } from "@/app/actions";

export function Button() {
  return <button formAction={createPost}>Create</button>;
}
```

**注意**: Client Components では、JavaScript が読み込まれていない場合、Server Actions を呼び出すフォームは送信をキューに入れ、ハイドレーション後に優先的に処理される

### Props として渡す

Server Action を Client Component に props として渡すことも可能：

```tsx
<ClientComponent updateItemAction={updateItem} />;

// app/client-component.tsx
("use client");

export default function ClientComponent({
  updateItemAction,
}: {
  updateItemAction: (formData: FormData) => void;
}) {
  return <form action={updateItemAction}>{/* ... */}</form>;
}
```

## Server Functions の呼び出し方法

### 1. Forms での使用

HTML の `<form>` 要素の action prop で Server Function を呼び出し：

```tsx
// app/ui/form.tsx
import { createPost } from "@/app/actions";

export function Form() {
  return (
    <form action={createPost}>
      <input type="text" name="title" />
      <input type="text" name="content" />
      <button type="submit">Create</button>
    </form>
  );
}

// app/actions.ts
("use server");

export async function createPost(formData: FormData) {
  const title = formData.get("title");
  const content = formData.get("content");

  // データの更新
  // キャッシュの再検証
}
```

### 2. Event Handlers での使用

Client Component でイベントハンドラーから Server Function を呼び出し：

```tsx
// app/like-button.tsx
"use client";

import { incrementLike } from "./actions";
import { useState } from "react";

export default function LikeButton({ initialLikes }: { initialLikes: number }) {
  const [likes, setLikes] = useState(initialLikes);

  return (
    <>
      <p>Total Likes: {likes}</p>
      <button
        onClick={async () => {
          const updatedLikes = await incrementLike();
          setLikes(updatedLikes);
        }}
      >
        Like
      </button>
    </>
  );
}
```

### 3. useEffect での使用

コンポーネントのマウント時や依存関係の変更時に Server Function を呼び出し：

```tsx
// app/view-count.tsx
"use client";

import { incrementViews } from "./actions";
import { useState, useEffect, useTransition } from "react";

export default function ViewCount({ initialViews }: { initialViews: number }) {
  const [views, setViews] = useState(initialViews);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      const updatedViews = await incrementViews();
      setViews(updatedViews);
    });
  }, []);

  return <p>Total Views: {views}</p>;
}
```

## 実装例

### ペンディング状態の表示

`useActionState` フックを使用してローディングインジケーターを表示：

```tsx
// app/ui/button.tsx
"use client";

import { useActionState, startTransition } from "react";
import { createPost } from "@/app/actions";
import { LoadingSpinner } from "@/app/ui/loading-spinner";

export function Button() {
  const [state, action, pending] = useActionState(createPost, false);

  return (
    <button onClick={() => startTransition(action)}>
      {pending ? <LoadingSpinner /> : "Create Post"}
    </button>
  );
}
```

### キャッシュの再検証

`revalidatePath` または `revalidateTag` を使用してキャッシュを更新：

```tsx
// app/lib/actions.ts
import { revalidatePath } from "next/cache";

export async function createPost(formData: FormData) {
  "use server";
  // データの更新
  // ...

  revalidatePath("/posts");
}
```

### リダイレクト

更新後にユーザーを別のページにリダイレクト：

```tsx
// app/lib/actions.ts
"use server";

import { redirect } from "next/navigation";

export async function createPost(formData: FormData) {
  // データの更新
  // ...

  redirect("/posts");
}
```

### Cookie の操作

Server Action 内で Cookie を取得、設定、削除：

```tsx
// app/actions.ts
"use server";

import { cookies } from "next/headers";

export async function exampleAction() {
  const cookieStore = await cookies();

  // Cookie の取得
  cookieStore.get("name")?.value;

  // Cookie の設定
  cookieStore.set("name", "Delba");

  // Cookie の削除
  cookieStore.delete("name");
}
```

## 重要なポイント

1. **プログレッシブエンハンスメント**: Server Components では JavaScript なしでも動作
2. **自動的な最適化**: Next.js のキャッシングと統合
3. **型安全性**: TypeScript との完全な互換性
4. **セキュリティ**: サーバー側で実行されるため、機密情報を安全に扱える
5. **パフォーマンス**: 単一のラウンドトリップで UI とデータを更新

## 関連 API

- [`revalidatePath`](/docs/app/api-reference/functions/revalidatePath): パスベースのキャッシュ再検証
- [`revalidateTag`](/docs/app/api-reference/functions/revalidateTag): タグベースのキャッシュ再検証
- [`redirect`](/docs/app/api-reference/functions/redirect): ページリダイレクト
- [`cookies`](/docs/app/api-reference/functions/cookies): Cookie の操作
