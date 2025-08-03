import { defineRecipe } from "@pandacss/dev";

import type { RecipeConfig } from "../../../../styled-system/types";

const softWhiteFade = `linear-gradient(
  to bottom,
  #ffffff00,
  #ffffff 60%
)`;

export const floatingActionAreaRecipe = defineRecipe({
  className: "floatingActionArea",
  description: "The styles for the FloatingActionArea component",
  base: {
    zIndex: "[2]",
    position: "relative",

    _before: {
      content: '"."',
      position: "absolute",
      top: "[-50px]",
      bottom: "none",
      insetInlineStart: "none",
      width: "full",
      height: "[100px]",
      pointerEvents: "none",
      zIndex: "[-1]",
      backgroundImage: `[${softWhiteFade}]`,
    },
  },
  variants: {},
  defaultVariants: {} as const,
} satisfies RecipeConfig);
