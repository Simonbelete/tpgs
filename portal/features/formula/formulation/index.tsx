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
    {id: 'ration', title: '%'},
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

        const initRation: any = {id: 'ration', name: 'Ration'}
        const initReq: any = {id: 'requirement', name: 'Requirement'}

        indexes.current = columns.current.map(e => {
          const key: string = e.id || "";
          if(key !== 'name' ) {
            initRation[key] = '';
            initReq[key] = '';
          }
          return String(e.id)
        });

        rows.current = [ initRation, initReq]

        refresh();
      })
    }
  }, []);


  const onCellEdited = React.useCallback(
    (cell: Item, newValue: EditableGridCell) => {
      const [col, row] = cell;

      if (rows.current[row] == undefined) {
        return;
      }

      // @ts-ignore
      rows.current[row][indexes.current[col]] = newValue.data;

      const ROW_RATION_INDEX = rows.current.length - 2;
      const ROW_REQUIREMENT_INDEX = rows.current.length - 1;
    
      for(let c=1; c<columns.current.length; c+=1) {
        const col_key: string = columns.current[c].id || "";
        
        let col_total: number = 0

        for(let r=0; r<ROW_RATION_INDEX; r+=1){
          const ration = rows.current[r]['ration'];
          const cell = rows.current[r][col_key]

          let result = 0

          if(c == 1) {
            // For ration column
            result = cell;
          } else {
            result = ration * cell / 100;
          }

          col_total += (result || 0) 
        }

        rows.current[ROW_RATION_INDEX][col_key] = col_total;
      }

      console.log(rows.current)

  }, [columns]);

  const getContent = React.useCallback(
    (cell: Item): GridCell => {
      const [col, row] = cell;
      const dataRow = rows.current[row];

      // @ts-ignore
      let d = dataRow != undefined ? dataRow[indexes.current[col]] : "";

      const ROW_RATION_INDEX = rows.current.length - 2;
      const ROW_REQUIREMENT_INDEX = rows.current.length - 1;

      if (col == 0) {
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
      }else if (
        (ROW_REQUIREMENT_INDEX == row || col == 1) &&
        row != ROW_RATION_INDEX
      ) {
        return {
          kind: GridCellKind.Number,
          allowOverlay: true,
          displayData: String(d ?? 0),
          data: Number(d ?? 0),
        };
      } else {
        return {
          kind: GridCellKind.Number,
          allowOverlay: false,
          readonly: true,
          displayData: String(d ?? 0),
          data: Number(d ?? 0),
          style: "faded",
          themeOverride: {
            bgCell: "#EFEFF1",
          },
        };
      }
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
      row,
      ...rows.current,
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