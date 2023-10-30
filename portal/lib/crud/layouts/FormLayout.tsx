import React from "react";
import {
  Form,
  FormProps,
  DangerZoneProps,
  DangerZone,
  InfoZone,
  InfoZoneProps,
} from "../form";
import { AbstractBaseModel } from "@/models";
import { Grid, Stack } from "@mui/material";
import { Card } from "@/components";

interface FormLayoutProps<T>
  extends FormProps<T>,
    DangerZoneProps<T>,
    InfoZoneProps {}

export default function FormLayout<T extends AbstractBaseModel>({
  data,
  baseUrl,
  schema,
  createEndpoint,
  updateEndpoint,
  deleteEndpoint,
  summaryEndpoint,
  fields,
  beforeSubmit,
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
            beforeSubmit={beforeSubmit}
          />
        </Card>
      </Grid>
      <Grid item xs={12} lg={0.5} xl={1} />
      <Grid item xs={12} lg={3} xl={2}>
        <Stack spacing={3}>
          {data && (
            <>
              <InfoZone id={data?.id || 0} summaryEndpoint={summaryEndpoint} />
              <DangerZone
                id={data?.id || 0}
                is_active={data?.is_active || false}
                updateEndpoint={updateEndpoint}
                deleteEndpoint={deleteEndpoint}
              />
            </>
          )}
        </Stack>
      </Grid>
    </Grid>
  );
}
