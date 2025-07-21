import React from "react";
import {
  container,
  type ContainerVariantProps,
} from "../../../../styled-system/recipes";
import { StandardComponentProps } from "@/components/types/utilityTypes";

type ElementProps = {
  children: React.ReactNode;
};
type ContainerElementProps = StandardComponentProps<ElementProps, "div">;

export type ContainerProps = ContainerVariantProps & ContainerElementProps;

export const Container: React.FC<ContainerProps> = (props) => {
  const [containerVariantProps, { children, ...rest }] =
    container.splitVariantProps(props);

  return (
    <div className={container(containerVariantProps)} {...rest}>
      {children}
    </div>
  );
};
