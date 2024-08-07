import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { HatcheryEgg, Hatchery, Egg } from "@/models";
import {
  TabFormLayout,
  CreateNewIcon,
  HistoryIcon,
  CancelIcon,
  Form,
  DashboardIcon,
  EditableList,
  EditToolbar,
} from "@/lib/crud";
import { Tabs, Tab, Box, Chip, Button } from "@mui/material";
import { Card } from "@/components";
import { hatcheryApi } from "../services";
import { EditMode } from "@/types";
import { breedApi } from "@/features/breeds/services";
import { BreedForm } from "@/features/breeds";
import HatcheryEggEditableList from "./HatcheryEggEditableList";
import IncubationEditableList from "./IncubationEditableList";
import { HatcheryStat } from "./HatcheryStat";
import dayjs from "dayjs";
import _ from "lodash";

const schema = yup.object({
  name: yup.string().required(),
  description: yup.string().nullable(),
  weight: yup.number().nullable(),
  desired_dm: yup.string().nullable(),
  budget: yup.number().nullable(),
  desired_ratio: yup.number().default(100).required(),
});

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export interface EditableHatcheryEgg extends HatcheryEgg, EditMode {}

export const HatcheryForm = ({
  data,
  shallowRoute = true,
}: {
  data?: Hatchery;
  shallowRoute?: boolean;
}) => {
  const [formData, setFormData] = useState<Hatchery | undefined>(data);
  const [tab, setTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) =>
    setTab(newValue);

  const cleanData = (values: Partial<Hatchery>): Partial<Hatchery> => {
    return {
      id: values.id,
      name: values.name,
      incubation_moved_date:
        values.incubation_moved_date &&
        dayjs(values.incubation_moved_date).format(
          process.env.NEXT_PUBLIC_API_DATE_FORMAT
        ),
      hatch_date:
        values.hatch_date &&
        dayjs(values.hatch_date).format(
          process.env.NEXT_PUBLIC_API_DATE_FORMAT
        ),
      breed: _.get(values.breed, "id", null),
    };
  };

  const handleCreated = (value: Hatchery) => {
    setFormData(value);
  };

  return (
    <>
      <TabFormLayout<Hatchery>
        id={formData?.id || 0}
        data={formData}
        title="Create Hatch/Batch"
        updateEndpoint={hatcheryApi.endpoints.updateHatchery}
        deleteEndpoint={hatcheryApi.endpoints.deleteHatchery}
        summaryEndpoint={hatcheryApi.endpoints.getHatcherySummary}
        menus={
          <>
            <DashboardIcon />
            <CreateNewIcon />
            <HistoryIcon />
            <CancelIcon />
          </>
        }
      >
        {formData && (
          <Box sx={{ mb: 2 }}>
            <HatcheryStat data={formData} />
          </Box>
        )}
        <Tabs
          value={tab}
          onChange={handleTabChange}
          aria-label="basic tabs example"
          // sx={{
          //   [`& .${tabsClasses.scrollButtons}`]: {
          //     "&.Mui-disabled": { opacity: 0.3 },
          //   },
          // }}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="Detail" {...a11yProps(0)} />
          {formData && (
            <Tab
              label="Candling"
              iconPosition="end"
              icon={<Chip label={formData.hatchery_egg_count} size="small" />}
              {...a11yProps(1)}
            />
          )}
          {/* {formData && (
            <Tab
              label="Incubation"
              iconPosition="end"
              icon={<Chip label={formData.incubation_count} size="small" />}
              {...a11yProps(1)}
            />
          )} */}
        </Tabs>
        <Box sx={{ pt: 5 }}>
          {tab == 0 && (
            <Card title="Hatchery Detail">
              <Form
                shallowRoute={shallowRoute}
                data={formData}
                schema={schema}
                createEndpoint={hatcheryApi.endpoints.createHatchery}
                updateEndpoint={hatcheryApi.endpoints.updateHatchery}
                fields={{
                  name: { label: "Name", placeholder: "Name", xs: 12, md: 6 },
                  incubation_moved_date: {
                    type: "date",
                    label: "Incubation move date",
                    placeholder: "Incubation move date",
                    xs: 12,
                    md: 6,
                  },
                  hatch_date: {
                    type: "date",
                    label: "Hatch date",
                    placeholder: "Hatch date",
                    xs: 12,
                    md: 6,
                  },
                  breed: {
                    label: "Breed",
                    placeholder: "Weight",
                    endpoint: breedApi.endpoints.getBreeds,
                    xs: 12,
                    md: 6,
                    postfix: "kg",
                    form: <BreedForm />,
                  },
                  note: {
                    label: "Note",
                    placeholder: "Note",
                  },
                }}
                beforeSubmit={cleanData}
                onCreateSuccess={handleCreated}
              />
            </Card>
          )}
          {formData && tab == 1 && <HatcheryEggEditableList data={formData} />}
          {/* {formData && tab == 2 && <IncubationEditableList data={formData} />} */}
        </Box>
      </TabFormLayout>
    </>
  );
};
