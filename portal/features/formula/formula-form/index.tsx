import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { Formula } from "@/models";
import {
  CancelIcon,
  CreateNewIcon,
  HistoryIcon,
  TabFormLayout,
  Form,
} from "@/lib/crud";
import {
  formulaApi,
  useLazyFormulateQuery,
  printFormulaPdf,
} from "../services";
import _ from "lodash";
import { Card } from "@/components";
import { Tabs, Tab, Box, Chip, Tooltip, IconButton } from "@mui/material";
import { purposeApi } from "@/features/purposes/services";
import { countryApi } from "@/features/countries/services";
import { FormulaIngredientForm } from "./FormulaIngredients";
import { FormulaRequirementForm } from "./FormulaRequirements";
import AchivementCard from "./AchivementCard";
import Link from "next/link";
import FunctionsIcon from "@mui/icons-material/Functions";
import fileDownload from "@/util/fileDownload";
import TableViewIcon from "@mui/icons-material/TableView";

const schema = yup.object({
  name: yup.string().required(),
  purpose: yup.object().nullable(),
  weight: yup.number().default(100).required(),
  country: yup.object().nullable(),
  sex: yup.object().nullable(),
  age_from_week: yup.number().nullable(),
  age_to_week: yup.number().nullable(),
  formula_basis: yup.object().nullable(),
  note: yup.string().nullable(),
  desired_dm: yup.string().nullable(),
  budget: yup.number().default(0).required(),
  desired_ratio: yup.number().default(100).required(),
});

const sexOptions = [
  { value: null, name: "---" },
  { value: "M", name: "Male" },
  { value: "F", name: "Female" },
];

const formulaBasisOptions = [
  { value: null, name: "---" },
  { value: "AF", name: "As-Fed Basis" },
  { value: "DM", name: "DM Basis" },
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

  const [formulaTrigger, { data: formulaData, status }] =
    useLazyFormulateQuery();

  useEffect(() => {
    if (status == "fulfilled") {
      setFormData(formulaData);
    }
  }, [formulaData]);

  const handlePrintPdfFormula = async () => {
    if (data != null) {
      const response = await printFormulaPdf(data.id);
      fileDownload(response.data, `${data.display_name}.pdf`);
    }
  };

  const handleCreated = (value: Formula) => {
    setFormData(value);
  };

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
            {formData && (
              <>
                <Tooltip
                  title="Formulate"
                  onClick={() => formulaTrigger(_.get(data, "id", 0))}
                >
                  <IconButton color="secondary">
                    <FunctionsIcon />
                  </IconButton>
                </Tooltip>
                {/* <Tooltip title="Print Formula" onClick={handlePrintPdfFormula}>
                  <IconButton color="secondary">
                    <PictureAsPdfIcon />
                  </IconButton>
                </Tooltip> */}
                <Link
                  href={`/formulation/formulas/${formData?.id}/matrix`}
                  data-testid="data-table-dashboard"
                >
                  <Tooltip title="Matrix">
                    <IconButton>
                      <TableViewIcon color="secondary" />
                    </IconButton>
                  </Tooltip>
                </Link>
              </>
            )}

            <CreateNewIcon />
            <HistoryIcon />
            <CancelIcon />
          </>
        }
      >
        {formData && (
          <Box sx={{ mb: 5 }}>
            <AchivementCard data={formData} />
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
                shallowRoute={shallowRoute}
                data={{
                  ...formData,
                  // @ts-ignore
                  sex: _.find(sexOptions, { value: formData?.sex }),
                  // @ts-ignore
                  formula_basis: _.find(formulaBasisOptions, {
                    value: formData?.formula_basis,
                  }),
                }}
                schema={schema}
                createEndpoint={formulaApi.endpoints.createFormula}
                updateEndpoint={formulaApi.endpoints.updateFormula}
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
                onCreateSuccess={handleCreated}
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
                    options: formulaBasisOptions,
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
                    label: "Requirement Unit Price (kg)",
                    placeholder: "Requirement Unit Price (kg)",
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
                  age_to_week: {
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
