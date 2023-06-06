import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Dialog, Slide, Container } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenModal({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose?: () => void;
  children?: React.ReactElement;
}) {
  const handleClose = React.useCallback(
    () => (onClose != undefined ? onClose() : null),
    [onClose]
  );
  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <Container>{children}</Container>
    </Dialog>
  );
}
