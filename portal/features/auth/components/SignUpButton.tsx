import React from "react";
import Link from "next/link";
import { Button } from "@mui/material";

const SignUpButton = () => {
  return (
    <Link href="/sign-up" id="sign-up">
      <Button fullWidth>Sign up</Button>
    </Link>
  );
};

export default SignUpButton;
