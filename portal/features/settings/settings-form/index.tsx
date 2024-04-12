import React from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Grid, Box, Tab, Tabs, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Setting } from "@/models";
import { useSession, signOut } from "next-auth/react";
import SystemSetting from "./system-setting";
import ProfileSetting from "./ProfileSetting";
import PasswordChange from "./PasswordChange";

type Inputs = Partial<Setting>;

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const schema = yup
  .object({
    name: yup.string().required(),
  })
  .required();

const SettingsForm = () => {
  const { data: session, status } = useSession();

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {},
    // @ts-ignore
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {};

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Grid container>
      {/* <Grid item xs={12}>
        <Box
          sx={{ display: "flex" }}
          flexDirection={{ xs: "column", lg: "row" }}
          mb={5}
        >
          <Box display="flex" flexDirection={"row"} alignItems={"center"}>
            <Avatar sx={{ width: 50, height: 50 }}>
              {(session?.user?.name || "User")[0]}
            </Avatar>
            <Typography sx={{ ml: 1 }} variant="body1" fontWeight={600}>
              {session?.user?.name || ""}
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
        </Box>
      </Grid> */}
      <Grid item xs={12}>
        <Box>
          <Tabs
            orientation={"horizontal"}
            variant="scrollable"
            value={value}
            onChange={handleChange}
            scrollButtons="auto"
          >
            <Tab label="Profile" {...a11yProps(0)} />
            <Tab label="Account setting" {...a11yProps(1)} />
            <Tab label="System etting" {...a11yProps(2)} />
          </Tabs>
          <Box sx={{ pt: 5 }}>
            {value == 0 && <ProfileSetting />}
            {value == 1 && <PasswordChange />}
            {value == 2 && <SystemSetting />}
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default SettingsForm;
