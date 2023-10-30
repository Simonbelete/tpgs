import React from "react";
import { Form, FormProps } from "../form";
import { AbstractBaseModel } from "@/models";
import { Grid } from "@mui/material";
import { Card } from "@/components";

interface FormLayoutProps<T> extends FormProps<T> {}

export default function FormLayout<T>({
  data,
  baseUrl,
  schema,
  createEndpoint,
  updateEndpoint,
  fields,
}: FormLayoutProps<T>) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} lg={8.5} xl={9}>
        <Card title="Requirement Form">
          <Form
            baseUrl={baseUrl}
            data={data}
            schema={schema}
            createEndpoint={createEndpoint}
            updateEndpoint={updateEndpoint}
            fields={fields}
          />
        </Card>
      </Grid>
      <Grid item xs={12} lg={0.5} xl={1} />
      <Grid item xs={12} lg={3} xl={2}></Grid>
    </Grid>
  );
}
