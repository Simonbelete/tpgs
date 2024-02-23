import React from "react";
import { Box } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedFrom } from "./slice";
import { reductionReasonApi } from "@/features/reduction-reason/services";
import { ReductionReason } from "@/models";
import { AsyncDropdown } from "@/components/dropdowns";
import { RootState } from "@/store";

const ReductionReasonSelect = () => {
  const dispatch = useDispatch();
  const selection = useSelector((state: RootState) => state.selection);

  return (
    <Box sx={{ maxWidth: "80%" }}>
      <AsyncDropdown<ReductionReason>
        multiple={true}
        value={selection?.selected_from || []}
        dataKey={"name"}
        label={"Cull"}
        placeholder="Cull"
        endpoint={reductionReasonApi.endpoints.getReductionReasons}
        query={{ stage__order__lt: selection?.stage?.order || 1 }}
        onChange={(_, data) => dispatch(setSelectedFrom(data))}
      />
    </Box>
  );
};

export default ReductionReasonSelect;
