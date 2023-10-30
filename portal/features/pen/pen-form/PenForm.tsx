import React, { useEffect } from "react";
import * as yup from "yup";
import { House, Pen } from "@/models";
import { FormLayout } from "@/lib/crud";
import { penApi } from "../services";
import { houseApi } from "@/features/houses/services";
import { HouseForm } from "@/features/houses";

type Inputs = Partial<Pen>;

const schema = yup.object({
  name: yup.string().required(),
  house: yup.object().required(),
});

const PenForm = ({
  pen,
  redirect = true,
}: {
  pen?: Pen;
  redirect?: boolean;
}) => {
  return (
    <>
      <FormLayout<Pen>
        baseUrl="/pen"
        schema={schema}
        createEndpoint={penApi.endpoints.createPen}
        updateEndpoint={penApi.endpoints.updatePen}
        fields={{
          name: { label: "Name" },
          house: {
            label: "House",
            endpoint: houseApi.endpoints.getHouses,
            form: <HouseForm />,
          },
        }}
      />
    </>
  );
};

export default PenForm;
