import React from "react";

import { RadioGroup as ArkRadioGroup } from "@ark-ui/react/radio-group";

import {
  radioGroup
} from "../../../../styled-system/recipes";

import type {
  RadioGroupVariantProps} from "../../../../styled-system/recipes";
import type { StandardComponentProps } from "@/components/types/utilityTypes";

type ElementProps = {
  legend: string;
  children: React.ReactNode;
} & (
  | {
      onValueChange?: (details: { value: string }) => void;
      valueAsNum?: false;
    }
  | {
      onValueChange?: (details: { value: number }) => void;
      valueAsNum: true;
    }
) &
  Pick<ArkRadioGroup.RootProps, "value" | "disabled" | "defaultValue">;
type RadioGroupElementProps = StandardComponentProps<ElementProps, "div">;

export type RadioGroupProps = RadioGroupVariantProps & RadioGroupElementProps;

export const RadioGroup: React.FC<RadioGroupProps> = (props) => {
  const [
    variantProps,
    { legend, children, valueAsNum, onValueChange, ...rest },
  ] = radioGroup.splitVariantProps(props);
  const styles = radioGroup(variantProps);

  return (
    <ArkRadioGroup.Root
      className={styles.root}
      {...(onValueChange && {
        onValueChange: (details) => {
          if (valueAsNum) {
            return onValueChange({ value: parseInt(details.value, 10) });
          }
          return onValueChange(details);
        },
      })}
      {...rest}
    >
      <ArkRadioGroup.Label className={styles.legend}>
        {legend}
      </ArkRadioGroup.Label>
      {children}
    </ArkRadioGroup.Root>
  );
};
