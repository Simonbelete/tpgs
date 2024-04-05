import React, { useEffect, useState } from "react";
import {
  Box,
  IconButton,
  Alert,
  Typography,
  Button,
  Stack,
} from "@mui/material";
// @ts-ignore
import BarcodeReader from "react-barcode-reader";
import Html5QrcodePlugin from "./Html5QrcodePlugin";
import { GridChickenInput } from "../chickens/chicken-grid";
import CheckIcon from "@mui/icons-material/Check";
import {
  useCreateChickenMutation,
  useLazyGetChickenByTagQuery,
} from "../chickens/services";
import Link from "next/link";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Card } from "@/components";
import LoadingButton from "@mui/lab/LoadingButton";

export const QR = () => {
  const [code, setCode] = useState<string | null>(null);

  const [trigger, { data, error: gridError }] = useLazyGetChickenByTagQuery();
  const [createTrigger, createResult] = useCreateChickenMutation();

  useEffect(() => {
    if (code) {
      trigger(code ?? "");
    }
  }, [code]);

  const handleScan = (result: any) => {
    console.log(result);
    setCode(result);
  };

  const handleScanError = () => {};

  const handleCameraScan = (decodedText: any, decodedResult: any) => {
    setCode(decodedText);
  };

  const createNewChicken = async () => {
    if (code) {
      const resposne = await createTrigger({ tag: code }).unwrap();
      if (resposne) {
        trigger(code);
      }
    }
  };

  return (
    <Box
      px={{ xs: 1, md: 10 }}
      py={{ xs: 10, md: 10 }}
      display="flex"
      flexDirection="column"
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
      {gridError != null && (
        <>
          <Box
            mt={10}
            display={"flex"}
            justifyContent={"center"}
            alignContent={"center"}
          >
            <Card>
              <Stack gap={3} alignItems={"center"}>
                <Typography variant="h3" fontWeight={800}>
                  {code}
                </Typography>
                <Typography>No chicken found with {code} tag</Typography>
                <Box>
                  <LoadingButton
                    size="large"
                    style={{ textTransform: "none" }}
                    variant="contained"
                    onClick={createNewChicken}
                    loading={createResult.isLoading}
                  >
                    Create chicken with tag &quot;{code}&quot;
                  </LoadingButton>
                </Box>
              </Stack>
            </Card>
          </Box>
        </>
      )}
      <Box>{data && gridError == null && <GridChickenInput data={data} />}</Box>
    </Box>
  );
};
