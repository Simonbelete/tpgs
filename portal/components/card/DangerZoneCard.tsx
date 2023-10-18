import React from "react";
import {
  Card,
  Divider,
  Typography,
  Stack,
  useTheme,
  Button,
  Box,
} from "@mui/material";
import ManageHistoryIcon from "@mui/icons-material/ManageHistory";
import LoadingButton from "@mui/lab/LoadingButton";

const DangerZoneCard = ({
  onViewHistories,
  onDeactivate,
  onActivate,
  onDelete,
  isUpdating,
  isDeleting,
  is_active,
  children,
}: {
  onViewHistories: () => void;
  onDeactivate: () => void;
  onActivate: () => void;
  onDelete: () => void;
  isUpdating: boolean;
  isDeleting: boolean;
  is_active?: boolean;
  children?: React.ReactNode;
}) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        px: 1,
        py: 2,
        boxShadow:
          "rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px",
        background: "#fff",
        borderRadius: "6px",
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: theme.palette.error.main,
      }}
    >
      <Stack
        divider={<Divider orientation="horizontal" flexItem />}
        spacing={1}
      >
        {children}

        <Stack direction={"row"} justifyContent="space-between" spacing={1}>
          <Typography component="span" gutterBottom={true}>
            <Typography variant="body2" fontWeight={600}>
              Histories
            </Typography>
            <Typography
              variant="caption"
              color="text.light"
              sx={{ lineHeight: 0 }}
            >
              Active changes made.
            </Typography>
          </Typography>
          <Box>
            <Button
              variant="outlined"
              size="small"
              onClick={onViewHistories}
              startIcon={<ManageHistoryIcon fontSize="small" />}
            >
              View
            </Button>
          </Box>
        </Stack>
        <Stack direction={"row"} justifyContent="space-between" spacing={1}>
          {is_active ? (
            <>
              <Typography component="span" gutterBottom={true}>
                <Typography variant="body2" fontWeight={600}>
                  Deactivate
                </Typography>
                <Typography
                  variant="caption"
                  color="text.light"
                  sx={{ lineHeight: 0 }}
                >
                  Change the visibility of the record.
                </Typography>
              </Typography>
              <Box>
                <LoadingButton
                  loading={isUpdating}
                  loadingIndicator="Deactivating..."
                  variant="outlined"
                  color="warning"
                  size="small"
                  onClick={onDeactivate}
                >
                  Deactivate
                </LoadingButton>
              </Box>
            </>
          ) : (
            <>
              <Typography component="span" gutterBottom={true}>
                <Typography variant="body2" fontWeight={600}>
                  Activate
                </Typography>
                <Typography
                  variant="caption"
                  color="text.light"
                  sx={{ lineHeight: 0 }}
                >
                  Change the visibility of the record.
                </Typography>
              </Typography>
              <Box>
                <LoadingButton
                  loading={isUpdating}
                  loadingIndicator="Activating..."
                  variant="outlined"
                  color="primary"
                  size="small"
                  onClick={onActivate}
                >
                  Activate
                </LoadingButton>
              </Box>
            </>
          )}
        </Stack>
        <Stack direction={"row"} justifyContent="space-between">
          <Typography component="span" gutterBottom={true}>
            <Typography variant="body2" fontWeight={600}>
              Delete
            </Typography>
            <Typography
              variant="caption"
              color="text.light"
              sx={{ lineHeight: 0 }}
            >
              Once you delete this record, there is no recovering it.
            </Typography>
          </Typography>
          <Box>
            <LoadingButton
              loading={isDeleting}
              loadingPosition="start"
              startIcon={<></>}
              variant="outlined"
              color="error"
              size="small"
              onClick={onDelete}
            >
              Delete
            </LoadingButton>
          </Box>
        </Stack>
      </Stack>
    </Card>
  );
};

export default DangerZoneCard;
