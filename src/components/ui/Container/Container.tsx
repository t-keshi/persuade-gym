import React from "react";
import {
  containerRecipe,
  type ContainerRecipeVariantProps,
} from "../../../../styled-system/recipes";
import { StandardComponentProps } from "@/components/types/utilityTypes";

type ElementProps = {
  children: React.ReactNode;
};
type ContainerElementProps = StandardComponentProps<ElementProps, "div">;

export type ContainerProps = ContainerRecipeVariantProps &
  ContainerElementProps;

export const Container: React.FC<ContainerProps> = (props) => {
  const [containerVariantProps, { children, ...rest }] =
    containerRecipe.splitVariantProps(props);

  return (
    <div className={containerRecipe(containerVariantProps)} {...rest}>
      {children}
    </div>
  );
};
