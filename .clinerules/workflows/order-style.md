# CSS プロパティ順序並べ替えワークフロー

## 概要

このワークフローは、現在開かれているアクティブなタブの recipe ファイルを、定められた順序に従って並べ替えて整理整頓します。

**実行対象:** アクティブなタブの `.recipe.ts` ファイル
**処理内容:** CSS プロパティと擬似クラスの順序を規約に従って整理

## CSS プロパティ順序規約

### 基本的なプロパティ順序

以下の順序で CSS プロパティを並べ替えます：

1. **Positioning**

   - `position`, `top`, `right`, `bottom`, `left`, `z-index`

2. **Box Model**

   - `display`, `width`, `height`, `margin`, `padding`

3. **Typography**

   - `color`, `font`, `line-height`, `text-align`

4. **Visual**

   - `background`, `border`, `opacity`

5. **Animation**

   - `transition`, `transform`

6. **Misc**
   - `user-select`, `cursor`

**重要:** コメント行（`// Positioning`など）は挿入せず、単純に並べ替えのみを行います。

### 擬似クラスの順序

panda.css の擬似クラスは以下の順序で並べ替えます：

```typescript
// 状態系
_disabled;
_hover;
_focus;
_focusWithin;
_focusVisible;
_active;
_visited;
_target;
_readOnly;
_readWrite;
_empty;
_checked;
_enabled;
_expanded;
_highlighted;

// 擬似要素系
_before;
_after;
_firstLetter;
_firstLine;
_marker;
_selection;
_file;
_backdrop;

// 構造系
_first;
_last;
_only;
_even;
_odd;
_firstOfType;
_lastOfType;
_onlyOfType;

// Peer系
_peerFocus;
_peerHover;
_peerActive;
_peerFocusWithin;
_peerFocusVisible;
_peerDisabled;
_peerChecked;
_peerInvalid;
_peerExpanded;
_peerPlaceholderShown;

// Group系
_groupFocus;
_groupHover;
_groupActive;
_groupFocusWithin;
_groupFocusVisible;
_groupDisabled;
_groupChecked;
_groupExpanded;
_groupInvalid;

// フォーム系
_indeterminate;
_required;
_valid;
_invalid;
_autofill;
_inRange;
_outOfRange;
_placeholder;
_placeholderShown;

// インタラクション系
_pressed;
_selected;
_default;
_optional;
_open;
_fullscreen;
_loading;
_currentPage;
_currentStep;

// メディア系
_motionReduce;
_motionSafe;
_print;
_landscape;
_portrait;

// テーマ系
_dark;
_light;
_osDark;
_osLight;
_highContrast;
_lessContrast;
_moreContrast;

// 方向系
_ltr;
_rtl;

// スクロール系
_scrollbar;
_scrollbarThumb;
_scrollbarTrack;
_horizontal;
_vertical;
```

### 擬似クラスのフォーマット

各擬似クラスの間には空白行を挿入します：

```typescript
// 正しい例
{
  display: "flex",

  _disabled: {
    opacity: 0.5
  },

  _hover: {
    backgroundColor: "blue.500"
  },

  _focus: {
    outline: "2px solid blue.300"
  }
}
```

## 処理ルール

1. **対象ファイル:** `.recipe.ts` ファイルのみ
2. **処理方法:**
   - 既存のプロパティと擬似クラスを上記順序に従って並べ替え
   - 空白行とインデントを適切に調整
   - コメント行は追加しない
3. **保持事項:**
   - 既存のプロパティ値は変更しない
   - ファイル構造は保持する
   - import 文や export 文は変更しない
