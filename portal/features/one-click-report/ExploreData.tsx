import React, { useEffect, useState, useCallback } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  useScrollTrigger,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
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
import {
  useLazyGetChickensRecordSetQuery,
  chickenRecordSetApi,
} from "@/features/chicken-record-set/services";
import {
  useExtraCells,
  ButtonCellType,
} from "@glideapps/glide-data-grid-cells";
import buildPage from "@/util/buildPage";
import { useDispatch } from "react-redux";

const chickenDetailColumn = [
  {
    title: "Tag",
    id: "chicken.tag",
    width: 100,
    property: {
      kind: GridCellKind.Text,
      allowOverlay: false,
      readonly: true,
      style: "faded",
      themeOverride: {
        bgCell: "#EFEFF1",
      },
    },
  },
  {
    title: "Hatch Date",
    id: "chicken.hatch_date",
    width: 100,
    property: {
      kind: GridCellKind.Text,
      allowOverlay: false,
      readonly: true,
      style: "faded",
      themeOverride: {
        bgCell: "#EFEFF1",
      },
    },
  },
  {
    title: "Sex",
    id: "chicken.sex",
    width: 50,
    property: {
      kind: GridCellKind.Text,
      allowOverlay: false,
      readonly: true,
      style: "faded",
      themeOverride: {
        bgCell: "#EFEFF1",
      },
    },
  },
  {
    title: "Breed",
    id: "chicken.breed.display_name",
    width: 100,
    property: {
      kind: GridCellKind.Text,
      allowOverlay: false,
      readonly: true,
      style: "faded",
      themeOverride: {
        bgCell: "#EFEFF1",
      },
    },
  },
  {
    title: "Batch",
    id: "chicken.batch.display_name",
    width: 80,
    property: {
      kind: GridCellKind.Text,
      allowOverlay: false,
      readonly: true,
      style: "faded",
      themeOverride: {
        bgCell: "#EFEFF1",
      },
    },
  },
  // {
  //   title: "House",
  //   id: "chicken.house.display_name",
  //   width: 80,
  //   property: {
  //     kind: GridCellKind.Text,
  //     allowOverlay: false,
  //     readonly: true,
  //     style: "faded",
  //     themeOverride: {
  //       bgCell: "#EFEFF1",
  //     },
  //   },
  // },
  // {
  //   title: "Pen",
  //   id: "chicken.pen.display_name",
  //   width: 80,
  //   property: {
  //     kind: GridCellKind.Text,
  //     allowOverlay: false,
  //     readonly: true,
  //     style: "faded",
  //     themeOverride: {
  //       bgCell: "#EFEFF1",
  //     },
  //   },
  // },
  {
    title: "Cull Date",
    id: "chicken.cull_date",
    width: 100,
    property: {
      kind: GridCellKind.Text,
      allowOverlay: false,
      readonly: true,
      style: "faded",
      themeOverride: {
        bgCell: "#EFEFF1",
      },
    },
  },
  {
    title: "Cull Reason",
    id: "chicken.cull_reason.display_name",
    width: 80,
    property: {
      kind: GridCellKind.Text,
      allowOverlay: false,
      readonly: true,
      style: "faded",
      themeOverride: {
        bgCell: "#EFEFF1",
      },
    },
  },
  {
    title: "Age",
    id: "chicken.age_in_weeks",
    width: 80,
    property: {
      kind: GridCellKind.Text,
      allowOverlay: false,
      readonly: true,
      style: "faded",
      themeOverride: {
        bgCell: "#EFEFF1",
      },
    },
  },
  {
    title: "Cull Week",
    id: "chicken.reduction_in_weeks",
    width: 80,
    property: {
      kind: GridCellKind.Text,
      allowOverlay: false,
      readonly: true,
      style: "faded",
      themeOverride: {
        bgCell: "#EFEFF1",
      },
    },
  },
];

const ExploreData = ({
  filters,
  start_week,
  end_week,
  total,
}: {
  filters?: any;
  start_week: number;
  end_week: number;
  total: number;
}) => {
  const dispatch = useDispatch();
  const [columns, setColumns] = useState<any[]>([...chickenDetailColumn]);

  const [trigger, { data }] = useLazyGetChickensRecordSetQuery();
  const { customRenderers } = useExtraCells();
  const [pageModel, setPageModel] = useState({
    pageSize: 10,
    page: 0,
  });

  const buildFilter = () => {
    return {
      chicken__hatchery: _.get(filters.hatchery, "id", null),
      chicken__generation: _.get(filters.generation, "id", null),
      chicken__breed: _.get(filters.breed, "id", null),
      chicken__house: _.get(filters.house, "id", null),
      chicken__pen: _.get(filters.pen, "id", null),
      chicken__sex: _.get(filters.sex, "value", null),
    };
  };

  const loadMore = () => {
    const newPageModel = { ...pageModel, page: pageModel.page + 1 };
    setPageModel(newPageModel);
    trigger({ ...buildFilter(), ...buildPage(newPageModel) });
  };

  const generateWeekColumns = (start_week: number, end_week: number) => {
    const weekColumns = [];
    for (let i = start_week; i < end_week + 1; i++) {
      weekColumns.push({
        title: "Body Weight (g)",
        id: `body_weight_${i}`,
        property: {
          kind: GridCellKind.Number,
          allowOverlay: false,
          readonly: true,
          style: "faded",
          themeOverride: {
            bgCell: "#EFEFF1",
          },
        },
        width: 80,
        group: `Week ${i}`,
      });
      weekColumns.push({
        title: "No of Eggs",
        id: `eggs_${i}`,
        property: {
          kind: GridCellKind.Number,
          allowOverlay: false,
          readonly: true,
          style: "faded",
          themeOverride: {
            bgCell: "#EFEFF1",
          },
        },
        width: 80,
        group: `Week ${i}`,
      });
      weekColumns.push({
        title: "Total Egg Weight (g)",
        id: `eggs_weight_${i}`,
        property: {
          kind: GridCellKind.Number,
          allowOverlay: false,
          readonly: true,
          style: "faded",
          themeOverride: {
            bgCell: "#EFEFF1",
          },
        },
        width: 80,
        group: `Week ${i}`,
      });
      weekColumns.push({
        title: "Feed Intake (g)",
        id: `feed_weight_${i}`,
        property: {
          kind: GridCellKind.Number,
          allowOverlay: false,
          readonly: true,
          style: "faded",
          themeOverride: {
            bgCell: "#EFEFF1",
          },
        },
        width: 80,
        group: `Week ${i}`,
      });
    }

    return weekColumns;
  };

  useEffect(() => {
    dispatch(chickenRecordSetApi.util.resetApiState());
    setColumns([
      ...chickenDetailColumn,
      ...generateWeekColumns(start_week, end_week),
    ]);

    if (filters) trigger(buildFilter());
  }, [filters]);

  const getContent = useCallback(
    (cell: Item): GridCell | any => {
      const [col, row] = cell;
      const dataRow = data?.results[row];
      const dataCol = columns[col];

      if (
        String(dataCol.id).match(
          "(body_weight|eggs|eggs_weight|feed_weight)_[0-9]*"
        )
      ) {
        // Render Columns grouped that are grouped by week
        return renderWeeklyData(cell);
      } else {
        // other rows
        const d = _.get(dataRow, dataCol.id, "");

        if (
          row == _.get(data?.results, "length", -1) &&
          _.get(data?.results, "length", -1) != 0
        ) {
          // Add Load More to the end of line
          return {
            kind: GridCellKind.Custom,
            allowOverlay: false,
            readonly: true,
            span: [0, chickenDetailColumn.length - 1],
            data: {
              kind: "button-cell",
              backgroundColor: ["transparent", "#6572ffee"],
              color: ["accentColor", "accentFg"],
              borderColor: "#6572ffa0",
              borderWidth: "0",
              // borderRadius: 9,
              title: `Load More +${
                (total || 0) - (pageModel.page + 1) * pageModel.pageSize
              }`,
              onClick: () => loadMore(),
            },
            themeOverride: {
              baseFontStyle: "700 12px",
            },
          };
        } else if (dataCol.property.kind == GridCellKind.Custom) {
          return {
            ...dataCol.property,
            data: {
              kind: "button-cell",
              backgroundColor: ["transparent", "#6572ffee"],
              color: ["accentColor", "accentFg"],
              borderColor: "#fff",
              borderRadius: 9,
              title: "Delete",
            },
          };
        } else {
          return {
            kind: GridCellKind.Text,
            allowOverlay: true,
            readonly: false,
            displayData: String(d ?? ""),
            data: String(d),
            ...dataCol.property,
          };
        }
      }
    },
    [data, columns]
  );

  const renderWeeklyData = (cell: Item) => {
    const [col, row] = cell;
    const dataRow = data?.results[row];
    const dataCol = columns[col];

    const colName = String(dataCol.id).split(/_[0-9]+/)[0];

    let d = _.get(dataRow, colName, "-");

    return {
      kind: GridCellKind.Number,
      allowOverlay: true,
      readonly: false,
      displayData: String(d ?? ""),
      data: Number(d),
    };
  };

  return (
    <Sizer>
      <DataEditor
        height={"800px"}
        width="100%"
        customRenderers={customRenderers}
        getCellContent={getContent}
        columns={columns}
        rows={(data?.results.length ?? 0) + 1}
        freezeColumns={1}
        rowMarkers={"both"}
      />
    </Sizer>
  );
};

export default ExploreData;
