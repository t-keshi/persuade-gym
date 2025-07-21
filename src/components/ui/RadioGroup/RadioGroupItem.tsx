import React from "react";
import { RadioGroup as ArkRadioGroup } from "@ark-ui/react/radio-group";
import { StandardComponentProps } from "@/components/types/utilityTypes";
import {
  radioGroup,
  RadioGroupVariantProps,
} from "../../../../styled-system/recipes";
import { CheckIcon } from "lucide-react";

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
