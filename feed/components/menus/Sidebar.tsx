import Link from "next/link";
import React from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import PeopleIcon from "@mui/icons-material/People";
import Icon from "@mui/material/Icon";

const SidebarMenu = () => {
  return (
    <Sidebar style={{ height: "100vh" }} breakPoint="md">
      <Menu>
        <MenuItem component={<Link href="/users" />} icon={<Icon>group</Icon>}>
          Users
        </MenuItem>
        <MenuItem
          component={<Link href="/groups" />}
          icon={<Icon>folder_supervised</Icon>}
        >
          Groups
        </MenuItem>
        <MenuItem
          component={<Link href="/subjects" />}
          icon={<Icon>subject</Icon>}
        >
          Subjects
        </MenuItem>
        <MenuItem
          component={<Link href="/curriculums" />}
          icon={<Icon>list_alt</Icon>}
        >
          Curriculum
        </MenuItem>
        <MenuItem
          component={<Link href="/courses" />}
          icon={<Icon>menu_book</Icon>}
        >
          Course
        </MenuItem>
      </Menu>
    </Sidebar>
  );
};

export default SidebarMenu;
