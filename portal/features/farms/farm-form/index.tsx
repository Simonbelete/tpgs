import React, { useEffect } from "react";
import * as yup from "yup";
import { Farm } from "@/models";
import { Form } from "@/lib/crud";
import { farmApi } from "../services";
import _ from "lodash";
import { countryApi } from "@/features/countries/services";
import { cityApi } from "@/features/cities/services";
import { Card } from "@/components";
import { Typography } from "@mui/material";

const schema = yup.object({
  tenant_name: yup.string().required(),
  email: yup.string().email().nullable(),
  phone_number: yup.number().nullable(),
  address: yup.string().nullable(),
  country: yup.object().nullable(),
  city: yup.object().nullable(),
});

export const FarmForm = ({
  data,
  shallowRoute = true,
}: {
  data?: Farm;
  shallowRoute?: boolean;
}) => {
  return (
    <>
      <Typography variant="title">
        {data && `${data.display_name || ""} - Edit`}
      </Typography>
      <br />
      <br />
      <Card title="Farm">
        <Form<Farm>
          data={data}
          schema={schema}
          shallowRoute={shallowRoute}
          createEndpoint={farmApi.endpoints.createFarm}
          updateEndpoint={farmApi.endpoints.updateFarm}
          beforeSubmit={(values: Partial<Farm>) => {
            const cleaned_data: Partial<Farm> = {
              id: values.id,
              tenant_name: values.tenant_name,
              email: values.email,
              phone_number: values.phone_number,
              address: values.address,
              country: _.get(values, "country.id", null),
              city: _.get(values, "city.id", null),
            };
            return cleaned_data;
          }}
          fields={{
            tenant_name: { label: "Name", placeholder: "Name", xs: 12, md: 6 },
            email: { label: "Email", placeholder: "Email", xs: 12, md: 6 },
            phone_number: {
              label: "Phone Number",
              placeholder: "Phone Number",
              xs: 12,
              md: 6,
            },
            address: {
              label: "Address",
              placeholder: "Address",
              xs: 12,
              md: 6,
            },
            country: {
              label: "Country",
              placeholder: "Country",
              endpoint: countryApi.endpoints.getCountries,
              xs: 12,
              md: 6,
            },
            city: {
              label: "City",
              placeholder: "City",
              endpoint: cityApi.endpoints.getCities,
              xs: 12,
              md: 6,
            },
          }}
        />
      </Card>
    </>
  );
};
