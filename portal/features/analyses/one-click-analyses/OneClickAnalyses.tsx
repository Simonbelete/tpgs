import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Grid,
  Button,
  Box,
  Dialog,
  DialogTitle,
  Stack,
  IconButton,
  Divider,
  DialogContent,
  DialogActions,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Card } from "@/components";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import * as yup from "yup";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import CloseIcon from "@mui/icons-material/Close";
import { Chicken, Directory, Farm, DirectoryFilterData, Breed } from "@/models";
import { FarmDropdown } from "@/features/farms";
import { PenDropdown } from "@/features/pen";
import { HatcheryDropdown } from "@/features/hatchery";
import { ChickenDropdown, GenerationDropdown } from "@/features/chickens";
import { BreedDropdown, BreedForm } from "@/features/breeds";
import { Dropdown } from "@/components/dropdowns";
import { HouseDropdown } from "@/features/houses";
import { LabeledInput } from "@/components/inputs";
import Image from "next/image";
import _ from "lodash";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  defaultTenantInterceptor,
  tenantInterceptor,
  instance as axiosInstance,
} from "@/services/client";

type Inputs = Partial<Directory>;

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

const sexOptions = [
  { value: null, name: "---" },
  { value: "M", name: "Male" },
  { value: "F", name: "Female" },
];

const OneClickAnalyses = () => {
  const [expanded, setExpanded] = useState<string | false>(false);
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const [filters, setFilters] = useState<Inputs[]>([]);
  const [currentFarm, setcurrentFarm] = useState<Farm | null>();

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const { handleSubmit, control, setError, clearErrors, reset, getValues } =
    useForm<Inputs>({
      defaultValues: {
        start_week: 0,
        end_week: 10,
      },
      // @ts-ignore
      resolver: yupResolver(schema),
    });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setOpenFilter(false);
    setFilters([...filters, data]);
  };

  const removeFilter = (index: number) => {
    const filtered = filters.filter((e, i) => index != i);
    setFilters(filtered);
    setExpanded(false);
  };

  useEffect(() => {
    if (currentFarm != null) {
      clearErrors("farm");
      axiosInstance.interceptors.request.eject(tenantInterceptor);
      axiosInstance.defaults.headers["x-Request-Id"] = currentFarm.name;
    } else {
      setError("farm", { message: "Select a valid farm" });
    }
  }, [currentFarm]);

  return (
    <>
      <Dialog disableEscapeKeyDown open={openFilter} maxWidth="md" fullWidth>
        <DialogTitle>
          <Stack direction={"row"} justifyContent={"space-between"}>
            <Typography variant="h5" fontWeight={500} color={"text.main"}>
              Add Filter
            </Typography>
            <IconButton onClick={() => setOpenFilter(!openFilter)}>
              <CloseIcon />
            </IconButton>
          </Stack>
          <Divider />
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
              <Typography variant="caption" mb={2}>
                *Leaving field empty will consider all values
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
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
                          setcurrentFarm(data);
                        }}
                        value={value}
                        error={!!error?.message}
                        helperText={error?.message}
                      />
                    )}
                  />
                </Grid>
                {currentFarm && (
                  <>
                    <Grid item xs={12} md={4}>
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

                    <Grid item xs={12} md={4}>
                      <Controller
                        name={"breed"}
                        control={control}
                        render={({
                          field: { onChange, value },
                          fieldState: { error },
                        }) => (
                          <BreedDropdown
                            disabled={getValues("farm") == null ? true : false}
                            onChange={(_, data) => onChange(data)}
                            value={value}
                            error={!!error?.message}
                            helperText={error?.message}
                            viewForm={
                              // @ts-ignore
                              <BreedForm data={value} shallowRoute={false} />
                            }
                          />
                        )}
                      />
                    </Grid>

                    <Grid item xs={12} md={4}>
                      <Controller
                        name={"hatchery"}
                        control={control}
                        render={({
                          field: { onChange, value },
                          fieldState: { error },
                        }) => (
                          <HatcheryDropdown
                            disabled={getValues("farm") == null ? true : false}
                            onChange={(_, data) => onChange(data)}
                            value={value}
                            error={!!error?.message}
                            helperText={error?.message}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
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
                    <Grid item xs={12} md={4}>
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
                    <Grid item xs={12} md={4}>
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
                  </>
                )}
              </Grid>
            </Box>
          </form>
        </DialogContent>
        <DialogActions
          sx={{ display: "felx", justifyContent: "space-between" }}
        >
          <Button onClick={() => setOpenFilter(!openFilter)} color="error">
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
      <Box display={"flex"} flexDirection={"column"} gap={10}>
        <Grid container>
          <Grid item xs={5}>
            <Card
              title="Filters"
              actions={
                <>
                  <Button
                    size="small"
                    variant="text"
                    startIcon={<FilterAltIcon />}
                    onClick={() => setOpenFilter(true)}
                  >
                    Add filter
                  </Button>
                </>
              }
            >
              <Box>
                <Stack direction={"column"} spacing={1} divider={<Divider />}>
                  {filters.map((e, i) => (
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
                        {e.breed && (
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
                        )}
                        {e.generation && (
                          <Stack direction={"column"}>
                            <Typography
                              variant="caption"
                              fontSize={"0.67rem"}
                              color="text.secondary"
                            >
                              Generation
                            </Typography>
                            <Typography variant="caption" color="text.primary">
                              {_.get(e.generation, "generation", "all")}
                            </Typography>
                          </Stack>
                        )}

                        {e.hatchery && (
                          <Stack direction={"column"}>
                            <Typography
                              variant="caption"
                              fontSize={"0.67rem"}
                              color="text.secondary"
                            >
                              Hatchery
                            </Typography>
                            <Typography variant="caption" color="text.primary">
                              {e.hatchery
                                ? (e.hatchery as any).name || 0
                                : "all"}
                            </Typography>
                          </Stack>
                        )}
                        {e.house && (
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
                        )}
                        {e.pen && (
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
                        )}
                        {e.sex && (
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
                        )}
                      </Stack>
                      <Box>
                        <IconButton onClick={() => removeFilter(i)}>
                          <CloseIcon />
                        </IconButton>
                      </Box>
                    </Stack>
                  ))}
                </Stack>
              </Box>
            </Card>
          </Grid>
        </Grid>
        <Accordion
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography sx={{ width: "33%", flexShrink: 0 }}>
              General settings
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
              I am an accordion
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Nulla facilisi. Phasellus sollicitudin nulla et quam mattis
              feugiat. Aliquam eget maximus est, id dignissim quam.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    </>
  );
};

export default OneClickAnalyses;
