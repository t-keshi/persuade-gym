import React from "react";

import { Dialog as ArkDialog } from "@ark-ui/react/dialog";

import { dialog } from "../../../../styled-system/recipes";

import type { StandardComponentProps } from "@/components/types/utilityTypes";

type ElementProps = {
  children: React.ReactNode;
};

type DialogDescriptionElementProps = StandardComponentProps<ElementProps, "p">;

export type DialogDescriptionProps = DialogDescriptionElementProps;

export const DialogDescription: React.FC<DialogDescriptionProps> = (props) => {
  const { children, ...rest } = props;
  const styles = dialog();

  return (
    <ArkDialog.Description className={styles.description} {...rest}>
      {children}
    </ArkDialog.Description>
  );
};
