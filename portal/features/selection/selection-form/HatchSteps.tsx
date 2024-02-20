import React from "react";
import {
  Box,
  Grid,
  Typography,
  Tooltip,
  TooltipProps,
  tooltipClasses,
} from "@mui/material";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { HatcheryDropdown } from "@/features/hatchery";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Selection } from "@/models";
import { styled } from "@mui/material/styles";
import { useGetStagesQuery } from "@/features/stage/services";

type Inputs = Partial<Selection>;

const schema = yup.object({});

const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}));

export const HatchSteps = () => {
  const { data: stageData } = useGetStagesQuery({});

  const {
    handleSubmit: handleSubmit,
    control: control,
    setValue,
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {};

  return (
    <Box>
      <Grid container direction="row" spacing={10}>
        <Grid item xs={5}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name={"hatchery"}
              control={control}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <HatcheryDropdown
                  onChange={(_, data) => {
                    onChange(data);
                    setValue("name", "");
                  }}
                  value={value}
                  error={!!error?.message}
                  helperText={error?.message}
                />
              )}
            />
          </form>
        </Grid>
        <Grid item xs={7}>
          <Typography color="text.primary" sx={{ fontWeight: 700 }}>
            Previous Steps
          </Typography>
          <Box>
            <ul className="steps steps-5">
              {stageData &&
                stageData.results?.map((e, i) => (
                  <li key={i}>
                    <a href="#" title="">
                      <LightTooltip title={`Step ${e.order} ${e.name}`}>
                        <Box>
                          <Typography
                            variant="subtitle2"
                            sx={{ fontWeight: 700 }}
                          >
                            Step {e.order}
                          </Typography>
                          <Typography variant="caption" noWrap>
                            {e.name}
                          </Typography>
                        </Box>
                      </LightTooltip>
                    </a>
                  </li>
                ))}
              {/* current */}
            </ul>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
