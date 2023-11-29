import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { Chicken } from "@/models";
import {
  CancelIcon,
  CreateNewIcon,
  FormLayout,
  HistoryIcon,
  TabFormLayout,
  DashboardIcon,
  Form,
  InfoZone,
  DangerZone,
} from "@/lib/crud";
import { chickenApi } from "../services";
import { hatcheryApi } from "@/features/hatchery/services";
import { penApi } from "@/features/pen/services";
import _ from "lodash";
import { Card } from "@/components";
import { Box, Tabs, Tab, tabsClasses, Chip } from "@mui/material";
import ChickenReductionSelectDialog from "./ChickenReductionModal";
import OffspringList from "./OffspringList";
import SiblingsList from "./SiblingsList";

const schema = yup.object({
  tag: yup.string().required(),
  sex: yup.string().nullable(),
  sire: yup.object().nullable(),
  dam: yup.object().nullable(),
  hatchery: yup.object().nullable(),
  pen: yup.object().nullable(),
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

  const cleanData = (values: Partial<Chicken>): Partial<Chicken> => {
    return values;
  };

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
            <DashboardIcon />
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
        <Tabs
          scrollButtons
          value={tab}
          onChange={handleTabChange}
          aria-label="basic tabs example"
          sx={{
            [`& .${tabsClasses.scrollButtons}`]: {
              "&.Mui-disabled": { opacity: 0.3 },
            },
          }}
        >
          <Tab label="Detail" {...a11yProps(0)} />
          {formData && <Tab label="Siblings" {...a11yProps(3)} />}
          {formData && <Tab label="Offspring" {...a11yProps(1)} />}
        </Tabs>
        <Box sx={{ pt: 5 }}>
          {tab == 0 && (
            <Card title="Chicken Form">
              <Form<Chicken>
                data={data}
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
                  };

                  return cleaned_data;
                }}
                fields={{
                  tag: { label: "Tag", placeholder: "Tag", xs: 12, md: 6 },
                  sex: {
                    label: "Sex",
                    placeholder: "Sex",
                    options: sexOptions,
                    xs: 12,
                    md: 6,
                  },
                  sire: {
                    label: "Sire",
                    placeholder: "Select Sire",
                    endpoint: chickenApi.endpoints.getMaleChickens,
                    xs: 12,
                    md: 6,
                  },
                  dam: {
                    label: "Dam",
                    placeholder: "Select Dam",
                    endpoint: chickenApi.endpoints.getFeMaleChickens,
                    xs: 12,
                    md: 6,
                  },
                  hatchery: {
                    label: "Hatchery",
                    placeholder: "Select Hatchery",
                    endpoint: hatcheryApi.endpoints.getHatchery,
                    xs: 12,
                    md: 6,
                  },
                  pen: {
                    label: "Pen",
                    placeholder: "Select Pen",
                    endpoint: penApi.endpoints.getPens,
                    xs: 12,
                    md: 6,
                  },
                }}
              />
            </Card>
          )}

          {formData && tab == 1 && <SiblingsList data={formData} />}
          {formData && tab == 2 && <OffspringList data={formData} />}
        </Box>
      </TabFormLayout>
    </>
  );
};
