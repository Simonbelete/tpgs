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
import {
  Grid,
  Stack,
  Box,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import { Card } from "@/components";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useRouter } from "next/router";
import getPreviousUrl from "@/util/getPreviousUrl";

interface FormLayoutProps<T> extends DangerZoneProps<T>, InfoZoneProps {
  data?: T;
  title: string;
  menus?: React.ReactNode;
  children: React.ReactNode;
  rightMenus?: React.ReactNode;
}

export default function FormLayout<T extends AbstractBaseModel>({
  data,
  title,
  menus,
  summaryEndpoint,
  updateEndpoint,
  deleteEndpoint,
  children,
  rightMenus,
}: FormLayoutProps<T>) {
  const router = useRouter();

  return (
    <>
      <Grid container mb={5}>
        <Grid item xs={12} md={6}>
          <Box sx={{ display: "flex" }} justifyContent={"start"}>
            <IconButton
              onClick={() => router.push(getPreviousUrl(router.pathname))}
              sx={{ mr: 1 }}
              color="primary"
            >
              <ArrowBackIosIcon />
            </IconButton>
            <Typography variant="title">
              {data ? `${data.display_name || ""} - Edit` : title}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md />
        <Grid item xs={12} md={4}>
          <Stack
            direction="row"
            justifyContent={{ xs: "start", md: "end" }}
            spacing={0}
          >
            {menus}
          </Stack>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={8.5} xl={9}>
          {children}
        </Grid>
        <Grid item xs={12} lg={0.5} xl={1} />
        <Grid item xs={12} lg={3} xl={2}>
          <Stack spacing={3}>
            {data && !rightMenus && (
              <>
                <InfoZone
                  id={data?.id || 0}
                  summaryEndpoint={summaryEndpoint}
                />
                <DangerZone
                  id={data?.id || 0}
                  is_active={data?.is_active || false}
                  updateEndpoint={updateEndpoint}
                  deleteEndpoint={deleteEndpoint}
                />
              </>
            )}
            {data && rightMenus && rightMenus}
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}
