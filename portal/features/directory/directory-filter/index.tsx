import React, { useCallback, useEffect, useState } from "react";
import { DirectoryDialog, DirectoryDropdown } from "@/features/directory";
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
  Dialog,
  DialogTitle,
  DialogContent,
  FormControl,
  DialogActions,
} from "@mui/material";
import { LabeledInput } from "@/components/inputs";
import Image from "next/image";
import { Chicken, Directory } from "@/models";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { FarmDropdown } from "@/features/farms";
import { PenDropdown } from "@/features/pen";
import { HatcheryDropdown } from "@/features/hatchery";
import { ChickenDropdown, GenerationDropdown } from "@/features/chickens";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Dropdown } from "@/components/dropdowns";
import { HouseDropdown } from "@/features/houses";

export interface IndividualFilterProps {
  chicken: Chicken;
  start_week: number;
  end_week: number;
}

type Inputs = Partial<Directory>;
type Inputs2 = IndividualFilterProps;

const sexOptions = [
  { value: null, name: "---" },
  { value: "M", name: "Male" },
  { value: "F", name: "Female" },
];

const schema = yup.object({
  farm: yup.object().required("Farm can not be all"),
  breed: yup.object().nullable(),
  hatchery: yup.object().nullable(),
  sex: yup.object().nullable(),
  house: yup.object().nullable(),
  pen: yup.object().nullable(),
  start_week: yup.number().min(0).required(),
  end_week: yup.number().min(0).required(),
});

const schema2 = yup.object({
  chicken: yup.object().required("Select chicken"),
});

export interface DirectoryFilterData {
  directories: Directory[];
  start_week: number;
  end_week: number;
}

export const DirectoryFilter = ({
  onBatchFilterApply,
  onBatchFilterRemove,
  onIndividualFilterApply,
  onIndividualFilterRemove,
  default_start_week = 0,
  default_end_week = 20,
}: {
  onBatchFilterApply: (data: Directory) => void;
  onBatchFilterRemove: (data: number) => void;
  onIndividualFilterApply: (data: IndividualFilterProps) => void;
  onIndividualFilterRemove: (index: number) => void;
  default_start_week?: number;
  default_end_week?: number;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);

  const handleClose = () => setIsOpen(false);
  const handleClose2 = () => setIsOpen2(false);

  const [batchFilters, setBatchFilters] = useState<Inputs[]>([]);
  const [individualFilters, setIndividualFilters] = useState<
    IndividualFilterProps[]
  >([]);

  const { handleSubmit, control, setError } = useForm<Inputs>({
    defaultValues: {
      start_week: default_start_week,
      end_week: default_end_week,
    },
    // @ts-ignore
    resolver: yupResolver(schema),
  });

  const {
    handleSubmit: handleSubmit2,
    control: control2,
    setError: setError2,
  } = useForm<Inputs2>({
    defaultValues: {
      start_week: default_start_week,
      end_week: default_end_week,
    },
    // @ts-ignore
    resolver: yupResolver(schema2),
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsOpen(false);
    setBatchFilters([...batchFilters, data]);
    onBatchFilterApply(data as Directory);
  };

  const handleBatchFilterRemove = (index: number) => {
    const newFilters = batchFilters.filter((e, i) => index != i);
    setBatchFilters(newFilters);
    onBatchFilterRemove(index);
  };

  const onSubmit2: SubmitHandler<Inputs2> = async (data) => {
    setIsOpen2(false);
    setIndividualFilters([...individualFilters, data]);
    onIndividualFilterApply(data);
  };

  const handleIndividualFilterRemove = (index: number) => {
    const newFilters = individualFilters.filter((e, i) => index != i);
    setIndividualFilters(newFilters);
    onIndividualFilterRemove(index + batchFilters.length);
  };

  return (
    <>
      <Dialog disableEscapeKeyDown open={isOpen2} maxWidth="md" fullWidth>
        <DialogTitle>
          <Stack direction={"row"} justifyContent={"space-between"}>
            <Typography variant="h5" fontWeight={500} color={"text.main"}>
              Add Chicken Filter
            </Typography>
            <IconButton onClick={handleClose2}>
              <CloseIcon />
            </IconButton>
          </Stack>
          <Divider />
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit2(onSubmit2)}>
            <Box component="form" sx={{ display: "flex", flexWrap: "wrap" }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Controller
                    name={"chicken"}
                    control={control2}
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                    }) => (
                      <ChickenDropdown
                        onChange={(_, data) => onChange(data)}
                        value={value}
                        error={!!error?.message}
                        helperText={error?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controller
                    name={"start_week"}
                    control={control2}
                    render={({
                      field: { onChange, value },
                      fieldState: { invalid, isTouched, isDirty, error },
                    }) => (
                      <LabeledInput
                        error={!!error?.message}
                        helperText={error?.message}
                        onChange={onChange}
                        fullWidth
                        size="small"
                        value={value}
                        label={"Start Week"}
                        placeholder={"Start Week"}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controller
                    name={"end_week"}
                    control={control2}
                    render={({
                      field: { onChange, value },
                      fieldState: { invalid, isTouched, isDirty, error },
                    }) => (
                      <LabeledInput
                        error={!!error?.message}
                        helperText={error?.message}
                        onChange={onChange}
                        fullWidth
                        size="small"
                        value={value}
                        label={"End Week"}
                        placeholder={"End Week"}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </Box>
          </form>
        </DialogContent>
        <DialogActions
          sx={{ display: "felx", justifyContent: "space-between" }}
        >
          <Button onClick={handleClose2} color="error">
            Cancel
          </Button>
          <Button
            onClick={() => handleSubmit2(onSubmit2)()}
            variant="contained"
            disableElevation
            size="small"
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog disableEscapeKeyDown open={isOpen} maxWidth="md" fullWidth>
        <DialogTitle>
          <Stack direction={"row"} justifyContent={"space-between"}>
            <Typography variant="h5" fontWeight={500} color={"text.main"}>
              Add Filter
            </Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Stack>
          <Divider />
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box component="form" sx={{ display: "flex", flexWrap: "wrap" }}>
              <Typography variant="caption" mb={2}>
                *Leave empty field will consider all values
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Controller
                    name={"farm"}
                    control={control}
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                    }) => (
                      <FarmDropdown
                        onChange={(_, data) => onChange(data)}
                        value={value}
                        error={!!error?.message}
                        helperText={error?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controller
                    name={"hatchery"}
                    control={control}
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                    }) => (
                      <HatcheryDropdown
                        onChange={(_, data) => onChange(data)}
                        value={value}
                        error={!!error?.message}
                        helperText={error?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controller
                    name={"generation"}
                    control={control}
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                    }) => (
                      <GenerationDropdown
                        onChange={(_, data) => onChange(data)}
                        value={value}
                        error={!!error?.message}
                        helperText={error?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controller
                    name={"sex"}
                    control={control}
                    render={({
                      field: { onChange, value },
                      fieldState: { invalid, isTouched, isDirty, error },
                    }) => (
                      <Dropdown
                        options={sexOptions}
                        dataKey="name"
                        onChange={(_, data) => onChange(data)}
                        value={value}
                        label="Sex"
                        error={!!error?.message}
                        helperText={error?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controller
                    name={"house"}
                    control={control}
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                    }) => (
                      <HouseDropdown
                        onChange={(_, data) => onChange(data)}
                        value={value}
                        error={!!error?.message}
                        helperText={error?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controller
                    name={"pen"}
                    control={control}
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                    }) => (
                      <PenDropdown
                        onChange={(_, data) => onChange(data)}
                        value={value}
                        error={!!error?.message}
                        helperText={error?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controller
                    name={"start_week"}
                    control={control}
                    render={({
                      field: { onChange, value },
                      fieldState: { invalid, isTouched, isDirty, error },
                    }) => (
                      <LabeledInput
                        error={!!error?.message}
                        helperText={error?.message}
                        onChange={onChange}
                        fullWidth
                        size="small"
                        value={value}
                        label={"Start Week"}
                        placeholder={"Start Week"}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controller
                    name={"end_week"}
                    control={control}
                    render={({
                      field: { onChange, value },
                      fieldState: { invalid, isTouched, isDirty, error },
                    }) => (
                      <LabeledInput
                        error={!!error?.message}
                        helperText={error?.message}
                        onChange={onChange}
                        fullWidth
                        size="small"
                        value={value}
                        label={"End Week"}
                        placeholder={"End Week"}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </Box>
          </form>
        </DialogContent>
        <DialogActions
          sx={{ display: "felx", justifyContent: "space-between" }}
        >
          <Button onClick={handleClose} color="error">
            Cancel
          </Button>
          <Button
            onClick={() => handleSubmit(onSubmit)()}
            variant="contained"
            disableElevation
            size="small"
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
      <Card
        title="Filters"
        actions={
          <>
            <Button
              variant="contained"
              startIcon={<AddIcon fontSize="small" />}
              size="small"
              onClick={() => setIsOpen(true)}
              disableElevation
            >
              Flock Filter
            </Button>
            <Button
              variant="outlined"
              startIcon={<AddIcon fontSize="small" />}
              size="small"
              onClick={() => setIsOpen2(true)}
              disableElevation
            >
              Individual
            </Button>
          </>
        }
      >
        <Box mt={3}>
          <Stack direction={"column"} spacing={1} divider={<Divider />}>
            {batchFilters.map((e, i) => (
              <Stack key={i} direction={"row"} justifyContent={"space-between"}>
                <Stack
                  direction={"row"}
                  divider={
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        mt: "13px !important",
                      }}
                    >
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
                      {e.farm ? (e.farm as any).name || 0 : "all"}
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
                      {e.breed ? (e.breed as any).name || 0 : "all"}
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
                      {e.generation ? e.generation || 0 : "all"}
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
                      {e.hatchery ? (e.hatchery as any).name || 0 : "all"}
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
                      {e.house ? (e.house as any).name || 0 : "all"}
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
                      {e.pen ? (e.pen as any).name || 0 : "all"}
                    </Typography>
                  </Stack>
                  <Stack direction={"column"}>
                    <Typography
                      variant="caption"
                      fontSize={"0.67rem"}
                      color="text.secondary"
                    >
                      Sex
                    </Typography>
                    <Typography variant="caption" color="text.primary">
                      {e.sex ? e.sex.name || 0 : "all"}
                    </Typography>
                  </Stack>
                </Stack>
                <Box>
                  <Typography variant="caption" fontWeight={600}>
                    ({e.start_week}, {e.end_week})
                  </Typography>
                </Box>
                <Box>
                  <IconButton onClick={() => handleBatchFilterRemove(i)}>
                    <CloseIcon />
                  </IconButton>
                </Box>
              </Stack>
            ))}
          </Stack>

          <Box mt={3}>
            {individualFilters.map((e, i) => (
              <Stack key={i} direction={"row"} justifyContent={"space-between"}>
                <Typography variant="caption" color="text.primary">
                  {e.chicken ? (e.chicken as any).display_name || 0 : "-"}
                </Typography>
                <Box>
                  <Typography variant="caption" fontWeight={600}>
                    ({e.start_week}, {e.end_week})
                  </Typography>
                </Box>
                <Box>
                  <IconButton onClick={() => handleIndividualFilterRemove(i)}>
                    <CloseIcon />
                  </IconButton>
                </Box>
              </Stack>
            ))}
          </Box>
        </Box>
        <Box mt={5}></Box>
      </Card>
    </>
  );
};
