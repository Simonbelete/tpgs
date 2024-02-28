import React, { useState } from "react";
import * as yup from "yup";
import { GridColDef, GridValidRowModel, GridRowsProp } from "@mui/x-data-grid";
import { Feed } from "@/models";
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
import { feedApi } from "../services";
import { ChickenFeed } from "./ChickenFeed";
import { formulaApi } from "@/features/formula/services";
import { hatcheryApi } from "@/features/hatchery/services";
import { penApi } from "@/features/pen/services";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const schema = yup.object({
  hatchery: yup.object().required(),
  pen: yup.object().nullable(),
  formula: yup.object().nullable(),
  week: yup
    .number()
    .typeError("Week must be number")
    .min(0)
    .required("Week is required"),
  weight: yup.number(),
});

export const BatchFeedForm = ({
  data,
  shallowRoute = true,
}: {
  data?: Feed;
  shallowRoute?: boolean;
}) => {
  const [formData, setFormData] = useState<Feed | undefined>(data);
  const [tab, setTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) =>
    setTab(newValue);

  const handleCreated = (value: Feed) => {
    setFormData(value);
  };

  return (
    <>
      <TabFormLayout<Feed>
        id={formData?.id || 0}
        data={formData}
        title="Create Feed"
        updateEndpoint={feedApi.endpoints.updateFeed}
        deleteEndpoint={feedApi.endpoints.deleteFeed}
        summaryEndpoint={feedApi.endpoints.getFeedSummary}
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
              label="Feed distribution"
              iconPosition="end"
              icon={
                <Chip
                  label={`${formData.children_feed_count}/${formData.total_chickens}`}
                  size="small"
                />
              }
              {...a11yProps(1)}
            />
          )}
        </Tabs>
        <Box sx={{ pt: 5 }}>
          {tab == 0 && (
            <Card title="Feed Detail">
              <Form
                shallowRoute={shallowRoute}
                data={formData}
                schema={schema}
                createEndpoint={feedApi.endpoints.createFeed}
                updateEndpoint={feedApi.endpoints.updateFeed}
                fields={{
                  hatchery: {
                    label: "Hatch",
                    placeholder: "Hatch",
                    endpoint: hatcheryApi.endpoints.getHatchery,
                    dataKey: "name",
                    xs: 12,
                    md: 6,
                    disabled: formData ? true : false,
                  },
                  pen: {
                    label: "Pen",
                    placeholder: "Pen",
                    endpoint: penApi.endpoints.getPens,
                    dataKey: "name",
                    xs: 12,
                    md: 6,
                    disabled: formData ? true : false,
                  },
                  week: {
                    label: "Week",
                    placeholder: "Week",
                    xs: 12,
                    md: 6,
                    disabled: formData ? true : false,
                  },
                  weight: {
                    label: "Feed weight (g)",
                    placeholder: "Feed weight (g)",
                    xs: 12,
                    md: 6,
                    postfix: "g",
                  },
                  formula: {
                    label: "Formula",
                    placeholder: "Formula",
                    endpoint: formulaApi.endpoints.getFormulas,
                    dataKey: "name",
                    xs: 12,
                    md: 6,
                    disabled: formData ? true : false,
                  },
                }}
                beforeSubmit={(values: Partial<Feed>) => {
                  const cleaned_data: Partial<Feed> = {
                    id: values.id,
                    week: values.week,
                    weight: values.weight,
                    pen: values.pen ? (values.pen as any)?.id || 0 : null,
                    hatchery: values.hatchery
                      ? (values.hatchery as any)?.id || 0
                      : null,
                    formula: values.formula
                      ? (values.formula as any)?.id || 0
                      : null,
                  };

                  return cleaned_data;
                }}
                onCreateSuccess={handleCreated}
              />
            </Card>
          )}
          {formData && tab == 1 && <ChickenFeed data={formData} />}
        </Box>
      </TabFormLayout>
      {/* <FormLayout<Feed>
        title="Batch Feed Form"
        id={data?.id || 0}
        data={data}
        schema={schema}
        shallowRoute={shallowRoute}
        createEndpoint={feedApi.endpoints.createFeed}
        updateEndpoint={feedApi.endpoints.updateFeed}
        deleteEndpoint={feedApi.endpoints.deleteFeed}
        summaryEndpoint={feedApi.endpoints.getFeedSummary}
        beforeSubmit={(values: Partial<Feed>) => {
          const cleaned_data: Partial<Feed> = {
            id: values.id,
            week: values.week,
            weight: values.weight,
            pen: values.batch?.pen_id || 0,
            hatchery: values.batch?.hatchery_id || 0,
            formula: (values.formula as any)?.id || 0,
          };

          return cleaned_data;
        }}
        fields={{
          batch: {
            label: "Batch",
            placeholder: "Batch",
            endpoint: directoryApi.endpoints.getBatchDdrectories,
            dataKey: "batch_name",
            xs: 12,
            md: 12,
          },
          week: { label: "Week", placeholder: "Week", xs: 12, md: 12 },
          weight: {
            label: "Feed weight (g)",
            placeholder: "Feed weight (g)",
            xs: 12,
            md: 12,
            postfix: "g",
          },
          formula: {
            label: "Formula",
            placeholder: "Formula",
            endpoint: formulaApi.endpoints.getFormulas,
            dataKey: "name",
            xs: 12,
            md: 12,
          },
        }}
        menus={
          <>
            <CreateNewIcon />
            <HistoryIcon />
            <CancelIcon />
          </>
        }
      />
    </> */}
    </>
  );
};
