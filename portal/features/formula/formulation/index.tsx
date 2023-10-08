import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  DataEditor,
  EditableGridCell,
  GridCell,
  GridCellKind,
  GridColumn,
  Item,
  GridColumnIcon,
} from "@glideapps/glide-data-grid";
import { useGetNutrientsQuery, useLazyGetNutrientsQuery } from '@/features/nutrients/services';
import { useLazyGetIngredientNutrientsQuery } from '@/features/ingredients/services';
import { Loading } from "@/components";
import { Sizer } from "../components";
import { Ingredient, Nutrient } from "@/models";
import {
  IngredientSelectDialog,
} from "@/features/ingredients";

type Column = {} & GridColumn;

const Formulation = ({ saveRef }: { saveRef: React.Ref<unknown> }) => {
  const [getNutrients, { data: nutreints, isUninitialized, isLoading: nutrientIsLoading}] = useLazyGetNutrientsQuery();
  const [getIngredientNutrients] = useLazyGetIngredientNutrientsQuery();

  const defaultColumns: Column[] = [
    {id: 'name', title: 'Name'},
    {id: 'value', title: '%'},
    {id: 'price', title: 'Price[Kg]'},
    {id: 'dm', title: 'DM[%]'}
  ]

  const [isLoading, setIsLoading] = useState(false);
  const [isIngredientOpen, setIsIngredientOpen] = useState(false);
  const [refState, setRefresh] = useState(1);
  const columns = useRef<Column[]>([]);
  const rows = useRef<any[]>([
  ]);
  const indexes = useRef<string[]>([]);

  const refresh = () => setRefresh(refState+1);

  useEffect(() => {
    if(isUninitialized){
      getNutrients({}).unwrap().then((response) => {
        const cols: GridColumn[] = (response?.results || [] ).map(e => {
          return {
            id: e.abbreviation,
            title: e.abbreviation
          } as GridColumn
        })

        columns.current = [
          ...defaultColumns,
          ...cols
        ];

        indexes.current = columns.current.map(e => String(e.id));

        refresh();
      })
    }
  }, []);


  const onCellEdited = React.useCallback(
    (cell: Item, newValue: EditableGridCell) => {
      const [col, row] = cell;
  }, [columns]);

  const getContent = React.useCallback(
    (cell: Item): GridCell => {
      const [col, row] = cell;
      const dataRow = rows.current[row];

      // @ts-ignore
      let d = dataRow != undefined ? dataRow[indexes.current[col]] : "";

      return {
        kind: GridCellKind.Text,
        readonly: true,
        allowOverlay: false,
        displayData: String(d ?? ""),
        data: String(d ?? ""),
        style: "faded",
        themeOverride: {
          bgCell: "#EFEFF1",
        },
      };
    },
    [rows]
  );

  const onRowAppended = React.useCallback(() => {
    setIsIngredientOpen(true);
  }, []);

  const onCellActivated = React.useCallback((cell: Item) => {}, []);


  const handleSelected = async (value?: Ingredient) => {
    if (value == undefined || value == null) return;
    setIsIngredientOpen(false);
    setIsLoading(true);
    try{
      const newRow: any = {
        name: value.name,
        value: 0,
        price: value.price,
        dm: value.dm,
      }
      const response = await getIngredientNutrients({id: value.id, query: {}}).unwrap();
      for(let i=0; i<response.results.length; i+=1){
        let abbvr: string = (response.results[0].nutrient as Nutrient).abbreviation
        newRow[abbvr] = response.results[i].value;
      }
  
      pushRow(newRow);
    }finally {
      setIsLoading(false);
    }
  }

  const pushRow = (row: any) => {
    rows.current = [
      ...rows.current,
      row
    ]
    refresh();
  }
  const pushcolumn = (col: Column) => {
    columns.current = [
      ...columns.current,
      col
    ];
    refresh();
  } 

  return (
    <>
      <Loading open={nutrientIsLoading || isLoading} />
      <IngredientSelectDialog
        open={isIngredientOpen}
        onSelected={handleSelected}
        onClose={() => setIsIngredientOpen(false)}
      />
      <Sizer>
        <DataEditor
           width="100%"
           experimental={{ strict: true }}
           columns={columns.current}
           rows={rows.current.length}
           isDraggable={true}
           freezeColumns={1}
           rowMarkers="number"
           onCellEdited={onCellEdited}
           getCellContent={getContent}
           onRowAppended={onRowAppended}
           onCellActivated={onCellActivated}
           trailingRowOptions={{
             // How to get the trailing row to look right
             sticky: true,
             tint: true,
             hint: "Add Ingredient",
           }}
         />
      </Sizer>
    </>
  )
}

export default Formulation;