# Persuade Gym - 説得力トレーニングアプリ

営業職の説得力を鍛えるための AI トレーニングアプリケーションです。

🚀 **デモ**: [https://persuade-gym.vercel.app](https://persuade-gym.vercel.app)

## 概要

Persuade Gym は、AI との対話を通じて説得力を向上させるトレーニングアプリです。様々な難易度のキャラクターと、実践的なビジネスシナリオで練習することができます。

## 機能

- 🎭 **複数のキャラクター**: 初級から上級まで、異なる性格と難易度のキャラクター
- 📊 **実践的なシナリオ**: 新商品提案、価格交渉、社内プロジェクト提案など
- 💯 **ポイント制システム**: 文字数に応じたポイント消費で効率的な説得を促進
- 🎯 **段階的な対話構造**: 導入 → 課題確認 → 提案 → クロージングの 4 段階
- 📈 **パフォーマンス評価**: 説得の質を分析してフィードバック

## セットアップ

### 必要な環境

- Node.js 18 以上
- pnpm

### インストール

```bash
# 依存関係のインストール
pnpm install
```

### 環境変数の設定

プロジェクトのルートディレクトリに `.env.local` ファイルを作成し、以下の内容を記入してください：

```env
# OpenAI API Key
OPENAI_API_KEY=your_openai_api_key_here
```

OpenAI API キーは [OpenAI Platform](https://platform.openai.com/api-keys) から取得できます。

### 開発サーバーの起動

```bash
pnpm dev
```

[http://localhost:3000](http://localhost:3000) をブラウザで開いてアプリケーションを確認できます。

## 使い方

1. **キャラクター選択**: 説得相手となるキャラクターを選択
2. **シナリオ選択**: 練習したいビジネスシナリオを選択
3. **対話開始**: AI キャラクターとの対話を開始
4. **説得実践**: ポイントを効率的に使いながら説得を進める
5. **結果確認**: パフォーマンスの評価とフィードバックを確認

## 技術スタック

- **フレームワーク**: Next.js 14 (App Router)
- **スタイリング**: Panda CSS
- **UI コンポーネント**: ARK UI
- **AI**: Vercel AI SDK + OpenAI
- **言語**: TypeScript

## プロジェクト構造

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # APIルート
│   ├── exercise/          # エクササイズ関連ページ
│   └── _layout/           # レイアウトコンポーネント
├── components/            # UIコンポーネント
│   └── ui/               # 再利用可能なUIコンポーネント
├── domain/               # ドメインモデル
└── pandas/               # Panda CSS設定
```

## 開発

### コマンド

```bash
# 開発サーバー起動
pnpm dev

# ビルド
pnpm build

# プロダクションサーバー起動
pnpm start

# リント
pnpm lint
```
