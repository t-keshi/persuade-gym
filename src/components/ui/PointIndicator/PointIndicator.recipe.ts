import { defineSlotRecipe } from "@pandacss/dev";

import type { SlotRecipeConfig } from "../../../../styled-system/types";

export const pointIndicatorRecipe = defineSlotRecipe({
  className: "pointIndicator",
  description: "The styles for the PointIndicator component",
  slots: ["root", "bar", "fill", "text"],
  base: {
    root: {
      display: "inline-flex",
      alignItems: "center",
      gap: "xs",
      width: "auto",
    },
    bar: {
      width: "[120px]",
      height: "[8px]",
      borderRadius: "md",
      backgroundColor: "divider",
      position: "relative",
      overflow: "hidden",
    },
    fill: {
      height: "full",
      borderRadius: "md",
      transition: "all",
      transitionDuration: "300ms",
      transitionTimingFunction: "ease",
      position: "absolute",
      left: "none",
      top: "none",
    },
    text: {
      fontSize: "body2",
      fontWeight: "bold",
      color: "text.primary",
      minWidth: "[60px]",
      textAlign: "right",
    },
  },
  variants: {
    color: {
      default: {
        fill: {
          backgroundColor: "secondary.main",
        },
      },
      warning: {
        fill: {
          backgroundColor: "primary.light",
        },
      },
      alert: {
        fill: {
          backgroundColor: "error.main",
        },
      },
    },
  },
  defaultVariants: {
    color: "default",
  } as const,
} satisfies SlotRecipeConfig);
