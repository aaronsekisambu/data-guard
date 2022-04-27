import React from "react";
import axios from "axios";
import { useGlobalContext } from "hooks";
import { url } from "config";
import { useRouter } from "next/router";
import { useState } from "react";
import { useEffect } from "react";

interface MarketingProps {
  id: number;
  title: string;
  description: string;
  visibility: boolean;
}

const Marketing = () => {
  const { data, getPlugins, show } = useGlobalContext();
  const [d, setD] = useState<any>({ disabbled: [], enabled: [] });
  const router = useRouter();

  const toggleItem = async (plugin: MarketingProps) => {
    try {
      const { data } = await axios.patch(`${url}/plugins/${plugin.id}`, {
        visibility: !plugin.visibility,
      });
      if (data) {
        return getPlugins();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const obj = [];

  const findTabTitle = data.tabdata.find(
    (tab: any) =>
      tab.title.toLocaleLowerCase() === router.pathname.split("/").join("")
  );

  // for(const plugin in data.plugins){
  //   for(const tabs in findTabTitle.disabbled){
  //     // if(tabs === plugin.title.split(" ").join("").toLocaleLowerCase())
  //   }
  // }

  useEffect(() => {
    data.plugins.forEach((meee: any) => {
      //     for(let i = 0; i < findTabTitle?.disabbled?.length; i++){
      //       console.log("where", i)
      //    if(i === meee.title.split(" ").join("").toLocaleLowerCase()){
      //     return setD({...d, disabled: [...meee]})
      //    }
      //   return setD({...d, enabled: [...meee]})
      //  }

      findTabTitle.disabled.map((dis: any) => {
        if (dis === meee.title.split(" ").join("").toLocaleLowerCase()) {
          return setD({ ...d, disabled: [meee] });
        }
        return setD( { enabled: [meee] });
      });
    });
  }, []);

  // data.plugins.forEach((element: any) => {
  //   if(element)
  // });
  console.log("router.", d);

  return (
    <>
      <div className="flex-col">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-12 px-10 pt-10">
          Marketing plugins
        </div>
        <div className="flex flex-wrap justify-between sm:justify-center">
          {data?.plugins.map((plugin: MarketingProps) => (
            <div
              key={plugin.id}
              className="w-96 p-card h-64 px-4 mx-10 my-8 border-2 border-gray-200 rounded-md py-4"
            >
              <div className="flex justify-between">
                <p className="text-lg text-gray-600">{plugin.title}</p>
                <div className="flex-col">
                  <button
                    className={`md:w-14 md:h-7 w-12 h-6 flex items-center ${
                      plugin.visibility ? "bg-green-500" : "bg-rose-500"
                    } rounded-full p-1 ${show ? "" : "cursor-pointer"}`}
                    onClick={() => toggleItem(plugin)}
                    disabled={show ? true : false}
                  >
                    <div
                      className={
                        "material-symbols-outlined  bg-white md:w-6 md:h-6 h-5 w-5 rounded-full shadow-md transform duration-300 ease-in-out" +
                        (plugin.visibility ? "transform translate-x-5" : "")
                      }
                    >
                      power_settings_new
                    </div>
                  </button>
                  <p
                    className={` text-sm pt-1 pb-3 ${
                      plugin.visibility ? "text-green-500" : "text-rose-500"
                    } `}
                  >
                    {plugin.visibility ? "Allowed" : "Blocked"}
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-400">{plugin.description}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Marketing;
