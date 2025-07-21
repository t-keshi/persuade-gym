import React from "react";
import { StandardComponentProps } from "@/components/types/utilityTypes";
import {
  typography,
  TypographyVariantProps,
} from "../../../../styled-system/recipes";

type ElementProps = {
  children: React.ReactNode;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
};

type TypographyElementProps = StandardComponentProps<ElementProps, "p">;

export type TypographyProps = TypographyVariantProps & TypographyElementProps;

export const Typography: React.FC<TypographyProps> = (props) => {
  const [typographyVariantProps, { children, as, ...rest }] =
    typography.splitVariantProps(props);

  const defaultVariantMapping = {
    h1: "h1",
    h2: "h2",
    h3: "h3",
    h4: "h4",
    h5: "h5",
    h6: "h6",
    p: "p",
    span: "span",
    body1: "p",
    body2: "p",
    subtitle1: "p",
    subtitle2: "p",
    caption: "p",
    overline: "p",
  } as const;
  const Component =
    as || defaultVariantMapping[typographyVariantProps.variant ?? "body1"];

  return (
    <Component className={typography(typographyVariantProps)} {...rest}>
      {children}
    </Component>
  );
};
