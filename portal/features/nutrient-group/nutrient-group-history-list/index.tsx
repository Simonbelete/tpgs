import React from "react";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { HistoryList } from "@/lib/crud";
import { nutrientGroupApi } from "../services";
import { NutrientGroup, NutrientGroupHistory } from "@/models";

export const NutrientGroupHistoryList = ({ data }: { data: NutrientGroup }) => {
  const columns: GridColDef[] = [{ field: "name", headerName: "Name" }];
  return (
    <HistoryList<NutrientGroupHistory>
      columns={columns}
      getHistoryQuery={{ id: data.id, query: {} }}
      getHistoryEndpoint={nutrientGroupApi.endpoints.getNutrientGroupHistory}
    />
  );
};
