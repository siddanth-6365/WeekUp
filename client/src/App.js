import "./index.css";
import { Navbar } from "./components/Navbar";
import { Mainmiddle } from "./components/mainmiddle";
import { WeekdataContext } from "./Context/weekDataContext";
import axios from "axios";

function App() {

  axios.defaults.baseURL="http://localhost:3030"

  return (
    <>
      
    <WeekdataContext>
      <div className="h-screen w-screen bg-gray-300">
        <Navbar />
        <Mainmiddle />
      </div>
      </WeekdataContext>

    </>
  );
}

export default App;
