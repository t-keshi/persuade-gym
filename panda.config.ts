import { keyframes } from "@/pandas/keyframes";
import { recipes } from "@/pandas/recipes";
import { tokens } from "@/pandas/tokens";
import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  preflight: true,
  strictTokens: true,
  include: ["./src/**/*.{ts,tsx}"],
  exclude: [],
  theme: {
    tokens,
    extend: {
      keyframes,
      recipes,
    },
  },
  patterns: {
    container: {
      jsxName: "DeprecatedContainer",
    },
  },
  utilities: {
    container: {},
  },
  outdir: "styled-system",
  jsxFramework: "react",
});
