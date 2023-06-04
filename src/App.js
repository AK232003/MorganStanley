import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";

function App() {
  const [data, setData] = useState(null);
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Dashboard/>}></Route>
          <Route path="signup" element={<Signup setdata={setData} />} />
          <Route path="login" element={<Login />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
