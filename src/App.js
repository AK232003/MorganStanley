import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import Dashboard1 from "./components/DashBoard1";
import SideBar from "./components/SideBar";
import AddChild from "./components/AddChild";
import ListTest from "./components/ChildrenList";

function App() {
  const [user, setUser] = useState(" ");
  return (
    <>
    <div className="flex h-full bg-[#C1DDB4]">
        <Router>
          <AuthProvider>
            {user && <SideBar setuser={(value)=>setUser(value)}/>}
            <Routes>
              <Route index element={<Login setuser={(value)=>setUser(value)}/>}></Route>
              <Route exact path="groundWorker" element={<Dashboard user={user}/>}/>
              <Route path="groundWorker/addChild" element={<AddChild user={user}/>}/>
              <Route path="groundWorker/addExcel" element={<Dashboard1 />}/>
              <Route path="groundWorker/list" element={< ListTest user={user}/>} />
              <Route path="signup" element={<Signup />} />
              <Route path="/caseManager" element={<Dashboard1 />} />
            </Routes>
          </AuthProvider>
        </Router>
      </div>
    </>
  );
}

export default App;
