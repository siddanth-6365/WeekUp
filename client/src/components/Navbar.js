import React, { useContext, useEffect, useState } from "react";
import { WeekContext } from "../Context/weekDataContext";
import Dropdown from "./AddnewWeekBox";

export const Navbar = () => {
  const { weeks, getweekbybutton } = useContext(WeekContext);
  const [activeWeekNumber, setActiveWeekNumber] = useState(1);
  const [activeBtn, setActiveBtn] = useState(false);

  function onClickfun(week) {
    getweekbybutton(week);
    setActiveWeekNumber(week.week_number);
  }

  const handleButtonClick = () => {
    setActiveBtn(!activeBtn);
  };

  return (
    <>
 <nav className="">
  <div className="flex p-3 rounded-3xl bg-white justify-between flex-col md:flex-row">
    <div className="flex cursor-pointer gap-3 justify-start ml-8 mb-4 md:mb-0 md:flex-grow">
      {weeks.length > 0 ? (
        weeks.map((week) => (
          <button
            className={`p-3 border ${
              activeWeekNumber === week.week_number
                ? "bg-gray-800 text-white"
                : "bg-gray-300 text-gray-800"
            } rounded-3xl text-sm md:text-base`}
            onClick={() => onClickfun(week)}
            key={week._id}
          >
            Week {week.week_number}
          </button>
        ))
      ) : (
        <p>Loading... in navbar</p>
      )}
    </div>

    <div className="flex items-center justify-end mr-8 relative">
      <button
        className="bg-gray-300 text-gray-800 rounded-3xl flex gap-2 p-4 text-sm md:text-base"
        onClick={handleButtonClick}
      >
        Add new Week
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
</svg>

      </button>

      {activeBtn && (
        <div className="fixed top-0 right-0 z-10">
          <Dropdown showDropdown={activeBtn} onClose={handleButtonClick} />
        </div>
      )}
    </div>
  </div>
</nav>


    </>
  );
};
