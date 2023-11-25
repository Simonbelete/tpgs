import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import { Divider, ListItemText, MenuList } from "@mui/material";

const ITEM_HEIGHT = 48;

export default function ClearIcon({
  onClearIngredients,
  onClearRations,
  onClearRequirements,
  onClearAll,
  resetGraph,
}: {
  onClearIngredients: () => void;
  onClearRations: () => void;
  onClearRequirements: () => void;
  onClearAll: () => void;
  resetGraph: () => void;
}) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <DeleteSweepIcon />
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
              onClearRations();
            }}
          >
            Clear Rations
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleClose();
              onClearRequirements();
            }}
          >
            Clear Requirement
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleClose();
              onClearIngredients();
            }}
          >
            Clear Ingredients
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleClose();
              resetGraph();
            }}
          >
            Reset Graph
          </MenuItem>
          <Divider sx={{ m: 0 }} />
          <MenuItem
            onClick={() => {
              handleClose();
              onClearAll();
            }}
          >
            Clear All
          </MenuItem>
        </MenuList>
      </Menu>
    </div>
  );
}
