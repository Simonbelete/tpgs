import { ReactNode } from "react";
import { Breadcrumb } from "@/models";
import MuiBreadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

export type BreadcrumbsProps = {
  items: Breadcrumb[];
};

const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
  return (
    <MuiBreadcrumbs
      aria-label="breadcrumb"
      separator={<NavigateNextIcon fontSize="small" />}
    >
      {items &&
        items.map((e, key) => (
          <Link
            variant="body2"
            key={key}
            underline="none"
            color="inherit"
            href={e.href}
          >
            {e.label}
          </Link>
        ))}
    </MuiBreadcrumbs>
  );
};
export default Breadcrumbs;
