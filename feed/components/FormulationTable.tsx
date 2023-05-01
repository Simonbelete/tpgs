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
import { Modal, Button, Box, MenuItem, Select } from "@mui/material";
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

interface Recipe {
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
  const [openRecipe, setOpenRecipe] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [ingredients, setIngredients] = React.useState<Ingredient[]>([]);
  const [recipes, setRecipes] = React.useState<Recipe[]>([]);
  const [selectedRecipeIndex, setSelectedRecipeIndex] =
    React.useState<number>();
  const [selectIndexes, setSelectedIndexes] = React.useState<string[]>([]);

  const getContent = React.useCallback(
    (cell: Item): GridCell => {
      const [col, row] = cell;
      const dataRow = data.current[row];

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

      // const's
      const last_index = data.current.length - 1;
      const recipe_index = last_index - 1; // Ration index

      let chart_data = [];
      // Calculate Each Column indexes sum & values
      // indexes.length - 2 don't include min and max ratio
      for (let i = 1; i < indexes.length - 2; i++) {
        if (data.current[recipe_index] == undefined) {
          continue;
        }

        const col_key = indexes[i];
        let vals: any = _.map(
          data.current.slice(0, recipe_index),
          (o: Ingredient) => {
            // For the first two columns return exact value
            if (i == 1) return Number(o[col_key]);
            else return (Number(o.qty) * Number(o[col_key])) / 100;
          }
        );

        // Set sum
        const sum = String(_.sum(vals).toFixed(2));
        data.current[recipe_index][col_key] = sum;

        let per =
          (Number(sum) / Number(data.current[last_index][col_key])) * 100 || 0;

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

  const handleIngredientOnChange = (e: any) => {
    let sel_ingred: Ingredient[] = [];
    const values = [...e.target.selectedOptions].map((opt) => {
      sel_ingred.push(ingredients[opt.value]);
      return String(opt.value);
    });
    setSelectedIndexes(values);
    data.current = _.union(
      sel_ingred,
      data.current.slice(data.current.length - 3, data.current.length)
    );
  };

  const handleRecipeOnChange = (e: any) => {
    console.log(e.target);
    setOpenRecipe(false);
    // setSelectedRecipeIndex(e.target)
  };

  const handleClearIngredinets = (e: any) => {
    data.current = data.current.slice(
      data.current.length - 3,
      data.current.length
    );
    setSelectedIndexes([]);
  };

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
        setIngredients(res_data);
      })
      .catch(function (error) {
        console.log(error);
      });
    axios
      .get("http://127.0.0.1:8000/api/recipes")
      .then(function (response) {
        setRecipes(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <Box mb={3} ml={2}>
        <Button onClick={handleOpen} variant="outlined" size="small">
          Ingredients
        </Button>
        <Button
          onClick={() => setOpenRecipe(true)}
          variant="outlined"
          size="small"
        >
          Requirements
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Button onClick={handleClearIngredinets}>Clear</Button>
            <select
              style={{ width: "100%", height: "300px" }}
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
        {/* Recipes Modal */}
        <Modal
          open={openRecipe}
          onClose={() => {
            setOpenRecipe(false);
          }}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Select
              style={{ width: "100%" }}
              onChange={handleRecipeOnChange}
              value={selectedRecipeIndex}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Requirement"
            >
              {recipes.map((data, key) => (
                <MenuItem key={key} value={key}>
                  {data.name}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </Modal>
      </Box>
      <DataEditor
        width="100%"
        columns={columns}
        rows={data.current.length}
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
            <Tooltip />
            <Legend />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default FormulationTable;
