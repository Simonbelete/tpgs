import React, { useState } from "react";
import {
  Form,
  FormProps,
  DangerZoneProps,
  DangerZone,
  InfoZone,
  InfoZoneProps,
} from "../form";
import { AbstractBaseModel } from "@/models";
import { Grid, Stack, Box, Typography, IconButton, Alert } from "@mui/material";
import { Card } from "@/components";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useRouter } from "next/router";
import getPreviousUrl from "@/util/getPreviousUrl";
import Link from "next/link";

interface FormLayoutProps<T>
  extends FormProps<T>,
    DangerZoneProps<T>,
    InfoZoneProps {
  title: string;
  menus?: React.ReactNode;
}

export default function FormLayout<T extends AbstractBaseModel>({
  data,
  title,
  menus,
  schema,
  createEndpoint,
  updateEndpoint,
  deleteEndpoint,
  summaryEndpoint,
  fields,
  beforeSubmit,
  shallowRoute,
}: FormLayoutProps<T>) {
  const [formData, setFormData] = useState<T | undefined>(data);
  const router = useRouter();

  const handleCreated = (newData: T) => {
    setFormData(newData);
  };

  return (
    <>
      <Grid container mb={5}>
        <Grid item xs={12} md={6}>
          <Box sx={{ display: "flex" }} justifyContent={"start"}>
            <Link href={getPreviousUrl(router.pathname)}>
              <IconButton sx={{ mr: 1 }} color="primary">
                <ArrowBackIosIcon />
              </IconButton>
            </Link>
            <Typography variant="title">
              {formData
                ? `${formData.display_name || ""} - Edit`
                : `${title} - Create`}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md />
        <Grid item xs={12} md={4}>
          {formData && (
            <Stack
              direction="row"
              justifyContent={{ xs: "start", md: "end" }}
              spacing={0}
            >
              {menus}
            </Stack>
          )}
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={8.5} xl={9}>
          {formData && formData.is_active ? (
            <></>
          ) : (
            <>
              <Box sx={{ mt: 1, mb: 2, width: "100%" }}>
                <Alert severity="warning">Archived record!</Alert>
              </Box>
            </>
          )}

          <Card title={title}>
            <Form
              data={formData}
              schema={schema}
              createEndpoint={createEndpoint}
              updateEndpoint={updateEndpoint}
              fields={fields}
              beforeSubmit={beforeSubmit}
              onCreateSuccess={handleCreated}
              shallowRoute={shallowRoute}
            />
          </Card>
        </Grid>
        <Grid item xs={12} lg={0.5} xl={1} />
        <Grid item xs={12} lg={3} xl={2}>
          <Stack spacing={3}>
            {formData && (
              <>
                <InfoZone
                  id={formData?.id || 0}
                  summaryEndpoint={summaryEndpoint}
                />
                <DangerZone
                  id={formData?.id || 0}
                  is_active={formData?.is_active || false}
                  updateEndpoint={updateEndpoint}
                  deleteEndpoint={deleteEndpoint}
                />
              </>
            )}
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}
