import React, { useEffect } from "react";
import * as yup from "yup";
import { Feed, Chicken } from "@/models";
import { CancelIcon, CreateNewIcon, FormLayout, HistoryIcon } from "@/lib/crud";
import { feedApi } from "../services";
import { chickenApi } from "@/features/chickens/services";
import { ChickenForm } from "@/features/chickens";
import { formulaApi } from "@/features/formula/services";
import _ from "lodash";

const schema = yup.object({
  chicken: yup.object().required("Chicken tag is required"),
  formula: yup.object().nullable(),
  week: yup
    .number()
    .typeError("Week must be number")
    .min(0)
    .required("Week is required")
    .test(
      "is-age-in-given-week",
      "Given week is greater than the chicken's age",
      (value, context) => {
        const { chicken } = context.parent;

        if (chicken?.age_in_weeks == 0) return true;

        if (value > chicken?.age_in_weeks) return false;

        return true;
      }
    ),
  weight: yup
    .number()
    .transform((value) => (Number.isNaN(value) ? null : value))
    .min(0)
    .required("Feed Weight is required"),
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
        title="Feed intake"
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
            formula: _.get(values, "formula", null),
          };

          return cleaned_data;
        }}
        fields={{
          chicken: {
            label: "Chicken",
            placeholder: "Chicken",
            endpoint: chickenApi.endpoints.getChickens,
            dataKey: "display_name",
            xs: 12,
            md: 12,
            viewForm: ChickenForm,
          },
          week: {
            label: "Week",
            placeholder: "Week",
            xs: 12,
            md: 12,
            type: "number",
            unresectable: true,
          },
          weight: {
            label: "Feed weight (g)",
            placeholder: "Feed weight (g)",
            xs: 12,
            md: 12,
            postfix: "g",
            type: "number",
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
