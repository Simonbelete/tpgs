import React, { ChangeEvent, ReactElement } from "react";
import { ListLayout, EditLayout } from "@/layouts";
import { useBreadcrumbs } from "@/hooks";
import { Breadcrumbs } from "@/components";
import { Button, Typography, Stack, Container } from "@mui/material";
import {
  HouseList,
  HouseImportExport,
  HouseFilter,
  HouseForm
} from "@/features/houses";
import { SeoHead } from "@/seo";
import AddIcon from "@mui/icons-material/Add";
import Link from "next/link";
import CloseIcon from "@mui/icons-material/Close";

const HousePage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    // <>
    //   <SeoHead title="House"/>
    //   <ListLayout
    //     breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
    //     header={<Typography variant="title">House</Typography>}
    //     actions={<HouseImportExport />}
    //     filter={<HouseFilter />}
    //   >
    //     <HouseList />
    //   </ListLayout>
    // </>
    <>
    <EditLayout
      breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
      header={<Typography variant="title">{"data.name"} - Edit</Typography>}
      actions={<Actions />}
    >
      {/* <Container maxWidth="md"> */}
        <HouseForm  />
      {/* </Container> */}
    </EditLayout>
    </>
  );
};

const Actions = () => {
  return (
    <Stack
        spacing={2}
        direction={"row"}
        justifyContent="flex-start"
        alignItems="center"
      >
        <Link href="/houses/create">
          <Button variant="outlined" size={"small"} startIcon={<AddIcon />}>
            Create New
          </Button>
        </Link>
        <Link href="/houses">
          <Button variant="outlined" color="error" size={"small"} startIcon={<CloseIcon />}>
            Cancel
          </Button>
        </Link>
      </Stack>
  )
} 

export default HousePage;