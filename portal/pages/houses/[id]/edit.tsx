import React from "react";
import { NextPageContext } from "next";
import { Container, Typography } from "@mui/material";
import { EditLayout } from "@/layouts";
import {
  HouseForm,
  HouseService,
} from "@/features/houses";
import { Breadcrumbs, Loading } from "@/components";
import { useBreadcrumbs } from "@/hooks";
import { House } from "@/models";
import { SeoHead } from "@/seo";

const HouseEditPage = ({ data }: { data: House }) => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
    {/* <SeoHead title={`${data.name || ""} - Edit`} /> */}
    <EditLayout
      breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
      header={<Typography variant="title">{"data.name"} - Edit</Typography>}
    >
      <Container maxWidth="md">
        <HouseForm house={data} />
      </Container>
    </EditLayout>
    </>
  );
};

// export async function getServerSideProps(context: NextPageContext) {
//   const { id } = context.query;

//   try {
//     // const res = await HouseService.getByIdSSR(context, Number(id));

//     // if (res.status != 200)
//     //   return {
//     //     redirect: {
//     //       permanent: false,
//     //       destination: `/${res.status}?id=${id}&from=/houses&next=/houses`,
//     //     },
//     //   };

//     const data = {name: "Dummy"}

//     return { props: { data } };
//   } catch (ex) {
//     return {
//       redirect: {
//         permanent: false,
//         destination: `/404?id=${id}&from=/houses&next=/units&error=unknown`,
//       },
//     };
//   }
// }

export default HouseEditPage;
