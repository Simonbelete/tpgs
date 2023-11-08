import React from "react";
import {
  Card,
  CardContent,
  Stack,
  Divider,
  Typography,
  Grid,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const CardBasic = ({
  children,
  title,
  actions,
}: {
  children: React.ReactNode;
  title?: string;
  actions?: React.ReactNode;
}) => {
  return (
    <Card
      sx={{
        px: 2,
        pt: 1,
        pb: 2,
        boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
        background: "#fff",
        borderRadius: "6px",
      }}
    >
      <Grid container direction={"column"} spacing={1}>
        <Grid item xs>
          <Stack direction={"row"} justifyContent={"space-between"}>
            <Typography variant="body1" fontWeight={600} color="text.primary">
              {title}
            </Typography>
            <Stack direction={"row"} spacing={2}>
              {actions}
            </Stack>
          </Stack>
        </Grid>
        <Grid item xs>
          <Divider />
        </Grid>
      </Grid>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default CardBasic;
