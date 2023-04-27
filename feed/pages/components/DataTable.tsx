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
import { Modal, Button, Box } from "@mui/material";
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
import IngredientModal from "./IngredientModal";
import axios from "axios";

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

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const DataTable = (): ReactElement => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [ingredients, setIngredients] = React.useState<Ingredient[]>([]);
  const [selectedIngredients, setSelectedIngredients] = React.useState<
    Ingredient[]
  >([]);
  const [selectIndexes, setSelectedIndexes] = React.useState<string[]>([]);

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

  const initData = [
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
  ];

  const dataRef = useRef<Ingredient[]>([]);

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
      "ratio_min",
      "ratio_max",
    ];
    const d = dataRow[indexes[col]];
    return {
      kind: GridCellKind.Text,
      allowOverlay: true,
      displayData: String(d),
      data: String(d),
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
        "ratio_min",
        "ratio_max",
      ];
      const [col, row] = cell;
      const key = indexes[col];

      // Set value change
      dataRef.current[row][key] = newValue.data;

      let col_values = new Map();

      // const's
      const last_index = dataRef.current.length - 1;
      const recipe_index = last_index - 1; // Ration index

      let chart_data = [];
      // Calculate Each Column indexes sum & values
      for (let i = 1; i < indexes.length; i++) {
        const col_key = indexes[i];
        let vals: any = _.map(
          dataRef.current.slice(0, recipe_index),
          (o: Ingredient) => {
            // For the first two columns return exact value
            if (i <= 2) return Number(o[col_key]);
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

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/ingredients")
      .then(function (response) {
        let res_data = _.map(response.data, (data) => {
          return {
            name: data["name"],
            qty: "0",
            price: String(data["price"]),
            dm: String(data["dm"]),
            me: String(data["me"]),
            cp: String(data["cp"]),
            lys: String(data["lys"]),
            meth: String(data["meth"]),
            mc: String(data["mc"]),
            ee: String(data["ee"]),
            cf: String(data["cf"]),
            ca: String(data["ca"]),
            p: String(data["p"]),
            ratio_min: String(data["ratio_min"]),
            ratio_max: String(data["ratio_max"]),
          };
        });
        // dataRef.current = _.union(res_data, initData);
        dataRef.current = initData;
        setIngredients(res_data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  const handleIngredientOnChange = (e: any) => {
    let sel_ingred: Ingredient[] = [];
    const values = [...e.target.selectedOptions].map((opt) => {
      sel_ingred.push(ingredients[opt.value]);
      return String(opt.value);
    });
    setSelectedIndexes(values);
    console.log(sel_ingred);
    dataRef.current = _.union(
      sel_ingred,
      dataRef.current.slice(dataRef.current.length - 3, dataRef.current.length)
    );
  };

  return (
    <div>
      <div>
        <Button onClick={handleOpen}>Ingredients</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <select
              multiple
              size={6}
              onChange={handleIngredientOnChange}
              value={selectIndexes}
            >
              {ingredients.map((data, key) => (
                <option key={key} value={key}>
                  {data.name}
                </option>
              ))}
            </select>
          </Box>
        </Modal>
      </div>

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
