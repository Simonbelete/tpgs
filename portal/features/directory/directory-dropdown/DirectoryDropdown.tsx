import * as React from "react";

import { useLazyGetDdrectoriesQuery } from "../services";
import { Directory } from "@/models";
import Image from "next/image";
import { AsyncDropdown } from "@/components/dropdowns";
import { Typography, Box, Stack } from "@mui/material";

const DirectoryDropdown = ({
  value,
  label = "Directory",
  error,
  onChange,
  helperText,
  query,
  multiple = false,
  dataLableKey,
}: {
  value?: any;
  label?: string;
  error?: boolean;
  helperText?: string;
  query?: Object;
  onChange?: (event: any, newValue: any) => void;
  multiple?: boolean;
  dataLableKey?: string;
}) => {
  const [trigger, { isLoading, data }, lastPromiseInfo] =
    useLazyGetDdrectoriesQuery();

  const handleOnOpen = () => {
    trigger({ ...(query || {}) }, true);
  };

  const handleOnClose = () => {};

  return (
    <AsyncDropdown<Directory>
      multiple={multiple}
      value={value}
      dataLableKey={dataLableKey || "display_name"}
      dataValueKey="unique_id"
      label={label}
      error={error}
      helperText={helperText}
      options={data?.results ?? []}
      isLoading={isLoading}
      onOpen={handleOnOpen}
      onClose={handleOnClose}
      onChange={onChange}
      onInputChange={(event: any, newInputValue: any) => {
        trigger({ ...(query || {}) }, false);
      }}
      // @ts-ignore
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Stack
            direction={"row"}
            divider={
              <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                <Image
                  alt="slash_arrow"
                  src="/slash_forward_icon_134959.png"
                  height={18}
                  width={15}
                />
              </Box>
            }
            spacing={0.5}
          >
            <Stack direction={"column"}>
              <Typography
                variant="caption"
                fontSize={"0.67rem"}
                color="text.secondary"
              >
                Farm
              </Typography>
              <Typography variant="caption" color="text.primary">
                {option.farm_name && option.farm_name}
              </Typography>
            </Stack>
            <Stack direction={"column"}>
              <Typography
                variant="caption"
                fontSize={"0.67rem"}
                color="text.secondary"
              >
                Breed
              </Typography>
              <Typography variant="caption" color="text.primary">
                {option.breed_name && option.breed_name}
              </Typography>
            </Stack>
            <Stack direction={"column"}>
              <Typography
                variant="caption"
                fontSize={"0.67rem"}
                color="text.secondary"
              >
                Generation
              </Typography>
              <Typography variant="caption" color="text.primary">
                G{option.generation && option.generation}
              </Typography>
            </Stack>
            <Stack direction={"column"}>
              <Typography
                variant="caption"
                fontSize={"0.67rem"}
                color="text.secondary"
              >
                Hatchery
              </Typography>
              <Typography variant="caption" color="text.primary">
                {option.hatchery_name && option.hatchery_name}
              </Typography>
            </Stack>
            <Stack direction={"column"}>
              <Typography
                variant="caption"
                fontSize={"0.67rem"}
                color="text.secondary"
              >
                House
              </Typography>
              <Typography variant="caption" color="text.primary">
                {option.house_name && option.house_name}
              </Typography>
            </Stack>
            <Stack direction={"column"}>
              <Typography
                variant="caption"
                fontSize={"0.67rem"}
                color="text.secondary"
              >
                Pen
              </Typography>
              <Typography variant="caption" color="text.primary">
                {option.pen_name && option.pen_name}
              </Typography>
            </Stack>
          </Stack>
        </li>
      )}
    />
  );
};

export default DirectoryDropdown;
