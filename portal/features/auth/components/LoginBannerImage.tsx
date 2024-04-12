import React from "react";
import Image from "next/image";

const LoginBannerImage = () => {
  return (
    <Image
      alt="ilri cgiar logo"
      src="/images/hero_3.png"
      width={0}
      height={0}
      sizes="100vw"
      style={{ width: "60%", height: "auto" }} // optional
    />
  );
  // return <img src="/images/hero_3.png" width="60%" />;
};

export default LoginBannerImage;
