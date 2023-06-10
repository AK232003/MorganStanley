import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Login from "./components/Login";
import Dashboard1 from "./components/DashBoard1";
import Main from "./components/MainComponent";
import { Dashboard, AddChild, AssignCases, ChildProfile, ChildrenList,TaskStatus,TaskComments } from "./components/caseManager/caseManager.js";
import {AdminDashboard, AddUser ,ManagersList,WorkersList} from "./components/admin/admin";
import { Report, GroundWorkerDashboard,CaseDetails } from "./components/groundWorker/groundWorker";

function App() {
  const [user, setUser] = useState("admin");
  
  useEffect(() => {
    if(user!==null) document.cookie=`user=${user}; expires=`+ new Date(2023,6,20).toUTCString();
  }, [user]);
  return (
    <>
    <div className={`${user!=="groundWorker"&& "sm:flex h-full"} sm:w-full ${user==="groundWorker" && "overflow-hidden max-h-full"} bg-color2`}>
        <Router>
          <AuthProvider>
            <Routes>
              <Route exact path="/" element={<Login setuser={(value)=>setUser(value)}/>}/>
              <Route exact path="/*" element={<Main user={user} setUser={(value)=>setUser(value)}/>}>
                <Route exact path="caseManager" element={<Dashboard user={user}/>}/>
                <Route path="caseManager/addChild" element={<AddChild user={user}/>}/>
                <Route path="caseManager/reports" element={< AssignCases user={user}/>} />
                <Route path="caseManager/profiles" element={< ChildrenList user={user}/>} />
                <Route path="caseManager/taskStatus" element={< TaskStatus user={user}/>} />
                <Route path="caseManager/taskComments" element={< TaskComments user={user}/>} />
                <Route path="caseManager/profiles/:id" element={<ChildProfile user={user}/>} />
                <Route exact path="admin" element={<AdminDashboard user={user}/>}/>
                <Route exact path="admin/addUser" element={<AddUser user={user}/>}/>
                <Route exact path="admin/managersList" element={<ManagersList user={user}/>}/>
                <Route exact path="admin/workersList" element={<WorkersList user={user}/>}/>
              </Route>
              <Route path="/groundWorker" element={<GroundWorkerDashboard user={user} setuser={(value)=>setUser(value)}/>} />
              <Route exact path="/groundWorker/caseDetails/:id" element={<CaseDetails user={user} setuser={(value)=>setUser(value)}/>}>
                  <Route path="step1/*" element={<Report/>}></Route>
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

