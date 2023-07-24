import React, { useState } from "react";
import axios from "axios";

const Dropdown = ({ showDropdown, onClose }) => {
  const [selectedOrder, setSelectedOrder] = useState("");
  const [selectedWeek, setSelectedWeek] = useState("");

  const orders = ["before", "after"];
  const weeks = ["Week 1", "Week 2", "Week 3", "Week 4"];

  const handleOrderChange = (event) => {
    setSelectedOrder(event.target.value);
  };

  const handleWeekChange = (event) => {
    setSelectedWeek(event.target.value);
  };

  const handleCancel = () => {
    onClose();
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    console.log("in function ")
    const order = selectedOrder;
    const week_number = parseInt(selectedWeek.match(/\d+/)[0]);
    await axios.post("http://localhost:3030/week", {
      order,
      week_number,
    });
    onClose();
  };

  return (
    <div
      className={`${
        showDropdown ? "block" : "hidden"
      } absolute top-full right-0  z-10 bg-gray-200 rounded-md shadow-lg p-4 mt-16 mr-9`}
    >
      <div className=" space-y-4">
        <div className="flex gap-8">
          {/* First Dropdown - Orders */}
          <div className="relative">
            <select
              value={selectedOrder}
              onChange={handleOrderChange}
              className="block appearance-none bg-white   text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            >
              <option value="">Select an Order</option>
              {orders.map((order) => (
                <option className="" key={order} value={order}>
                  {order}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>

          {/* Second Dropdown - Weeks */}
          <div className="relative">
            <select
              value={selectedWeek}
              onChange={handleWeekChange}
              className="block appearance-none bg-white  border-gray-400 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            >
              <option value="">Select a Week</option>
              {weeks.map((week) => (
                <option key={week} value={week}>
                  {week}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="grid  gap-4">
          <div>
            <p>
              New Week will be Added {selectedOrder} {selectedWeek}
            </p>
          </div>

          <div className="flex space-x-4 justify-center">
            <button
              onClick={handleCancel}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
            >
              Cancel
            </button>
            <button
              onClick={(e)=>handleCreate(e)}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
