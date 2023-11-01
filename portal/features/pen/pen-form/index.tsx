import React, { useEffect } from "react";
import * as yup from "yup";
import { House, Pen } from "@/models";
import { FormLayout } from "@/lib/crud";
import { penApi } from "../services";
import { houseApi } from "@/features/houses/services";
import { HouseForm } from "@/features/houses";

const schema = yup.object({
  name: yup.string().required(),
  house: yup.object().required(),
});

export const PenForm = ({
  pen,
  redirect = true,
}: {
  pen?: Pen;
  redirect?: boolean;
}) => {
  return (
    <>
      <FormLayout<Pen>
        id={pen?.id || 0}
        data={pen}
        schema={schema}
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
          name: { label: "Name", placeholder: "Name" },
          house: {
            label: "House",
            placeholder: "House",
            endpoint: houseApi.endpoints.getHouses,
            form: <HouseForm />,
          },
        }}
      />
    </>
  );
};
