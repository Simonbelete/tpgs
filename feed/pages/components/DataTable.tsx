import React, {
  ReactElement,
  useRef,
  useMemo,
  useEffect,
  useState,
} from "react";
import {
  DataEditor,
  EditableGridCell,
  GridCell,
  GridCellKind,
  GridColumn,
  Item,
  GridColumnIcon,
} from "@glideapps/glide-data-grid";
import { data } from "autoprefixer";
import _ from "lodash";
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

interface Ingredient {
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
  min: string;
  max: string;
}

const DataTable = (): ReactElement => {
  const columns = useMemo<GridColumn[]>(() => {
    return [
      { title: "Name", id: "name" },
      { title: "%", id: "qty", icon: GridColumnIcon.HeaderNumber, width: 100 },
      {
        title: "Price/Unit",
        id: "price",
        icon: GridColumnIcon.HeaderNumber,
        width: 100,
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
  const dataRef = useRef([
    {
      name: "Maze",
      qty: "10",
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
      min: "",
      max: "",
    },

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
      min: "",
      max: "",
    },
    {
      name: "Recipe",
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
      min: "",
      max: "",
    },
    {
      name: "Requirement",
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
      min: "",
      max: "",
    },
  ]);

  const [chartData, setChartData] = useState([]);

  const getContent = React.useCallback((cell: Item): GridCell => {
    const [col, row] = cell;
    const dataRow = dataRef.current[row];
    // dumb but simple way to do this
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
      "min",
      "max",
    ];
    const d = dataRow[indexes[col]];
    return {
      kind: GridCellKind.Text,
      allowOverlay: true,
      displayData: d,
      data: d,
    };
  }, []);

  const onCellEdited = React.useCallback(
    (cell: Item, newValue: EditableGridCell) => {
      if (newValue.kind !== GridCellKind.Text) {
        // we only have text cells, might as well just die here.
        return;
      }

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
        "min",
        "max",
      ];
      const [col, row] = cell;
      const key = indexes[col];

      // Set value change
      dataRef.current[row][key] = newValue.data;

      let col_values = new Map();

      // const's
      const last_index = dataRef.current.length - 1;
      const recipe_index = last_index - 1;

      let chart_data = [];
      // Calculate Each Column indexes sum & values
      for (let i = 1; i < indexes.length; i++) {
        const col_key = indexes[i];
        let vals: any = _.map(
          dataRef.current.slice(0, recipe_index),
          (o: Ingredient) => {
            if (i == 2) return Number(o[col_key]);
            else return (Number(o.qty) * Number(o[col_key])) / 100;
          }
        );

        col_values.set(indexes[i], vals);

        // Set sum
        const sum = String(_.sum(vals));
        dataRef.current[recipe_index][col_key] = sum;
        let per =
          (Number(sum) / Number(dataRef.current[last_index][col_key])) * 100 ||
          0;

        chart_data.push({
          name: indexes[i],
          sum: sum,
          // IN %
          value: isFinite(per) ? per : 0,
        });
      }

      setChartData(chart_data as any);
    },
    []
  );

  return (
    <div>
      <DataEditor
        getCellContent={getContent}
        rowMarkers={"both"}
        onCellEdited={onCellEdited}
        columns={columns}
        rows={dataRef.current.length}
        trailingRowOptions={{
          hint: "New row...",
          sticky: true,
          tint: true,
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

export default DataTable;
