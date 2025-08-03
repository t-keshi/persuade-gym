import { defineConfig } from "@pandacss/dev";
import pandaBasePreset from "@pandacss/preset-base";
import pandaPreset from "@pandacss/preset-panda";

import { keyframes } from "@/pandas/keyframes";
import { recipes } from "@/pandas/recipes";
import { tokens } from "@/pandas/tokens";

const { container: _, ...pandaBasePresetPatterns } = pandaBasePreset.patterns;

export default defineConfig({
  presets: [pandaPreset],
  eject: true,
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
  conditions: {
    extend: {
      ...pandaBasePreset.conditions,
    },
  },
  patterns: {
    extend: {
      ...pandaBasePresetPatterns,
    },
  },
  utilities: {
    extend: {
      ...pandaBasePreset.utilities,
    },
  },
  outdir: "styled-system",
  jsxFramework: "react",
});
