import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useGlobalContext } from "hooks";

const Sidebar = () => {
  const { data, show, globalVisibility } = useGlobalContext();
  const router = useRouter();
  return (
    <>
      <nav className="md:left-0 md:block md:fixed md:top-0 sidebar md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-sm bg-gray-100  flex flex-wrap items-center justify-between relative md:w-64 z-10 pt-4">
        <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
          <div
            className={
              "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded "
            }
          >
            <h1 className="px-10 pb-10 text-3xl">
              Data<span className="font-bold">Guard</span>
            </h1>
            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
              {data.tabdata.map((route: any) => (
                <li className="items-center cursor-pointer" key={route.title}>
                  <Link href={`/${route.title.toLocaleLowerCase()}`} passHref>
                    <div
                      className={
                        "text-xs capitalize py-3 font-bold flex items-center px-4 " +
                        (router.pathname.indexOf(`${route.title.toLocaleLowerCase()}`) !== -1
                          ? "text-gray-800 hover:text-lightBlue-600 bg-white border-l-8 border-l-red-700"
                          : "text-blueGray-700 hover:text-blueGray-500")
                      }
                    >
                      <span className="material-symbols-outlined">{route.icon}</span>
                      <span className="px-4 text-md">{route.title}</span>
                    </div>
                  </Link>
                  <div
                    className={`bottom-0 ${
                      router.pathname.indexOf(`/${route.title.toLocaleLowerCase()}`) === -1 && "hidden"
                    } absolute px-4 py-6 flex w-full justify-between align-center bg-gradient-to-t ${!show ? "from-green-200" : "from-red-200"} to-transparent`}
                  >
                    All plugins {!show ? "enabled" : "disabled"}
                    <div className={`md:w-14 md:h-7 w-12 h-6 flex items-center ${!show ? "bg-green-500" : "bg-rose-500"} rounded-full p-1 cursor-pointer`} onClick={globalVisibility}>
                      <div className={"material-symbols-outlined  bg-white md:w-6 md:h-6 h-5 w-5 rounded-full shadow-md transform duration-300 ease-in-out" + (!show ? "transform translate-x-5" : "")}>
                        power_settings_new
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
