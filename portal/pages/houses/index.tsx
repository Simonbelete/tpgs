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
    >
      {/* <Container maxWidth="md"> */}
        <HouseForm  />
      {/* </Container> */}
    </EditLayout>
    </>
  );
};

export default HousePage;