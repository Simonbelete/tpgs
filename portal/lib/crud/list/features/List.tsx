import React, { ReactNode, useEffect } from "react";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Box, LinearProgress } from "@mui/material";
import StripedDataGrid, {
  CustomNoRowsOverlay,
} from "../components/StripedDataGrid";

export interface ListProps {
  columns: GridColDef[];
  actions: React.FC<GridRenderCellParams>[];
  endpoint: any;
}

const List = ({ columns, actions, endpoint }: ListProps) => {
  const [trigger, { data, isLoading }] = endpoint.useLazyQuery();

  const settingColumn: GridColDef = {
    field: "Actions",
    flex: 1,
    minWidth: 150,
    headerAlign: "center",
    align: "right",
    renderCell(params) {
      return (
        <Box>
          {actions.map((E, i) => (
            <E key={i} />
          ))}
        </Box>
      );
    },
  };

  const getRowById = (row: any) => {
    // if (setting == SETTING_COL.history) return row.history_id;
    return row.id;
  };

  useEffect(() => {
    trigger({}, true);
  }, []);

  {
    console.log(data);
  }

  return (
    <StripedDataGrid
      sx={{ background: "white", height: "100%" }}
      rows={data?.results || []}
      loading={isLoading}
      density="compact"
      rowHeight={55}
      columns={[...columns, settingColumn]}
      paginationMode="server"
      disableRowSelectionOnClick
      slots={{
        noRowsOverlay: CustomNoRowsOverlay,
        loadingOverlay: LinearProgress,
      }}
      getRowClassName={(params) =>
        params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
      }
      getRowId={getRowById}
    />
  );
};

export default List;
