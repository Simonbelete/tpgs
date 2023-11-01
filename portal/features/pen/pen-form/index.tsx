import React, { useEffect } from "react";
import * as yup from "yup";
import { House, Pen } from "@/models";
import { CancelIcon, CreateNewIcon, FormLayout, HistoryIcon } from "@/lib/crud";
import { penApi } from "../services";
import { houseApi } from "@/features/houses/services";
import { HouseForm } from "@/features/houses";

const schema = yup.object({
  name: yup.string().required(),
  house: yup.object().required(),
});

export const PenForm = ({
  data,
  shallowRoute = true,
}: {
  data?: Pen;
  shallowRoute?: boolean;
}) => {
  return (
    <>
      <FormLayout<Pen>
        title="Pen Form"
        id={data?.id || 0}
        data={data}
        schema={schema}
        shallowRoute={shallowRoute}
        createEndpoint={penApi.endpoints.createPen}
        updateEndpoint={penApi.endpoints.updatePen}
        deleteEndpoint={penApi.endpoints.deletePen}
        summaryEndpoint={penApi.endpoints.getPenSummary}
        beforeSubmit={(values: Partial<Pen>) => {
          const cleaned_data: Partial<Pen> = {
            id: values.id,
            name: values.name,
            house: (values.house as House).id || 0,
          };

          return cleaned_data;
        }}
        fields={{
          name: { label: "Name", placeholder: "Name", xs: 12, md: 12 },
          house: {
            label: "House",
            placeholder: "House",
            endpoint: houseApi.endpoints.getHouses,
            form: <HouseForm />,
            xs: 12,
            md: 12,
          },
        }}
        menus={
          <>
            <CreateNewIcon />
            <HistoryIcon />
            <CancelIcon />
          </>
        }
      />
    </>
  );
};
