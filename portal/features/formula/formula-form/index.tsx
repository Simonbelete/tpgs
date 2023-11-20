import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { Formula } from "@/models";
import {
  CancelIcon,
  CreateNewIcon,
  FormLayout,
  HistoryIcon,
  TabFormLayout,
  Form,
} from "@/lib/crud";
import { formulaApi } from "../services";
import { hatcheryApi } from "@/features/hatchery/services";
import { penApi } from "@/features/pen/services";
import _ from "lodash";
import { Card } from "@/components";
import { Tabs, Tab, Box, tabsClasses, Chip, Button } from "@mui/material";
import { purposeApi } from "@/features/purposes/services";
import { countryApi } from "@/features/countries/services";
import { FormulaIngredientForm } from "./FormulaIngredients";
import { FormulaRequirementForm } from "./FormulaRequirements";

const schema = yup.object({
  name: yup.string().required(),
  purpose: yup.string().nullable(),
  weight: yup.number().required(),
  country: yup.string().nullable(),
  sex: yup.string().nullable(),
  age_from_week: yup.number().nullable(),
  age_to_week: yup.number().nullable(),
  formula_basis: yup.string().nullable(),
  note: yup.string().nullable(),
  desired_dm: yup.string().nullable(),
  budget: yup.number().required(),
  desired_ratio: yup.number().required(),
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

export const FormulaForm = ({
  data,
  shallowRoute = true,
}: {
  data?: Formula;
  shallowRoute?: boolean;
}) => {
  const [formData, setFormData] = useState<Formula | undefined>(data);
  const [tab, setTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) =>
    setTab(newValue);

  return (
    <>
      <TabFormLayout<Formula>
        id={formData?.id || 0}
        data={formData}
        title="Create Formula"
        updateEndpoint={formulaApi.endpoints.updateFormula}
        deleteEndpoint={formulaApi.endpoints.deleteFormula}
        summaryEndpoint={formulaApi.endpoints.getFormulaSummary}
        menus={
          <>
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
              label="Ingredients"
              iconPosition="end"
              icon={
                <Chip label={formData?.ingredient_count || 0} size="small" />
              }
              {...a11yProps(1)}
            />
          )}
          {formData && (
            <Tab
              label="Requirements"
              iconPosition="end"
              icon={
                <Chip label={formData?.requirement_count || 0} size="small" />
              }
              {...a11yProps(1)}
            />
          )}
        </Tabs>
        <Box sx={{ pt: 5 }}>
          {tab == 0 && (
            <Card title="Requirement Detail">
              <Form<Formula>
                title="Formula Form"
                id={data?.id || 0}
                data={data}
                schema={schema}
                shallowRoute={shallowRoute}
                createEndpoint={formulaApi.endpoints.createFormula}
                updateEndpoint={formulaApi.endpoints.updateFormula}
                deleteEndpoint={formulaApi.endpoints.deleteFormula}
                summaryEndpoint={formulaApi.endpoints.getFormulaSummary}
                beforeSubmit={(values: Partial<Formula>) => {
                  const cleaned_data: Partial<Formula> = {
                    id: values.id,
                    name: values.name,
                    purpose: _.get(values, "purpose.id", null),
                    weight: values.weight,
                    country: _.get(values, "country.id", null),
                    sex: _.get(values, "sex.value", null),
                    age_from_week: values.age_from_week,
                    age_to_week: values.age_to_week,
                    formula_basis: _.get(values, "formula_basis.value", null),
                    note: values.note,
                    desired_dm: values.desired_dm,
                    budget: values.budget,
                    desired_ratio: values.desired_ratio,
                  };

                  return cleaned_data;
                }}
                fields={{
                  name: { label: "Name", placeholder: "Name", xs: 12, md: 6 },
                  purpose: {
                    label: "Purpose",
                    placeholder: "Select Purpose",
                    endpoint: purposeApi.endpoints.getPurposes,
                    xs: 12,
                    md: 6,
                  },
                  sex: {
                    label: "Sex",
                    placeholder: "Sex",
                    options: sexOptions,
                    xs: 12,
                    md: 6,
                  },
                  formula_basis: {
                    label: "Formula Basis",
                    placeholder: "Select Formula Basis",
                    options: [
                      { value: "AF", name: "As-Fed Basis" },
                      { value: "DM", name: "DM Basis" },
                    ],
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
                    label: "Requirement Price (kg)",
                    placeholder: "Requirement Price (kg)",
                    xs: 12,
                    md: 6,
                    postfix: "/ kg",
                  },
                  desired_ratio: {
                    label: "Requirement Ratio (%)",
                    placeholder: "Requirement Ratio (%)",
                    xs: 12,
                    md: 6,
                    postfix: "%",
                  },
                  desired_dm: {
                    label: "Dry Material (%)",
                    placeholder: "Dry Material (%)",
                    xs: 12,
                    md: 6,
                    postfix: "%",
                  },
                  country: {
                    label: "Country",
                    placeholder: "Select Country",
                    endpoint: countryApi.endpoints.getCountries,
                    xs: 12,
                    md: 6,
                  },
                  age_from_week: {
                    label: "Age From (week)",
                    placeholder: "Age From (week)",
                    xs: 12,
                    md: 6,
                  },
                  age_from_to: {
                    label: "Age To (week)",
                    placeholder: "Age To (week)",
                    xs: 12,
                    md: 6,
                  },
                  note: {
                    label: "Note",
                    placeholder: "Note",
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
            </Card>
          )}
        </Box>
        {formData && tab == 1 && <FormulaIngredientForm data={formData} />}
        {formData && tab == 2 && <FormulaRequirementForm data={formData} />}
      </TabFormLayout>
    </>
  );
};
