import { IconButton } from "@mui/material";
import IconClose from "@mui/icons-material/Close";
import { SnackbarProvider, useSnackbar } from "notistack";

export default function SnackbarCloseButton({ key }: { key: any }) {
  const { closeSnackbar } = useSnackbar();

  return (
    <IconButton onClick={() => closeSnackbar(key)}>
      <IconClose sx={{ color: "#fff" }} />
    </IconButton>
  );
}
