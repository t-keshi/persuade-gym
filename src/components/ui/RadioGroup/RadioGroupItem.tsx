import React from "react";

import { RadioGroup as ArkRadioGroup } from "@ark-ui/react/radio-group";
import { CheckIcon } from "lucide-react";

import {
  radioGroup
} from "../../../../styled-system/recipes";

import type {
  RadioGroupVariantProps} from "../../../../styled-system/recipes";
import type { StandardComponentProps } from "@/components/types/utilityTypes";

type ElementProps = {
  children: React.ReactNode;
} & Pick<ArkRadioGroup.ItemProps, "value" | "disabled">;
type RadioGroupItemElementProps = StandardComponentProps<ElementProps, "label">;

export type RadioGroupItemProps = RadioGroupVariantProps &
  RadioGroupItemElementProps;

export const RadioGroupItem: React.FC<RadioGroupItemProps> = (props) => {
  const [variantProps, { value, children, ...rest }] =
    radioGroup.splitVariantProps(props);
  const styles = radioGroup(variantProps);

  return (
    <ArkRadioGroup.Item className={styles.item} value={value} {...rest}>
      <ArkRadioGroup.ItemControl className={styles.itemControl}>
        <CheckIcon />
      </ArkRadioGroup.ItemControl>
      <ArkRadioGroup.ItemText className={styles.itemText}>
        {children}
      </ArkRadioGroup.ItemText>
      <ArkRadioGroup.ItemHiddenInput />
    </ArkRadioGroup.Item>
  );
};
