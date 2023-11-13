import React, { useEffect } from "react";
import * as yup from "yup";
import { Purpose } from "@/models";
import { CancelIcon, CreateNewIcon, FormLayout, HistoryIcon } from "@/lib/crud";
import { purposeApi } from "../services";

const schema = yup.object({
  name: yup.string().required(),
});

export const PurposeForm = ({
  data,
  shallowRoute = true,
}: {
  data?: Purpose;
  shallowRoute?: boolean;
}) => {
  return (
    <>
      <FormLayout<Purpose>
        title="Purpose Form"
        id={data?.id || 0}
        data={data}
        schema={schema}
        shallowRoute={shallowRoute}
        createEndpoint={purposeApi.endpoints.createPurpose}
        updateEndpoint={purposeApi.endpoints.updatePurpose}
        deleteEndpoint={purposeApi.endpoints.deletePurpose}
        summaryEndpoint={purposeApi.endpoints.getPurposeSummary}
        beforeSubmit={(values: Partial<Purpose>) => {
          const cleaned_data: Partial<Purpose> = {
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
