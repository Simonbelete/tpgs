import React, { useEffect, useState } from "react";
import { GridColDef } from "@mui/x-data-grid";
import { ListLayout } from "@/lib/crud";
import { currencyApi } from "../services";
import { Currency } from "@/models";

export const CurrencyList = () => {
  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "code", headerName: "code", flex: 1 },
  ];
  return (
    <ListLayout<Currency>
      baseUrl="/currencies"
      title="Currency"
      columns={columns}
      actions={[]}
      getEndpoint={currencyApi.endpoints.getCurrencies}
      getRowId={(row) => row.code}
    />
  );
};
