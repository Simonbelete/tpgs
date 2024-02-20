import React, { useEffect } from "react";
import * as yup from "yup";
import { House, Stage } from "@/models";
import { CancelIcon, CreateNewIcon, FormLayout, HistoryIcon } from "@/lib/crud";
import { stageApi } from "../services";
import { houseApi } from "@/features/houses/services";
import { HouseForm } from "@/features/houses";

const schema = yup.object({
  name: yup.string().required(),
  house: yup.object().required(),
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
