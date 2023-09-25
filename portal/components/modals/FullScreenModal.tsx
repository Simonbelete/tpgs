import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {
  Dialog,
  Slide,
  Container,
  DialogActions,
  DialogContent,
  DialogTitle,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";

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
  title = 'Create New',
}: {
  title?: string,
  open: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
}) {
  const theme = useTheme();

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
      <AppBar
        sx={{ position: "relative", borderBottom: "1px solid #e3e1e1" }}
        position="static"
        elevation={1}
        color="transparent"
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
      <DialogContent sx={{ background: theme.palette.background.default }}>
        <Container maxWidth="md">{children}</Container>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          variant="outlined"
          color="error"
          autoFocus
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
