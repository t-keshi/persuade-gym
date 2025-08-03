import {
  floatingActionArea,
  type FloatingActionAreaVariantProps,
} from "../../../../styled-system/recipes";

import type { StandardComponentProps } from "@/components/types/utilityTypes";

type ElementProps = {
  children: React.ReactNode;
};
type FloatingAreaElementProps = StandardComponentProps<ElementProps, "div">;

export type FloatingActionAreaProps = FloatingActionAreaVariantProps &
  FloatingAreaElementProps;

export const FloatingActionArea: React.FC<FloatingActionAreaProps> = (
  props
) => {
  const [floatingActionAreaVariantProps, { children, ...rest }] =
    floatingActionArea.splitVariantProps(props);

  return (
    <div
      className={floatingActionArea(floatingActionAreaVariantProps)}
      {...rest}
    >
      {children}
    </div>
  );
};
