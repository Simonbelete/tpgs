import React from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Grid, 
  Switch, FormControlLabel, Typography, 
  Avatar, Box, Stack, List, ListItem, 
  ListItemButton, ListItemText,
  Tab, Tabs, IconButton, useMediaQuery, useTheme } from '@mui/material';
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Setting } from "@/models";
import { useSession, signOut } from "next-auth/react";
import { LabeledInput } from "@/components/inputs";
import SystemSetting from "./system-setting";
import LogoutIcon from "@mui/icons-material/Logout";
import Link from "next/link";

type Inputs = Partial<Setting>;

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const schema = yup
  .object({
    name: yup.string().required(),
  }).required()

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
    defaultValues: {
    },
    // @ts-ignore
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    
  };

  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"))

  return (
    <Grid container>
      <Grid item xs={12}>
        <Box sx={{ display: "flex" }} flexDirection={{xs: "column", lg: "row"}} mb={5}>
          <Box display="flex" flexDirection={"row"} alignItems={"center"}>
            <Avatar sx={{ width: 50, height: 50 }}>
            {(session?.user?.name || "User")[0]}
            </Avatar>
            <Typography sx={{ml: 1}} variant="body1" fontWeight={600}>{session?.user?.name || ""}</Typography>
          </Box>
          <Box sx={{ flexGrow: 1 }}/>
          <Stack direction="row" spacing={2} useFlexGap flexWrap="wrap">
            <Link href="/api/logout">
              <IconButton >
                <LogoutIcon  />
              </IconButton>
            </Link>
          </Stack>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box
          flexDirection={{xs: "column", md: "row"}}
          sx={{ flexGrow: 1, display: 'flex', height: 'auto' }}
        >
          <Tabs
            orientation={isSmallScreen ? "horizontal" : "vertical"}
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="settings-tab"
            sx={{ borderRight: 1, borderColor: 'divider' }}
          >
            <Tab label="Change Password" {...a11yProps(0)} />
            <Tab label="System Setting" {...a11yProps(1)} />
            
          </Tabs>
            {value == 0 && (
              <Box sx={{ p: 3 }}>
                <Typography>Abc</Typography>
              </Box>
            )}
            {value == 1 && (<SystemSetting />)}
        </Box>
      </Grid>
    </Grid>
  )
}

export default SettingsForm;