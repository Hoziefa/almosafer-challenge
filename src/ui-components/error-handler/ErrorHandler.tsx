import React from "react";
import { Alert, Snackbar } from "@mui/material";

type ErrorHandlerProps = {
  isOpen: boolean;
  message: string;
  duration?: number;
};

function ErrorHandler(props: ErrorHandlerProps) {
  return (
    <Snackbar open={ props.isOpen } autoHideDuration={ props.duration ?? 2000 } anchorOrigin={ { vertical: "bottom", horizontal: "center" } }>
      <Alert severity="error" sx={ { width: "100%" } }>
        { props.message }
      </Alert>
    </Snackbar>
  );
}

export default ErrorHandler;
