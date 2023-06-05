import {React,useState} from "react";
import {FaBars, FaRegUserCircle, FaArrowAltCircleRight} from 'react-icons/fa';
import {Link } from "react-router-dom";
const Dashboard= () =>{
  const [openSide,toggle]=useState(true);
  return (
    <div className="flex">
    <div className={`h-screen p-4 ${openSide? 'w-72':'w-24'} bg-gradient-to-br from-purple-500 to-fuchsia-500 duration-300 relative`}>
      <FaBars className={`text-4xl cursor-pointer top-1 duration-500 ${openSide&& 'rotate-[180deg]'}`} onClick={()=> toggle(!openSide) } ></FaBars>
      {openSide?<Link to="/"><img src="logo_scroll.png" height="40" width="100%" className="pt-4"></img></Link>:""}
        <ul className="pt-2 ps-0">
          <li className="text-xl text-gray-300 bg-themecolor rounded-md p-2 flex items-center gap-x-4 mt-2 hover:bg-themecolor/[0.8]">1</li>
          <li className="text-xl text-gray-300 bg-themecolor rounded-md p-2 flex items-center gap-x-4 mt-2 hover:bg-themecolor/[0.8]">2</li>
          <li className="text-xl text-gray-300 bg-themecolor rounded-md p-2 flex items-center gap-x-4 mt-2 hover:bg-themecolor/[0.8]">3</li>
          <li className="text-xl text-gray-300 bg-themecolor rounded-md p-2 flex items-center gap-x-4 mt-2 hover:bg-themecolor/[0.8]">4</li>
          <li className="text-xl text-gray-300 bg-themecolor rounded-md p-2 flex items-center gap-x-4 mt-2 hover:bg-themecolor/[0.8]">
            <span><FaRegUserCircle className="text-3xl text-textcolor block float-left"></FaRegUserCircle></span> <span className={`text-base font-medium flex-1 ${!openSide && 'hidden'}`}>  Profile</span></li>
          <li className="text-xl text-gray-300 bg-themecolor rounded-md p-2 flex items-center gap-x-4 mt-2 hover:bg-themecolor/[0.8]">
          <span><FaArrowAltCircleRight className="text-3xl text-textcolor block float-left"></FaArrowAltCircleRight></span> <span className={`text-base font-medium flex-1 ${!openSide && 'hidden'}`}>  Logout</span></li>
        </ul>
    </div>
    <div className="p-7">
      <h1>DashBoard!</h1>
    </div>
    </div>
  );
}
export default Dashboard
