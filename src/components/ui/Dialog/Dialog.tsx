import React from "react";

import { Dialog as ArkDialog } from "@ark-ui/react/dialog";
import { Portal } from "@ark-ui/react/portal";
import { XIcon } from "lucide-react";

import { dialog } from "../../../../styled-system/recipes";

import type { DialogVariantProps } from "../../../../styled-system/recipes";
import type { StandardComponentProps } from "@/components/types/utilityTypes";

type ElementProps = {
  title: string;
  children: React.ReactNode;
} & (
  | {
      trigger: React.ReactNode;
      open?: never;
    }
  | {
      trigger?: never;
      open: boolean;
    }
) &
  Pick<ArkDialog.RootProps, "onOpenChange">;

type DialogElementProps = StandardComponentProps<ElementProps, "div">;

export type DialogProps = DialogVariantProps & DialogElementProps;

export const Dialog: React.FC<DialogProps> = (props) => {
  const [variantProps, { trigger, title, children, ...rootProps }] =
    dialog.splitVariantProps(props);
  const styles = dialog(variantProps);

  return (
    <ArkDialog.Root {...rootProps} role="dialog">
      {trigger && <ArkDialog.Trigger asChild>{trigger}</ArkDialog.Trigger>}
      <Portal>
        <ArkDialog.Backdrop className={styles.backdrop} />
        <ArkDialog.Positioner className={styles.positioner}>
          <ArkDialog.Content className={styles.content}>
            <ArkDialog.Title className={styles.title}>{title}</ArkDialog.Title>
            <ArkDialog.CloseTrigger className={styles.closeTrigger}>
              <XIcon size={20} />
            </ArkDialog.CloseTrigger>
            {children}
          </ArkDialog.Content>
        </ArkDialog.Positioner>
      </Portal>
    </ArkDialog.Root>
  );
};
