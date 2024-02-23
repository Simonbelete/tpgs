import React, { useState } from "react";
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  Typography,
  Paper,
  Stack,
  Divider,
  Grid,
  Alert,
  AlertTitle,
} from "@mui/material";
import { HatchSelect } from "./HatchSelect";
import { ChickenSelect } from "./ChickenSelect";
import { StageSelect } from "./StageSelect";
import { StatusInfo } from "./StatusInfo";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import ReductionReasonSelect from "./ReductionReasonSelect";
import { useCreateHatcheryMutation } from "@/features/hatchery/services";
import { Hatchery } from "@/models";
import _ from "lodash";
import dayjs from "dayjs";

const steps = [
  {
    label: "Select campaign settings",
    description: `Select hatch`,
    component: StageSelect, //HatchSteps,
  },
  {
    label: "Create an ad group",
    description:
      "An ad group contains one or more ads which target a shared set of keywords.",
    component: HatchSelect,
  },
  {
    label: "Create an ad",
    description: `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`,
    component: ChickenSelect,
  },
  {
    label: "Create an ads group",
    description:
      "An ad group contains one or more ads which target a shared set of keywords.",
    component: ReductionReasonSelect,
  },
];

export const SelectionForm = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const selection = useSelector((state: RootState) => state.selection);

  const [createHatchery, { error }] = useCreateHatcheryMutation();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const isNextButtonActive = () => {
    if (activeStep == 0 && selection.stage != null) return true;
    return true;
  };

  const handleSubmit = async () => {
    const body: Partial<Hatchery> = {
      name: selection.name,
      stage: _.get(selection.stage, "id", null) as any,
      selected_from: _.map((selection?.selected_from || []) as any, "id"),
      selected_chickens: selection.selected_chickens || [],
      unselected_chickens: selection.unselected_chickens || [],
      reduction_date: dayjs(selection.reduction_date).format(
        process.env.NEXT_PUBLIC_API_DATE_FORMAT
      ),
      reduction_reason: _.get(selection.reduction_reason, "id", null),
      generation: selection.generation,
    };
    const response = await createHatchery(body);
  };

  return (
    <Grid container gap={2} direction={"row"}>
      <Grid item xs={7.5} sx={{ minWidth: 400 }}>
        {error && Object.keys((error as any).data).length != 0 ? (
          <Alert severity="error" sx={{ mb: 3 }}>
            <AlertTitle>Error</AlertTitle>
            {Object.keys((error as any).data).map((key, index) => {
              return (
                <div key={index}>
                  <strong>
                    {key.replace("_", " ").charAt(0).toUpperCase() +
                      key.replace("_", " ").slice(1)}
                  </strong>{" "}
                  — {/* @ts-ignore */}
                  {error.data[key][0]}s
                </div>
              );
            })}
          </Alert>
        ) : (
          <></>
        )}
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel
                optional={
                  index === 2 ? (
                    <Typography variant="caption">Last step</Typography>
                  ) : null
                }
              >
                {step.label}
              </StepLabel>
              <StepContent>
                <Typography variant="caption" color={"text.secondary"}>
                  {step.description}
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <step.component />
                </Box>
                <Box sx={{ mb: 2 }}>
                  <div>
                    {index === steps.length - 1 ? (
                      <Button
                        variant="contained"
                        onClick={handleSubmit}
                        sx={{ mt: 1, mr: 1 }}
                        disabled={!isNextButtonActive()}
                      >
                        Finish
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        onClick={handleNext}
                        sx={{ mt: 1, mr: 1 }}
                        disabled={!isNextButtonActive()}
                      >
                        Continue
                      </Button>
                    )}

                    <Button
                      disabled={index === 0}
                      onClick={handleBack}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      Back
                    </Button>
                  </div>
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} sx={{ p: 3 }}>
            <Typography>All steps completed - you&apos;re finished</Typography>
            <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
              Reset
            </Button>
          </Paper>
        )}
      </Grid>
      <Divider orientation="vertical" variant="middle" flexItem />

      <Grid item xs={4}>
        <StatusInfo />
      </Grid>
    </Grid>
  );
};
