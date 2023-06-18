import React, { ReactElement } from "react";
import Image from "next/image";
import { Link } from "@mui/material";

const Logo = ({ size = 150 }: { size?: number }) => {
  return (
    <Link href="/">
      <img
        src="/images/logo_full.png"
        alt="TPGS Logo"
        width={size}
        // height={size}
      />
    </Link>
  );
};

export default Logo;
