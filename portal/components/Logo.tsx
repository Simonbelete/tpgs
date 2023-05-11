import React, { ReactElement } from "react";
import Image from "next/image";
import { Link } from "@mui/material";

const Logo = () => {
  return (
    <Link href="/">
      <Image
        src="/images/logo_full.png"
        alt="TPGS Logo"
        width={150}
        height={150}
      />
    </Link>
  );
};

export default Logo;
