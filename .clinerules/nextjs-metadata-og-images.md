# Next.js メタデータと OG 画像ガイド

## 概要

Next.js App Router では、メタデータ API を使用して SEO とウェブ共有性を向上させることができます。以下の 3 つの方法でメタデータを定義できます：

1. 静的な `metadata` オブジェクト
2. 動的な `generateMetadata` 関数
3. ファイルコンベンション（favicon、OG 画像など）

## デフォルトフィールド

以下の 2 つのメタタグは、ルートがメタデータを定義していなくても常に追加されます：

```html
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
```

## 静的メタデータ

### 基本的な使い方

`layout.tsx` または `page.tsx` から `Metadata` オブジェクトをエクスポートします：

```typescript
// app/blog/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Blog",
  description: "ブログの説明文",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
```

### 利用可能なオプション

```typescript
export const metadata: Metadata = {
  title: "タイトル",
  description: "説明文",
  keywords: ["キーワード1", "キーワード2"],
  authors: [{ name: "著者名" }],
  openGraph: {
    title: "OGタイトル",
    description: "OG説明文",
    url: "https://example.com",
    siteName: "サイト名",
    images: [
      {
        url: "https://example.com/og.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Twitterタイトル",
    description: "Twitter説明文",
    images: ["https://example.com/twitter.png"],
  },
};
```

## 動的メタデータ

### generateMetadata 関数

データに依存するメタデータを生成する場合は `generateMetadata` 関数を使用します：

```typescript
// app/blog/[slug]/page.tsx
import type { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = (await params).slug;

  // データの取得
  const post = await fetch(`https://api.example.com/blog/${slug}`).then((res) =>
    res.json()
  );

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      images: [post.image],
    },
  };
}

export default function Page({ params, searchParams }: Props) {
  // ページコンポーネント
}
```

### データリクエストのメモ化

メタデータとページで同じデータが必要な場合、React の `cache` 関数を使用して重複リクエストを避けることができます：

```typescript
// app/lib/data.ts
import { cache } from "react";

export const getPost = cache(async (slug: string) => {
  const res = await fetch(`https://api.example.com/posts/${slug}`);
  return res.json();
});

// app/blog/[slug]/page.tsx
import { getPost } from "@/app/lib/data";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPost(params.slug); // 1回目の呼び出し
  return {
    title: post.title,
    description: post.description,
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug); // キャッシュから取得
  return <div>{post.title}</div>;
}
```

## ファイルベースのメタデータ

### Favicon

`app` フォルダのルートに `favicon.ico` を配置します：

```
app/
├── favicon.ico
├── layout.tsx
└── page.tsx
```

サポートされるファイル名：

- `favicon.ico`
- `icon.jpg` / `icon.png` / `icon.svg`
- `apple-icon.jpg` / `apple-icon.png`

### 静的 OG 画像

`app` フォルダに `opengraph-image.png` を配置します：

```
app/
├── opengraph-image.png    # デフォルトのOG画像
├── twitter-image.png       # Twitter用画像
└── blog/
    └── opengraph-image.png # /blog専用のOG画像
```

サポートされる形式：`.png`, `.jpg`, `.jpeg`, `.gif`

推奨サイズ：

- OG 画像: 1200×630px
- Twitter 画像: 1200×600px

## 動的 OG 画像の生成

`ImageResponse` コンストラクタを使用して JSX と CSS で動的な画像を生成できます：

```typescript
// app/blog/[slug]/opengraph-image.tsx
import { ImageResponse } from "next/og";

// 画像のメタデータ
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// 画像生成
export default async function Image({ params }: { params: { slug: string } }) {
  // データの取得
  const post = await getPost(params.slug);

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 48,
          background: "linear-gradient(to bottom right, #1e40af, #3b82f6)",
          color: "white",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px",
        }}
      >
        <h1 style={{ fontSize: 72, marginBottom: 20 }}>{post.title}</h1>
        <p style={{ fontSize: 32, opacity: 0.8 }}>{post.description}</p>
      </div>
    ),
    {
      ...size,
    }
  );
}
```

### ImageResponse の制限事項

- Flexbox と一部の CSS プロパティのみサポート
- `display: grid` などの高度なレイアウトは非対応
- カスタムフォントの使用が可能

### カスタムフォントの使用例

```typescript
const font = fetch(new URL("./inter-bold.ttf", import.meta.url)).then((res) =>
  res.arrayBuffer()
);

export default async function Image() {
  const fontData = await font;

  return new ImageResponse(
    <div style={{ fontFamily: "Inter" }}>カスタムフォントのテキスト</div>,
    {
      ...size,
      fonts: [
        {
          name: "Inter",
          data: fontData,
          style: "normal",
          weight: 700,
        },
      ],
    }
  );
}
```

## 実装例（Persuade Gym 用）

### 静的メタデータ（app/layout.tsx）

```typescript
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Persuade Gym - 説得力トレーニングアプリ",
    template: "%s | Persuade Gym",
  },
  description:
    "営業職の説得力を鍛えるAIトレーニングアプリ。初級から上級まで様々な難易度のキャラクターと実践的なビジネスシナリオで練習。ポイント制システムで効率的な説得力を身につける。",
  keywords: [
    "説得力",
    "営業トレーニング",
    "AI",
    "ビジネススキル",
    "プレゼン力",
    "交渉術",
  ],
  metadataBase: new URL("https://persuade-gym.vercel.app"),
  openGraph: {
    title: "Persuade Gym - 説得力トレーニングアプリ",
    description:
      "AIとの対話で説得力を鍛える。営業・プレゼン・交渉スキルの向上に。",
    url: "/",
    siteName: "Persuade Gym",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Persuade Gym - 説得力を鍛える",
      },
    ],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Persuade Gym - 説得力トレーニング",
    description:
      "AIとの対話で説得力を鍛える。営業・プレゼン・交渉スキルの向上に。",
    images: ["/twitter-image.png"],
    creator: "@persuadegym",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
};
```

### 動的メタデータ（エクササイズ開始ページ）

```typescript
// app/exercise/new/page.tsx
import { CHARACTERS } from "@/domain/character";
import { SCENARIOS } from "@/domain/scenario";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "トレーニング開始",
    description:
      "キャラクターとシナリオを選んで説得力トレーニングを始めましょう",
    openGraph: {
      title: "説得力トレーニングを開始 | Persuade Gym",
      description:
        "様々な性格のキャラクターと実践的なシナリオで説得力を鍛えよう",
    },
  };
}
```

### 動的メタデータ（チャットページ）

```typescript
// app/exercise/chat/page.tsx
import { CHARACTERS } from "@/domain/character";
import { SCENARIOS } from "@/domain/scenario";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: { character?: string; scenario?: string };
}): Promise<Metadata> {
  const character = CHARACTERS.find((c) => c.id === searchParams.character);
  const scenario = SCENARIOS.find((s) => s.id === searchParams.scenario);

  return {
    title: `${character?.name || "AI"}との対話中`,
    description: `${scenario?.title || "シナリオ"}で${
      character?.name || "AI"
    }を説得中`,
    openGraph: {
      title: `${scenario?.title || "説得トレーニング"} - ${
        character?.name || "AI"
      }との対話`,
      description: `説得力を鍛える実践トレーニング中`,
    },
  };
}
```

### 動的メタデータ（結果ページ）

```typescript
// app/exercise/result/page.tsx
import { CHARACTERS } from "@/domain/character";
import { SCENARIOS } from "@/domain/scenario";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: { character?: string; scenario?: string };
}): Promise<Metadata> {
  const character = CHARACTERS.find((c) => c.id === searchParams.character);
  const scenario = SCENARIOS.find((s) => s.id === searchParams.scenario);

  return {
    title: `${scenario?.title || "トレーニング"}の結果`,
    description: `${character?.name || "AI"}との${
      scenario?.title || "説得トレーニング"
    }の分析結果`,
    openGraph: {
      title: `説得力分析結果 - ${scenario?.title || "トレーニング"}`,
      description:
        "あなたの説得力を詳細に分析しました。強みと改善点を確認しよう。",
      images: [
        {
          url: `/api/og?character=${searchParams.character}&scenario=${searchParams.scenario}`,
          width: 1200,
          height: 630,
          alt: "説得力分析結果",
        },
      ],
    },
  };
}
```

### 動的 OG 画像の実装例（app/api/og/route.tsx）

```typescript
import { ImageResponse } from "next/og";
import { CHARACTERS } from "@/domain/character";
import { SCENARIOS } from "@/domain/scenario";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const characterId = searchParams.get("character");
  const scenarioId = searchParams.get("scenario");

  const character = CHARACTERS.find((c) => c.id === characterId);
  const scenario = SCENARIOS.find((s) => s.id === scenarioId);

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#1a1a1a",
          backgroundImage:
            "radial-gradient(circle at 25% 25%, #2a2a2a 0%, #1a1a1a 50%)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "40px",
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            borderRadius: "20px",
            border: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          <h1
            style={{
              fontSize: "60px",
              fontWeight: "bold",
              background: "linear-gradient(to right, #3b82f6, #8b5cf6)",
              backgroundClip: "text",
              color: "transparent",
              margin: "0 0 20px 0",
            }}
          >
            Persuade Gym
          </h1>
          <p
            style={{
              fontSize: "32px",
              color: "#ffffff",
              margin: "0 0 40px 0",
              opacity: 0.9,
            }}
          >
            説得力分析結果
          </p>
          {character && scenario && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "16px",
              }}
            >
              <p
                style={{
                  fontSize: "24px",
                  color: "#a1a1aa",
                  margin: 0,
                }}
              >
                {character.name} × {scenario.title}
              </p>
            </div>
          )}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
```

### 静的 OG 画像と favicon の配置

```
app/
├── favicon.ico            # ブランドアイコン
├── opengraph-image.png    # デフォルトOG画像 (1200×630px)
├── twitter-image.png      # Twitter用画像 (1200×600px)
├── apple-icon.png         # Apple端末用アイコン (180×180px)
└── icon.png              # 汎用アイコン (512×512px)
```

## ベストプラクティス

1. **タイトルの最適化**

   - ページごとに固有のタイトルを設定
   - テンプレートを使用して一貫性を保つ
   - 60 文字以内に収める

2. **説明文の最適化**

   - 各ページに適切な説明文を設定
   - 160 文字以内で要点をまとめる

3. **OG 画像の最適化**

   - 1200×630px のサイズを使用
   - テキストは大きく読みやすく
   - ブランドカラーを使用

4. **パフォーマンス**

   - 静的なメタデータを優先
   - 動的生成は必要な場合のみ使用
   - データフェッチはキャッシュを活用

5. **国際化対応**
   - `locale` プロパティを適切に設定
   - 言語ごとにメタデータを分ける
