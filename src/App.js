import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import {FaBars, FaRegUserCircle, FaArrowAltCircleRight} from 'react-icons/fa';

import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import Dashboard1 from "./components/DashBoard1";
import AddChild from "./components/AddChild";
function App() {
  const [data, setData] = useState(null);
  const [openSide,toggle]=useState(true);

  return (
    <div className="flex h-full bg-[#C1DDB4]">
      <div
        className={`h-9/10 p-4 ${
          openSide ? "w-72" : "w-24"
        } bg-gradient-to-br from-purple-500 to-fuchsia-500 duration-300 rounded-3 m-2 relative shadow-xl opacity-90 hover:shadow-themecolor hover:opacity-100`}
      >
        <FaBars
          className={`text-4xl cursor-pointer top-1 duration-500 ${
            openSide && "rotate-[180deg]"
          }`}
          onClick={() => toggle(!openSide)}
        ></FaBars>
        {openSide ? (
          <img
            src="logo_scroll.png"
            height="40"
            width="100%"
            className="pt-4"
          ></img>
        ) : (
          ""
        )}
        <ul className="pt-2 ps-0">
          <li className="text-xl text-gray-300 bg-themecolor rounded-md p-2 flex items-center gap-x-4 mt-2 hover:bg-themecolor/[0.8]">
            1
          </li>
          <li className="text-xl text-gray-300 bg-themecolor rounded-md p-2 flex items-center gap-x-4 mt-2 hover:bg-themecolor/[0.8]">
            2
          </li>
          <li className="text-xl text-gray-300 bg-themecolor rounded-md p-2 flex items-center gap-x-4 mt-2 hover:bg-themecolor/[0.8]">
            3
          </li>
          <li className="text-xl text-gray-300 bg-themecolor rounded-md p-2 flex items-center gap-x-4 mt-2 hover:bg-themecolor/[0.8]">
            4
          </li>
          <li className="text-xl text-gray-300 bg-themecolor rounded-md p-2 flex items-center gap-x-4 mt-2 hover:bg-themecolor/[0.8]">
            <span>
              <FaRegUserCircle className="text-3xl text-textcolor block float-left"></FaRegUserCircle>
            </span>{" "}
            <span
              className={`text-base font-medium flex-1 ${
                !openSide && "hidden"
              }`}
            >
              {" "}
              Profile
            </span>
          </li>
          <li className="text-xl text-gray-300 bg-themecolor rounded-md p-2 flex items-center gap-x-4 mt-2 hover:bg-themecolor/[0.8]">
            <span>
              <FaArrowAltCircleRight className="text-3xl text-textcolor block float-left"></FaArrowAltCircleRight>
            </span>{" "}
            <span
              className={`text-base font-medium flex-1 ${
                !openSide && "hidden"
              }`}
            >
              {" "}
              Logout
            </span>
          </li>
        </ul>
      </div>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Dashboard />}></Route>
            <Route path="signup" element={<Signup setdata={setData} />} />
            <Route path="login" element={<Login />} />
            <Route path="addChild" element={<AddChild />} />
            <Route path="DashBoard1" element={<Dashboard1/>} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
