

import "./App.css";
import React, { useState } from "react";
import Dashboard from "./components/Dashboard";
function App() {
  const [data, setData] = useState(null);
  return (
   <Dashboard/>
  );
}

export default App;
