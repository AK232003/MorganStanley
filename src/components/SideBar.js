import {React,useState} from "react";
import { FaBars, FaRegUserCircle, FaArrowAltCircleRight } from 'react-icons/fa';

const SideBar=({setuser})=>{
	const [openSide, toggle] = useState(true);
  const [open,setOpen] =useState(false);
  const handdleToggle=()=>{
    if(!open) toggle(!openSide); 
    open?setOpen(false):setOpen(open)
  }
	return (
    <>
    <div className={`h-14 w-14 ${open && "hidden"} sm:hidden rounded-3 m-2 p-1 relative bg-sideBarColor1 opacity-90 top-3 left-5`}>
          <FaBars className="h-12 w-12 cursor-pointer text-textcolor visible" onClick={() => setOpen(!open)}></FaBars>
    </div>
	<div className={`h-9/10 px-4 pb-4 pt-3 ${openSide ? "w-72" : "w-24"} ${!open && "hidden"} bg-sideBarColor1 duration-300 rounded-3 m-2 relative drop-shadow-2xl shadow-2xl opacity-90 hover:shadow-sideBarColor1 hover:opacity-100 sm:block`}>
          <FaBars className={`h-12 w-12 cursor-pointer top-1 text-textcolor duration-500 visible ${openSide && "rotate-[180deg]"}`} onClick={() => handdleToggle()}></FaBars>
          {openSide &&
            <img alt="logo"
            src="logo_scroll.png"
            height="40"
            width="100%"
            className="pt-4"></img>}
          <ul className="pt-2 ps-0">
            <li className="text-xl text-textcolor bg-color4 rounded-md p-2 flex items-center gap-x-4 mt-2 hover:bg-color4/[0.8]">1</li>
            <li className="text-xl text-textcolor bg-color4 rounded-md p-2 flex items-center gap-x-4 mt-2 hover:bg-color4/[0.8]">2</li>
            <li className="text-xl text-textcolor bg-color4 rounded-md p-2 flex items-center gap-x-4 mt-2 hover:bg-color4/[0.8]">3</li>
            <li className="text-xl text-textcolor bg-color4 rounded-md p-2 flex items-center gap-x-4 mt-2 hover:bg-color4/[0.8]">4</li>
            <li className="text-xl text-textcolor bg-color4 rounded-md p-2 flex items-center gap-x-4 mt-2 hover:bg-color4/[0.8]">
              <span><FaRegUserCircle className="text-3xl text-textcolor block float-left"></FaRegUserCircle></span>
              <span className={`text-base font-medium flex-1 ${!openSide && "hidden"}`}>Profile</span>
            </li>
            <li className="text-xl text-textcolor bg-color4 rounded-md p-2 flex items-center gap-x-4 mt-2 hover:bg-color4/[0.8] cursor-pointer" onClick={()=>setuser(null)} >
              <span><FaArrowAltCircleRight className="text-3xl text-textcolor block float-left"></FaArrowAltCircleRight></span>
              <span className={`text-base font-medium flex-1 ${!openSide && "hidden"}`}>Logout</span>
            </li>
          </ul>
        </div>
        </>
	)
};

export default SideBar;