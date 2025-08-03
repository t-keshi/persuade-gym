import { defineRecipe } from "@pandacss/dev";

import type { RecipeConfig } from "../../../../styled-system/types";

export const buttonRecipe = defineRecipe({
  className: "button",
  description: "The styles for the Button component",
  base: {
    position: "relative",
    userSelect: "none",
    appearance: "none",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    columnGap: "xs",
    fontWeight: "bold",
    fontFamily: "default",
    fontSize: "button",
    lineHeight: "none",
    borderRadius: "sm",
    outlineWidth: "0",
    outlineOffset: "[2px]",
    outlineStyle: "solid",
    outlineColor: "secondary.main",
    boxSizing: "border-box",
    borderStyle: "solid",
    color: "text.primary",
    transition: "colors",
    cursor: { base: "pointer", _disabled: "default" },

    "& :where(svg)": {
      fontSize: "button",
      width: "[1rem]",
      height: "[1rem]",
    },
  },
  variants: {
    variant: {
      primary: {
        color: "primary.contrastText",
        backgroundColor: "primary.main",

        _hover: {
          backgroundColor: "primary.dark",
        },

        _focusWithin: {
          outlineWidth: "2px",
        },

        _disabled: {
          color: "text.disabled",
          backgroundColor: "action.disabledBackground",
          _hover: {
            backgroundColor: "action.disabledBackground",
          },
        },
      },
      secondary: {
        color: "secondary.contrastText",
        backgroundColor: "secondary.main",

        _hover: {
          backgroundColor: "primary.dark",
        },

        _focusWithin: {
          outlineWidth: "2px",
        },

        _disabled: {
          color: "text.disabled",
          backgroundColor: "action.disabled",
          _hover: {
            backgroundColor: "action.disabled",
          },
        },
      },
      outlined: {
        color: "primary.main",
        borderWidth: "1px",
        borderColor: "primary.main",

        _hover: {
          color: "primary.dark",
          borderColor: "primary.dark",
        },

        _focusWithin: {
          outlineWidth: "2px",
        },

        _disabled: {
          color: "text.disabled",
          _hover: {
            color: "text.disabled",
          },
        },
      },
    },
    size: {
      sm: {
        padding: "xs",
      },
      md: {
        padding: "sm",
      },
      lg: {
        padding: "md",
      },
    },
    width: {
      default: {
        width: "auto",
        minWidth: "[86px]",
      },
      hug: {
        width: "full",
      },
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
    width: "default",
  } as const,
} satisfies RecipeConfig);
