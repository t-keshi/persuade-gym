import { defineSlotRecipe } from "@pandacss/dev";
import { SlotRecipeConfig } from "../../../../styled-system/types";

export const tooltipRecipe = defineSlotRecipe({
  className: "tooltip",
  description: "The styles for the Tooltip component",
  slots: ["trigger", "positioner", "content", "arrow", "arrowTip"],
  base: {
    trigger: {},
    positioner: {},
    content: {
      backgroundColor: "[rgba(97, 97, 97, 0.92)]",
      color: "text.inverted",
      paddingInline: "sm",
      paddingBlock: "xs",
      borderRadius: "md",
      fontSize: "caption",
      lineHeight: "none",
      boxShadow: "1",
      maxWidth: "[320px]",
      wordWrap: "break-word",
      zIndex: "tooltip",

      _open: {
        animation: "fadeIn 0.25s ease-out",
      },

      _closed: {
        animation: "fadeOut 0.2s ease-out",
      },
    },
    arrow: {
      "--arrow-size": "8px",
      "--arrow-background": "rgba(97, 97, 97, 0.92)",
    },
    arrowTip: {},
  },
  variants: {},
  defaultVariants: {},
} satisfies SlotRecipeConfig);
