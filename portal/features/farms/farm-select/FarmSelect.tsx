import React from "react";
import {
  List,
  RadioGroup,
  ListItem,
  FormControl,
  FormControlLabel,
  Radio,
  Stack,
  IconButton,
  Skeleton,
} from "@mui/material";
import { useGetFarmsQuery } from "../services";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { setTenant } from "../slices";
import Link from "next/link";
import _ from "lodash";

const FarmSelect = () => {
  const dispatch = useDispatch();
  const { data, isLoading } = useGetFarmsQuery({});
  const tenant = useSelector((state: RootState) => state.tenant);
  const tenant_model = _.find(data?.results, { name: tenant.name });

  console.log(tenant_model);

  return (
    <FormControl sx={{ width: "100%" }}>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        name="farm-radio-buttons-group"
        value={tenant.name}
        onChange={(e: any) => {
          const selected_farm = _.find(data?.results, { name: e.target.value });
          if (selected_farm != undefined) dispatch(setTenant(selected_farm));
        }}
      >
        <List
          sx={{
            minWidth: 240,
            "--List-gap": "0.5rem",
            "--ListItem-paddingY": "1rem",
            "--ListItem-radius": "8px",
            "--ListItemDecorator-size": "32px",
          }}
        >
          {isLoading && (
            <Stack direction={"column"} gap={2}>
              <Skeleton
                variant="text"
                sx={{ fontSize: "1rem" }}
                width={"80%"}
              />
              <Skeleton
                variant="text"
                sx={{ fontSize: "1rem" }}
                width={"80%"}
              />
              <Skeleton
                variant="text"
                sx={{ fontSize: "1rem" }}
                width={"80%"}
              />
              <Skeleton
                variant="text"
                sx={{ fontSize: "1rem" }}
                width={"80%"}
              />
            </Stack>
          )}
          {data?.results.map((e, i) => (
            <ListItem
              key={i}
              sx={{
                mb: "15px",
                boxShadow:
                  "0 0 #000 ,0px 1px 2px 0px rgba( 21 21 21 / 0.08 ),0px 2px 4px 0px rgba( 21 21 21 / 0.08 )",
                border: "1px solid #CDD7E1",
                borderRadius: "8px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <FormControlLabel
                sx={{ p: 0 }}
                value={e.name}
                control={<Radio size="small" />}
                label={e.display_name}
              />
              <Stack>
                <Link href={`/farms/${e.id}/edit`}>
                  <IconButton>
                    <DriveFileRenameOutlineIcon fontSize="small" />
                  </IconButton>
                </Link>
              </Stack>
            </ListItem>
          ))}
        </List>
      </RadioGroup>
    </FormControl>
  );
};

export default FarmSelect;
