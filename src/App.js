import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Login from "./components/Login";
import Dashboard1 from "./components/DashBoard1";
import SideBar from "./components/SideBar";
import { Dashboard, AddChild, AddchildXL, ChildProfile, ChildrenList } from "./components/caseManager/caseManager.js";
import {AdminDashboard, AddUser ,ManagersList,WorkersList} from "./components/admin/admin";
import { GroundWorkerSidebar, GroundWorkerDashboard,CaseDetails } from "./components/groundWorker/groundWorker";

function App() {
  const [user, setUser] = useState("groundWorker");
  return (
    <>
    <div className={`${user!=="groundWorker"&& "sm:flex"} sm:w-full h-full bg-color2`}>
        <Router>
          <AuthProvider>
            {user && user!=="groundWorker" && <SideBar user={user} setuser={(value)=>setUser(value)}/>}
            <Routes>
              <Route index element={<Login setuser={(value)=>setUser(value)}/>}></Route>
              <Route exact path="caseManager" element={<Dashboard user={user}/>}/>
              <Route path="caseManager/addChild" element={<AddChild user={user}/>}/>
              <Route path="caseManager/list" element={< ChildrenList user={user}/>} />
              <Route path="caseManager/list/:id" element={<ChildProfile user={user}/>} />
              <Route path="caseManager/addExcel" element={<AddchildXL />}/>
              <Route exact path="admin" element={<AdminDashboard user={user}/>}/>
              <Route exact path="admin/addUser" element={<AddUser user={user}/>}/>
              <Route exact path="admin/managersList" element={<ManagersList user={user}/>}/>
              <Route exact path="admin/workersList" element={<WorkersList user={user}/>}/>
              <Route path="/groundWorker" element={<GroundWorkerDashboard user={user}/>} />
              <Route exact path="/groundWorker/caseDetails/:id" element={<CaseDetails user={user} setuser={(value)=>setUser(value)}/>}>
                  <Route path="step1" element={<>hihi</>}></Route>
                  <Route path="step2" element={<>hihi2</>}></Route>
                  <Route path="step3" element={<>hihi3</>}></Route>
              </Route>
            </Routes>
          </AuthProvider>
        </Router>
      </div>
    </>
  );
}

export default App;

