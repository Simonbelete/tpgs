import React, {
  ReactElement,
  useRef,
  useMemo,
  useState,
  useEffect,
} from "react";
import _ from "lodash";
import {
  DataEditor,
  EditableGridCell,
  GridCell,
  GridCellKind,
  GridColumn,
  Item,
  GridColumnIcon,
  DataEditorProps,
  GridSelection,
} from "@glideapps/glide-data-grid";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Modal, Button, Box } from "@mui/material";

interface Ingredient {
  id?: string;
  name: string;
  qty: string;
  price: string;
  dm: string;
  me: string;
  cp: string;
  lys: string;
  meth: string;
  mc: string;
  ee: string;
  cf: string;
  ca: string;
  p: string;
  ratio_min: string;
  ratio_max: string;
}

const FormulationTable = (): ReactElement => {
  const data = useRef<Ingredient[]>([
    {
      name: "",
      qty: "",
      price: "",
      dm: "",
      me: "",
      cp: "",
      lys: "",
      meth: "",
      mc: "",
      ee: "",
      cf: "",
      ca: "",
      p: "",
      ratio_min: "",
      ratio_max: "",
    },
    {
      name: "Ration",
      qty: "",
      price: "",
      dm: "",
      me: "",
      cp: "",
      lys: "",
      meth: "",
      mc: "",
      ee: "",
      cf: "",
      ca: "",
      p: "",
      ratio_min: "",
      ratio_max: "",
    },
    {
      name: "Requirement",
      qty: "100",
      price: "0",
      dm: "0",
      me: "0",
      cp: "0",
      lys: "0",
      meth: "0",
      mc: "0",
      ee: "0",
      cf: "0",
      ca: "0",
      p: "0",
      ratio_min: "",
      ratio_max: "",
    },
  ]);
  const indexes: (keyof Ingredient)[] = [
    "name",
    "qty",
    "price",
    "dm",
    "me",
    "cp",
    "lys",
    "meth",
    "mc",
    "ee",
    "cf",
    "ca",
    "p",
    "ratio_min",
    "ratio_max",
  ];
  const columns = useMemo<GridColumn[]>(() => {
    return [
      { title: "Name", id: "name" },
      { title: "%", id: "qty", icon: GridColumnIcon.HeaderNumber, width: 100 },
      {
        title: "Price/Unit",
        id: "price",
        icon: GridColumnIcon.HeaderNumber,
      },
      { title: "DM%", id: "dm", icon: GridColumnIcon.HeaderNumber, width: 100 },
      { title: "ME%", id: "me", icon: GridColumnIcon.HeaderNumber, width: 100 },
      { title: "CP%", id: "cp", icon: GridColumnIcon.HeaderNumber, width: 100 },
      {
        title: "Lys%",
        id: "lys",
        icon: GridColumnIcon.HeaderNumber,
        width: 100,
      },
      {
        title: "Meth%",
        id: "meth",
        icon: GridColumnIcon.HeaderNumber,
        width: 100,
      },
      {
        title: "M+C%",
        id: "mc",
        icon: GridColumnIcon.HeaderNumber,
        width: 100,
      },
      { title: "EE%", id: "ee", icon: GridColumnIcon.HeaderNumber, width: 100 },
      { title: "CF%", id: "cf", icon: GridColumnIcon.HeaderNumber, width: 100 },
      { title: "Ca%", id: "ca", icon: GridColumnIcon.HeaderNumber, width: 100 },
      { title: "P%", id: "p", icon: GridColumnIcon.HeaderNumber, width: 100 },
      {
        title: "Min%",
        id: "min",
        icon: GridColumnIcon.HeaderNumber,
        width: 100,
      },
      {
        title: "Max%",
        id: "max",
        icon: GridColumnIcon.HeaderNumber,
        width: 100,
      },
    ];
  }, []);

  const generateCellData = (): Ingredient => {
    return {
      name: "",
      qty: "",
      price: "",
      dm: "",
      me: "",
      cp: "",
      lys: "",
      meth: "",
      mc: "",
      ee: "",
      cf: "",
      ca: "",
      p: "",
      ratio_min: "",
      ratio_max: "",
    };
  };

  // For Forcing re-render
  const [numRows, setNumRows] = React.useState(data.current.length);
  const [chartData, setChartData] = useState([]);

  const getContent = React.useCallback(
    (cell: Item): GridCell => {
      const [col, row] = cell;
      const dataRow = data.current[row];

      console.log("re-render table");
      console.log(dataRow);

      const d = dataRow != undefined ? dataRow[indexes[col]] : "";
      return {
        kind: GridCellKind.Text,
        allowOverlay: true,
        displayData: String(d),
        data: String(d),
      };
    },
    [data.current, numRows, indexes]
  );

  const onRowAppended = React.useCallback(() => {
    const newRow = data.current.length;
    data.current = _.union([generateCellData()], data.current);
    setNumRows((cv) => cv + 1);
  }, [numRows]);

  const onCellEdited = React.useCallback(
    (cell: Item, newValue: EditableGridCell) => {
      if (newValue.kind !== GridCellKind.Text) {
        // we only have text cells, might as well just die here.
        return;
      }
      const [col, row] = cell;
      const key = indexes[col];

      if (data.current[row] == undefined) {
        return;
      }

      // Set value change
      data.current[row][key] = newValue.data;

      // // const's
      // const last_index = data.current.length - 1;
      // const recipe_index = last_index - 1; // Ration index

      // let chart_data = [];
      // // Calculate Each Column indexes sum & values
      // for (let i = 1; i < indexes.length; i++) {
      //   const col_key = indexes[i];
      //   let vals: any = _.map(
      //     data.current.slice(0, recipe_index),
      //     (o: Ingredient) => {
      //       // For the first two columns return exact value
      //       if (i == 1) return Number(o[col_key]);
      //       else return (Number(o.qty) * Number(o[col_key])) / 100;
      //     }
      //   );

      //   // Set sum
      //   const sum = String(_.sum(vals).toFixed(2));
      //   data.current[recipe_index][col_key] = sum;

      //   let per =
      //     (Number(sum) / Number(data.current[last_index][col_key])) * 100 || 0;

      //   chart_data.push({
      //     name: indexes[i],
      //     sum: sum,
      //     // IN %
      //     value: isFinite(per) ? per : 0,
      //   });
      // }

      // setChartData(chart_data as any);
    },
    []
  );

  return (
    <div>
      <DataEditor
        width="100%"
        columns={columns}
        rows={numRows}
        rowMarkers={"both"}
        onCellEdited={onCellEdited}
        onPaste={true}
        getCellContent={getContent}
        trailingRowOptions={{
          // How to get the trailing row to look right
          sticky: true,
          tint: true,
          hint: "New row...",
        }}
        isDraggable={true}
        freezeColumns={1}
        onRowAppended={onRowAppended}
        onDelete={(selection: GridSelection) => {
          _.pullAt(data.current, selection.rows.toArray());
          console.log(data.current);
          setNumRows(data.current.length);
          return true;
        }}
      />
      <div style={{ marginTop: "100px" }}>
        <ResponsiveContainer width="100%" height={500}>
          <BarChart data={chartData}>
            <Bar dataKey="value" fill="#8884d8" />
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            {/* <Tooltip /> */}
            <Legend />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default FormulationTable;
