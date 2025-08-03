import React from "react";

import {
  informationPanel
} from "../../../../styled-system/recipes";

import type {
  InformationPanelVariantProps} from "../../../../styled-system/recipes";
import type { StandardComponentProps } from "@/components/types/utilityTypes";

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
