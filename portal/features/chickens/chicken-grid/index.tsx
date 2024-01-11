import React, { useEffect, useRef, useState } from "react";
import {
  DataEditor,
  EditableGridCell,
  GridCell,
  GridCellKind,
  GridColumn,
  Item,
} from "@glideapps/glide-data-grid";
import { Sizer } from "@/features/formula/components";
import _ from "lodash";
import { Box, Stack, Button, Backdrop } from "@mui/material";
import { ChickenDropdown } from "../chicken-dropdown";
import {
  useLazyGetChickenGridQuery,
  useCreateChickenGridMutation,
} from "../services";
import { Chicken } from "@/models";
import MuiSaveIcon from "@mui/icons-material/Save";
import { Dna } from "react-loader-spinner";

type ColumnProperty = {} & Partial<GridCell>;

type Column = {
  id: string;
  property?: ColumnProperty;
} & GridColumn;

type Row = {
  egg_id: number | null;
  egg_weight: number | null;
  eggs: number | null;
  feed_id: number | null;
  feed_weight: number | null;
  week: number;
  weight_id: number | null;
};

export const GridChickenInput = () => {
  const [chicken, setChicken] = useState<Chicken | null>(null);

  const [trigger, { data: gridData, isFetching: getChickenGridIsFetching }] =
    useLazyGetChickenGridQuery();

  const [createTrigger] = useCreateChickenGridMutation();

  const [rows, setRows] = useState<Row[]>([]);
  const [columns, setColumns] = useState<Column[]>([
    {
      title: "Week",
      id: "week",
      property: {
        kind: GridCellKind.Number,
        allowOverlay: true,
        readonly: false,
      },
    },
    {
      title: "Body Weight (g)",
      id: "body_weight",
      property: {
        kind: GridCellKind.Number,
        allowOverlay: true,
        readonly: false,
      },
    },
    {
      title: "No of Eggs",
      id: "eggs",
      property: {
        kind: GridCellKind.Number,
        allowOverlay: true,
        readonly: false,
      },
    },
    {
      title: "Total Egg Weight (g)",
      id: "egg_weight",
      property: {
        kind: GridCellKind.Number,
        allowOverlay: true,
        readonly: false,
      },
    },
    {
      title: "Feed Intake (g)",
      id: "feed_weight",
      property: {
        kind: GridCellKind.Number,
        allowOverlay: true,
        readonly: false,
      },
    },
  ]);

  const getContent = React.useCallback(
    (cell: Item): GridCell => {
      const [col, row] = cell;
      const dataRow = rows[row];
      const dataCol = columns[col];

      const d = _.get(dataRow, dataCol.id, "");

      // @ts-ignore
      return {
        kind: GridCellKind.Text,
        allowOverlay: true,
        readonly: false,
        // ...dataCol.property,
        displayData: String(d),
        data: String(d),
      };
    },
    [rows, columns]
  );

  useEffect(() => {
    console.log("chicken");
    if (chicken != null) {
      trigger(chicken.id)
        .unwrap()
        .then((response) => {
          if (response.results) {
            const dr = _.map(response.results, (o) => {
              return { ...o };
            });
            setRows(dr);
          }
        });
    }
  }, [chicken]);

  const onCellEdited = React.useCallback(
    (cell: Item, newValue: EditableGridCell) => {
      const [col, row] = cell;
      const dataCol = columns[col];

      const rowCopy = [...rows];

      _.set(rowCopy[row], dataCol.id, newValue.data);

      setRows(rowCopy);
      sortByWeek(rowCopy);
    },
    [rows]
  );

  const sortByWeek = (rowCopy: Row[]) => {
    setRows(_.sortBy(rowCopy, ["week"]));
  };

  const checkIfRowExists = (week: number) => {};

  const onRowAppended = React.useCallback(() => {}, []);

  const save = async () => {
    if (chicken == null) return;
    try {
      const response = await createTrigger({
        id: chicken.id,
        data: rows,
      }).unwrap();
      if (response.results) {
        setRows(response.results);
      } else {
        // TODO: display error
      }
    } catch {}
  };

  return (
    <div style={{ position: "relative" }}>
      <Backdrop
        sx={{
          position: "absolute",
          backgroundColor: "rgba(255,255,255,0.5)",
          opacity: "0.9",
          top: 0,
          bottom: 0,
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={getChickenGridIsFetching}
        onClick={() => {}}
      >
        <Dna
          visible={true}
          height="200"
          width="200"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper"
        />
      </Backdrop>
      <Stack
        direction={{ xs: "column", md: "row" }}
        sx={{ my: 5 }}
        gap={1}
        alignItems={"center"}
      >
        <Button
          onClick={save}
          color="secondary"
          size="small"
          startIcon={<MuiSaveIcon fontSize="small" />}
          sx={{ textTransform: "none" }}
        >
          Save
        </Button>
      </Stack>
      <Box sx={{ mb: 2 }}>
        <ChickenDropdown
          onChange={(event: any, newValue: any) => {
            console.log(newValue);
            setChicken(newValue);
          }}
        />
      </Box>
      <Sizer>
        <DataEditor
          width="100%"
          onCellEdited={onCellEdited}
          getCellContent={getContent}
          columns={columns}
          rows={rows.length + 2}
          freezeColumns={1}
          onRowAppended={onRowAppended}
          trailingRowOptions={{
            sticky: true,
            tint: true,
            hint: "Add new",
          }}
        />
      </Sizer>
    </div>
  );
};
