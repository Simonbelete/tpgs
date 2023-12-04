import * as React from "react";
import { IconButton, Button } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { MenuList } from "@mui/material";
import ManageHistoryIcon from "@mui/icons-material/ManageHistory";
import { LOCAL_FORMULA_KEY } from "./Formulation";

export default function LoadLocalHistoryIcon({
  onLoad,
}: {
  onLoad: () => void;
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
        <ManageHistoryIcon fontSize="small" />
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
              onLoad();
            }}
          >
            Restore history
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleClose();
              localStorage.removeItem(LOCAL_FORMULA_KEY);
            }}
          >
            Clear history
          </MenuItem>
        </MenuList>
      </Menu>
    </div>
  );
}
