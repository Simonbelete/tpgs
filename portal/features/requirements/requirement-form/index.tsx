import React, { useState } from "react";
import * as yup from "yup";
import { GridColDef, GridValidRowModel, GridRowsProp } from "@mui/x-data-grid";
import { Requirement, RequirementNutrient, Nutrient } from "@/models";
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
import { requirementApi } from "../services";
import { nutrientApi } from "@/features/nutrients/services";
import { EditMode } from "@/types";

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

export interface EditableRequirementNutrient
  extends RequirementNutrient,
    EditMode {}

const RequirementNutrientToolbar = ({
  setRows,
  rows,
}: {
  setRows: (
    newRows: (
      oldRows: GridRowsProp<EditableRequirementNutrient>
    ) => GridRowsProp<EditableRequirementNutrient>
  ) => void;
  rows: GridRowsProp<EditableRequirementNutrient>;
}) => {
  return (
    <EditToolbar<EditableRequirementNutrient, Nutrient>
      title="Add Nutrient"
      setRows={setRows}
      rows={rows}
      endpoint={nutrientApi.endpoints.getNutrients}
      mapperKey="nutrient"
    />
  );
};

export const RequirementForm = ({ data }: { data?: Requirement }) => {
  const [formData, setFormData] = useState<Requirement | undefined>(data);
  const [tab, setTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) =>
    setTab(newValue);

  const cleanData = (values: Partial<Requirement>): Partial<Requirement> => {
    return values;
  };

  const cleanRequirementNutrient = (
    values: Partial<RequirementNutrient>
  ): Partial<RequirementNutrient> => {
    return {
      id: data?.id, // Only for post data
      requirement: data?.id,
      nutrient: (values.nutrient as Nutrient).id || undefined,
      value: values.value,
    };
  };

  const handleCreated = (value: Requirement) => {
    setFormData(value);
  };

  const columns: GridColDef[] = [
    {
      field: "nutrient__name",
      headerName: "Name",
      flex: 1,
      filterable: false,
      valueGetter: (params) =>
        params.row.nutrient ? params.row.nutrient.name : "",
    },
    {
      field: "nutrient__abbreviation",
      headerName: "Abbreviation",
      flex: 1,
      filterable: false,
      valueGetter: (params) =>
        params.row.nutrient ? params.row.nutrient.abbreviation : "",
    },
    {
      field: "value",
      headerName: "Value [%]",
      flex: 1,
      filterable: false,
      editable: true,
      type: "number",
    },
    {
      field: "nutrient__unit",
      headerName: "Unit",
      filterable: false,
      valueGetter: (params) =>
        params.row.nutrient ? params.row.nutrient.unit.name : "",
    },
  ];

  return (
    <>
      <TabFormLayout<Requirement>
        id={formData?.id || 0}
        data={formData}
        title="Create Requirement"
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
                  name: { label: "Name", placeholder: "Name", xs: 12, md: 6 },
                  desired_dm: {
                    label: "Dry Matter (%)",
                    placeholder: "Dry Matter",
                    postfix: "%",
                    xs: 12,
                    md: 6,
                  },
                  weight: {
                    label: "Weight (kg)",
                    placeholder: "Weight (kg)",
                    xs: 12,
                    md: 6,
                    postfix: "kg",
                  },
                  budget: {
                    label: "Requirement Price (/kg)",
                    placeholder: "Requirement Price (/kg)",
                    postfix: "/kg",
                  },
                  desired_ratio: {
                    label: "Requirement Ratio (%)",
                    placeholder: "Requirement Ratio (%)",
                    postfix: "%",
                  },
                  description: {
                    label: "Description",
                    placeholder: "Description",
                    xs: 12,
                    md: 6,
                  },
                }}
                beforeSubmit={cleanData}
                onCreateSuccess={handleCreated}
              />
            </Card>
          )}
          {formData && tab == 1 && (
            <EditableList<RequirementNutrient>
              getQuery={{ id: formData?.id, query: {} }}
              toolbar={RequirementNutrientToolbar}
              columns={columns}
              beforeSubmit={cleanRequirementNutrient}
              getEndpoint={requirementApi.endpoints.getNutrientsOfRequirement}
              createEndpoint={
                requirementApi.endpoints.createNutrientForRequirement
              }
              updateEndpoint={
                requirementApi.endpoints.updateNutrientOfRequirement
              }
              deleteEndpoint={
                requirementApi.endpoints.deleteNutrientOfRequirement
              }
            />
          )}
        </Box>
      </TabFormLayout>
    </>
  );
};
