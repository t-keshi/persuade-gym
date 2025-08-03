import { defineSlotRecipe } from "@pandacss/dev";

import type { SlotRecipeConfig } from "../../../../styled-system/types";

export const informationPanelRecipe = defineSlotRecipe({
  className: "informationPanel",
  description: "The styles for the InformationPanel component",
  slots: ["root", "icon", "content", "title", "description"],
  base: {
    root: {
      display: "flex",
      alignItems: "flex-start",
      gap: "md",
      padding: "lg",
      borderRadius: "md",
      borderWidth: "1px",
      borderStyle: "solid",
      backgroundColor: "background.paper",
    },
    icon: {
      flexShrink: 0,
      width: "[24px]",
      height: "[24px]",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    content: {
      flex: "1",
      display: "flex",
      flexDirection: "column",
      gap: "xs",
    },
    title: {
      fontSize: "body1",
      fontWeight: "bold",
      lineHeight: "body1",
      color: "text.primary",
    },
    description: {
      fontSize: "body2",
      lineHeight: "body2",
      color: "text.secondary",
    },
  },
  variants: {
    variant: {
      info: {
        root: {
          borderColor: "secondary.light",
          backgroundColor: "background.paper",
        },
        icon: {
          color: "secondary.main",
        },
        title: {
          color: "secondary.dark",
        },
      },
      success: {
        root: {
          borderColor: "secondary.main",
          backgroundColor: "background.paper",
        },
        icon: {
          color: "secondary.main",
        },
        title: {
          color: "secondary.dark",
        },
      },
      warning: {
        root: {
          borderColor: "primary.light",
          backgroundColor: "background.paper",
        },
        icon: {
          color: "primary.main",
        },
        title: {
          color: "primary.dark",
        },
      },
      error: {
        root: {
          borderColor: "error.light",
          backgroundColor: "background.paper",
        },
        icon: {
          color: "error.main",
        },
        title: {
          color: "error.dark",
        },
      },
    },
    size: {
      sm: {
        root: {
          padding: "sm",
          gap: "sm",
        },
        icon: {
          width: "[16px]",
          height: "[16px]",
        },
        title: {
          fontSize: "body2",
        },
        description: {
          fontSize: "caption",
        },
      },
      md: {
        root: {
          padding: "md",
          gap: "md",
        },
        icon: {
          width: "[20px]",
          height: "[20px]",
        },
        title: {
          fontSize: "body1",
        },
        description: {
          fontSize: "body2",
        },
      },
      lg: {
        root: {
          padding: "lg",
          gap: "lg",
        },
        icon: {
          width: "[32px]",
          height: "[32px]",
        },
        title: {
          fontSize: "h6",
        },
        description: {
          fontSize: "body1",
        },
      },
    },
  },
  defaultVariants: {
    variant: "info",
    size: "md",
  } as const,
} satisfies SlotRecipeConfig);
