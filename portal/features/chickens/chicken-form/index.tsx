import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { Chicken } from "@/models";
import {
  CancelIcon,
  CreateNewIcon,
  HistoryIcon,
  TabFormLayout,
  Form,
  InfoZone,
  DangerZone,
} from "@/lib/crud";
import { chickenApi } from "../services";
import { hatcheryApi } from "@/features/hatchery/services";
import { penApi } from "@/features/pen/services";
import _ from "lodash";
import { Card } from "@/components";
import { Box, Tabs, Tab, Chip, Alert } from "@mui/material";
import ChickenReductionSelectDialog from "./ChickenReductionModal";
import OffspringList from "./OffspringList";
import SiblingsList from "./SiblingsList";
import EggList from "./EggList";
import WeightList from "./WeightList";
import FeedList from "./FeedList";
import dayjs from "dayjs";
import { ChickenStat } from "../chicken-stat";
import { ChickenStages } from "../chicken-stages";
import { breedApi } from "@/features/breeds/services";
import { houseApi } from "@/features/houses/services";
import { HatcheryForm } from "@/features/hatchery";
import { HouseForm } from "@/features/houses";
import { BreedForm } from "@/features/breeds";
import { PenForm } from "@/features/pen";

const schema = yup.object({
  tag: yup.string().required(),
  sex: yup.object().nullable(),
  sire: yup
    .object()
    .when("generation", {
      is: (val: number) => val >= 1,
      then: (schema) =>
        schema.required("Sire can not be empty for generation above 0"),
      otherwise: (schema) => schema.nullable(),
    })
    .test(
      "is-same-generation",
      "Parent must be of the same generation",
      (value, context) => {
        if (value == null) return true;

        const { dam } = context.parent;
        return (value as Chicken)?.generation == dam?.generation;
      }
    ),
  dam: yup
    .object()
    .when("generation", {
      is: (val: number) => val >= 1,
      then: (schema) =>
        schema.required("Dam can not be empty for generation above 0"),
      otherwise: (schema) => schema.nullable(),
    })
    .test(
      "is-same-generation",
      "Parent must be of the same generation",
      (value, context) => {
        if (value == null) return true;

        const { sire } = context.parent;
        return (value as Chicken)?.generation == sire?.generation;
      }
    ),
  generation: yup
    .number()
    .transform((value) => (Number.isNaN(value) ? null : value))
    .min(0)
    .required("Generation is required")
    .test(
      "is-second-generation-to-parent",
      "Generation is not second inline to parents generation",
      (value, context) => {
        const { dam, sire } = context.parent;

        if (dam == null || sire == null) return true;

        const parents_geneation = (dam as Chicken)?.generation;

        return parents_geneation == value - 1;
      }
    ),
  hatchery: yup.object().nullable(),
  pen: yup.object().nullable(),
  breed: yup.object().required("Breed is required"),
  hatch_date: yup.string().required("Hatch date is required"),
});

const sexOptions = [
  { value: null, name: "---" },
  { value: "M", name: "Male" },
  { value: "F", name: "Female" },
];

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export const ChickenForm = ({
  data,
  shallowRoute = true,
}: {
  data?: Chicken;
  shallowRoute?: boolean;
}) => {
  const [formData, setFormData] = useState<Chicken | undefined>(data);
  const [tab, setTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) =>
    setTab(newValue);

  const handleCreated = (value: Chicken) => {
    setFormData(value);
  };

  return (
    <>
      <TabFormLayout<Chicken>
        id={formData?.id || 0}
        data={formData}
        title="Create Chicken"
        updateEndpoint={chickenApi.endpoints.updateChicken}
        deleteEndpoint={chickenApi.endpoints.deleteChicken}
        summaryEndpoint={chickenApi.endpoints.getChickenSummary}
        menus={
          <>
            {/* <DashboardIcon /> */}
            <CreateNewIcon />
            <HistoryIcon />
            <CancelIcon />
          </>
        }
        rightMenus={
          <>
            {formData && (
              <>
                <InfoZone
                  id={data?.id || 0}
                  summaryEndpoint={chickenApi.endpoints.getChickenSummary}
                />
                <DangerZone
                  id={data?.id || 0}
                  is_active={data?.is_active || false}
                  updateEndpoint={chickenApi.endpoints.updateChicken}
                  deleteEndpoint={chickenApi.endpoints.deleteChicken}
                >
                  <ChickenReductionSelectDialog chicken={formData} />
                </DangerZone>
              </>
            )}
          </>
        }
      >
        {formData && (
          <>
            {/* <Box sx={{ width: "100%", mb: 2 }}>
              <ChickenStages data={formData} />
            </Box> */}
            <Box sx={{ mb: 2 }}>
              <ChickenStat data={formData} />
            </Box>
          </>
        )}

        <Tabs
          value={tab}
          onChange={handleTabChange}
          aria-label="basic tabs example"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="Pedigree" {...a11yProps(0)} />
          {formData && <Tab label="Siblings" {...a11yProps(3)} />}
          {formData && <Tab label="Offspring" {...a11yProps(1)} />}
          {formData && <Tab label="Egg Production" {...a11yProps(1)} />}
          {formData && <Tab label="Body Weight" {...a11yProps(1)} />}
          {formData && <Tab label="Feed Intake" {...a11yProps(1)} />}
        </Tabs>
        <Box sx={{ pt: 5 }}>
          {tab == 0 && (
            <>
              {formData && formData.reduction_date && (
                <Alert severity="info" sx={{ mb: 3 }}>
                  {dayjs(formData?.reduction_date).isValid()
                    ? dayjs(formData?.reduction_date).format(
                        process.env.NEXT_PUBLIC_DATE_FORMAT
                      )
                    : "-"}{" "}
                  ({formData.reduction_in_weeks} Week) —{" "}
                  {_.get(formData.reduction_reason, "name", "")}
                </Alert>
              )}

              <Card title="Chicken">
                <Form<Chicken>
                  data={
                    formData
                      ? ({
                          ...formData,
                          sex: _.find(sexOptions, { value: formData?.sex }),
                        } as any)
                      : undefined
                  }
                  schema={schema}
                  shallowRoute={shallowRoute}
                  createEndpoint={chickenApi.endpoints.createChicken}
                  updateEndpoint={chickenApi.endpoints.updateChicken}
                  beforeSubmit={(values: Partial<Chicken>) => {
                    const cleaned_data: Partial<Chicken> = {
                      id: values.id,
                      tag: values.tag,
                      sex: _.get(values, "sex.value", null),
                      sire: _.get(values, "sire.id", null),
                      dam: _.get(values, "dam.id", null),
                      hatchery: _.get(values, "hatchery.id", null),
                      pen: _.get(values, "pen.id", null),
                      hatch_date:
                        values.hatch_date &&
                        dayjs(values.hatch_date).format(
                          process.env.NEXT_PUBLIC_API_DATE_FORMAT
                        ),
                      generation: values.generation,
                      color: values.color,
                      breed: _.get(values, "breed.id", null),
                    };

                    return cleaned_data;
                  }}
                  fields={{
                    tag: { label: "Tag", placeholder: "Tag", xs: 12, md: 6 },
                    sex: {
                      label: "Sex",
                      placeholder: "Sex",
                      options: sexOptions,
                      dataKey: "value",
                      xs: 12,
                      md: 6,
                    },
                    hatch_date: {
                      label: "Hatch Date",
                      placeholder: "Hatch Date",
                      type: "date",
                      xs: 12,
                      md: 6,
                    },
                    breed: {
                      label: "Breed",
                      placeholder: "Select Breed",
                      endpoint: breedApi.endpoints.getBreeds,
                      xs: 12,
                      md: 6,
                      viewForm: BreedForm,
                    },
                    generation: {
                      label: "Generation",
                      placeholder: "Generation",
                      xs: 12,
                      md: 6,
                      type: "number",
                    },
                    hatchery: {
                      label: "Hatch / Batch",
                      placeholder: "Select Hatch / Batch",
                      endpoint: hatcheryApi.endpoints.getStage1Hatchery,
                      xs: 12,
                      md: 6,
                      viewForm: HatcheryForm,
                    },
                    sire: {
                      label: "Sire",
                      placeholder: "Select Sire",
                      endpoint: chickenApi.endpoints.getMaleChickens,
                      // creatable: {
                      //   field: "tag",
                      //   endpoint: chickenApi.endpoints.createChicken,
                      //   defaults: { sex: "M" },
                      // },
                      dataKey: "display_name",
                      xs: 12,
                      md: 6,
                      viewForm: ChickenForm,
                    },
                    dam: {
                      label: "Dam",
                      placeholder: "Select Dam",
                      endpoint: chickenApi.endpoints.getFeMaleChickens,
                      // creatable: {
                      //   field: "tag",
                      //   endpoint: chickenApi.endpoints.createChicken,
                      //   defaults: { sex: "F" },
                      // },
                      dataKey: "display_name",
                      xs: 12,
                      md: 6,
                      viewForm: ChickenForm,
                    },
                    house: {
                      label: "House",
                      placeholder: "House",
                      endpoint: houseApi.endpoints.getHouses,
                      xs: 12,
                      md: 6,
                      viewForm: HouseForm,
                    },
                    pen: {
                      label: "Pen",
                      placeholder: "Select Pen",
                      endpoint: penApi.endpoints.getPens,
                      xs: 12,
                      md: 6,
                      viewForm: PenForm,
                    },

                    color: {
                      label: "Color",
                      placeholder: "Color",
                      xs: 12,
                      md: 6,
                    },
                  }}
                  onCreateSuccess={handleCreated}
                />
              </Card>
            </>
          )}

          {formData && tab == 1 && <SiblingsList data={formData} />}
          {formData && tab == 2 && <OffspringList data={formData} />}
          {formData && tab == 3 && <EggList data={formData} />}
          {formData && tab == 4 && <WeightList data={formData} />}
          {formData && tab == 5 && <FeedList data={formData} />}
        </Box>
      </TabFormLayout>
    </>
  );
};
