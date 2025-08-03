import React from "react";

import { Button } from "@/components/ui/Button/Button";
import { Dialog } from "@/components/ui/Dialog/Dialog";
import { DialogActions } from "@/components/ui/Dialog/DialogActions";
import { DialogDescription } from "@/components/ui/Dialog/DialogDescription";

type Props = {
  trigger: React.ReactNode;
  onConfirm: () => void;
};

export const FinishConfirmDialog: React.FC<Props> = ({
  trigger,
  onConfirm,
}) => {
  return (
    <Dialog title="エクササイズを終了します" trigger={trigger}>
      <DialogDescription>
        まだ最後まで終了していませんが、本当に終了してもよろしいですか?
      </DialogDescription>
      <DialogActions>
        {(api) => (
          <>
            <Button variant="outlined" onClick={() => api.onClose()}>
              キャンセル
            </Button>
            <Button
              onClick={() => {
                onConfirm();
                api.onClose();
              }}
            >
              終了する
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
};
