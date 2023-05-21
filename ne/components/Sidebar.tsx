import React, { ReactElement } from "react";
import Link from "next/link";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";

const SidebarMenu = (): ReactElement => {
  return (
    <Sidebar>
      <Menu>
        <MenuItem component={<Link href="courses">Courses</Link>}>
          courses
        </MenuItem>
      </Menu>
    </Sidebar>
  );
};

export default SidebarMenu;
