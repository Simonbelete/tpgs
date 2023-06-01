import Link from "next/link";
import React from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import Image from "next/image";
import PeopleIcon from "@mui/icons-material/People";
import Icon from "@mui/material/Icon";
import BloodtypeIcon from "@mui/icons-material/Bloodtype";

const SidebarMenu = () => {
  return (
    <Sidebar style={{ height: "100vh" }} breakPoint="md">
      <div>
        <Image
          src="/images/feed_formulation_icon.png"
          alt=""
          height={50}
          width={50}
        />
      </div>
      <Menu
      // menuItemStyles={{
      //   button: ({ level, active, disabled }) => {
      //     // only apply styles on first level elements of the tree
      //     // if (level === 0)
      //     //   return {
      //     //     color: disabled ? "#f5d9ff" : "#d359ff",
      //     //     backgroundColor: active ? "#eecef9" : undefined,
      //     //   };
      //   },
      // }}
      >
        <MenuItem
          component={<Link href="/ingredients" />}
          icon={<BloodtypeIcon />}
        >
          Ingredients
        </MenuItem>
        <MenuItem component={<Link href="/rations" />} icon={<BloodtypeIcon />}>
          Rations
        </MenuItem>
        <MenuItem
          component={<Link href="/ingredient-types" />}
          icon={<BloodtypeIcon />}
        >
          Ingredient Types
        </MenuItem>
        <MenuItem component={<Link href="/legend" />} icon={<BloodtypeIcon />}>
          Legend
        </MenuItem>
      </Menu>
    </Sidebar>
  );
};

export default SidebarMenu;
