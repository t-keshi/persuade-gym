import { defineSlotRecipe } from "@pandacss/dev";
import { SlotRecipeConfig } from "../../../../styled-system/types";

export const dialogRecipe = defineSlotRecipe({
  className: "dialog",
  description: "The styles for the Dialog component",
  slots: [
    "root",
    "trigger",
    "backdrop",
    "positioner",
    "content",
    "title",
    "description",
    "closeTrigger",
    "actions",
    "actionButtons",
  ],
  base: {
    root: {},
    backdrop: {
      position: "fixed",
      inset: "none",
      backgroundColor: "[rgba(0, 0, 0, 0.5)]",
      zIndex: "modal",
      animation: "fadeIn 0.2s ease-out",
    },
    positioner: {
      position: "fixed",
      inset: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: "modal",
      padding: "md",
    },
    content: {
      backgroundColor: "background.paper",
      borderRadius: "md",
      boxShadow: "3",
      padding: "lg",
      maxWidth: "[560px]",
      width: "full",
      maxHeight: "[90vh]",
      overflowY: "auto",
      animation: "slideIn 0.2s ease-out",
      position: "relative",
    },
    title: {
      fontFamily: "default",
      fontSize: "h3",
      fontWeight: "bold",
      color: "text.primary",
      marginBottom: "lg",
      lineHeight: "none",
    },
    description: {
      fontSize: "body1",
      color: "text.secondary",
      marginBottom: "md",
    },
    closeTrigger: {
      position: "absolute",
      top: "sm",
      right: "sm",
      cursor: "pointer",
      padding: "xs",
      borderRadius: "sm",
      transition: "colors",
      color: "text.secondary",

      _hover: {
        backgroundColor: "action.hover",
        color: "text.primary",
      },

      _focusVisible: {
        outlineWidth: "2px",
        outlineStyle: "solid",
        outlineColor: "primary.main",
        outlineOffset: "[2px]",
      },
    },
    actions: {
      display: "flex",
    },
    actionButtons: {
      display: "flex",
      marginLeft: "auto",
      columnGap: "sm",
    },
  },
  variants: {
    size: {
      sm: {
        content: {
          maxWidth: "[400px]",
        },
      },
      md: {
        content: {
          maxWidth: "[560px]",
        },
      },
      lg: {
        content: {
          maxWidth: "[720px]",
        },
      },
      xl: {
        content: {
          maxWidth: "[960px]",
        },
      },
    },
  },
  defaultVariants: {
    size: "md",
  } as const,
} satisfies SlotRecipeConfig);
