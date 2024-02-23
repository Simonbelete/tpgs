import React from "react";
import { Box, Stack } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedFrom, setName } from "./slice";
import { hatcheryApi } from "@/features/hatchery/services";
import { Hatchery } from "@/models";
import { AsyncDropdown } from "@/components/dropdowns";
import { RootState } from "@/store";
import { LabeledInput } from "@/components/inputs";

export const HatchSelect = () => {
  const dispatch = useDispatch();
  const selection = useSelector((state: RootState) => state.selection);

  return (
    <Stack gap={2} sx={{ maxWidth: "80%" }}>
      <AsyncDropdown<Hatchery>
        multiple={true}
        value={selection?.selected_from || []}
        dataKey={"name"}
        label={"Hatch Selections"}
        placeholder="Hatch Selections"
        endpoint={hatcheryApi.endpoints.getHatchery}
        query={{ stage__order__lt: selection?.stage?.order || 1 }}
        onChange={(_, data) => dispatch(setSelectedFrom(data))}
      />
      <LabeledInput
        name={"name"}
        error={selection.name == null}
        helperText={"Input name"}
        onChange={(event) => {
          dispatch(setName(event.target.value));
        }}
        fullWidth
        size="small"
        value={selection.name ?? ""}
        label={"Name"}
        placeholder={"Name"}
      />
    </Stack>
  );
};
