import React, { ReactElement } from "react";

interface DefaultLayoutProps {
  children: ReactElement;
}

const DefaultLayout = (props: DefaultLayoutProps) => {
  const { children } = props;
  return { children };
};

export default DefaultLayout;
