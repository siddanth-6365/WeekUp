import React, { useContext, useEffect, useState } from "react";
import { WeekContext } from "../Context/weekDataContext";
import axios from "axios";
// import Modal from "./Modal";

export const Tasks = () => {
  const { Currentmod, modules, moduleWeek } = useContext(WeekContext);
  const [Tasks, setTasks] = useState([]);
  const [inputValue1, setInputValue1] = useState("");
  const [inputValue2, setInputValue2] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalToggle = () => {
    setIsModalOpen((prev) => !prev);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    setTasks(Currentmod.tasks);
  }, [Currentmod]);


  function createTaskbtn() {
    return (
      <div className="mb-2">
        <button
          onClick={handleModalToggle}
          className="block flex gap-2 mr-8 text-white p-2 bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
          type="button"
        >
          New Task
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
      </div>
    );
  }

  if (Tasks === undefined) {
    return (
      <div>
        <div className="flex mt-3 ml-3 justify-between">
          <div className="flex gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="mt-2 w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
            <span className=" text-left  text-3xl font-mono font-semibold">
              Tasks List
            </span>
          </div>

          <div className="text font-bold text-2xl mt-2 underline underline-offset-4">
            No taks available Add Tasks
          </div>
          {createTaskbtn()}
        </div>
      </div>
    );
  }

  const handleCreate = async () => {
    const newtask = {};
    newtask.id = inputValue1;
    newtask.name = inputValue2;

    await axios.post("/week/addTask", {  Currentmod,  moduleWeek, newtask,  });

    setTasks((prevTasks) => [...prevTasks,newtask]);  // this is very important because it will instantly show the task added after we click the createbutton otherwise we need to reload the page then we will see the data
  
    setInputValue1("");
    setInputValue2("");
    handleModalClose();
  };

  async function deleteTask(task) {
    console.log("TAsk before :", Tasks);
    setTasks((prevTasks) => prevTasks.filter((t) => t.id !== task.id));
    console.log("TAsk after :", Tasks);

    await axios.post("/week/deleteTask", {
      task,
      Currentmod,
      moduleWeek,
    });
  }

  return (
    <>
      <div>
        <div className="flex mt-3 ml-3 justify-between">
          <div className="flex gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="mt-2 w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
            <span className=" text-left  text-3xl font-mono font-semibold">
              Tasks List
            </span>
          </div>

          <div>{createTaskbtn()}</div>
        </div>
        <hr />

        <div className="  ">
          {Tasks.length > 0 ? (
            Tasks.map((task) => (
              <div
                class="flex mt-5 justify-between hover:bg-gray-300"
                key={task.id}  >
                <div className="flex">
                  <div class="flex items-center h-16 ">
                    <input
                      id="helper-checkbox"
                      aria-describedby="helper-checkbox-text"
                      type="checkbox"
                      value=""
                      class="w-6 h-6 mb-3 ml-3 text-gray-600 bg-gray-100 border-gray-300 rounded focus:ring-gray-500 focus:ring-2 "
                    />
                  </div>
                  <div class="ml-4 text-sm ">
                    <label
                      for="helper-checkbox"
                      class="font-semibold text-2xl text-gray-900 "
                    >
                      {task.id}
                    </label>
                    <p
                      id="helper-checkbox-text"
                      class="text-lg font-normal text-gray-500 "
                    >
                      {task.name}
                    </p>
                  </div>
                </div>

                <div className="mr-8 mt-3 flex gap-3 ">
                  <div
                    className="cursor-pointer"
                    onClick={() => deleteTask(task)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-8 h-8"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>{" "}
                  </div>
                </div>
              
              </div>
            ))
          ) : (
            <div className="text-center font-bold text-2xl mt-2 underline underline-offset-4">
              No taks available Add Tasks
            </div>
          )}
        </div>
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
                onClick={handleCreate}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
