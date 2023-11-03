import React, { useEffect } from "react";
import * as yup from "yup";
import { Feed, Chicken } from "@/models";
import { CancelIcon, CreateNewIcon, FormLayout, HistoryIcon } from "@/lib/crud";
import { feedApi } from "../services";
import { chickenApi } from "@/features/chickens/services";
import { ChickenForm } from "@/features/chickens";

const schema = yup.object({
  chicken: yup.object().nullable(),
  formula: yup.object().nullable(),
  week: yup
    .number()
    .typeError("Week must be number")
    .min(0)
    .required("Week is required"),
  weight: yup.number(),
});

export const FeedForm = ({
  data,
  shallowRoute = true,
}: {
  data?: Feed;
  shallowRoute?: boolean;
}) => {
  return (
    <>
      <FormLayout<Feed>
        title="Feed Form"
        id={data?.id || 0}
        data={data}
        schema={schema}
        shallowRoute={shallowRoute}
        createEndpoint={feedApi.endpoints.createFeed}
        updateEndpoint={feedApi.endpoints.updateFeed}
        deleteEndpoint={feedApi.endpoints.deleteFeed}
        summaryEndpoint={feedApi.endpoints.getFeedSummary}
        beforeSubmit={(values: Partial<Feed>) => {
          const cleaned_data: Partial<Feed> = {
            id: values.id,
            week: values.week,
            weight: values.weight,
            chicken: (values.chicken as Chicken).id || 0,
            formula: (values.formula as any)?.id || 0,
          };

          return cleaned_data;
        }}
        fields={{
          chicken: {
            label: "chicken",
            placeholder: "Chicken",
            endpoint: chickenApi.endpoints.getChickens,
            form: <ChickenForm />,
            xs: 12,
            md: 12,
          },
          week: { label: "Week", placeholder: "Week", xs: 12, md: 12 },
          weight: {
            label: "Feed weight (g)",
            placeholder: "Feed weight (g)",
            xs: 12,
            md: 12,
            postfix: "g",
          },
          formula: {
            label: "Formula",
            placeholder: "Formula",
            endpoint: formulaApi.endpoints.getFormulas,
            dataKey: "name",
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
