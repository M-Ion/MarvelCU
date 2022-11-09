import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { FC, SetStateAction } from "react";

type Props = {
  action: Function;
  context: string;
  open: boolean;
  setOpen: (value: SetStateAction<boolean>) => void;
  title: string;
};

const DialogWindow: FC<Props> = ({ open, setOpen, context, title, action }) => {
  const handleClose = () => {
    setOpen(false);
  };

  const handleAction = async () => {
    await action();
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {context}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Disagree</Button>
        <Button onClick={handleAction} autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogWindow;
