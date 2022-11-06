import { Alert, Snackbar } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectAlert } from "../../store/reducers/alerts.slice";

const AlertBar: FC = () => {
  const alert = useSelector(selectAlert);
  const [open, setOpen] = useState<boolean>();

  useEffect(() => {
    if (alert.message) {
      setOpen(true);
    }
  }, [alert]);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={open}
      autoHideDuration={4000}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity={alert.type ?? "error"}
        sx={{ width: "100%" }}
      >
        {alert.message}
      </Alert>
    </Snackbar>
  );
};

export default AlertBar;
