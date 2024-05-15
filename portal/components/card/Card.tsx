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
        padding: 0,
        "&:last-child": {
          padding: 0,
        },
      }}
    >
      <Grid container direction={"column"} spacing={0.1}>
        <Grid item xs>
          <Stack
            pt={"8px"}
            px={"10px"}
            pb={0}
            direction={"row"}
            justifyContent={"space-between"}
          >
            <Typography variant="body1" fontWeight={600} color="text.primary">
              {title}
            </Typography>
            <Stack direction={"row"} spacing={2}>
              {actions}
            </Stack>
          </Stack>
        </Grid>
        <Grid item xs>
          {title && <Divider />}
        </Grid>
      </Grid>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default CardBasic;
