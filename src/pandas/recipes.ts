import type { Config } from "@pandacss/dev";

import { avatarRecipe } from "@/components/ui/Avatar/Avatar.recipe";
import { buttonRecipe } from "@/components/ui/Button/Button.recipe";
import { cardRecipe } from "@/components/ui/Card/Card.recipe";
import { containerRecipe } from "@/components/ui/Container/Container.recipe";
import { dialogRecipe } from "@/components/ui/Dialog/Dialog.recipe";
import { floatingActionAreaRecipe } from "@/components/ui/FloatingActionArea/FloatingActionArea.recipe";
import { headerRecipe } from "@/components/ui/Header/Header.recipe";
import { loadingRecipe } from "@/components/ui/Loading/Loading.recipe";
import { pointIndicatorRecipe } from "@/components/ui/PointIndicator/PointIndicator.recipe";
import { radioGroupRecipe } from "@/components/ui/RadioGroup/RadioGroup.recipe";
import { textAreaRecipe } from "@/components/ui/TextArea/TextArea.recipe";
import { tooltipRecipe } from "@/components/ui/Tooltip/Tooltip.recipe";
import { typographyRecipe } from "@/components/ui/Typography/Typography.recipe";

export const recipes: Exclude<
  Exclude<Config["theme"], undefined>["extend"],
  undefined
>["recipes"] = {
  avatar: avatarRecipe,
  button: buttonRecipe,
  card: cardRecipe,
  container: containerRecipe,
  dialog: dialogRecipe,
  floatingActionArea: floatingActionAreaRecipe,
  header: headerRecipe,
  loading: loadingRecipe,
  pointIndicator: pointIndicatorRecipe,
  radioGroup: radioGroupRecipe,
  textArea: textAreaRecipe,
  tooltip: tooltipRecipe,
  typography: typographyRecipe,
};
