import { ContactUsForm } from "@/features/contact-us";
import { SeoHead } from "@/seo";
import { Container, Typography } from "@mui/material";
import React from "react";
import { useSession } from "next-auth/react";

const ContactusPage = () => {
  const { data: session, status } = useSession();

  return (
    <>
      <SeoHead title="Contact us" />
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          fontWeight={600}
          color={"text.primary"}
          sx={{ mb: 5 }}
        >
          Contact us
        </Typography>
        {session?.user?.email && (
          <ContactUsForm
            email={session?.user?.email}
            name={session?.user?.email}
          />
        )}
      </Container>
    </>
  );
};

export default ContactusPage;
