# Panda CSS の recipe に関する説明

## 通常の recipe の場合

```typescript
import { defineRecipe } from "@pandacss/dev";
import { RecipeConfig } from "../../../../styled-system/types";

export const {componentNameLowerCamelCase}Recipe = defineRecipe({
  className: "{componentNameLowerCamelCase}",
  description: "The styles for the {ComponentNameUpperCamelCase} component",
  base: {},
  variants: {},
  defaultVariants: {} as const,
} satisfies RecipeConfig);
```

## slot recipe の場合

```typescript
import { defineSlotRecipe } from "@pandacss/dev";
import { SlotRecipeConfig } from "../../../../styled-system/types";

export const {componentNameLowerCamelCase}Recipe = defineSlotRecipe({
  className: "{componentNameLowerCamelCase}",
  description: "The styles for the {ComponentNameUpperCamelCase} component",
  slots: ["root", "control"],
  base: {
    root: {},
    control: {},
  },
  variants: {},
  defaultVariants: {}
} satisfies SlotRecipeConfig);
```
