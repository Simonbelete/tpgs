import React, { useState } from "react";
import { Box, Button, Alert } from "@mui/material";
// @ts-ignore
import BarcodeReader from "react-barcode-reader";
import Html5QrcodePlugin from "./Html5QrcodePlugin";
import { GridChickenInput } from "../chickens/chicken-grid";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CheckIcon from "@mui/icons-material/Check";

export const QR = () => {
  const [code, setCode] = useState<string | null>(null);

  const handleScan = (result: any) => {
    setCode(result);
  };

  const handleScanError = () => {};

  const handleCameraScan = (decodedText: any, decodedResult: any) => {
    console.log(decodedText, decodedResult);
  };

  return (
    <Box
      px={{ xs: 1, md: 10 }}
      py={{ xs: 10, md: 10 }}
      display="flex"
      flexDirection="column"
      //   justifyContent="center"
      //   alignItems="center"
      //   minHeight="100vh"
    >
      <BarcodeReader onError={handleScanError} onScan={handleScan} />
      <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
        Waiting for scanner...
      </Alert>
      <Html5QrcodePlugin
        fps={10}
        qrbox={250}
        disableFlip={false}
        qrCodeSuccessCallback={handleCameraScan}
      />
      <Box>{code && <GridChickenInput tag={code} />}</Box>
    </Box>
  );
};
