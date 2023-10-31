import React, { useState } from "react";
import * as yup from "yup";
import { Requirement } from "@/models";
import {
  TabFormLayout,
  CreateNewIcon,
  HistoryIcon,
  CancelIcon,
  Form,
  DashboardIcon,
} from "@/lib/crud";
import { Tabs, Tab, Box, tabsClasses, Chip } from "@mui/material";
import { Card } from "@/components";
import { requirementApi } from "../services";

const schema = yup.object({
  name: yup.string().required(),
});

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export const RequirementForm = ({ data }: { data?: Requirement }) => {
  const [formData, setFormData] = useState<Requirement | undefined>(data);
  const [tab, setTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) =>
    setTab(newValue);

  const cleanData = (values: Partial<Requirement>): Partial<Requirement> => {
    return values;
  };

  const handleCreated = (value: Requirement) => {};

  return (
    <>
      <TabFormLayout<Requirement>
        id={formData?.id || 0}
        data={formData}
        title="Create Reduction Reason"
        updateEndpoint={requirementApi.endpoints.updateRequirement}
        deleteEndpoint={requirementApi.endpoints.deleteRequirement}
        summaryEndpoint={requirementApi.endpoints.getRequirementSummary}
        menus={
          <>
            <DashboardIcon />
            <CreateNewIcon />
            <HistoryIcon />
            <CancelIcon />
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
          {formData && (
            <Tab
              label="Nutrients"
              iconPosition="end"
              icon={<Chip label={formData?.nutrient_count || 0} size="small" />}
              {...a11yProps(1)}
            />
          )}
        </Tabs>
        <Box sx={{ pt: 5 }}>
          {tab == 0 && (
            <Card title="Requirement Detail">
              <Form
                data={formData}
                schema={schema}
                createEndpoint={requirementApi.endpoints.createRequirement}
                updateEndpoint={requirementApi.endpoints.updateRequirement}
                fields={{
                  name: { label: "Name", placeholder: "Name", xs: 12, md: 12 },
                }}
                beforeSubmit={cleanData}
                onCreateSuccess={handleCreated}
              />
            </Card>
          )}
        </Box>
      </TabFormLayout>
    </>
  );
};
