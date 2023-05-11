import React, { ReactElement } from "react";
import Image from "next/image";
import { Link } from "@mui/material";

const Logo = () => {
  return (
    <Link href="/">
      <Image
        src="https://assets.maccarianagency.com/the-front/logos/logo.svg"
        alt="TPGS Logo"
        width={150}
        height={150}
      />
    </Link>
  );
};

export default Logo;
