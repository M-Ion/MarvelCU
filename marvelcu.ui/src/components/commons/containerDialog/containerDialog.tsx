import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import React, { FC, ReactNode, SetStateAction } from "react";

interface ContainerDialogProps {
  children?: ReactNode | ReactNode[];
  openState: [boolean, (value: SetStateAction<boolean>) => void];
}

const ContainerDialog: FC<ContainerDialogProps> = ({ children, openState }) => {
  const [open, setOpen] = openState;

  const handleClose = () => setOpen(false);

  return (
    <Dialog open={open} fullWidth>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};

export default ContainerDialog;
