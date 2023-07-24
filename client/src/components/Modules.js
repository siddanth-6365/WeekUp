import React, { useContext, useEffect, useState } from "react";
import { WeekContext } from "../Context/weekDataContext";
import axios from "axios";

export const Modules = () => {
  const { moduleWeek, modules , setCurrentmod,setmodules,Currentmod} = useContext(WeekContext);
  const [activeModuleId, setActiveModuleId] = useState();

  const [inputValue1, setInputValue1] = useState("");
  const [inputValue2, setInputValue2] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

 
  
  const handleModalToggle = () => {
    setIsModalOpen((prev) => !prev);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };
    
  const addModulefun = async () => {
    try {
      const newModule = {};
      newModule.id = inputValue1;
      newModule.name = inputValue2;
      console.log("new mod: ", newModule);
      const resp = await axios.patch("/week/addmodule", {
        newModule,
        moduleWeek,
      });
      if (resp) {
        setmodules((mod)=>[...mod,newModule]) // to display the data instantly
        setInputValue1("");
        setInputValue2("");
        handleModalClose();
      }
    } catch (err) {
      console.log("error in add module fun ", err);
    }
  };

  const handleModuleClick = (moduleId) => {
    setActiveModuleId(moduleId === activeModuleId ? null : moduleId);

    let currentmod = {};
    function findMod(mod) {
      return mod.id === moduleId;
    }
    currentmod = modules.filter(findMod);
    setCurrentmod(currentmod[0]);
    console.log("current mod ",currentmod[0])
  };

  useEffect(() => {
    if (modules.length > 0) {
    setActiveModuleId(modules[0].id);
    setCurrentmod(modules[0]);
    }
  }, [modules]);

  const deleteModulefun = async (e)=>{
    e.preventDefault();
    
    setmodules((prevmods) => prevmods.filter((t) => t.id !== activeModuleId));
    console.log("modules: ",modules);
    console.log("mos :",moduleWeek)

    await axios.post(`/week/${moduleWeek.week_number}/deleteModule`,{
      activeModuleId,Currentmod
    })

  }

  return (
    <div className="flex flex-col">
      
      <div className="text-center mt-3 text-3xl font-mono font-semibold">
        Week {moduleWeek.week_number}
      </div>
      <hr />
      <div className="justify-center">
        {modules.length > 0 ? (
          modules.map((wee) => (
            <div
              className={`m-2 p-4 cursor-pointer  border border-gray-300 rounded-3xl ${
                wee.id === activeModuleId
                  ? "bg-gray-700 text-white"
                  : "bg-white"
              } rounded-lg`}
              key={wee._id}
              onClick={() => handleModuleClick(wee.id)}
            >
              <span className="block text-2xl">{wee.id}</span>
              <span className="block text-sm ">{wee.name}</span>
            </div>
          ))
        ) : (
          <p className="p-2 mt-3 mb-4 bg-red-600 text-white font-semibold rounded-3xl">
            No modules found Add new module by clicking below button{" "}
          </p>
        )}
      </div>
      <div className="flex justify-center">
      <button
          onClick={handleModalToggle}
          className="block flex gap-1 mr-8 text-white p-2 bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5  text-center mt-2"
          type="button"
        >
         Module
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
<button className="px-4 py-2 bg-red-500  rounded-2xl text-white mt-2 hover:bg-red-600" onClick={(e)=>deleteModulefun(e)}>
  Delete  Module
</button>

      </div>

      

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-gray-800 opacity-50" />

          <div className="bg-white rounded-lg p-4 w-80 relative">
            <button
              onClick={handleModalClose}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <h3 className="text-xl font-semibold mb-4">Create task</h3>

            <div className="mb-4">
              <label htmlFor="input1" className="block mb-2 text-sm">
                Title :
              </label>
              <input
                id="input1"
                type="text"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                value={inputValue1}
                onChange={(e) => setInputValue1(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="input2" className="block mb-2 text-sm">
                Description :
              </label>
              <textarea
                id="input2"
                type="text"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                value={inputValue2}
                onChange={(e) => setInputValue2(e.target.value)}
              />
            </div>

            <div className="flex justify-end">
              <button
                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600 mr-2"
                onClick={handleModalClose}
              >
                Cancel
              </button>
              <button
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={addModulefun}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
