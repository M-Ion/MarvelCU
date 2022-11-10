import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { FC, ReactNode, SetStateAction } from "react";

type Props = {
  children?: ReactNode | ReactNode[];
  open: boolean;
  setOpen: (value: SetStateAction<boolean>) => void;
  title: string;
};

const FormDialog: FC<Props> = ({ open, setOpen, title, children }) => {
  return (
    <Dialog open={open} fullWidth>
      <DialogActions>
        <Button onClick={() => setOpen(false)}>Close</Button>
      </DialogActions>
      {/* <DialogTitle id="alert-dialog-title">{title}</DialogTitle> */}
      <DialogContent>
        <DialogContentText id="alert-dialog-description"></DialogContentText>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default FormDialog;
