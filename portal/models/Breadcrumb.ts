import { ReactElement } from "react";

export default interface Breadcrumb {
  href: string;
  label: string | ReactElement;
}
