import React from "react";
import { card } from "../../../../styled-system/recipes";
import { CardVariantProps } from "../../../../styled-system/recipes";
import { StandardComponentProps } from "@/components/types/utilityTypes";

type ElementProps = {
  children: React.ReactNode;
};
type CardElementProps = StandardComponentProps<ElementProps, "div">;

export type CardProps = CardVariantProps & CardElementProps;

export const Card: React.FC<CardProps> = (props) => {
  const [cardVariantProps, { children, ...rest }] =
    card.splitVariantProps(props);

  return (
    <div className={card(cardVariantProps)} {...rest}>
      {children}
    </div>
  );
};
