import React, { useEffect } from "react";
import { AsyncDropdown } from "@/components/dropdowns";
import { useLazyGetDdrectoriesQuery } from "../services";
import { Directory } from "@/models";
import { Box, Divider, Grid, Stack, Typography } from "@mui/material";
import { LabeledInput } from "@/components/inputs";
import Image from "next/image";

const DirectoryDropdown = ({
  value,
  label = "Directory",
  error,
  onChange,
  helperText,
  query,
  dataKey,
}: {
  value?: any;
  label?: string;
  error?: boolean;
  helperText?: string;
  query?: Object;
  dataKey?: string;
  onChange?: (event: any, newValue: any) => void;
}) => {
  const [trigger, { isLoading, data }, lastPromiseInfo] =
    useLazyGetDdrectoriesQuery();

  const handleOnOpen = () => {
    trigger({ ...(query || {}) }, true);
  };

  const handleOnClose = () => {};

  return (
    <AsyncDropdown<Directory>
      value={value}
      dataKey={dataKey || "name"}
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
                {option.farm_name}
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
                {option.breed_name}
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
                G{option.generation}
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
                {option.hatchery_name}
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
                {option.house_name}
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
                {option.pen_name}
              </Typography>
            </Stack>
          </Stack>
        </li>
      )}
    />
  );
};

export default DirectoryDropdown;
