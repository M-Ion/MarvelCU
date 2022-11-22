import { Alert, Snackbar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectFeedback } from "../../services/store/slices/feedback.slice";

const FeedbackBar = () => {
  const feedback = useSelector(selectFeedback);
  const [open, setOpen] = useState<boolean>();

  useEffect(() => {
    if (feedback.message) setOpen(true);
  }, [feedback]);

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
        severity={feedback.status ?? "error"}
        sx={{ width: "100%" }}
      >
        {feedback.message}
      </Alert>
    </Snackbar>
  );
};

export default FeedbackBar;
