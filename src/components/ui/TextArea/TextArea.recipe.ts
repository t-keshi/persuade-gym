import { defineSlotRecipe } from "@pandacss/dev";

import type { SlotRecipeConfig } from "../../../../styled-system/types";

export const textAreaRecipe = defineSlotRecipe({
  className: "textArea",
  description: "The styles for the TextArea component",
  slots: ["root", "textarea"],
  base: {
    root: {
      display: "block",
      position: "relative",
      width: "full",
      minHeight: "[100px]",
      maxHeight: "[300px]",
      padding: "sm",
      backgroundColor: "background.default",
      border: "1px solid",
      borderColor: "divider",
      borderRadius: "sm",
      outline: "none",
      outlineWidth: "0",
      outlineOffset: "[2px]",
      outlineStyle: "solid",
      outlineColor: "secondary.main",
      transition: "colors",

      _hover: {
        borderColor: "secondary.main",
      },

      _focus: {
        borderColor: "secondary.main",
      },

      _focusVisible: {
        outlineWidth: "1px",
      },
    },
    textarea: {
      display: "block",
      width: "full",
      height: "full",
      minHeight: "[calc(100px - 2 * var(--spacing-sm))]",
      maxHeight: "[calc(300px - 2 * var(--spacing-sm))]",
      fontFamily: "default",
      fontSize: "body1",
      lineHeight: "body1",
      color: "text.primary",
      border: "none",
      outline: "none",
      resize: "vertical",
      fieldSizing: "content",
    },
  },
  variants: {},
  defaultVariants: {},
} satisfies SlotRecipeConfig);
