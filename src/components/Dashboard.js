import {React, useEffect} from "react";
import { useNavigate, Link } from "react-router-dom";
const Dashboard= ({user}) =>{
  const navigate=useNavigate();
  useEffect(()=>{
    if(user===null) navigate("/");
  },[user])
  return (
    <div className="container m-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
      <div className="text-textcolor justify-self-start rounded-4 bg-color3 px-1 sm:px-3 py-1 drop-shadow-md ">
         <div className="font-sans text-justify align-text-bottom fw-bold text-2xl sm:text-4xl">Dashboard</div>
      </div>
      <Link to="addChild">
        <button className="justify-self-start sm:justify-self-center p-2 rounded-pill bg-themecolor shadow-md drop-shadow-md text-white hover:shadow-themecolor/[0.5]"> Add child</button>
      </Link>
      </div>
    </div>
  );
}
export default Dashboard
