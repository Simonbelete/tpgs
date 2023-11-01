import React, { useEffect } from "react";
import * as yup from "yup";
import { House } from "@/models";
import { CancelIcon, CreateNewIcon, FormLayout, HistoryIcon } from "@/lib/crud";
import { houseApi } from "../services";

const schema = yup.object({
  name: yup.string().required(),
});

export const HouseForm = ({
  data,
  shallowRoute = true,
}: {
  data?: House;
  shallowRoute?: boolean;
}) => {
  return (
    <>
      <FormLayout<House>
        title="House Form"
        id={data?.id || 0}
        data={data}
        schema={schema}
        shallowRoute={shallowRoute}
        createEndpoint={houseApi.endpoints.createHouse}
        updateEndpoint={houseApi.endpoints.updateHouse}
        deleteEndpoint={houseApi.endpoints.deleteHouse}
        summaryEndpoint={houseApi.endpoints.getHouseSummary}
        beforeSubmit={(values: Partial<House>) => {
          const cleaned_data: Partial<House> = {
            id: values.id,
            name: values.name,
          };

          return cleaned_data;
        }}
        fields={{
          name: { label: "Name", placeholder: "Name", xs: 12, md: 12 },
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
