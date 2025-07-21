# ARK UI Radio Group コンポーネントガイド

## 概要

ARK UI の Radio Group は、複数の選択肢から 1 つを選択するためのコンポーネントです。アクセシビリティに配慮され、キーボード操作にも対応しています。

## 基本構造

Radio Group は以下の要素で構成されます：

- `RadioGroup.Root` - ルートコンテナ
- `RadioGroup.Label` - グループ全体のラベル
- `RadioGroup.Item` - 各ラジオボタンのコンテナ（label 要素）
- `RadioGroup.ItemControl` - ラジオボタンのコントロール部分
- `RadioGroup.ItemText` - ラジオボタンのテキストラベル
- `RadioGroup.ItemHiddenInput` - フォーム送信用の隠し input 要素
- `RadioGroup.Indicator` - 選択状態を示すインジケーター

## 重要な設計上の注意点

- `RadioGroup.Item`は**label 要素**として実装される
- `asChild`プロパティを使用する場合は、label 要素が`RadioGroup.Item`の直接の子要素である必要がある
- これは HTML とアクセシビリティの構造を有効に保つため

## 基本的な実装例

```tsx
import { RadioGroup } from "@ark-ui/react/radio-group";

export const Basic = () => {
  const frameworks = ["React", "Solid", "Vue", "Svelte"];

  return (
    <RadioGroup.Root>
      <RadioGroup.Label>Framework</RadioGroup.Label>
      <RadioGroup.Indicator />
      {frameworks.map((framework) => (
        <RadioGroup.Item key={framework} value={framework}>
          <RadioGroup.ItemText>{framework}</RadioGroup.ItemText>
          <RadioGroup.ItemControl />
          <RadioGroup.ItemHiddenInput />
        </RadioGroup.Item>
      ))}
    </RadioGroup.Root>
  );
};
```

## 主要なプロパティ

### RadioGroup.Root

- `defaultValue`: 初期選択値
- `value`: 制御された値
- `disabled`: グループ全体の無効化
- `orientation`: 'horizontal' | 'vertical'
- `onValueChange`: 値変更時のコールバック
- `name`: フォーム送信用の name 属性
- `readOnly`: 読み取り専用

### RadioGroup.Item

- `value`: 必須。各アイテムの値
- `disabled`: 個別アイテムの無効化
- `invalid`: 無効な状態の表示

## 状態管理パターン

### 非制御コンポーネント

```tsx
<RadioGroup.Root defaultValue="Solid">{/* ... */}</RadioGroup.Root>
```

### 制御コンポーネント

```tsx
<RadioGroup.Root
  value={selectedValue}
  onValueChange={(details) => setSelectedValue(details.value)}
>
  {/* ... */}
</RadioGroup.Root>
```

## RootProvider パターン

`useRadioGroup`フックと`RootProvider`を使用して、コンポーネント外部から状態や操作にアクセス可能：

```tsx
import { RadioGroup, useRadioGroup } from "@ark-ui/react/radio-group";

export const RootProvider = () => {
  const radioGroup = useRadioGroup();

  return (
    <>
      <button onClick={() => radioGroup.focus()}>Focus</button>
      <RadioGroup.RootProvider value={radioGroup}>
        {/* Radio group content */}
      </RadioGroup.RootProvider>
    </>
  );
};
```

## アクセシビリティ

### WAI-ARIA 準拠

Radio WAI-ARIA デザインパターンに準拠

### キーボード操作

- `Tab`: チェックされたアイテムまたは最初のアイテムにフォーカス
- `Space`: フォーカスされたアイテムを選択
- `ArrowDown`/`ArrowRight`: 次のアイテムに移動して選択
- `ArrowUp`/`ArrowLeft`: 前のアイテムに移動して選択

### データ属性

各パーツには識別用の`data-part`属性が付与される：

- `[data-scope]="radio-group"`
- `[data-part]`: root, label, item, item-control, indicator など
- `[data-orientation]`: horizontal または vertical
- `[data-disabled]`: 無効化時に存在
- `[data-active]`: アクティブ/押下時に存在

## 実装時の推奨事項

1. 必ず`RadioGroup.Label`を含めて、グループの目的を明確にする
2. 各アイテムには一意の`value`を設定する
3. フォーム送信が必要な場合は`RadioGroup.ItemHiddenInput`を含める
4. アクセシビリティのため、適切なラベル構造を維持する
5. 状態管理は用途に応じて制御/非制御を選択する
