import React from "react";
import { StandardComponentProps } from "@/components/types/utilityTypes";
import {
  textArea,
  TextAreaVariantProps,
} from "../../../../styled-system/recipes";
import { ariaAttr, dataAttr } from "../utils/attributes";
import { FormElementProps } from "../utils/formElementProps";

type ElementProps = {
  minRows?: 1 | 2 | 3;
} & FormElementProps;

type TextAreaElementProps = StandardComponentProps<ElementProps, "textarea">;
export type TextAreaProps = TextAreaVariantProps & TextAreaElementProps;

export const TextArea: React.FC<TextAreaProps> = (props) => {
  const [textAreaVariantProps, { minRows = 2, error, ...rest }] =
    textArea.splitVariantProps(props);
  const styles = textArea(textAreaVariantProps);

  return (
    <div className={styles.root}>
      <textarea
        className={styles.textarea}
        rows={minRows}
        data-invalid={dataAttr(error)}
        aria-invalid={ariaAttr(error)}
        {...rest}
      />
    </div>
  );
};
