import React, { useEffect } from "react";
import { Inter } from "next/font/google";
import dynamic from "next/dynamic";
import Box from "@mui/material/Box";
import NavBar from "./components/Navbar";

const FormulationTable = dynamic(
  () => import("../components/FormulationTable"),
  {
    ssr: false,
  }
);

const Formulation = dynamic(() => import("./components/Formulation"), {
  ssr: false,
});

const inter = Inter({ subsets: ["latin"] });

const Home = () => {
  return (
    <>
      <Box component="main" mt={1}>
        <div
          id="portal"
          style={{ position: "fixed", left: 0, top: 0, zIndex: 9999 }}
        ></div>
        <FormulationTable />
      </Box>
    </>
  );
};
export default Home;
