import React from "react";
import Image from "next/image";
import { Backdrop } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

const Loading = () => {
  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
        onClick={() => {}}
      >
        <CircularProgress color="inherit" />
        <Image
          width={100}
          height={100}
          src="/images/feed_formulation_icon.png"
          alt="Feed Formulation Logo"
        />
      </Backdrop>
    </div>
  );
};

export default Loading;
