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
  const { handleSubmit: handleSubmit, control: control } = useForm<Inputs>({
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
                  onChange={(_, data) => onChange(data)}
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
          <LightTooltip title="Add">
            <Typography>Step 1</Typography>
          </LightTooltip>
          <Box>
            <ul className="steps steps-5">
              <li>
                <a href="#" title="">
                  <LightTooltip title="Step 1">
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                        Step 1
                      </Typography>
                      <Typography variant="caption" noWrap>
                        Et nequ a quam turpis duisi
                      </Typography>
                    </Box>
                  </LightTooltip>
                </a>
              </li>
              <li>
                <a href="#" title="">
                  <LightTooltip
                    title="Step 1
                  Et nequ a quam turpis duisi
                  "
                  >
                    <>
                      <Typography>Step 1</Typography>
                      <Typography variant="caption" noWrap>
                        Et nequ a quam turpis duisi
                      </Typography>
                    </>
                  </LightTooltip>
                </a>
              </li>
              <li className="current">
                <a href="#" title="">
                  <LightTooltip
                    title="Step 1
                  Et nequ a quam turpis duisi
                  "
                  >
                    <>
                      <Typography>Step 1</Typography>
                      <Typography variant="caption" noWrap>
                        Et nequ a quam turpis duisi
                      </Typography>
                    </>
                  </LightTooltip>
                </a>
              </li>
              <li>
                <a href="#" title="">
                  <LightTooltip
                    title="Step 1
                  Et nequ a quam turpis duisi
                  "
                  >
                    <>
                      <Typography>Step 1</Typography>
                      <Typography variant="caption" noWrap>
                        Et nequ a quam turpis duisi
                      </Typography>
                    </>
                  </LightTooltip>
                </a>
              </li>
            </ul>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
