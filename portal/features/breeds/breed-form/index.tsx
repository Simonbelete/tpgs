import React, { useState } from "react";
import * as yup from "yup";
import { Breed } from "@/models";
import {
  CancelIcon,
  CreateNewIcon,
  HistoryIcon,
  TabFormLayout,
  Form,
} from "@/lib/crud";
import { Box, Tabs, Tab, tabsClasses } from "@mui/material";
import { Card } from "@/components";
import { breedApi } from "../services";
import BreedWeightGuideline from "./BreedWeightGuideline";

const schema = yup.object({
  name: yup.string().required(),
});

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export const BreedForm = ({
  data,
  shallowRoute = true,
}: {
  data?: Breed;
  shallowRoute?: boolean;
}) => {
  const [formData, setFormData] = useState<Breed | undefined>(data);
  const [tab, setTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) =>
    setTab(newValue);

  const handleCreated = (value: Breed) => {
    setFormData(value);
  };

  return (
    <>
      <TabFormLayout
        id={formData?.id || 0}
        data={formData}
        title="Breed"
        updateEndpoint={breedApi.endpoints.updateBreed}
        deleteEndpoint={breedApi.endpoints.deleteBreed}
        summaryEndpoint={breedApi.endpoints.getBreedSummary}
        menus={
          <>
            <CreateNewIcon />
            <HistoryIcon />
            <CancelIcon />
          </>
        }
      >
        <Tabs
          allowScrollButtonsMobile
          value={tab}
          onChange={handleTabChange}
          aria-label="basic tabs example"
          sx={{
            [`& .${tabsClasses.scrollButtons}`]: {
              "&.Mui-disabled": { opacity: 0.3 },
            },
          }}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="Detail" {...a11yProps(0)} />
          {formData && (
            <Tab
              label="Body Weight Guideline"
              iconPosition="end"
              {...a11yProps(1)}
            />
          )}
          {formData && (
            <Tab
              label="Feed Intake Guideline"
              iconPosition="end"
              {...a11yProps(1)}
            />
          )}
          {formData && (
            <Tab
              label="Egg Production Guideline"
              iconPosition="end"
              {...a11yProps(1)}
            />
          )}
          {formData && (
            <Tab label="HDEP Guideline" iconPosition="end" {...a11yProps(1)} />
          )}
          {formData && (
            <Tab label="HHEP Guideline" iconPosition="end" {...a11yProps(1)} />
          )}
        </Tabs>
        <Box sx={{ pt: 5 }}>
          {tab == 0 && (
            <Card title="Breed">
              <Form<Breed>
                data={data}
                schema={schema}
                shallowRoute={shallowRoute}
                createEndpoint={breedApi.endpoints.createBreed}
                updateEndpoint={breedApi.endpoints.updateBreed}
                beforeSubmit={(values: Partial<Breed>) => {
                  const cleaned_data: Partial<Breed> = {
                    id: values.id,
                    name: values.name,
                  };

                  return cleaned_data;
                }}
                fields={{
                  name: { label: "Name", placeholder: "Name", xs: 12, md: 12 },
                }}
              />
            </Card>
          )}
          {formData && tab == 1 && <BreedWeightGuideline data={formData} />}
        </Box>
      </TabFormLayout>
    </>
  );
};
