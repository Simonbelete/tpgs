import React, { useState } from "react";
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
import { Tabs, Tab, Box, tabsClasses, Chip, Button } from "@mui/material";
import { Card } from "@/components";
import { hatcheryApi } from "../services";
import { EditMode } from "@/types";
import { eggApi } from "@/features/eggs/services";
import { breedApi } from "@/features/breeds/services";

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

const HatcheryNutrientToolbar = ({
  setRows,
  rows,
}: {
  setRows: (
    newRows: (
      oldRows: GridRowsProp<EditableHatcheryEgg>
    ) => GridRowsProp<EditableHatcheryEgg>
  ) => void;
  rows: GridRowsProp<EditableHatcheryEgg>;
}) => {
  return (
    <EditToolbar<EditableHatcheryEgg, Egg>
      setRows={setRows}
      rows={rows}
      endpoint={eggApi.endpoints.getEggs}
      mapperKey="egg"
    />
  );
};

export const HatcheryForm = ({ data }: { data?: Hatchery }) => {
  const [formData, setFormData] = useState<Hatchery | undefined>(data);
  const [tab, setTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) =>
    setTab(newValue);

  const cleanData = (values: Partial<Hatchery>): Partial<Hatchery> => {
    return values;
  };

  const cleanHatcheryEgg = (
    values: Partial<HatcheryEgg>
  ): Partial<HatcheryEgg> => {
    return {
      id: data?.id, // Only for post data
      hatchery: data?.id,
      egg: (values.egg as Egg).id || undefined,
    };
  };

  const handleCreated = (value: Hatchery) => {
    setFormData(value);
  };

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      minWidth: 100,
      valueGetter: (params) =>
        params.row.nutrient ? params.row.nutrient.name : "",
    },
    {
      field: "abbreviation",
      headerName: "Abbreviation",
      flex: 1,
      minWidth: 150,
      valueGetter: (params) =>
        params.row.nutrient ? params.row.nutrient.abbreviation : "",
    },
    {
      field: "value",
      headerName: "Value [%]",
      flex: 1,
      minWidth: 150,
      editable: true,
      type: "number",
    },
    {
      field: "unit",
      headerName: "Unit",
      flex: 1,
      minWidth: 150,
      valueGetter: (params) =>
        params.row.nutrient ? params.row.nutrient.unit.name : "",
    },
  ];

  return (
    <>
      <TabFormLayout<Hatchery>
        id={formData?.id || 0}
        data={formData}
        title="Create Hatchery"
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
              icon={<Chip label={0} size="small" />}
              {...a11yProps(1)}
            />
          )}
        </Tabs>
        <Box sx={{ pt: 5 }}>
          {tab == 0 && (
            <Card title="Hatchery Detail">
              <Form
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
                    label: "Weight (kg)",
                    placeholder: "Weight (kg)",
                    endpoint: breedApi.endpoints.getBreeds,
                    xs: 12,
                    md: 6,
                    postfix: "kg",
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
          {formData && tab == 1 && (
            <EditableList<HatcheryEgg>
              getQuery={{ id: formData?.id, query: {} }}
              toolbar={HatcheryNutrientToolbar}
              columns={columns}
              beforeSubmit={cleanHatcheryEgg}
              getEndpoint={hatcheryApi.endpoints.getEggsOfHatchery}
              createEndpoint={hatcheryApi.endpoints.createEggForHatchery}
              updateEndpoint={hatcheryApi.endpoints.updateEggOfHatchery}
              deleteEndpoint={hatcheryApi.endpoints.deleteEggOfHatchery}
            />
          )}
        </Box>
      </TabFormLayout>
    </>
  );
};
