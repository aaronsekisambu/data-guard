import React from "react";
import { useGlobalContext } from "hooks";
import Card from "components/Card";

const Marketing = () => {
  const {  toggleItem,  allPlugins } = useGlobalContext()

  return (
    <>
      <div className="flex-col">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-12 px-10 pt-10">Marketing plugins</div>
        <div className="flex flex-wrap justify-between sm:justify-center">
          <Card  allPlugins={allPlugins} toggleItem={toggleItem}/>
        </div>
      </div>
    </>
  );
};

export default Marketing;
