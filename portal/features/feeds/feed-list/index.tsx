import React, { useEffect } from "react";
import * as yup from "yup";
import { House, Feed } from "@/models";
import { CancelIcon, CreateNewIcon, FormLayout, HistoryIcon } from "@/lib/crud";
import { feedApi } from "../services";
import { houseApi } from "@/features/houses/services";
import { HouseForm } from "@/features/houses";

const schema = yup.object({
  name: yup.string().required(),
  house: yup.object().required(),
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
            wee: values.name,
            house: (values.house as House).id || 0,
          };

          return cleaned_data;
        }}
        fields={{
          name: { label: "Name", placeholder: "Name", xs: 12, md: 12 },
          house: {
            label: "House",
            placeholder: "House",
            endpoint: houseApi.endpoints.getHouses,
            form: <HouseForm />,
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
