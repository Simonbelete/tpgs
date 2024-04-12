import React, { useCallback, useEffect, useState } from "react";
import {
  Card,
  Divider,
  Typography,
  Stack,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ManageHistoryIcon from "@mui/icons-material/ManageHistory";
import LoadingButton from "@mui/lab/LoadingButton";
import { useGroup } from "@/hooks";

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
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const { isSuperUser, isAdmin, isFarmer } = useGroup();

  const handleDelete = useCallback(() => {
    handleClose();
    onDelete();
  }, [onDelete]);

  return (
    <>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete permanently?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to permanently delete this, Once you delete
            this record, there is no recovering it.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDelete} autoFocus color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
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
                    Archive
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
                    loadingIndicator="Archiving..."
                    variant="outlined"
                    color="warning"
                    size="small"
                    onClick={onDeactivate}
                  >
                    Archive
                  </LoadingButton>
                </Box>
              </>
            ) : (
              <>
                <Typography component="span" gutterBottom={true}>
                  <Typography variant="body2" fontWeight={600}>
                    Unarchive
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
                    loadingIndicator="Unarchiving..."
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
          {(isSuperUser || isAdmin) && (
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
                  onClick={handleOpen}
                >
                  Delete
                </LoadingButton>
              </Box>
            </Stack>
          )}
        </Stack>
      </Card>
    </>
  );
};

export default DangerZoneCard;
