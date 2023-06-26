import React from "react";
import { Box, Stack, Chip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { BootstrapInput } from "@/components/inputs";
import { AsyncDropdown } from "@/components/dropdowns";

const NutrientListItem = () => {
  return (
    <Box>
      <Stack>
        <Box>
          <Chip label="AP" icon={<AddIcon />} onClick={() => {}} />
        </Box>
      </Stack>
      <Stack>
        <AsyncDropdown url="/nutrients/" />
      </Stack>
    </Box>
  );
};

export default NutrientListItem;
