import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { db } from "./firebase";
import { collection,getDocs } from "firebase/firestore";
import Login from "./components/Login";
import Dashboard1 from "./components/DashBoard1";
import Main from "./components/MainComponent";
import { Dashboard, AddChild, AssignCases, ChildProfile, ChildrenList,TaskStatus,TaskComments } from "./components/caseManager/caseManager.js";
import {AdminDashboard, AddUser ,ManagersList,WorkersList, ChildrenProfile} from "./components/admin/admin";
import { Report, GroundWorkerDashboard,CaseDetails } from "./components/groundWorker/groundWorker";

function App() {
  const [user, setUser] = useState(null);
  const [id, setId] = useState(null);
  useEffect(() => {
    setUser(localStorage.getItem('user'))
  }, [user]);
  return (
    <>
      <div
        className={`${user !== "GroundWorker" && "max-h-screen"} ${
          user === "GroundWorker" && "overflow-hidden max-h-full"
        } bg-color2`}
      >
        <Router>
          <AuthProvider>
            <Routes>
              <Route
                exact
                path="/"
                element={
                  <Login
                    setUser={(value) => setUser(value)}
                    setId={(value) => setId(value)}
                  />
                }
              />
              <Route
                exact
                path="/*"
                element={
                  <Main
                    user={user}
                    id={id}
                    setUser={(value) => setUser(value)}
                    setId={(value) => setId(value)}
                  />
                }
              >
                <Route
                  exact
                  path="caseManager"
                  element={<Dashboard user={user} id={id} />}
                />
                <Route
                  path="caseManager/addChild"
                  element={<AddChild user={user} id={id} />}
                />
                <Route
                  path="caseManager/reports"
                  element={<AssignCases user={user} id={id} />}
                />
                <Route
                  path="caseManager/profiles"
                  element={<ChildrenList user={user} id={id} />}
                />
                <Route
                  path="caseManager/taskStatus"
                  element={<TaskStatus user={user} id={id} />}
                />
                <Route
                  path="caseManager/taskComments"
                  element={<TaskComments user={user} id={id} />}
                />
                <Route
                  path="caseManager/profiles/:id"
                  element={<ChildProfile user={user} id={id} />}
                />
                <Route
                  exact
                  path="admin"
                  element={<AdminDashboard user={user} id={id} />}
                />
                <Route
                  exact
                  path="admin/addUser"
                  element={<AddUser user={user} id={id} />}
                />
                <Route
                  exact
                  path="admin/managersList"
                  element={<ManagersList user={user} id={id} />}
                />
                <Route
                  exact
                  path="admin/workersList"
                  element={<WorkersList user={user} id={id} />}
                />
                <Route
                  exact
                  path="admin/childrenProfiles"
                  element={<ChildrenProfile user={user} id={id} />}
                />
              </Route>
              <Route
                path="/groundWorker"
                element={
                  <GroundWorkerDashboard
                    user={user}
                    id={id}
                    setuser={(value) => setUser(value)}
                    setId={(value) => setId(value)}
                  />
                }
              />
              <Route
                exact
                path="/groundWorker/caseDetails/:id"
                element={
                  <CaseDetails
                    user={user}
                    id={id}
                    setuser={(value) => setUser(value)}
                    setId={(value) => setId(value)}
                  />
                }
              >
                <Route path="step1/*" element={<Report />}></Route>
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

