import { ReactNode } from "react";
import { Breadcrumb } from "@/models";
import MuiBreadcrumbs from "@mui/material/Breadcrumbs";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Typography } from "@mui/material";
import Link from "next/link";

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
          <Link href={e.href} key={key} style={{ textDecoration: "none" }}>
            <Typography variant="body2" color="text.secondary">
              {e.label}
            </Typography>
          </Link>
        ))}
    </MuiBreadcrumbs>
  );
};
export default Breadcrumbs;
