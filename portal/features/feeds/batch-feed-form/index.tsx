import React, { useEffect } from "react";
import * as yup from "yup";
import { Feed, Chicken } from "@/models";
import { CancelIcon, CreateNewIcon, FormLayout, HistoryIcon } from "@/lib/crud";
import { feedApi } from "../services";
import { directoryApi } from "@/features/directory/services";
import { formulaApi } from "@/features/formula/services";

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

export const BatchFeedForm = ({
  data,
  shallowRoute = true,
}: {
  data?: Feed;
  shallowRoute?: boolean;
}) => {
  return (
    <>
      <FormLayout<Feed>
        title="Batch Feed Form"
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
            pen: values.batch?.pen_id || 0,
            hatchery: values.batch?.hatchery_id || 0,
            formula: (values.formula as any)?.id || 0,
          };

          return cleaned_data;
        }}
        fields={{
          batch: {
            label: "Batch",
            placeholder: "Batch",
            endpoint: directoryApi.endpoints.getBatchDdrectories,
            dataKey: "batch_name",
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
