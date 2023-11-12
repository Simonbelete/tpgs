import React, { useEffect } from "react";
import * as yup from "yup";
import { Farm, House, User } from "@/models";
import { CancelIcon, CreateNewIcon, FormLayout, HistoryIcon } from "@/lib/crud";
import { userApi } from "../services";
import { farmApi } from "@/features/farms/services";

const schema = yup.object({
  name: yup.string().required(),
  house: yup.object().required(),
});

export const UserForm = ({
  data,
  shallowRoute = true,
}: {
  data?: User;
  shallowRoute?: boolean;
}) => {
  return (
    <>
      <FormLayout<User>
        title="User Form"
        id={data?.id || 0}
        data={data}
        schema={schema}
        shallowRoute={shallowRoute}
        createEndpoint={userApi.endpoints.createUser}
        updateEndpoint={userApi.endpoints.updateUser}
        deleteEndpoint={userApi.endpoints.deleteUser}
        summaryEndpoint={userApi.endpoints.getUserSummary}
        beforeSubmit={(values: Partial<User>) => {
          const cleaned_data: Partial<User> = {
            id: values.id,
            name: values.name,
            farms: values.farms?.map((e) => {
              return (e as any).id;
            }),
          };

          return cleaned_data;
        }}
        fields={{
          name: { label: "Name", placeholder: "Name", xs: 12, md: 12 },
          farms: {
            label: "House",
            placeholder: "House",
            endpoint: farmApi.endpoints.getFarms,
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
