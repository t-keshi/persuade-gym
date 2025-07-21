# コンポーネント新規作成ワークフロー

## 概要

このワークフローは `/create-component.md ComponentName [slot]` の形式で実行されます。

**実行例:**

- 通常の recipe: `/create-component.md Header`
- slot recipe: `/create-component.md Header slot`

**引数:**

- 第 1 引数: コンポーネント名（必須）
- 第 2 引数: `slot`（省略可、指定した場合は slot recipe を作成）

**処理フロー:**

1. 引数が不足している場合、コンポーネント名を確認
2. 引数に基づいて通常の recipe または slot recipe を判定
3. 新規作成手順を実行

## 新規作成手順

### 1. ディレクトリ作成

`@src/components/ui/Button` を参考に、以下の構造でディレクトリを作成：

```
src/
└── components/
    └── ui/
        └── {ComponentName}/           # UpperCamelCase
            ├── {ComponentName}.tsx
            └── {ComponentName}.recipe.ts
```

### 2. コンポーネントファイル作成

**ファイル名:** `{ComponentName}.tsx`
**内容:** Props 型定義とコンポーネント宣言

### 3. レシピファイル作成

**ファイル名:** `{ComponentName}.recipe.ts`
第 2 引数の内容に基づいて作成します。
作成に際しては、@.clinerules/recipe.explanation.md を参照してください。

### 4. レシピ登録

**ファイル:** `@src/components/pandas/recipe.ts`

```typescript
import { {componentNameLowerCamelCase}Recipe } from "@/components/ui/{ComponentNameUpperCamelCase}/{ComponentNameUpperCamelCase}.recipe";
import { Config } from "@pandacss/dev";

export const recipes: Exclude<
  Exclude<Config["theme"], undefined>["extend"],
  undefined
>["recipes"] = {
  {componentNameLowerCamelCase}: {componentNameLowerCamelCase}Recipe
};
```

**注意事項:**

- レシピはアルファベット順（A-Z）で並べる
- このワークフローに限り、TypeScript エラーは無視して構わない

## 変数の命名規則

- `{ComponentName}`: UpperCamelCase（例: Header, Button）
- `{componentNameLowerCamelCase}`: lowerCamelCase（例: header, button）
- `{ComponentNameUpperCamelCase}`: UpperCamelCase（例: Header, Button）
