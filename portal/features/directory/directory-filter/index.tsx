import React, { useCallback, useEffect, useState } from "react";
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
  Badge,
} from "@mui/material";
import { LabeledInput } from "@/components/inputs";
import Image from "next/image";
import { Chicken, Directory, Farm, DirectoryFilterData } from "@/models";
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
import {
  defaultTenantInterceptor,
  tenantInterceptor,
  instance as axiosInstance,
} from "@/services/client";
import { useDispatch } from "react-redux";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

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

export const DirectoryFilter = ({
  onBatchFilterApply,
  onBatchFilterRemove,
  onIndividualFilterApply,
  onIndividualFilterRemove,
  default_start_week = 0,
  default_end_week = 20,
  compact,
  initBatchFilter = [],
}: {
  onBatchFilterApply: (data: Directory, filters?: Inputs[]) => void;
  onBatchFilterRemove: (data: number) => void;
  onIndividualFilterApply: (data: IndividualFilterProps) => void;
  onIndividualFilterRemove: (index: number) => void;
  default_start_week?: number;
  default_end_week?: number;
  compact?: boolean;
  initBatchFilter?: Partial<Directory>[];
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [selectedFarm, setSelectedFarm] = useState<Farm | null>(null);
  const [showCompactFilters, setShowCompactFilters] = useState(false);

  const handleClose = () => setIsOpen(false);
  const handleClose2 = () => setIsOpen2(false);

  const [batchFilters, setBatchFilters] = useState<Inputs[]>(initBatchFilter);
  const [individualFilters, setIndividualFilters] = useState<
    IndividualFilterProps[]
  >([]);

  const { handleSubmit, control, setError, clearErrors, reset } =
    useForm<Inputs>({
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

  useEffect(() => {
    return () => {
      axiosInstance.interceptors.request.use(defaultTenantInterceptor);
      reset();
    };
  }, []);

  useEffect(() => {
    if (selectedFarm != null) {
      clearErrors("farm");
      axiosInstance.interceptors.request.eject(tenantInterceptor);
      axiosInstance.defaults.headers["x-Request-Id"] = selectedFarm.name;
    } else {
      setError("farm", { message: "Select a valid farm" });
    }
  }, [selectedFarm]);

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
          <Button onClick={handleClose2} color="error" size="small">
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
                *Leaving field empty will consider all values
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
                        onChange={(_, data) => {
                          onChange(data);
                          setSelectedFarm(data);
                        }}
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
                        disabled={selectedFarm == null ? true : false}
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
                        disabled={selectedFarm == null ? true : false}
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
                        disabled={selectedFarm == null ? true : false}
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
                        disabled={selectedFarm == null ? true : false}
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
      {compact ? (
        <Box>
          <Stack direction={"row"} justifyContent={"space-between"}>
            <Typography variant="body1" fontWeight={600} color="text.primary">
              Ttitle
            </Typography>
            <Box>
              <IconButton
                size="small"
                onClick={() => setShowCompactFilters(!showCompactFilters)}
                color={showCompactFilters ? "primary" : "secondary"}
              >
                <Badge
                  badgeContent={batchFilters.length + individualFilters.length}
                >
                  <FilterAltIcon fontSize="small" />
                </Badge>
              </IconButton>
              <IconButton size="small" onClick={() => setIsOpen(true)}>
                <AddIcon fontSize="small" />
              </IconButton>
            </Box>
          </Stack>
          <Divider />
          {showCompactFilters && (
            <Box mt={3}>
              <Stack direction={"column"} spacing={1} divider={<Divider />}>
                {batchFilters.map((e, i) => (
                  <Stack
                    key={i}
                    direction={"row"}
                    justifyContent={"space-between"}
                  >
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
                  <Stack
                    key={i}
                    direction={"row"}
                    justifyContent={"space-between"}
                  >
                    <Typography variant="caption" color="text.primary">
                      {e.chicken ? (e.chicken as any).display_name || 0 : "-"}
                    </Typography>
                    <Box>
                      <Typography variant="caption" fontWeight={600}>
                        ({e.start_week}, {e.end_week})
                      </Typography>
                    </Box>
                    <Box>
                      <IconButton
                        onClick={() => handleIndividualFilterRemove(i)}
                      >
                        <CloseIcon />
                      </IconButton>
                    </Box>
                  </Stack>
                ))}
              </Box>
            </Box>
          )}
        </Box>
      ) : (
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
                <Stack
                  key={i}
                  direction={"row"}
                  justifyContent={"space-between"}
                >
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
                <Stack
                  key={i}
                  direction={"row"}
                  justifyContent={"space-between"}
                >
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
      )}
    </>
  );
};
