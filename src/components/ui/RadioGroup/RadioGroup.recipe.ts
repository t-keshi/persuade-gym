import { defineSlotRecipe } from "@pandacss/dev";

import type { SlotRecipeConfig } from "../../../../styled-system/types";

export const radioGroupRecipe = defineSlotRecipe({
  className: "radioGroup",
  description: "The styles for the RadioGroup component",
  slots: ["root", "legend", "item", "itemText", "itemControl"],
  base: {
    root: {
      display: "flex",
      flexDirection: "column",
      gap: "sm",
      width: "full",
    },
    legend: {
      fontFamily: "default",
      fontSize: "h3",
      fontWeight: "bold",
      color: "text.primary",
      marginBottom: "xs",
    },
    item: {
      display: "flex",
      alignItems: "center",
      columnGap: "sm",
      borderWidth: "1px",
      borderColor: "divider",
      borderRadius: "sm",
      padding: "sm",
      transition: "shadow",

      _hover: {
        cursor: "pointer",
        boxShadow: "1",
      },

      _focusVisible: {
        outlineWidth: "1px",
        outlineStyle: "solid",
        outlineColor: "secondary.main",
        outlineOffset: "[2px]",
      },
    },
    itemText: {
      fontSize: "body1",
      color: "text.primary",
      _disabled: {
        color: "text.disabled",
      },
    },
    itemControl: {
      color: "[transparent]",
      alignItems: "center",
      justifyContent: "center",
      transition: "opacity",

      _checked: {
        color: "secondary.main",
      },

      _disabled: {
        borderColor: "action.disabled",
        backgroundColor: "action.disabledBackground",
      },
    },
  },
  variants: {
    orientation: {
      horizontal: {
        root: {
          flexDirection: "row",
          flexWrap: "wrap",
        },
      },
      vertical: {
        root: {
          flexDirection: "column",
        },
      },
    },
    size: {},
  },
  defaultVariants: {} as const,
} satisfies SlotRecipeConfig);
