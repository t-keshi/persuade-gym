import { defineRecipe } from "@pandacss/dev";

import type { RecipeConfig } from "../../../../styled-system/types";

export const avatarRecipe = defineRecipe({
  className: "avatar",
  description: "The styles for the Avatar component",
  base: {
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    borderRadius: "circle",
  },
  variants: {
    size: {
      sm: {
        width: "[32px]",
        height: "[32px]",
      },
      md: {
        width: "[48px]",
        height: "[48px]",
      },
      lg: {
        width: "[56px]",
        height: "[56px]",
      },
    },
  },
  defaultVariants: {
    size: "md",
  } as const,
} satisfies RecipeConfig);
