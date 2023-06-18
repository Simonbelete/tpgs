import React from "react";
import Link from "next/link";
import { Button, Container } from "@mui/material";
import { useRouter } from "next/router";
import { Breadcrumbs, Loading } from "@/components";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import dynamic from "next/dynamic";

const DashboardLayout = dynamic(
  () => import("../../components/layouts/DashboardLayout"),
  {
    ssr: false,
    loading: () => <Loading />,
  }
);

const NotFoundPage = () => {
  const router = useRouter();
  return (
    <DashboardLayout>
      <Container>
        <Link href={String(router.query.from) || "/"}>
          <Button variant="outlined" startIcon={<KeyboardBackspaceIcon />}>
            Go Back
          </Button>
        </Link>
      </Container>
    </DashboardLayout>
  );
};

export default NotFoundPage;
