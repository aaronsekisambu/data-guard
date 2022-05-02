export interface PluginProps {
    title: string;
    description: string;
    status: string;
  }
  export interface PluginContextProps {
    data?: any;
    getPlugins: () => void;
    globalVisibility: () => void;
    toggleItem: (plugin: PluginProps) => void;
    show: boolean;
    allPlugins: any;
  }
  
  export interface DataProps {
    plugins: any;
    tabdata: any;
    tabs: any;
  }
  
  export interface PluginProviderProps {
    children: React.ReactNode;
  }