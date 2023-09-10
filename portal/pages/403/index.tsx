import React from "react";
import { SeoHead } from "@/seo";
import { Container, Typography, Grid, Box, Button } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import Link from "next/link";
import { useRouter } from "next/router";

const ForbiddenPage = () => {
  const router = useRouter();

  return (
    <>
      <SeoHead title="Unauthorized - 403"/>
        <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '60vh'
        }}
      >
        <Container maxWidth="md">
          <Grid container spacing={2}>
            <Grid xs={6}>
              <Typography variant="h1" fontWeight={600} color="text.primary">
                403
              </Typography>
              <Typography variant="h6">
                Unauthorized
              </Typography>
              <Link href={String(router.query.from) || "/dashboard"} style={{paddingTop: 50}}>
                <Button variant="outlined" startIcon={<KeyboardBackspaceIcon />}>
                  Go Back
                </Button>
              </Link>
            </Grid>
            <Grid xs={6}>
              {/* <img
                src=""
                alt=""
                width={500} height={250}
              /> */}
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  )
};

export default ForbiddenPage;
