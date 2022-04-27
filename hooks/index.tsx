import axios from "axios";
import { url } from "config";
import React, { useContext, useState, createContext, useEffect } from "react";

interface PluginContextProps {
  data: MarketingProps[];
  getPlugins: () => void;
}
interface MarketingProps {
  id: number;
  name: string;
  description: string;
  visibility: boolean;
}

const PluginContext = createContext<PluginContextProps>({
  data: [],
  getPlugins: () => {},
});
export const PluginProvider = ({ children }: any) => {
  const [plugins, setPligins] = useState<MarketingProps[]>([]);

  const getPlugins = async () => {
    try {
      const { data } = await axios.get(`${url}/plugins`);
      const { data: vis } = await axios.get(`${url}/visibility`);
      setPligins({ data, ...vis });
    } catch (error) {
        // TO-DO return error to the server
      console.log("error");
    }
  };
  useEffect(() => {
    getPlugins();
  }, []);

  return (
    <PluginContext.Provider value={{ data: plugins, getPlugins }}>
      {children}
    </PluginContext.Provider>
  );
};

export const useGlobalContext = () => useContext<any>(PluginContext);
