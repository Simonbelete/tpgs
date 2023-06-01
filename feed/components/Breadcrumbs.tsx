import { ReactNode } from "react";
import { Breadcrumb } from "@/models";
import MuiBreadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";

export type BreadcrumbsProps = {
  items: Breadcrumb[];
};

const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
  return (
    <MuiBreadcrumbs aria-label="breadcrumb">
      {items &&
        items.map((e, key) => (
          <Link key={key} underline="hover" color="inherit" href={e.href}>
            {e.label}
          </Link>
        ))}
    </MuiBreadcrumbs>
  );
};
export default Breadcrumbs;
