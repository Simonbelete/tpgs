import React, { useEffect } from "react";
import * as yup from "yup";
import { Hatchery, Incubation } from "@/models";
import { FormLayout } from "@/lib/crud";
import { incubationApi } from "../services";
import { hatcheryApi } from "@/features/hatchery/services";
import dayjs from "dayjs";

const schema = yup.object({
  name: yup.string().required(),
  house: yup.object().required(),
});

export const IncubationForm = ({
  pen,
  redirect = true,
}: {
  pen?: Incubation;
  redirect?: boolean;
}) => {
  return (
    <>
      <FormLayout<Incubation>
        title={"Incubation"}
        id={pen?.id || 0}
        data={pen}
        schema={schema}
        createEndpoint={incubationApi.endpoints.createIncubation}
        updateEndpoint={incubationApi.endpoints.updateIncubation}
        deleteEndpoint={incubationApi.endpoints.deleteIncubation}
        summaryEndpoint={incubationApi.endpoints.getIncubationSummary}
        beforeSubmit={(values: Partial<Incubation>) => {
          const cleaned_data: Partial<Incubation> = {
            id: values.id,
            date_time: dayjs(values.date_time).format(
              process.env.NEXT_PUBLIC_API_DATETIME_FORMAT
            ),
            hatchery: (values.hatchery as Hatchery).id || 0,
          };

          return cleaned_data;
        }}
        fields={{
          hatchery: {
            label: "Hatchery",
            placeholder: "Hatchery",
            endpoint: hatcheryApi.endpoints.getHatchery,
          },
          date_time: {
            label: "Date",
            placeholder: "Date",
            type: "datetime",
          },
          temperature_celsius: {
            label: "Temperature (°C)",
            placeholder: "Temperature (°C)",
            postfix: "°C",
          },
          humidity_fahrenheit: {
            label: "Humidity (°F)",
            placeholder: "Humidity(°F)",
            postfix: "°F",
          },
          humidity_percent: {
            label: "Humidity (%)",
            placeholder: "Humidity (%)",
            postfix: "%",
          },
        }}
      />
    </>
  );
};
