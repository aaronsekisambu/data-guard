import axios from "axios";
import { url } from "config";
import { useRouter } from "next/router";
import React, {
  useContext,
  useState,
  createContext,
  useEffect,
} from "react";

interface PluginContextProps {
  data?: any;
  getPlugins: () => void;
  globalVisibility: () => void;
  show: boolean;
}

interface IPlugins {
    title: string
    description: string
}

interface PluginProps {
    [name: string]: IPlugins;
}
export interface DataProps {
//   id: number;
  plugins: any;
  tabdata: any;
  tabs: any;
}

const PluginContext = createContext<PluginContextProps>({
  data: {plugins: {}, tabdata: {}, tabs: {}},
  getPlugins: () => {},
  globalVisibility: () => {},
  show: false,
});
export const PluginProvider = ({ children }: any) => {
  const [allData, setData] = useState<DataProps>({plugins: [], tabdata: [], tabs: []});
  const [show, setShow] = useState<boolean>(false);
  const router = useRouter();

  const globalVisibility = async () => {
    try {
      const { data } = await axios.put(`${url}/visibility`, {
        global: !show,
      });
      setShow(data.global);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleItem = async (acitve: string[], inactive: string[], disabled: string[], title: string) => {
    try {
        if(router.pathname.indexOf(`/${title.toLocaleLowerCase()}`) !== -1) {
           const findTab =  allData.tabdata.find((tab:any) => tab.title === title)
           const disabled = [];
        //    allData.plugins.
        }

    } catch (error) {
      console.log(error);
    }
  };

  const getPlugins = async () => {
    try {
      const { data } = await axios.get(`${url}/data`);
      const {plugins, tabdata, tabs} = data;
      const allowed = allData.plugins
    //   const { data: vis } = await axios.get(`${url}/visibility`);
    // console.log("in data", Object.keys(plugins))//  
    //  console.log("router.", router.pathname.split("/").join(""))
    setData({...allData, plugins: Object.values(plugins), tabdata: Object.values(tabdata), tabs});
    //   setShow(vis.global);
    } catch (error) {
      // TO-DO return error to the server
      console.log("error");
    }
  };
  useEffect(() => {
    getPlugins();
  }, []);

  const findTab =  allData.tabdata.find((tab:any) => tab.title === "Marketing")

//   console.log("out data", allData, allData.plugins.map((p:any) => findTab?.disabled.includes(p.title.split(" ").join("").toLocaleLowerCase())))


  return (
    <PluginContext.Provider
      value={{ data: allData, getPlugins, show, globalVisibility }}
    >
      {children}
    </PluginContext.Provider>
  );
};

export const useGlobalContext = () =>
  useContext<PluginContextProps>(PluginContext);
