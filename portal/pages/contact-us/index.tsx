import React from "react";
import { ListLayout } from "@/layouts";
import { useBreadcrumbs } from "@/hooks";
import { Breadcrumbs } from "@/components";
import { ContactList } from "@/features/contact-us";
import { SeoHead } from "@/seo";

const ContactusPage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title="Contact us" />
      <ListLayout breadcrumbs={<Breadcrumbs items={breadcrumbs} />}>
        <ContactList />
      </ListLayout>
    </>
  );
};

export default ContactusPage;
