import React, { useEffect } from "react";
import * as yup from "yup";
import { Chicken } from "@/models";
import { CancelIcon, CreateNewIcon, FormLayout, HistoryIcon } from "@/lib/crud";
import { chickenApi } from "../services";
import { hatcheryApi } from "@/features/hatchery/services";
import { penApi } from "@/features/pen/services";
import _ from "lodash";

const schema = yup.object({
  tag: yup.string().required(),
  sex: yup.string().nullable(),
  sire: yup.object().nullable(),
  dam: yup.object().nullable(),
  hatchery: yup.object().nullable(),
  pen: yup.object().nullable(),
});

const sexOptions = [
  { value: null, name: "---" },
  { value: "M", name: "Male" },
  { value: "F", name: "Female" },
];

export const ChickenForm = ({
  data,
  shallowRoute = true,
}: {
  data?: Chicken;
  shallowRoute?: boolean;
}) => {
  return (
    <>
      <FormLayout<Chicken>
        title="Chicken Form"
        id={data?.id || 0}
        data={data}
        schema={schema}
        shallowRoute={shallowRoute}
        createEndpoint={chickenApi.endpoints.createChicken}
        updateEndpoint={chickenApi.endpoints.updateChicken}
        deleteEndpoint={chickenApi.endpoints.deleteChicken}
        summaryEndpoint={chickenApi.endpoints.getChickenSummary}
        beforeSubmit={(values: Partial<Chicken>) => {
          const cleaned_data: Partial<Chicken> = {
            id: values.id,
            tag: values.tag,
            sex: _.get(values, "sex.value", null),
            sire: _.get(values, "sire.id", null),
            dam: _.get(values, "dam.id", null),
            hatchery: _.get(values, "hatchery.id", null),
            pen: _.get(values, "pen.id", null),
          };

          return cleaned_data;
        }}
        fields={{
          tag: { label: "Tag", placeholder: "Tag", xs: 12, md: 6 },
          sex: {
            label: "Sex",
            placeholder: "Sex",
            options: sexOptions,
            xs: 12,
            md: 6,
          },
          sire: {
            label: "Sire",
            placeholder: "Select Sire",
            endpoint: chickenApi.endpoints.getMaleChickens,
            xs: 12,
            md: 6,
          },
          dam: {
            label: "Dam",
            placeholder: "Select Dam",
            endpoint: chickenApi.endpoints.getFeMaleChickens,
            xs: 12,
            md: 6,
          },
          hatchery: {
            label: "Hatchery",
            placeholder: "Select Hatchery",
            endpoint: hatcheryApi.endpoints.getHatchery,
            xs: 12,
            md: 6,
          },
          pen: {
            label: "Pen",
            placeholder: "Select Pen",
            endpoint: penApi.endpoints.getPens,
            xs: 12,
            md: 6,
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
