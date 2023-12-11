import { IconButton } from "@mui/material";
import IconClose from "@mui/icons-material/Close";
import { SnackbarProvider, useSnackbar } from "notistack";

export default function SnackbarCloseButton({ dataKey }: { dataKey: any }) {
  const { closeSnackbar } = useSnackbar();

  return (
    <IconButton onClick={() => closeSnackbar(dataKey)}>
      <IconClose sx={{ color: "#fff" }} />
    </IconButton>
  );
}
