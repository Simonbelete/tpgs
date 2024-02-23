import React from "react";
import { Box, Stack } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setReductionReason, setReductionDate } from "./slice";
import { reductionReasonApi } from "@/features/reduction-reason/services";
import { ReductionReason } from "@/models";
import { AsyncDropdown } from "@/components/dropdowns";
import { RootState } from "@/store";
import { DatePicker } from "@mui/x-date-pickers";

const ReductionReasonSelect = () => {
  const dispatch = useDispatch();
  const selection = useSelector((state: RootState) => state.selection);

  return (
    <Stack gap={2} sx={{ maxWidth: "80%" }}>
      <AsyncDropdown<ReductionReason>
        value={selection?.reduction_reason || []}
        dataKey={"name"}
        label={"Cull"}
        placeholder="Cull"
        endpoint={reductionReasonApi.endpoints.getReductionReasons}
        onChange={(_, data) => dispatch(setReductionReason(data))}
      />
      <DatePicker
        slotProps={{
          textField: {
            size: "small",
            fullWidth: true,
          },
        }}
        onChange={(data) => dispatch(setReductionDate(data))}
        value={selection.reduction_date}
      />
    </Stack>
  );
};

export default ReductionReasonSelect;
