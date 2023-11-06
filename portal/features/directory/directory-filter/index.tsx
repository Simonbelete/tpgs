import React, { useCallback, useEffect, useState } from "react";
import { DirectoryDialog } from "@/features/directory";
import { Card } from "@/components";
import {
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { LabeledInput } from "@/components/inputs";
import Image from "next/image";
import { Directory } from "@/models";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import CircularProgress from "@mui/material/CircularProgress";

export interface DirectoryFilterData {
  directories: Directory[];
  start_week: number;
  end_week: number;
}

export const DirectoryFilter = ({
  computedData,
  isLoading,
  onSubmit,
}: {
  onSubmit: (filters: DirectoryFilterData) => void;
  computedData: any[];
  isLoading?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const [data, setData] = useState<DirectoryFilterData>({
    directories: [],
    start_week: 0,
    end_week: 20,
  });

  const handleSelected = (value?: Directory) => {
    setIsOpen(false);
    if (value) {
      setData({
        ...data,
        directories: [...data.directories, value],
      });
    }
  };

  const handleRemoveFilter = (value: Directory) => {
    const newFilters = data.directories.filter(
      (e) => e.unique_id != value.unique_id
    );

    setData({
      ...data,
      directories: newFilters,
    });
  };

  const handleGenerate = useCallback(() => {
    onSubmit(data);
  }, [onSubmit]);

  const loadState = (i: number) => {
    if (computedData[i] == null && isLoading) return false;
    return true;
  };

  return (
    <>
      <DirectoryDialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        onSelected={handleSelected}
      />
      <Card title="Filters">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <LabeledInput
              size="small"
              value={data.start_week}
              label={"Start Week"}
              placeholder={"Start Week"}
              onChange={(val) => setData({ ...data, start_week: Number(val) })}
            />
          </Grid>
          <Grid item xs={12}>
            <LabeledInput
              size="small"
              value={data.end_week}
              label={"End Week"}
              placeholder={"End Week"}
              onChange={(val) => setData({ ...data, start_week: Number(val) })}
            />
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={2} direction={"row"}>
              <Button
                variant="outlined"
                startIcon={<AddIcon fontSize="small" />}
                size="small"
                onClick={() => setIsOpen(true)}
              >
                Add Filter
              </Button>
              <Button
                variant="contained"
                disableElevation
                size="small"
                onClick={handleGenerate}
              >
                Generate
              </Button>
            </Stack>
          </Grid>
        </Grid>
        <Divider sx={{ mt: 5 }} />

        <Box mt={3}>
          <Stack direction={"column"} spacing={1} divider={<Divider />}>
            {data.directories.map((e, i) => (
              <Stack key={i} direction={"row"} justifyContent={"space-between"}>
                <Stack
                  direction={"row"}
                  divider={
                    <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                      <Image
                        alt="slash_arrow"
                        src="/slash_forward_icon_134959.png"
                        height={18}
                        width={15}
                      />
                    </Box>
                  }
                  spacing={0.5}
                >
                  <Stack direction={"column"}>
                    <Typography
                      variant="caption"
                      fontSize={"0.67rem"}
                      color="text.secondary"
                    >
                      Farm
                    </Typography>
                    <Typography variant="caption" color="text.primary">
                      {e.farm_name}
                    </Typography>
                  </Stack>
                  <Stack direction={"column"}>
                    <Typography
                      variant="caption"
                      fontSize={"0.67rem"}
                      color="text.secondary"
                    >
                      Breed
                    </Typography>
                    <Typography variant="caption" color="text.primary">
                      {e.breed_name}
                    </Typography>
                  </Stack>
                  <Stack direction={"column"}>
                    <Typography
                      variant="caption"
                      fontSize={"0.67rem"}
                      color="text.secondary"
                    >
                      Generation
                    </Typography>
                    <Typography variant="caption" color="text.primary">
                      G{e.generation}
                    </Typography>
                  </Stack>
                  <Stack direction={"column"}>
                    <Typography
                      variant="caption"
                      fontSize={"0.67rem"}
                      color="text.secondary"
                    >
                      Hatchery
                    </Typography>
                    <Typography variant="caption" color="text.primary">
                      {e.hatchery_name}
                    </Typography>
                  </Stack>
                  <Stack direction={"column"}>
                    <Typography
                      variant="caption"
                      fontSize={"0.67rem"}
                      color="text.secondary"
                    >
                      House
                    </Typography>
                    <Typography variant="caption" color="text.primary">
                      {e.house_name}
                    </Typography>
                  </Stack>
                  <Stack direction={"column"}>
                    <Typography
                      variant="caption"
                      fontSize={"0.67rem"}
                      color="text.secondary"
                    >
                      Pen
                    </Typography>
                    <Typography variant="caption" color="text.primary">
                      {e.pen_name}
                    </Typography>
                  </Stack>
                </Stack>
                <Box>
                  {loadState(i) && (
                    <IconButton onClick={() => handleRemoveFilter(e)}>
                      <CloseIcon />
                    </IconButton>
                  )}
                  {!loadState(i) && (
                    <Box sx={{ display: "flex" }}>
                      <CircularProgress size={"20px"} color="secondary" />
                    </Box>
                  )}
                </Box>
              </Stack>
            ))}
          </Stack>
        </Box>
        <Box mt={5}></Box>
      </Card>
    </>
  );
};
