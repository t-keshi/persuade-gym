import { defineRecipe } from "@pandacss/dev";
import { RecipeConfig } from "../../../../styled-system/types";

export const cardRecipe = defineRecipe({
  className: "card",
  description: "The styles for the Card component",
  base: {
    backgroundColor: "background.default",
    borderRadius: "sm",
    boxShadow: "1",
    padding: "sm",
    border: "1px solid",
    borderColor: "divider",
  },
  variants: {
    size: {
      sm: {
        padding: "sm",
      },
      md: {
        padding: "md",
      },
      lg: {
        padding: "lg",
      },
    },
  },
  defaultVariants: {
    size: "md",
  } as const,
} satisfies RecipeConfig);
