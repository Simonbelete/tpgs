import React, { useCallback, useEffect, useState } from "react";
import { Modal, Box, Typography, Tabs, Tab } from "@mui/material";
import { ChartModal } from "@/components/modals";
import { IngredientService } from "@/features/ingredients";
import BarChartIcon from "@mui/icons-material/BarChart";
import DonutSmallIcon from "@mui/icons-material/DonutSmall";
import { Nutrient } from "@/models";

const IngredientContributionModal = ({
  id,
  open = false,
  onClose,
}: {
  id: number;
  open?: boolean;
  onClose: () => void;
}) => {
  const [nutrients, setNutrients] = useState<Nutrient[]>([]);
  const [tabIndex, setTabIndex] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  useEffect(() => {
    IngredientService.getById(id)
      .then((response) => {})
      .catch((ex) => {});
  }, []);

  return (
    <ChartModal open={open} onClose={onClose}>
      <Tabs value={tabIndex} onChange={handleChange}>
        <Tab label="Bar Chart" iconPosition="start" icon={<BarChartIcon />} />
        <Tab label="Pie Chart" iconPosition="start" icon={<DonutSmallIcon />} />
        <Box mx={2} my={4} pb={4}>
          {tabIndex == 0 && <></>}
          {tabIndex == 1 && <></>}
        </Box>
      </Tabs>
    </ChartModal>
  );
};

export default IngredientContributionModal;
