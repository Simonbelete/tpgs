import React from "react";
import Image from "next/image";
import { Backdrop, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { Dna } from  'react-loader-spinner'

const Loading = ({ open = true}: {open?: boolean}) => {
  return (
    <div>
      <Backdrop
        sx={{ background: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={() => {}}
      >
        <Dna
          visible={true}
          height="200"
          width="200"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper"
        />
      </Backdrop>
    </div>
  );
};

export default Loading;
