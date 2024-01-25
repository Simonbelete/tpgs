import React, { ReactElement } from "react";
import Link from "next/link";
import { Button, Container } from "@mui/material";
import { useRouter } from "next/router";
import { Breadcrumbs, Loading } from "@/components";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import dynamic from "next/dynamic";

const ServerErrorFoundPage = () => {
  const router = useRouter();
  return (
    <Container>
      <Link href={String(router.query.from) || "/"}>
        <Button variant="outlined" startIcon={<KeyboardBackspaceIcon />}>
          Go Back
        </Button>
      </Link>
    </Container>
  );
};

ServerErrorFoundPage.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>;
};

export default ServerErrorFoundPage;
