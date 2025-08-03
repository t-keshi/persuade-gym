import React from "react";

import { useDialogContext } from "@ark-ui/react/dialog";

import { dialog } from "../../../../styled-system/recipes";

import type { StandardComponentProps } from "@/components/types/utilityTypes";

type ElementProps = {
  footerContent?: React.ReactNode;
  children: (api: { onClose: () => void }) => React.ReactNode;
};
type DialogActionsElementProps = StandardComponentProps<ElementProps, "div">;

export type DialogActionsProps = DialogActionsElementProps;

export const DialogActions: React.FC<DialogActionsProps> = (props) => {
  const { footerContent, children, ...rest } = props;
  const styles = dialog();
  const dialogContext = useDialogContext();

  return (
    <div className={styles.actions} {...rest}>
      {footerContent}
      <div className={styles.actionButtons}>
        {children({ onClose: () => dialogContext.setOpen(false) })}
      </div>
    </div>
  );
};
