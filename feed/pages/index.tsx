import React, { useEffect } from "react";
import { Inter } from "next/font/google";
import dynamic from "next/dynamic";
import Box from "@mui/material/Box";
import NavBar from "./components/Navbar";

const DataTable = dynamic(() => import("./components/DataTable"), {
  ssr: false,
});

const Formulation = dynamic(() => import("./components/Formulation"), {
  ssr: false,
});

const inter = Inter({ subsets: ["latin"] });

const Home = () => {
  return (
    <>
      <NavBar />
      <Box component="main" mt={5}>
        <div
          id="portal"
          style={{ position: "fixed", left: 0, top: 0, zIndex: 9999 }}
        ></div>
        <DataTable />
      </Box>
    </>
  );
};
export default Home;
