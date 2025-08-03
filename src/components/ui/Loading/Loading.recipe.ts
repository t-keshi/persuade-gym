import { defineSlotRecipe } from "@pandacss/dev";

import type { SlotRecipeConfig } from "../../../../styled-system/types";

export const loadingRecipe = defineSlotRecipe({
  className: "loading",
  description: "The styles for the Loading component",
  slots: ["root", "icon", "text"],
  base: {
    root: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "md",
      padding: "lg",
    },
    icon: {
      width: "[100px]",
      height: "[100px]",
      animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
    },
    text: {
      fontSize: "body1",
      fontWeight: "normal",
      color: "text.secondary",
      _after: {
        content: "''",
        animation: "dots 1.5s steps(4, end) infinite",
      },
    },
  },
  variants: {
    size: {
      sm: {
        icon: {
          width: "[60px]",
          height: "[60px]",
        },
        text: {
          fontSize: "body2",
        },
      },
      md: {
        icon: {
          width: "[100px]",
          height: "[100px]",
        },
        text: {
          fontSize: "body1",
        },
      },
      lg: {
        icon: {
          width: "[140px]",
          height: "[140px]",
        },
        text: {
          fontSize: "h5",
        },
      },
    },
  },
  defaultVariants: {
    size: "md",
  } as const,
} satisfies SlotRecipeConfig);
