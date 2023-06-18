import React from "react";
import { Alert, AlertProps } from "@mui/material";

const Message = ({ children, ...props }: AlertProps) => {
  return <Alert {...props}>{children}</Alert>;
};

export default Message;
