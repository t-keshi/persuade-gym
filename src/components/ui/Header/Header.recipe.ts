import { defineSlotRecipe } from "@pandacss/dev";
import { SlotRecipeConfig } from "../../../../styled-system/types";

export const headerRecipe = defineSlotRecipe({
  className: "header",
  description: "The styles for the Header component",
  slots: ["header", "toolbar", "offsetArea"],
  base: {
    header: {
      position: "fixed",
      top: "none",
      left: "none",
      width: "full",
      shadow: "3",
      zIndex: "header",
    },
    toolbar: {
      minHeight: "headerHeight",
      width: "full",
      paddingInline: "md",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: "background.default",
    },
    offsetArea: {
      minHeight: "headerHeight",
      width: "full",
    },
  },
  defaultVariants: {} as const,
} satisfies SlotRecipeConfig);
