import React, { useEffect } from "react";
import * as yup from "yup";
import { ReductionReason } from "@/models";
import { FormLayout, CreateNewIcon, HistoryIcon, CancelIcon } from "@/lib/crud";
import { reductionReasonApi } from "../services";

const schema = yup.object({
  name: yup.string().required(),
});

export const ReductionReasonForm = ({
  data,
  redirect = true,
}: {
  data?: ReductionReason;
  redirect?: boolean;
}) => {
  return (
    <>
      <FormLayout<ReductionReason>
        id={data?.id || 0}
        data={data}
        baseUrl="/reduction-reasons"
        title="Create Reduction Reason"
        schema={schema}
        createEndpoint={reductionReasonApi.endpoints.createReductionReason}
        updateEndpoint={reductionReasonApi.endpoints.updateReductionReason}
        deleteEndpoint={reductionReasonApi.endpoints.deleteReductionReason}
        summaryEndpoint={reductionReasonApi.endpoints.getReductionReasonSummary}
        beforeSubmit={(values: Partial<ReductionReason>) => {
          const cleaned_data: Partial<ReductionReason> = {
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
