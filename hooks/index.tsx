import axios from "axios";
import { url } from "config";
import { useRouter } from "next/router";
import React, { useContext, useState, createContext, useEffect } from "react";
import { DataProps, PluginContextProps, PluginProps, PluginProviderProps } from "types";



const PluginContext = createContext<PluginContextProps>({
  data: { plugins: {}, tabdata: {}, tabs: {} },
  getPlugins: () => {},
  globalVisibility: () => {},
  toggleItem: () => {},
  show: false,
  allPlugins: [],
});
export const PluginProvider = ({ children }: PluginProviderProps) => {
  const [allData, setData] = useState<DataProps>({ plugins: [], tabdata: [], tabs: [] });
  const [show, setShow] = useState<boolean>(false);
  const [activePlugins, setActivePlugins] = useState<string[]>([]);
  const [inactivePlugins, setInactivePlugins] = useState<string[]>([]);
  const [disabledPlugins, setDisabledPlugins] = useState<string[]>([]);
  const [all, setAl] = useState<any>({});

  const [allPlugins, setAllPlugins] = useState<any>([]);

  const router = useRouter();

  const globalVisibility = async () => {
    try {
       await axios.patch(`${url}/data`, {
        global: !show,
      });
      setShow(!show);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleItem = async (plugin: PluginProps) => {
    const newDis = [...allPlugins];
    const activeValues: string[] = [];
    const inactiveValues: string[] = [];
    const n: PluginProps[] = [];
    try {
      newDis?.map((me: PluginProps) => {
        if (me.title === plugin.title) {
          n.push({
            title: me.title,
            description: me.description,
            status: plugin.status === "active" ? "inactive" : "active",
          });
          if (plugin.status === "active") {
            const activeOnly = activePlugins.filter(a => a !== plugin.title.split(" ").join("").toLocaleLowerCase()); // only active one
            const inactiveOnly = activePlugins.filter(a => a === plugin.title.split(" ").join("").toLocaleLowerCase()); // set to inactive
            inactiveValues.push(...inactivePlugins, ...inactiveOnly);
            return activeValues.push(...activeOnly);
          }
          const inactiveOnly = inactivePlugins.filter(a => a !== plugin.title.split(" ").join("").toLocaleLowerCase());
          const activeOnly = inactivePlugins.filter(a => a === plugin.title.split(" ").join("").toLocaleLowerCase());
          activeValues.push(...activePlugins, ...activeOnly);
          return inactiveValues.push(...inactiveOnly);
        }
        return n.push(me);
      });
      setAllPlugins(n);
      const { data } = await axios.post(`${url}/data/`, {
        tabs: all?.tabs,
        tabdata: {
          tab1: { title: "Marketing", icon: "apps", active: activeValues, disabled: disabledPlugins, inactive: inactiveValues },
          tab2: all?.tabdata?.tab2,
          tab3: all?.tabdata?.tab3,
        },
        plugins: all?.plugins,
      });
      if (data) {
        return getPlugins();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getPlugins = async () => {
    try {
      const { data } = await axios.get(`${url}/data`);
      setAl(data);
      const { plugins, tabdata, tabs } = data;
      let pluginsValues: any = [];
      let activeValues: string[] = [];
      let inactiveValues: string[] = [];
      let disableValues: string[] = [];
      const findTabTitle: any = Object.values(tabdata).find((tab: any) => tab.title.toLocaleLowerCase() === router?.pathname?.split("/").join(""));
      Object.values(plugins).map((pl: any) => {
        if (findTabTitle?.active.includes(pl.title.split(" ").join("").toLocaleLowerCase())) {
          activeValues.push(pl.title.split(" ").join("").toLocaleLowerCase());
          pluginsValues.push({
            title: pl.title,
            description: pl.description,
            status: "active",
          });
          return;
        }

        if (findTabTitle?.inactive.includes(pl.title.split(" ").join("").toLocaleLowerCase())) {
          inactiveValues.push(pl.title.split(" ").join("").toLocaleLowerCase());
          pluginsValues.push({
            title: pl.title,
            description: pl.description,
            status: "inactive",
          });
          return;
        }

        if (findTabTitle?.disabled.includes(pl.title.split(" ").join("").toLocaleLowerCase())) {
          disableValues.push(pl.title.split(" ").join("").toLocaleLowerCase());
          pluginsValues.push({
            title: pl.title,
            description: pl.description,
            status: "disabled",
          });
          return;
        }
      });
      setAllPlugins([...pluginsValues]);
      setActivePlugins([...activeValues]);
      setInactivePlugins([...inactiveValues]);
      setDisabledPlugins([...disableValues]);
      setData({ ...allData, plugins: Object.values(plugins), tabdata: Object.values(tabdata), tabs });
    } catch (error) {
      // TO-DO return error to the server
      console.log("error", error);
    }
  };
  useEffect(() => {
    getPlugins();
  }, [router?.pathname]);

  return <PluginContext.Provider value={{ data: allData, getPlugins, show, globalVisibility, toggleItem, allPlugins }}>{children}</PluginContext.Provider>;
};

export const useGlobalContext = () => useContext<PluginContextProps>(PluginContext);
