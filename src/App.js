import React, { useState } from "react";
import addChild from "./components/addChild";

function App() {
  const [data, setData] = useState(null);
  return (

    <addChild />
    // <Router>
    //   <AuthProvider>
    //     <Routes>
    //       <Route path="/" element={<a />}></Route>
    //       <Route path="signup" element={<Signup setdata={setData} />} />
    //       <Route path="login" element={} />
    //       <Route path="excel" element={<FileUploader />} />
    //     </Routes>
    //   </AuthProvider>
    // </Router>
  );
}

export default App;
