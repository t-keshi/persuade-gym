import React from "react";
import { StandardComponentProps } from "@/components/types/utilityTypes";
import {
  informationPanel,
  InformationPanelVariantProps,
} from "../../../../styled-system/recipes";

type InformationPanelElementProps = {
  children: React.ReactNode;
};

export type InformationPanelProps = InformationPanelVariantProps &
  StandardComponentProps<InformationPanelElementProps, "div">;

export const InformationPanel: React.FC<InformationPanelProps> = (props) => {
  const [informationPanelVariantProps, { children, ...rest }] =
    informationPanel.splitVariantProps(props);

  return (
    <div className={informationPanel(informationPanelVariantProps)} {...rest}>
      {children}
    </div>
  );
};
