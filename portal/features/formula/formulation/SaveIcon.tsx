import * as React from "react";
import { IconButton, Button } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MuiSaveIcon from "@mui/icons-material/Save";
import { MenuList } from "@mui/material";

export default function SaveIcon({
  onSave,
  onTempSave,
}: {
  onSave: () => void;
  onTempSave: () => void;
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
      <Button
        color="secondary"
        size="small"
        startIcon={<MuiSaveIcon fontSize="small" />}
        sx={{ textTransform: "none" }}
        onClick={handleClick}
      >
        Save
      </Button>
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
              onSave();
            }}
          >
            Save permanently
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleClose();
              onTempSave();
            }}
          >
            Temporarily save
          </MenuItem>
        </MenuList>
      </Menu>
    </div>
  );
}
