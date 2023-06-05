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

function App() {
  const [user, setUser] = useState(null);
  return (
    <>
    <div className="flex h-full bg-[#C1DDB4]">
        <Router>
          <AuthProvider>
            {user && <SideBar setuser={(value)=>setUser(value)}/>}
            <Routes>
              <Route exact path="/" element={<Login setuser={(value)=>setUser(value)}/>}></Route>
              <Route path="/groundWorker" element={<Dashboard user={user}/>} />
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
