import React, { useEffect } from "react";
import { Card, Container, Stack } from "@mui/material";
import { Breadcrumbs } from "@/components";
import { useBreadcrumbs } from "@/hooks";
import { CreateLayout } from "@/layouts";
import { CullChickenForm } from "@/features/chickens";
import { SeoHead } from "@/seo";
import { ExportModal } from "@/lib/crud";
import { chickenApi } from "@/features/chickens/services";
import { hatcheryApi } from "@/features/hatchery/services";
import { houseApi } from "@/features/houses/services";
import { penApi } from "@/features/pen/services";
import _ from "lodash";

const ExportChickensPage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title="Cull Chicken" />
      <CreateLayout breadcrumbs={<Breadcrumbs items={breadcrumbs} />}>
        <Container maxWidth="md">
          <Stack direction={"column"} spacing={2} alignItems={"flex-start"}>
            <ExportModal
              url={""}
              fullUrl={"/chickens/export/weights"}
              fields={{
                chicken: {
                  endpoint: chickenApi.endpoints.getChickens,
                  label: "Chicken",
                  md: 12,
                  dataKey: "display_name",
                },
                hatchery: {
                  endpoint: hatcheryApi.endpoints.getHatchery,
                  label: "hatchery",
                  md: 12,
                  dataKey: "display_name",
                },
                house: {
                  endpoint: houseApi.endpoints.getHouses,
                  label: "House",
                  md: 12,
                  dataKey: "display_name",
                },
                pen: {
                  endpoint: penApi.endpoints.getPens,
                  label: "Pen",
                  md: 12,
                  dataKey: "display_name",
                },
                generation: {
                  label: "Generation",
                  placeholder: "Generation",
                  md: 12,
                },
              }}
              beforeSubmit={(values) => {
                return {
                  id: _.get(values.chicken, "id", null),
                  hatchery: _.get(values.hatchery, "id", null),
                  house: _.get(values.house, "id", null),
                  pen: _.get(values.pen, "id", null),
                  generation: _.get(values, "generation", null),
                };
              }}
              name={"Export Body Weight"}
            />
            <ExportModal
              url={""}
              fullUrl={"/chickens/export/feeds"}
              fields={{
                chicken: {
                  endpoint: chickenApi.endpoints.getChickens,
                  label: "Chicken",
                  md: 12,
                  dataKey: "display_name",
                },
                hatchery: {
                  endpoint: hatcheryApi.endpoints.getHatchery,
                  label: "hatchery",
                  md: 12,
                  dataKey: "display_name",
                },
                house: {
                  endpoint: houseApi.endpoints.getHouses,
                  label: "House",
                  md: 12,
                  dataKey: "display_name",
                },
                pen: {
                  endpoint: penApi.endpoints.getPens,
                  label: "Pen",
                  md: 12,
                  dataKey: "display_name",
                },
                generation: {
                  label: "Generation",
                  placeholder: "Generation",
                  md: 12,
                },
              }}
              beforeSubmit={(values) => {
                return {
                  id: _.get(values.chicken, "id", null),
                  hatchery: _.get(values.hatchery, "id", null),
                  house: _.get(values.house, "id", null),
                  pen: _.get(values.pen, "id", null),
                  generation: _.get(values, "generation", null),
                };
              }}
              name={"Export Body Feed Intake"}
            />
            <ExportModal
              url={""}
              fullUrl={"/chickens/export/eggs"}
              fields={{
                chicken: {
                  endpoint: chickenApi.endpoints.getChickens,
                  label: "Chicken",
                  md: 12,
                  dataKey: "display_name",
                },
                hatchery: {
                  endpoint: hatcheryApi.endpoints.getHatchery,
                  label: "hatchery",
                  md: 12,
                  dataKey: "display_name",
                },
                house: {
                  endpoint: houseApi.endpoints.getHouses,
                  label: "House",
                  md: 12,
                  dataKey: "display_name",
                },
                pen: {
                  endpoint: penApi.endpoints.getPens,
                  label: "Pen",
                  md: 12,
                  dataKey: "display_name",
                },
                generation: {
                  label: "Generation",
                  placeholder: "Generation",
                  md: 12,
                },
              }}
              beforeSubmit={(values) => {
                return {
                  id: _.get(values.chicken, "id", null),
                  hatchery: _.get(values.hatchery, "id", null),
                  house: _.get(values.house, "id", null),
                  pen: _.get(values.pen, "id", null),
                  generation: _.get(values, "generation", null),
                };
              }}
              name={"Export Body Egg Production"}
            />
          </Stack>
        </Container>
      </CreateLayout>
    </>
  );
};

export default ExportChickensPage;
