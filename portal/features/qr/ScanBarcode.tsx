import React, { useEffect, useState } from "react";
import { Box, IconButton, Alert } from "@mui/material";
// @ts-ignore
import BarcodeReader from "react-barcode-reader";
import Html5QrcodePlugin from "./Html5QrcodePlugin";
import { GridChickenInput } from "../chickens/chicken-grid";
import CheckIcon from "@mui/icons-material/Check";
import { useLazyGetChickenByTagQuery } from "../chickens/services";
import Link from "next/link";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

export const QR = () => {
  const [code, setCode] = useState<string | null>(null);

  const [trigger, { data }] = useLazyGetChickenByTagQuery();

  useEffect(() => {
    if (code) {
      trigger(code ?? "");
    }
  }, [code]);

  const handleScan = (result: any) => {
    setCode(result);
    console.log(result);
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
      <Box>
        <Link href="/chickens">
          <IconButton sx={{ mr: 1 }} color="primary">
            <ArrowBackIosIcon />
          </IconButton>
        </Link>
      </Box>
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
      <Box>{data && <GridChickenInput data={data} />}</Box>
    </Box>
  );
};
