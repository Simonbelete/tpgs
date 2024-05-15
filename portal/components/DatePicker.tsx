import React, { ChangeEventHandler, useRef, useState } from "react";
import { Popper, Box, Paper } from "@mui/material";
import { DayPicker } from "react-day-picker";
import { ClickAwayListener } from "@mui/base/ClickAwayListener";

const DatePicker = () => {
  const [selected, setSelected] = useState<Date>();
  const [inputValue, setInputValue] = useState<string>("");
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClickAway = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  const handleDaySelect = (date?: Date) => {
    setSelected(date);
    if (date) {
      // setInputValue(format(date, 'y-MM-dd'));
    } else {
      setInputValue("");
    }
  };

  return (
    <div>
      <ClickAwayListener onClickAway={handleClickAway}>
        <Box>
          <input type="text" aria-describedby={id} onClick={handleClick} />
          <Popper id={id} open={open} anchorEl={anchorEl}>
            <Paper elevation={4} sx={{ bgcolor: "background.paper" }}>
              <DayPicker
                initialFocus={open}
                mode="single"
                defaultMonth={selected}
                selected={selected}
                onSelect={handleDaySelect}
                styles={{}}
              />
            </Paper>
          </Popper>
        </Box>
      </ClickAwayListener>
    </div>
  );
};

export default DatePicker;
