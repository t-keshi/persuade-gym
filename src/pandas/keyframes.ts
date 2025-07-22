import { defineKeyframes } from "@pandacss/dev";

export const keyframes = defineKeyframes({
  fadeIn: {
    "0%": { opacity: "0" },
    "100%": { opacity: "1" },
  },
  fadeOut: {
    "0%": { opacity: "1" },
    "100%": { opacity: "0" },
  },
  slideIn: {
    "0%": {
      transform: "translateY(100%)",
    },
    "100%": {
      transform: "translateY(0)",
    },
  },
  dots: {
    "0%, 20%": { content: "''" },
    "40%": { content: "'.'" },
    "60%": { content: "'..'" },
    "80%, 100%": { content: "'...'" },
  },
});
