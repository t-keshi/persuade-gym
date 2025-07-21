import { defineRecipe } from "@pandacss/dev";
import { RecipeConfig } from "../../../../styled-system/types";

export const containerRecipe = defineRecipe({
  className: "container",
  description: "The styles for the Container component",
  base: {
    position: "relative",
    width: "full",
    marginInline: "auto",
  },
  variants: {
    size: {
      sm: {
        maxWidth: "[640]",
      },
      md: {
        maxWidth: "[768px]",
      },
      lg: {
        maxWidth: "[1024px]",
      },
      xl: {
        maxWidth: "[1280px]",
      },
      full: {
        maxWidth: "full",
      },
    },
  },
  defaultVariants: {
    size: "lg",
  } as const,
} satisfies RecipeConfig);
