import React, { useState } from "react";
import { Modules } from "./Modules";
import { Tasks } from "./Tasks";

export const Mainmiddle = () => {

  const [isModulesVisible, setIsModulesVisible] = useState(true);

  const handleModulesButtonClick = () => {
    // Toggle the visibility of the "Modules" component
    setIsModulesVisible((prev) => !prev);
  };

  return (
    <>
      <section className=" mt-4 w-screen flex h-[89.6%]">


        <div className="w-[20%] bg-white border rounded-r-xl ">
          <div>
          {/* <button
        onClick={handleModulesButtonClick}
        className="modules-button block flex gap-2 mr-8 text-white p-2 bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        type="button"
      >
        {isModulesVisible ? "Hide Modules" : "Show Modules"}
  
      </button> */}
          </div>
        <div className={`modules-container ${  isModulesVisible ? "" : "hidden" } sm:text-sm`} >
          <Modules  />
        </div>

        </div>

        <div className="w-[3%]"></div>
        <div className="w-[77%] bg-white border rounded-l-xl ">
          <Tasks />
        </div>
      </section>
    </>
  );

};
