import React, { useEffect } from "react";
import * as yup from "yup";
import { Breed, House, FeedGuideline } from "@/models";
import { CancelIcon, CreateNewIcon, FormLayout, HistoryIcon } from "@/lib/crud";
import { feedGuidelineApi } from "../services";
import { breedApi } from "@/features/breeds/services";
import { BreedForm } from "@/features/breeds";

const schema = yup.object({
  week: yup.number().min(0).required(),
  feed: yup.string().min(0).required(),
  breed: yup.object().required(),
});

export const FeedGuidelineForm = ({
  data,
  shallowRoute = true,
}: {
  data?: FeedGuideline;
  shallowRoute?: boolean;
}) => {
  return (
    <>
      <FormLayout<FeedGuideline>
        title="FeedGuideline Form"
        id={data?.id || 0}
        data={data}
        schema={schema}
        shallowRoute={shallowRoute}
        createEndpoint={feedGuidelineApi.endpoints.createFeedGuideline}
        updateEndpoint={feedGuidelineApi.endpoints.updateFeedGuideline}
        deleteEndpoint={feedGuidelineApi.endpoints.deleteFeedGuideline}
        summaryEndpoint={feedGuidelineApi.endpoints.getFeedGuidelineSummary}
        beforeSubmit={(values: Partial<FeedGuideline>) => {
          const cleaned_data: Partial<FeedGuideline> = {
            id: values.id,
            week: values.week,
            weight: values.weight,
            breed: (values.breed as Breed).id || 0,
          };

          return cleaned_data;
        }}
        fields={{
          breed: {
            label: "Breed",
            placeholder: "Breed",
            endpoint: breedApi.endpoints.getBreeds,
            form: <BreedForm />,
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
