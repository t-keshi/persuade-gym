import { defineRecipe } from "@pandacss/dev";

import type { RecipeConfig } from "../../../../styled-system/types";

export const typographyRecipe = defineRecipe({
  className: "typography",
  description: "The styles for the Typography component",
  base: {
    fontFamily: "default",
  },
  variants: {
    whiteSpace: {
      pre: {
        whiteSpace: "pre",
      },
      "pre-wrap": {
        whiteSpace: "pre-wrap",
      },
      normal: {
        whiteSpace: "normal",
      },
    },
    fontWeight: {
      normal: {
        fontWeight: "normal",
      },
      bold: {
        fontWeight: "bold",
      },
    },
    italic: {
      true: {
        fontStyle: "italic",
      },
      false: {
        fontStyle: "normal",
      },
    },
    variant: {
      h1: {
        fontSize: "h1",
        fontWeight: "bold",
      },
      h2: {
        fontSize: "h2",
        fontWeight: "bold",
      },
      h3: {
        fontSize: "h3",
        fontWeight: "bold",
      },
      h4: {
        fontSize: "h4",
        fontWeight: "normal",
      },
      h5: {
        fontSize: "h5",
        fontWeight: "normal",
      },
      h6: {
        fontSize: "h6",
        fontWeight: "normal",
      },
      body1: {
        fontSize: "body1",
        fontWeight: "normal",
      },
      body2: {
        fontSize: "body2",
        fontWeight: "normal",
      },
      caption: {
        fontSize: "caption",
        fontWeight: "normal",
      },
    },
    color: {
      primary: {
        color: "primary.main",
      },
      secondary: {
        color: "secondary.main",
      },
      textPrimary: {
        color: "text.primary",
      },
      textSecondary: {
        color: "text.secondary",
      },
      error: {
        color: "error.main",
      },
    },
    align: {
      left: {
        textAlign: "left",
      },
      center: {
        textAlign: "center",
      },
      right: {
        textAlign: "right",
      },
      justify: {
        textAlign: "justify",
      },
    },
    dense: {
      true: {},
      false: {},
    },
  },
  compoundVariants: [
    {
      variant: "h1",
      dense: false,
      css: {
        lineHeight: "h1",
      },
    },
    {
      variant: "h1",
      dense: true,
      css: {
        lineHeight: "none",
      },
    },
    {
      variant: "h2",
      dense: false,
      css: {
        lineHeight: "h2",
      },
    },
    {
      variant: "h2",
      dense: true,
      css: {
        lineHeight: "none",
      },
    },
    {
      variant: "h3",
      dense: false,
      css: {
        lineHeight: "h3",
      },
    },
    {
      variant: "h3",
      dense: true,
      css: {
        lineHeight: "none",
      },
    },
    {
      variant: "h4",
      dense: false,
      css: {
        lineHeight: "h4",
      },
    },
    {
      variant: "h4",
      dense: true,
      css: {
        lineHeight: "none",
      },
    },
    {
      variant: "h5",
      dense: false,
      css: {
        lineHeight: "h5",
      },
    },
    {
      variant: "h5",
      dense: true,
      css: {
        lineHeight: "none",
      },
    },
    {
      variant: "h6",
      dense: false,
      css: {
        lineHeight: "h6",
      },
    },
    {
      variant: "h6",
      dense: true,
      css: {
        lineHeight: "none",
      },
    },
    {
      variant: "body1",
      dense: false,
      css: {
        lineHeight: "body1",
      },
    },
    {
      variant: "body1",
      dense: true,
      css: {
        lineHeight: "none",
      },
    },
    {
      variant: "body2",
      dense: false,
      css: {
        lineHeight: "body2",
      },
    },
    {
      variant: "body2",
      dense: true,
      css: {
        lineHeight: "none",
      },
    },
    {
      variant: "caption",
      dense: false,
      css: {
        lineHeight: "caption",
      },
    },
    {
      variant: "caption",
      dense: true,
      css: {
        lineHeight: "none",
      },
    },
  ] as const,
  defaultVariants: {
    variant: "body1",
    color: "textPrimary",
    align: "left",
    dense: false,
    fontWeight: "normal",
    italic: false,
    whiteSpace: "normal",
  } as const,
} satisfies RecipeConfig);
