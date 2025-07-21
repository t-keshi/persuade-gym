# ARK UI Dialog コンポーネントガイド

## 概要

ARK UI の Dialog は、メインコンテンツの上に表示されるモーダルウィンドウです。ユーザーの注意を引き、重要な情報の表示や確認を求める際に使用されます。

## 基本構造

Dialog は以下の要素で構成されます：

- `Dialog.Root` - ルートコンテナ
- `Dialog.Trigger` - ダイアログを開くトリガー要素
- `Dialog.Backdrop` - 背景のオーバーレイ
- `Dialog.Positioner` - ダイアログの位置を制御するコンテナ
- `Dialog.Content` - ダイアログのメインコンテンツ
- `Dialog.Title` - ダイアログのタイトル
- `Dialog.Description` - ダイアログの説明文
- `Dialog.CloseTrigger` - ダイアログを閉じるトリガー
- `Portal` - ダイアログを DOM ツリーの外側にレンダリング

## 基本的な実装例

```tsx
import { Dialog } from "@ark-ui/react/dialog";
import { Portal } from "@ark-ui/react/portal";

export const Basic = () => (
  <Dialog.Root>
    <Dialog.Trigger>Open Dialog</Dialog.Trigger>
    <Portal>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.Title>Dialog Title</Dialog.Title>
          <Dialog.Description>Dialog Description</Dialog.Description>
          <Dialog.CloseTrigger>Close</Dialog.CloseTrigger>
        </Dialog.Content>
      </Dialog.Positioner>
    </Portal>
  </Dialog.Root>
);
```

## 主要なプロパティ

### Dialog.Root

- `defaultOpen`: 初期表示状態（デフォルト: false）
- `open`: 制御された表示状態
- `onOpenChange`: 表示状態変更時のコールバック
- `closeOnEscape`: Esc キーで閉じるか（デフォルト: true）
- `closeOnInteractOutside`: 外側クリックで閉じるか（デフォルト: true）
- `modal`: モーダル動作の有効化（デフォルト: true）
- `preventScroll`: 背景スクロールの防止（デフォルト: true）
- `trapFocus`: フォーストラップの有効化（デフォルト: true）
- `lazyMount`: 遅延マウント
- `unmountOnExit`: 閉じた時にアンマウント
- `initialFocusEl`: 開いた時の初期フォーカス要素
- `finalFocusEl`: 閉じた時のフォーカス要素
- `role`: 'dialog' | 'alertdialog'（デフォルト: 'dialog'）

## 状態管理パターン

### 非制御コンポーネント

```tsx
<Dialog.Root defaultOpen>{/* ... */}</Dialog.Root>
```

### 制御コンポーネント

```tsx
const [isOpen, setIsOpen] = useState(false)

<Dialog.Root open={isOpen} onOpenChange={(e) => setIsOpen(e.open)}>
  {/* ... */}
</Dialog.Root>
```

## 高度な使用方法

### 遅延マウント（Lazy Mount）

パフォーマンス最適化のため、ダイアログを初めて開いた時にのみコンテンツをレンダリング：

```tsx
<Dialog.Root
  lazyMount
  unmountOnExit
  onExitComplete={() => console.log("onExitComplete invoked")}
>
  {/* ... */}
</Dialog.Root>
```

### 動的インポートとの組み合わせ

```tsx
import { Suspense } from 'react'
import dynamic from 'next/dynamic'

const HeavyComponent = dynamic(() => import('./HeavyComponent'))

<Dialog.Root lazyMount>
  <Dialog.Content>
    <Suspense fallback={<div>Loading...</div>}>
      <HeavyComponent />
    </Suspense>
  </Dialog.Content>
</Dialog.Root>
```

### Context API の使用

ダイアログの状態にアクセス：

```tsx
<Dialog.Context>
  {(dialog) => <p>Dialog is {dialog.open ? "open" : "closed"}</p>}
</Dialog.Context>
```

### RootProvider パターン

`useDialog`フックを使用してプログラム的に制御：

```tsx
import { Dialog, useDialog } from "@ark-ui/react/dialog";

export const RootProvider = () => {
  const dialog = useDialog();

  return (
    <>
      <button onClick={() => dialog.setOpen(true)}>Open</button>
      <Dialog.RootProvider value={dialog}>
        {/* Dialog content */}
      </Dialog.RootProvider>
    </>
  );
};
```

## アクセシビリティ

### WAI-ARIA 準拠

Dialog WAI-ARIA デザインパターンに準拠

### キーボード操作

- `Enter`: トリガーにフォーカス時、ダイアログを開く
- `Tab`: 次のフォーカス可能要素に移動（フォーカストラップ内）
- `Shift + Tab`: 前のフォーカス可能要素に移動（フォーカストラップ内）
- `Esc`: ダイアログを閉じてトリガーまたは指定要素にフォーカス

### データ属性

各パーツには識別用の属性が付与される：

- `[data-scope]="dialog"`
- `[data-part]`: trigger, backdrop, content など
- `[data-state]`: "open" | "closed"

## 実装時の推奨事項

1. **Portal の使用**: ダイアログは必ず Portal 内にレンダリングし、z-index の問題を回避
2. **タイトルと説明**: アクセシビリティのため、必ず Dialog.Title を含める
3. **フォーカス管理**: initialFocusEl と finalFocusEl を適切に設定
4. **閉じる手段の提供**: CloseTrigger、Esc キー、外側クリックなど複数の方法を提供
5. **遅延マウント**: 大きなコンテンツの場合は lazyMount を使用してパフォーマンスを最適化
6. **ロールの選択**: 重要な警告の場合は role="alertdialog" を使用

## 注意事項

- RootProvider を使用する場合、Dialog.Root は不要
- モーダルダイアログは背景のインタラクションをブロックする
- フォーカストラップにより、Tab キーでの移動がダイアログ内に制限される
