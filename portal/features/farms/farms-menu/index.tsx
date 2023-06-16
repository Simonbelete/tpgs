import React, { useState } from "react";
import { Button, Menu, MenuItem, Box, MenuList, Paper } from "@mui/material";
import HouseSidingIcon from "@mui/icons-material/HouseSiding";
import { Farm } from "@/models";

const FarmsMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const ITEM_HEIGHT = 48;

  const [farms, setFarms] = useState<Farm[]>([
    { id: 1, name: "Farm 1" },
    { id: 1, name: "Farm 1" },
    { id: 1, name: "Farm 1" },
    { id: 1, name: "Farm 1" },
    { id: 1, name: "Farm 1" },
    { id: 1, name: "Farm 1" },
    { id: 1, name: "Farm 1" },
    { id: 1, name: "Farm 1" },
  ]);

  return (
    <Box>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <HouseSidingIcon />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
          },
        }}
      >
        {farms.map((farm, key) => (
          <MenuItem
            key={key}
            selected={farm.name === "Pyxis"}
            onClick={handleClose}
          >
            {farm.name}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default FarmsMenu;
