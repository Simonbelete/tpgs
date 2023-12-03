import React, { useEffect, useState } from "react";
import { IconButton, Menu, MenuList, MenuItem, Box } from "@mui/material";
import type { Column, Row } from "./Formulation";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import { PlainModal } from "@/components/modals";
import dynamic from "next/dynamic";
import { PieChartSkeleton } from "@/components";
import _ from "lodash";

const Plot = dynamic(() => import("react-plotly.js"), {
  ssr: false,
  loading: () => <PieChartSkeleton />,
});

/**
 *
 * @param columns are only the nutrients
 * @returns
 */
const Analysis = ({ columns, rows }: { columns: Column[]; rows: Row[] }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const [ndOpen, setndOpen] = useState(false);
  const [ndData, setndData] = useState([]);

  const [pricedOpen, setPricedOpen] = useState(false);
  const [pricedData, setPricedData] = useState<Object[]>([]);

  const [minMaxOpen, setMinMaxOpen] = useState(false);
  const [minMaxData, setMinMaxData] = useState<Object[]>([]);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handlendOpen = () => {
    setndOpen(true);

    const data: any = [];

    const totals = {};

    columns.forEach((el) => {
      const total = _.sumBy(rows, (o) => _.get(o, el.path, 0));

      if (total != null) _.set(totals, `${el.id}`, total);
      else _.set(totals, `${el.id}`, 0);
    });

    rows.forEach((r) => {
      const x: number[] = [];
      const y: string[] = [];
      _.forEach(r.nutrients, (el, key) => {
        const normalized = (el.value / _.get(totals, key, 0)) * 100;
        x.push(normalized);
        y.push(key);
      });

      data.push({
        x,
        y,
        name: r.display_name,
        type: "bar",
        orientation: "h",
      });
    });

    setndData(data);
  };

  const handlePricedOpen = () => {
    setPricedOpen(true);
    const data: any = {
      type: "pie",
      values: [],
      labels: [],
      textinfo: "label+percent",
      textposition: "outside",
      automargin: true,
    };
    rows.forEach((r) => {
      data.values.push(r.unit_price);
      data.labels.push(r.display_name);
    });

    setPricedData([data]);
  };

  const handleMinMaxOpen = () => {
    setMinMaxOpen(true);

    const data: any = {
      x: [],
      y: [],
      type: "bar",
      error_y: {
        type: "data",
        symmetric: false,
        array: [],
        arrayminus: [],
      },
    };

    rows.forEach((r) => {
      data.x.push(r.display_name);
      data.y.push(r.ratio || 0);

      data.error_y.array.push(r.max);
      data.error_y.arrayminus.push(r.min);
    });

    setMinMaxData([data]);
  };

  return (
    <div>
      <PlainModal onClose={() => setndOpen(false)} open={ndOpen}>
        <Box sx={{ mt: 4 }}>
          <Plot
            layout={{
              title: "Nutrient distribuation",
              height: 500,
              barmode: "stack",
            }}
            config={{ responsive: true }}
            style={{ width: "100%" }}
            data={ndData}
          />
        </Box>
      </PlainModal>
      <PlainModal onClose={() => setPricedOpen(false)} open={pricedOpen}>
        <Box sx={{ mt: 4 }}>
          <Plot
            data={pricedData}
            layout={{
              title: "Ingredient price",
              height: 500,
              barmode: "stack",
            }}
            config={{ responsive: true }}
            style={{ width: "100%" }}
          />
        </Box>
      </PlainModal>
      <PlainModal onClose={() => setMinMaxOpen(false)} open={minMaxOpen}>
        <Box sx={{ mt: 4 }}>
          <Plot
            data={minMaxData}
            layout={{
              title: "Ingredient Min and Max",
              height: 500,
            }}
            config={{ responsive: true }}
            style={{ width: "100%" }}
          />
        </Box>
      </PlainModal>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <AutoGraphIcon />
      </IconButton>
      <Menu
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            width: "20ch",
          },
        }}
      >
        <MenuList dense sx={{ p: 0 }}>
          <MenuItem
            onClick={() => {
              handleClose();
              handlendOpen();
            }}
          >
            Nutrient distribution
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleClose();
              handlePricedOpen();
            }}
          >
            Price contribuation
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleClose();
              handleMinMaxOpen();
            }}
          >
            Ingredient ration
          </MenuItem>
        </MenuList>
      </Menu>
    </div>
  );
};

export default Analysis;
