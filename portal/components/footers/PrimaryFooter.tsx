import React from "react";
import { Box, Grid, Typography, Stack, Link } from "@mui/material";
import { ILRILogo } from "../logos";
import PhoneIcon from "@mui/icons-material/Phone";
import MarkunreadMailboxIcon from "@mui/icons-material/MarkunreadMailbox";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";

const PrimaryFooter = () => {
  return (
    <>
      <Box sx={{ minHeight: 50, px: 10, py: 10 }}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <img
              src="/images/ilri-cgiar.png"
              alt="ILIR CGIAR Logo"
              height={100}
            />
          </Grid>
          <Grid item xs={4}>
            <Typography
              variant="h5"
              color={"white"}
              fontWeight={500}
              sx={{ mb: 3 }}
            >
              ILRI Kenya
            </Typography>
            <Stack spacing={1}>
              <Link href="#" variant="body2" color={"#ffff"}>
                <Stack direction={"row"} spacing={2}>
                  <MarkunreadMailboxIcon fontSize="small" />
                  <span>PO Box 30709</span>
                </Stack>
              </Link>
              <Link href="#" variant="body2" color={"#ffff"}>
                <Stack direction={"row"} spacing={2}>
                  <LocationOnIcon fontSize="small" />
                  <span>Nairobi 00100, Kenya</span>
                </Stack>
              </Link>
              <Link href="tel:+254-204223000" variant="body2" color={"#ffff"}>
                <Stack direction={"row"} spacing={2}>
                  <PhoneIcon fontSize="small" />
                  <span style={{ color: "#ffff" }}>+254-20 422 3000</span>
                </Stack>
              </Link>
              <Link href="tel:+254-204223001" variant="body2" color={"#ffff"}>
                <Stack direction={"row"} spacing={2}>
                  <PhoneIcon fontSize="small" />
                  <span>+254-20 422 3001</span>
                </Stack>
              </Link>
              <Link
                href="mailto:ILRI-Kenya@cgiar.org"
                variant="body2"
                color={"#ffff"}
              >
                <Stack direction={"row"} spacing={2}>
                  <EmailIcon fontSize="small" />
                  <span>ILRI-Kenya@cgiar.org</span>
                </Stack>
              </Link>
            </Stack>
          </Grid>
          <Grid item xs={4}>
            <Typography
              variant="h5"
              color={"white"}
              fontWeight={500}
              sx={{ mb: 3 }}
            >
              ILRI Ethiopia
            </Typography>
            <Stack spacing={1}>
              <Link href="#" variant="body2" color={"#ffff"}>
                <Stack direction={"row"} spacing={2}>
                  <MarkunreadMailboxIcon fontSize="small" />
                  <span>PO Box 5689</span>
                </Stack>
              </Link>
              <Link href="#" variant="body2" color={"#ffff"}>
                <Stack direction={"row"} spacing={2}>
                  <LocationOnIcon fontSize="small" />
                  <span>Addis Ababa, Ethiopia</span>
                </Stack>
              </Link>
              <Link href="tel:+251-116172000" variant="body2" color={"#ffff"}>
                <Stack direction={"row"} spacing={2}>
                  <PhoneIcon fontSize="small" />
                  <span style={{ color: "#ffff" }}>+251-11 617 2000</span>
                </Stack>
              </Link>
              <Link href="tel:+251-116172001" variant="body2" color={"#ffff"}>
                <Stack direction={"row"} spacing={2}>
                  <PhoneIcon fontSize="small" />
                  <span>+251-11 617 2001</span>
                </Stack>
              </Link>
              <Link
                href="mailto:ILRI-Ethiopia@cgiar.org"
                variant="body2"
                color={"#ffff"}
              >
                <Stack direction={"row"} spacing={2}>
                  <EmailIcon fontSize="small" />
                  <span>ILRI-Ethiopia@cgiar.org</span>
                </Stack>
              </Link>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default PrimaryFooter;
