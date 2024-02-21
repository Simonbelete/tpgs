import React from "react";
import { Box } from "@mui/material";
import { HatcheryDropdown } from "@/features/hatchery";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedFrom } from "./slice";
import { hatcheryApi } from "@/features/hatchery/services";
import { Hatchery } from "@/models";
import { AsyncDropdown } from "@/components/dropdowns";
import { RootState } from "@/store";

export const HatchSelect = () => {
  const dispatch = useDispatch();
  const selection = useSelector((state: RootState) => state.selection);

  return (
    <Box sx={{ maxWidth: "80%" }}>
      <AsyncDropdown<Hatchery>
        multiple={true}
        dataKey={"name"}
        label={"Hatch Selections"}
        placeholder="Hatch Selections"
        endpoint={hatcheryApi.endpoints.getHatchery}
        query={{ stage__order__lt: selection?.stage?.order || 1 }}
        onChange={(_, data) => dispatch(setSelectedFrom(data))}
      />
    </Box>
  );
};
