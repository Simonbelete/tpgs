import React, { useEffect } from "react";
import * as yup from "yup";
import { Breed } from "@/models";
import { CancelIcon, CreateNewIcon, FormLayout, HistoryIcon } from "@/lib/crud";
import { breedApi } from "../services";

const schema = yup.object({
  name: yup.string().required(),
  house: yup.object().required(),
});

export const BreedForm = ({
  data,
  shallowRoute = true,
}: {
  data?: Breed;
  shallowRoute?: boolean;
}) => {
  return (
    <>
      <FormLayout<Breed>
        title="Breed Form"
        id={data?.id || 0}
        data={data}
        schema={schema}
        shallowRoute={shallowRoute}
        createEndpoint={breedApi.endpoints.createBreed}
        updateEndpoint={breedApi.endpoints.updateBreed}
        deleteEndpoint={breedApi.endpoints.deleteBreed}
        summaryEndpoint={breedApi.endpoints.getBreedSummary}
        beforeSubmit={(values: Partial<Breed>) => {
          const cleaned_data: Partial<Breed> = {
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
