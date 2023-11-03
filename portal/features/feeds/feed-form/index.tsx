import React, { useEffect } from "react";
import * as yup from "yup";
import { Feed, Chicken } from "@/models";
import { CancelIcon, CreateNewIcon, FormLayout, HistoryIcon } from "@/lib/crud";
import { feedApi } from "../services";
import { chickenApi } from "@/features/chickens/services";

const schema = yup.object({
  batch: yup.object().nullable(),
  flock: yup.object().nullable(),
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
        title="Feed Intake Form"
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
          };

          return cleaned_data;
        }}
        fields={{
          chicken: {
            label: "House",
            placeholder: "House",
            endpoint: chickenApi.endpoints.getChickens,
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
