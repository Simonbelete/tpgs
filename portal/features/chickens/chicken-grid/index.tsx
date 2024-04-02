import React, { useEffect, useRef, useState } from "react";
import {
  DataEditor,
  EditableGridCell,
  GridCell,
  GridCellKind,
  GridColumn,
  Item,
  GetRowThemeCallback,
  GridMouseEventArgs,
} from "@glideapps/glide-data-grid";
import { Sizer } from "@/features/formula/components";
import _ from "lodash";
import { Box, Stack, Button, Backdrop } from "@mui/material";
import { ChickenDropdown } from "../chicken-dropdown";
import {
  useLazyGetChickenGridQuery,
  useCreateChickenGridMutation,
  useDeleteChickenGridMutation,
} from "../services";
import { Chicken, ChickenGrid } from "@/models";
import MuiSaveIcon from "@mui/icons-material/Save";
import { Dna } from "react-loader-spinner";
import { enqueueSnackbar } from "notistack";
import { useExtraCells } from "@glideapps/glide-data-grid-cells";
import { ChickenForm } from "../chicken-form";

type ColumnProperty = {} & Partial<GridCell>;

type Column = {
  id: string;
  property?: ColumnProperty;
} & GridColumn;

export const GridChickenInput = ({ tag = null }: { tag?: string }) => {
  const [chicken, setChicken] = useState<Chicken | null>(tag ?? null);

  const [trigger, { data: gridData, isFetching: getChickenGridIsFetching }] =
    useLazyGetChickenGridQuery();

  const [createTrigger, createResult] = useCreateChickenGridMutation();
  const [deleteTrigger, deleteResult] = useDeleteChickenGridMutation();

  const [rows, setRows] = useState<ChickenGrid[]>([]);
  const columns = [
    {
      title: "Week",
      id: "week",
      width: 80,
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
      group: "Body Weight",
    },
    {
      title: "No of Eggs",
      id: "eggs",
      property: {
        kind: GridCellKind.Number,
        allowOverlay: true,
        readonly: false,
      },
      group: "Egg Production",
    },
    {
      title: "Total Egg Weight (g)",
      id: "eggs_weight",
      property: {
        kind: GridCellKind.Number,
        allowOverlay: true,
        readonly: false,
      },
      group: "Egg Production",
    },
    {
      title: "Feed Intake (g)",
      id: "feed_weight",
      property: {
        kind: GridCellKind.Number,
        allowOverlay: true,
        readonly: false,
      },
      group: "Feed Intake",
    },
    {
      title: "Setting",
      id: "setting",
      property: {
        kind: GridCellKind.Custom,
        copyData: "4",
        allowOverlay: false,
        data: {
          kind: "button-cell",
          backgroundColor: ["transparent", "#6572ffee"],
          color: ["accentColor", "accentFg"],
          borderColor: "#6572ffa0",
          borderRadius: 9,

          title: "Delete",
        },
      },
    },
  ];

  const { customRenderers } = useExtraCells();

  const getContent = React.useCallback(
    (cell: Item): GridCell | any => {
      const [col, row] = cell;
      const dataRow = rows[row];
      const dataCol = columns[col];

      const d = _.get(dataRow, dataCol.id, "");

      if (dataCol.property.kind == GridCellKind.Custom) {
        return {
          ...dataCol.property,
          data: {
            kind: "button-cell",
            backgroundColor: ["transparent", "#6572ffee"],
            color: ["accentColor", "accentFg"],
            borderColor: "#fff",
            borderRadius: 9,
            title: "Delete",
            onClick: () => deleteRow(row),
          },
        };
      } else {
        // @ts-ignore
        return {
          kind: GridCellKind.Text,
          allowOverlay: true,
          readonly: false,
          // ...dataCol.property,
          displayData: String(d),
          data: String(d),
        };
      }
    },
    [rows]
  );

  const getChickenData = async () => {
    if (chicken == null) return;

    const response = await trigger(chicken.id).unwrap();
    if (response.results) {
      const dr = _.map(response.results, (o) => {
        return { ...o };
      });
      setRows(dr);
    }
  };

  useEffect(() => {
    if (chicken != null) {
      getChickenData();
    }
  }, [chicken]);

  const onCellEdited = React.useCallback(
    (cell: Item, newValue: EditableGridCell) => {
      const [col, row] = cell;
      const dataCol = columns[col];
      const dataRow = rows[row];

      const rowCopy = [...rows];

      const index = _.findIndex(
        rows,
        (o) => o != dataRow && o.week == dataRow.week
      );

      if (index != -1) {
        enqueueSnackbar(`Week, Already exists`, {
          variant: "warning",
        });
        return;
      }

      _.set(rowCopy[row], dataCol.id, newValue.data);

      setRows(rowCopy);
      sortByWeek(rowCopy);
    },
    [rows]
  );

  const sortByWeek = (rowCopy: ChickenGrid[]) => {
    setRows(_.sortBy(rowCopy, ["week"]));
  };

  const onRowAppended = React.useCallback(() => {
    const rowCopy = [...rows];

    _.set(rowCopy, rows.length, {
      week: Number(_.get(rowCopy, `${rowCopy.length - 1}.week`, 0)) + 1,
      eggs_weight: null,
      eggs: null,
      feed_weight: null,
      body_weight: null,
    });

    setRows(rowCopy);
  }, [rows]);

  const save = async () => {
    if (chicken == null) return;
    try {
      const response = await createTrigger({
        id: chicken.id,
        data: rows,
      }).unwrap();
      if (response.results) {
        enqueueSnackbar(`Updated`, {
          variant: "success",
        });
        setRows(response.results);
      } else {
        enqueueSnackbar(`Failed to save`, {
          variant: "error",
        });
      }
    } catch {
      enqueueSnackbar(`Failed to save`, {
        variant: "error",
      });
    }
  };

  const deleteRow = async (index: number) => {
    if (
      chicken != null &&
      (_.get(rows[index], "egg_id") != null ||
        _.get(rows[index], "feed_id") != null ||
        _.get(rows[index], "body_weight_id") != null)
    ) {
      const choice = confirm("Are you sure you want to delete!");
      if (choice) {
        const response = await deleteTrigger({
          id: chicken.id,
          data: rows[index],
        }).unwrap();

        getChickenData();
      }
    } else {
      setRows(rows.filter((e, i) => i != index));
    }
  };

  /**
   * Row Hover
   */
  const [hoverRow, setHoverRow] = React.useState<number | undefined>(undefined);

  const onItemHovered = React.useCallback((args: GridMouseEventArgs) => {
    const [_, row] = args.location;
    setHoverRow(args.kind !== "cell" ? undefined : row);
  }, []);

  const getRowThemeOverride = React.useCallback<GetRowThemeCallback>(
    (row) => {
      if (row !== hoverRow) return undefined;
      return {
        bgCell: "#f7f7f7",
        bgCellMedium: "#f0f0f0",
      };
    },
    [hoverRow]
  );

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
        sx={{ my: 3 }}
        gap={1}
        alignItems={"start"}
      >
        <Button
          onClick={save}
          color="primary"
          variant="contained"
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
          viewForm={<ChickenForm shallowRoute={false} />}
        />
      </Box>
      <Sizer>
        <DataEditor
          height={"800px"}
          width="100%"
          customRenderers={customRenderers}
          onCellEdited={onCellEdited}
          getCellContent={getContent}
          columns={columns}
          rows={rows.length}
          freezeColumns={1}
          onRowAppended={onRowAppended}
          trailingRowOptions={{
            sticky: true,
            tint: true,
            hint: "Add new",
          }}
          rowMarkers={"both"}
          onItemHovered={onItemHovered}
          getRowThemeOverride={getRowThemeOverride}
        />
      </Sizer>
      <Stack
        direction={{ xs: "column", md: "row" }}
        sx={{ my: 5 }}
        gap={1}
        alignItems={"center"}
      >
        <Button
          onClick={save}
          color="primary"
          variant="contained"
          size="small"
          startIcon={<MuiSaveIcon fontSize="small" />}
          sx={{ textTransform: "none" }}
        >
          Save
        </Button>
      </Stack>
    </div>
  );
};
