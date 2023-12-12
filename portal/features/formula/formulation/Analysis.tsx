import React, { useEffect, useState } from "react";
import { IconButton, Menu, MenuList, MenuItem, Box } from "@mui/material";
import type { Column, Row } from "./Formulation";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import { PlainModal } from "@/components/modals";
import dynamic from "next/dynamic";
import { PieChartSkeleton } from "@/components";
import _ from "lodash";
import {
  IngredientBoundary,
  IngredientRation,
  NutrientDistributions,
  PriceContribution,
  PricePerNutrient,
} from "../formula-analysis";

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
  const [pricedOpen, setPricedOpen] = useState(false);
  const [ingRationOpen, setIngRationOpen] = useState(false);
  const [pricePerNutrientOpen, setPricePerNutrientOpen] = useState(false);

  const [minMaxOpen, setMinMaxOpen] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handlendOpen = () => {
    setndOpen(true);
  };

  const handlePricedOpen = () => {
    setPricedOpen(true);
  };

  const handleMinMaxOpen = () => {
    setMinMaxOpen(true);
  };

  return (
    <div>
      <PlainModal onClose={() => setndOpen(false)} open={ndOpen}>
        <Box sx={{ mt: 4 }}>
          <NutrientDistributions rows={rows} columns={columns} />
        </Box>
      </PlainModal>
      <PlainModal onClose={() => setPricedOpen(false)} open={pricedOpen}>
        <Box sx={{ mt: 4 }}>
          <PriceContribution rows={rows} columns={columns} />
        </Box>
      </PlainModal>
      <PlainModal onClose={() => setIngRationOpen(false)} open={ingRationOpen}>
        <Box sx={{ mt: 4 }}>
          <IngredientRation rows={rows} columns={columns} />
        </Box>
      </PlainModal>
      <PlainModal onClose={() => setMinMaxOpen(false)} open={minMaxOpen}>
        <Box sx={{ mt: 4 }}>
          <IngredientBoundary rows={rows} columns={columns} />
        </Box>
      </PlainModal>
      <PlainModal
        onClose={() => setPricePerNutrientOpen(false)}
        open={pricePerNutrientOpen}
        width="90%"
      >
        <PricePerNutrient rows={rows} columns={columns} />
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
            Price contribution
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleClose();
              setIngRationOpen(true);
            }}
          >
            Ingredient ration
          </MenuItem>
          {/* <MenuItem
            onClick={() => {
              handleClose();
              handleMinMaxOpen();
            }}
          >
            Ingredient Boundary
          </MenuItem> */}
          <MenuItem
            onClick={() => {
              handleClose();
              setPricePerNutrientOpen(true);
            }}
          >
            Price per nutrient
          </MenuItem>
        </MenuList>
      </Menu>
    </div>
  );
};

export default Analysis;
