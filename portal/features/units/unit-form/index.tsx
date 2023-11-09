import React, { useEffect } from "react";
import * as yup from "yup";
import { House, Unit } from "@/models";
import { CancelIcon, CreateNewIcon, FormLayout, HistoryIcon } from "@/lib/crud";
import { unitApi } from "../services";
import { houseApi } from "@/features/houses/services";
import { HouseForm } from "@/features/houses";

const schema = yup.object({
  name: yup.string().required(),
});

export const UnitForm = ({
  data,
  shallowRoute = true,
}: {
  data?: Unit;
  shallowRoute?: boolean;
}) => {
  return (
    <>
      <FormLayout<Unit>
        title="Unit Form"
        id={data?.id || 0}
        data={data}
        schema={schema}
        shallowRoute={shallowRoute}
        createEndpoint={unitApi.endpoints.createUnit}
        updateEndpoint={unitApi.endpoints.updateUnit}
        deleteEndpoint={unitApi.endpoints.deleteUnit}
        summaryEndpoint={unitApi.endpoints.getUnitSummary}
        beforeSubmit={(values: Partial<Unit>) => {
          const cleaned_data: Partial<Unit> = {
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
