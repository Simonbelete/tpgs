import React, { useEffect } from "react";
import * as yup from "yup";
import { Hatchery, Incubation } from "@/models";
import { FormLayout } from "@/lib/crud";
import { incubationApi } from "../services";
import { hatcheryApi } from "@/features/hatchery/services";
import dayjs from "dayjs";

const schema = yup.object({
  hatchery: yup.object().required(),
  date_time: yup.string().required(),
  temperature_celsius: yup.number().nullable(),
  humidity_fahrenheit: yup.number().nullable(),
  humidity_percent: yup.number().nullable(),
  remark: yup.string().nullable(),
});

export const IncubationForm = ({
  data,
  shallowRoute = true,
}: {
  data?: Incubation;
  shallowRoute?: boolean;
}) => {
  return (
    <>
      <FormLayout<Incubation>
        title={"Incubation"}
        id={data?.id || 0}
        data={data}
        schema={schema}
        shallowRoute={shallowRoute}
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
            temperature_celsius: values.temperature_celsius,
            humidity_fahrenheit: values.humidity_fahrenheit,
            humidity_percent: values.humidity_percent,
            remark: values.remark,
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
          remark: {
            label: "Remark",
            placeholder: "Remark",
          },
        }}
      />
    </>
  );
};
