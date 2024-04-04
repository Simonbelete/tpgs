import React, { useEffect, useState } from "react";
import { QRDocument, generateBarcodeUrl } from "./QRDocument";
import { PDFViewer } from "@react-pdf/renderer";
import { Box } from "@mui/material";
import { ChickenDropdown } from "../chickens";
import { Chicken } from "@/models";

export const GenerateBarcode = () => {
  const [chickens, setChickens] = useState<Chicken[]>([]);

  return (
    <Box>
      <Box mb={6}>
        <ChickenDropdown
          value={chickens}
          multiple={true}
          onChange={(_, data) => setChickens(data)}
        />
      </Box>
      <PDFViewer width={"100%"} showToolbar={true} height={800}>
        <QRDocument data={chickens} />
      </PDFViewer>
    </Box>
  );
};
