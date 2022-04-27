import axios from "axios";
import { url } from "config";
import { useGlobalContext } from "hooks";
import React, { useState } from "react";
import Sidebar from "../components/Sidebar";

interface LayoutProps {
  children: React.ReactNode;
}
const Layout = ({ children }: LayoutProps) => {
  const [toggle, setToggle] = useState<boolean>(false);

  const { data, getPlugins } = useGlobalContext();

  const globalVisibility = async (show: boolean) => {
    try {
      const { data } = await axios.patch(`${url}/visibility`, {
        global: show,
      });
      if (data) {
        setToggle(show);
        return getPlugins();
      }
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <>
      <Sidebar globalVisibility={globalVisibility} toggle={toggle} />
      <section
        style={{ opacity: data?.global ? "0.5" : "1" }}
        className="children-items"
      >
        {children}
      </section>
    </>
  );
};

export default Layout;
