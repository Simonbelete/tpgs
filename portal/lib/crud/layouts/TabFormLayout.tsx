import React, { ReactNode } from "react";
import { Form, FormProps } from "../form";
import { Grid } from "@mui/material";
import { Card } from "@/components";
import { Box, Tabs, Tab, tabsClasses, Chip } from "@mui/material";

interface FormLayoutProps<T> extends FormProps<T> {
  children: ReactNode;
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function FormLayout<T>({ children }: FormLayoutProps<T>) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} lg={8.5} xl={9}>
        {children}
      </Grid>
      <Grid item xs={12} lg={0.5} xl={1} />
      <Grid item xs={12} lg={3} xl={2}></Grid>
    </Grid>
  );
}
