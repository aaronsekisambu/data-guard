import { useGlobalContext } from 'hooks';
import React from 'react';

const Card = ({allPlugins, toggleItem}: any) => {
    const { show } = useGlobalContext();
    return (
        <>
         {allPlugins?.map((plugin: any) => (
            <div key={plugin.title} className={`w-96 p-card h-64 px-4 mx-10 my-8 border-2 border-gray-200 rounded-md py-4 ${plugin.status === "disabled" ? "opacity-50" : "opacity-100"}`}>
              <div className="flex justify-between">
                <p className="text-lg text-gray-600">{plugin.title}</p>
                <div className="flex-col">
                  <button
                    className={`md:w-14 md:h-7 w-12 h-6 flex items-center ${plugin.status === "active" ? "bg-green-500" : "bg-rose-500"} rounded-full p-1 ${
                      plugin.status === "disabled" || show ? "" : "cursor-pointer"
                    }`}
                    onClick={() => toggleItem(plugin)}
                    disabled={plugin.status === "disabled" || show ? true : false}
                  >
                    <div
                      className={
                        "material-symbols-outlined  bg-white md:w-6 md:h-6 h-5 w-5 rounded-full shadow-md transform duration-300 ease-in-out" +
                        (plugin.status === "active" ? "transform translate-x-5" : "")
                      }
                    >
                      power_settings_new
                    </div>
                  </button>
                  <p className={` text-sm pt-1 pb-3 ${plugin.status === "active" ? "text-green-500" : "text-rose-500"} `}>{plugin.status === "active" ? "Allowed" : "Blocked"}</p>
                </div>
              </div>
              <p className="text-sm text-gray-400">{plugin.description}</p>
            </div>
          ))}
        </>
    )
}

export default Card;