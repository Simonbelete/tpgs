import React, { useEffect } from "react";
import { Inter } from "next/font/google";
import dynamic from "next/dynamic";

const DataTable = dynamic(() => import("./components/DataTable"), {
  ssr: false,
});

const inter = Inter({ subsets: ["latin"] });

const Home = () => {
  return (
    <main>
      <div
        id="portal"
        style={{ position: "fixed", left: 0, top: 0, zIndex: 9999 }}
      ></div>
      <DataTable />
    </main>
  );
};
export default Home;
