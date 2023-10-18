import { DangerZoneCard } from "@/components";
import React, { useState } from "react";
import { Typography, Stack, Box } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  useDeleteChickenMutation,
  useUpdateChickenMutation,
} from "../services";
import { useRouter } from "next/router";
import { useCRUD } from "@/hooks";

const ChickenDangerZone = ({
  id,
  is_active,
}: {
  id: number;
  is_active: boolean;
}) => {
  const router = useRouter();
  const [updateChicken, updateResult] = useUpdateChickenMutation();
  const [deleteChicken, deleteResult] = useDeleteChickenMutation();

  const removeChicken = async () => {
    await updateChicken({ id: id });
  };

  const handleToggleActive = async (value: boolean) =>
    await updateChicken({ id: id, is_active: value });
  const handleDelete = async () =>
    await deleteChicken(id).then(() => router.push("/chickens"));

  const useCRUDHook = useCRUD({
    results: [updateResult],
  });

  return (
    <DangerZoneCard
      onViewHistories={() => router.push(`/chickens/${id}/histories`)}
      onDeactivate={() => handleToggleActive(false)}
      onActivate={() => handleToggleActive(true)}
      onDelete={handleDelete}
      isUpdating={updateResult.isLoading}
      isDeleting={deleteResult.isLoading}
      is_active={
        updateResult.data == undefined ? is_active : updateResult.data.is_active
      }
    >
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
    </DangerZoneCard>
  );
};

export default ChickenDangerZone;
