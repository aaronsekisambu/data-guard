import { useGlobalContext } from "hooks";
import React from "react";
import Sidebar from "../components/Sidebar";

interface LayoutProps {
  children: React.ReactNode;
}
const Layout = ({ children }: LayoutProps) => {
  const { show } = useGlobalContext();

  return (
    <>
      <Sidebar />
      <section
        style={{ opacity: show ? "0.5" : "1" }}
        className="children-items"
      >
        {children}
      </section>
    </>
  );
};

export default Layout;
