import React, { useEffect } from "react";
import * as yup from "yup";
import { Stage } from "@/models";
import { CancelIcon, CreateNewIcon, FormLayout, HistoryIcon } from "@/lib/crud";
import { stageApi } from "../services";

const schema = yup.object({
  name: yup.string().required(),
  order: yup.number().required(),
  description: yup.string().nullable(),
  min_week: yup.number().min(0).nullable(),
  max_week: yup.number().min(0).nullable(),
});

export const StageForm = ({
  data,
  shallowRoute = true,
}: {
  data?: Stage;
  shallowRoute?: boolean;
}) => {
  return (
    <>
      <FormLayout<Stage>
        title="Stage"
        id={data?.id || 0}
        data={data}
        schema={schema}
        shallowRoute={shallowRoute}
        createEndpoint={stageApi.endpoints.createStage}
        updateEndpoint={stageApi.endpoints.updateStage}
        deleteEndpoint={stageApi.endpoints.deleteStage}
        summaryEndpoint={stageApi.endpoints.getStageSummary}
        beforeSubmit={(values: Partial<Stage>) => {
          const cleaned_data: Partial<Stage> = {
            id: values.id,
            name: values.name,
            description: values.description,
            order: values.order,
            min_week: values.min_week,
            max_week: values.max_week,
          };

          return cleaned_data;
        }}
        fields={{
          name: { label: "Name", placeholder: "Name", xs: 12, md: 12 },
          description: {
            label: "Description",
            placeholder: "Description",
            xs: 12,
            md: 12,
          },
          order: {
            label: "Order",
            placeholder: "Order",
            xs: 12,
            md: 12,
            type: "number",
          },
          min_week: {
            label: "Minimum Week",
            placeholder: "Minimum Week",
            xs: 12,
            md: 6,
            type: "number",
          },
          max_week: {
            label: "Maximum Week",
            placeholder: "Maximum Week",
            xs: 12,
            md: 6,
            type: "number",
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
