import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React, { FC, SetStateAction } from "react";

interface ConfirmDialogProps {
  fnc: Function;
  context: string;
  title: string;
  openState: [boolean, (value: SetStateAction<boolean>) => void];
}

const ConfirmDialog: FC<ConfirmDialogProps> = ({
  openState,
  fnc,
  context,
  title,
}) => {
  const [open, setOpen] = openState;

  const handleClose = () => {
    setOpen(false);
  };

  const doFunction = async () => {
    await fnc();
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{context}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Disagree</Button>
        <Button onClick={doFunction} autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
