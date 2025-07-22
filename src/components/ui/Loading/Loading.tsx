import React from "react";
import {
  loading,
  LoadingVariantProps,
} from "../../../../styled-system/recipes";
import { StandardComponentProps } from "@/components/types/utilityTypes";
import { RobotIcon } from "./RobotIcon";

type ElementProps = {
  loadingText?: string;
};

type LoadingElementProps = StandardComponentProps<ElementProps, "div">;

export type LoadingProps = LoadingVariantProps & LoadingElementProps;

export const Loading: React.FC<LoadingProps> = (props) => {
  const [variantProps, { loadingText, ...rest }] =
    loading.splitVariantProps(props);
  const styles = loading(variantProps);

  return (
    <div className={styles.root} {...rest}>
      <RobotIcon className={styles.icon} />
      <p className={styles.text}>{loadingText || "Thinking..."}</p>
    </div>
  );
};
