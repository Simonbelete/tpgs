import { Stack } from "@mui/material";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const ILRILogo = ({ size = 25 }: { size?: number }) => {
  return (
    <Stack>
      <Link href={"/"}>
        <Image
          alt="ILRI CGIAR Logo"
          src="/images/ilri_logo.png"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "auto", height: "25px" }} // optional
        />
      </Link>
      {/* <img src="/images/ilri_logo.png" alt="ILRI CGIAR Logo" height={size} /> */}
    </Stack>
  );
};

export default ILRILogo;
