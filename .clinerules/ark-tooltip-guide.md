# ARK UI Tooltip コンポーネントガイド

## 概要

ARK UI の Tooltip は、ホバーまたはフォーカス時に情報を提供するラベルコンポーネントです。ユーザーインターフェースの要素に対して追加の説明や情報を表示する際に使用されます。

## 基本構造

Tooltip は以下の要素で構成されます：

- `Tooltip.Root` - ルートコンテナ
- `Tooltip.Trigger` - ツールチップを表示するトリガー要素
- `Tooltip.Positioner` - ツールチップの位置を制御するコンテナ
- `Tooltip.Content` - ツールチップのコンテンツ
- `Tooltip.Arrow` - 矢印のコンテナ（オプション）
- `Tooltip.ArrowTip` - 矢印の先端（オプション）

## 基本的な実装例

```tsx
import { Tooltip } from "@ark-ui/react/tooltip";

export const Basic = () => (
  <Tooltip.Root>
    <Tooltip.Trigger>Hover Me</Tooltip.Trigger>
    <Tooltip.Positioner>
      <Tooltip.Content>I am a tooltip!</Tooltip.Content>
    </Tooltip.Positioner>
  </Tooltip.Root>
);
```

## 主要なプロパティ

### Tooltip.Root

- `defaultOpen`: 初期表示状態（デフォルト: false）
- `open`: 制御された表示状態
- `onOpenChange`: 表示状態変更時のコールバック
- `openDelay`: 表示までの遅延時間（デフォルト: 1000ms）
- `closeDelay`: 非表示までの遅延時間（デフォルト: 500ms）
- `closeOnClick`: クリックで閉じるか（デフォルト: true）
- `closeOnEscape`: Esc キーで閉じるか（デフォルト: true）
- `closeOnPointerDown`: ポインターダウンで閉じるか（デフォルト: true）
- `closeOnScroll`: スクロールで閉じるか（デフォルト: true）
- `interactive`: コンテンツがインタラクティブか（デフォルト: false）
- `disabled`: ツールチップを無効化
- `positioning`: 位置設定オプション
- `lazyMount`: 遅延マウント（デフォルト: false）
- `unmountOnExit`: 閉じた時にアンマウント（デフォルト: false）
- `aria-label`: カスタムラベル

## 状態管理パターン

### 非制御コンポーネント

```tsx
<Tooltip.Root defaultOpen>{/* ... */}</Tooltip.Root>
```

### 制御コンポーネント

```tsx
const [isOpen, setIsOpen] = useState(false)

<Tooltip.Root open={isOpen} onOpenChange={(details) => setIsOpen(details.open)}>
  {/* ... */}
</Tooltip.Root>
```

## 高度な使用方法

### 矢印の追加

トリガーからツールチップへの矢印を表示：

```tsx
<Tooltip.Root>
  <Tooltip.Trigger>Hover Me</Tooltip.Trigger>
  <Tooltip.Positioner>
    <Tooltip.Content>
      <Tooltip.Arrow>
        <Tooltip.ArrowTip />
      </Tooltip.Arrow>
      I am a tooltip!
    </Tooltip.Content>
  </Tooltip.Positioner>
</Tooltip.Root>
```

### 遅延タイミングの設定

```tsx
<Tooltip.Root closeDelay={0} openDelay={0}>
  {/* 即座に開閉 */}
</Tooltip.Root>
```

### カスタムポジショニング

```tsx
<Tooltip.Root
  positioning={{
    placement: "left-start",
    offset: { mainAxis: 12, crossAxis: 12 },
  }}
>
  {/* ... */}
</Tooltip.Root>
```

### Context API の使用

ツールチップの状態にアクセス：

```tsx
<Tooltip.Context>
  {(tooltip) => <p>Tooltip is {tooltip.open ? "open" : "closed"}</p>}
</Tooltip.Context>
```

### RootProvider パターン

`useTooltip`フックを使用してプログラム的に制御：

```tsx
import { Tooltip, useTooltip } from "@ark-ui/react/tooltip";

export const RootProvider = () => {
  const tooltip = useTooltip();

  return (
    <>
      <button onClick={() => tooltip.setOpen(true)}>Open</button>

      <Tooltip.RootProvider value={tooltip}>
        <Tooltip.Trigger>Hover Me</Tooltip.Trigger>
        <Tooltip.Positioner>
          <Tooltip.Content>I am a tooltip!</Tooltip.Content>
        </Tooltip.Positioner>
      </Tooltip.RootProvider>
    </>
  );
};
```

## アクセシビリティ

### WAI-ARIA 準拠

Tooltip WAI-ARIA デザインパターンに準拠

### キーボード操作

- `Tab`: 遅延なしでツールチップを開く/閉じる
- `Escape`: 開いている場合、遅延なしでツールチップを閉じる

### データ属性

各パーツには識別用の属性が付与される：

- `[data-scope]="tooltip"`
- `[data-part]`: trigger, content など
- `[data-state]`: "open" | "closed"
- `[data-placement]`: コンテンツの配置位置
- `[data-expanded]`: 展開時に存在

## 実装時の推奨事項

1. **適切な遅延時間の設定**: ユーザー体験を考慮して openDelay と closeDelay を調整
2. **インタラクティブコンテンツ**: リンクやボタンを含む場合は `interactive={true}` を設定
3. **位置の最適化**: positioning プロパティで適切な表示位置を設定
4. **アクセシビリティ**: 必要に応じて aria-label を提供
5. **パフォーマンス**: 大量のツールチップがある場合は lazyMount を使用

## 注意事項

- RootProvider を使用する場合、Tooltip.Root は不要
- インタラクティブモードでは、コンテンツにホバーしている間もツールチップが開いたまま
- デフォルトでは、クリック、Esc キー、ポインターダウン、スクロールでツールチップが閉じる
