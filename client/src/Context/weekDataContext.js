import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const WeekContext = createContext({});

export function WeekdataContext({ children }) {

    const [weeks, setWeeks] = useState([]);
    const [moduleWeek, setmoduleWeek] = useState({})
    const [modules, setmodules] = useState([])
    const [Currentmod, setCurrentmod] = useState({})



    useEffect(() => {
      async function fetchdata() {
        const weeks = await axios.get("http://localhost:3030/week");
        setWeeks(weeks.data.data);
        setmoduleWeek(weeks.data.data[0]) // setting default as module[0]
      setmodules(weeks.data.data[0].modules)
      }
        fetchdata();
    
    },[]);
  
    function getweekbybutton(week){
      setmoduleWeek(week)
      setmodules(week.modules)

    }
  
  return (
    <WeekContext.Provider value={{ weeks,getweekbybutton,moduleWeek ,modules,setmodules,Currentmod, setCurrentmod}}>
      {children}
    </WeekContext.Provider>
  );
}
