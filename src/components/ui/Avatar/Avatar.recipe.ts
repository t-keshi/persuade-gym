import { defineRecipe } from "@pandacss/dev";
import { RecipeConfig } from "../../../../styled-system/types";

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
        width: "[32]",
        height: "[32]",
      },
      md: {
        width: "[48]",
        height: "[48]",
      },
      lg: {
        width: "[56]",
        height: "[56]",
      },
    },
  },
  defaultVariants: {
    size: "md",
  } as const,
} satisfies RecipeConfig);
