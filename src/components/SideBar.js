import {React,useState} from "react";
import { FaBars, FaRegUserCircle, FaArrowAltCircleRight, FaChild, FaHome, FaUserPlus,FaRegListAlt, FaClipboardList  } from 'react-icons/fa';
import {BsPeopleFill}from 'react-icons/bs'
import { useNavigate } from "react-router-dom";
import logo from "../logo_scroll.png";

const SideBar=({user,setuser})=>{
	const [openSide, toggle] = useState(true);
  const [open,setOpen] =useState(false);
  const navigate=useNavigate();

  const sideBarProperty = "";
  const sideBarIconProperty = "text-xl text-textcolor bg-color3/[0.2] rounded-1 p-2 flex items-center gap-x-4 mt-2 hover:bg-color4/[0.8] cursor-pointer";
  const logoutIconProperty = "text-xl text-textcolor bg-logoutButton rounded-1 p-2 flex items-center gap-x-4 mt-2 hover:bg-logoutButton/[0.8] cursor-pointer";

  const handleLogout= ()=>{
    // document.cookie="user=; expires="+ new Date(-99).toUTCString();
    setuser(null);
    navigate("/");
  }
  const handdleToggle=()=>{
    if(!open) toggle(!openSide); 
    open?setOpen(false):setOpen(open);
  }
	return (
    <>
    <div className={`h-14 w-14 ${!open && "row"} sm:!hidden rounded-1 m-2 p-1 relative bg-sideBarColor1 opacity-90 top-4 sm:left-5 z-0 left-3 ${open&& "opacity-0"} overflow-hidden`}>
          <FaBars className="h-full w-full p-0 cursor-pointer text-textcolor visible" onClick={() =>{ setOpen(!open); toggle(true)}}></FaBars>
    </div>
	<div className={`h-95 sm:h-9/10 px-4 pb-4 pt-3 ${openSide ? "w-72" : "w-24"} ${!open && "hidden"} ${open && "w-95"} bg-sideBarColor1 duration-300 rounded-1 m-2 ms-0 absolute top-1 sm:relative drop-shadow-2xl shadow-2xl opacity-90 hover:shadow-sideBarColor1 hover:opacity-100 sm:block z-10`}>
          <FaBars className={`h-12 w-12 cursor-pointer top-1 text-textcolor duration-500 visible ${openSide && "rotate-[180deg]"}`} onClick={() => handdleToggle()}></FaBars>
          {openSide &&
            <img alt="logo"
            src={logo}
            height="40"
            width="100%"
            className="pt-4"></img>}
            {user === "caseManager" &&
            <ul className="pt-2 ps-0">
              <li className={sideBarIconProperty} onClick={()=>navigate("/caseManager")} >
                <span><FaHome className="text-3xl text-textcolor block float-left"></FaHome></span>
                <span className={`text-base font-medium flex-1 ${!openSide && "hidden"}`}>Dashboard</span>
              </li>
              <li className={sideBarIconProperty} onClick={()=>navigate("/caseManager/addChild")} >
                <span><FaChild className="text-3xl text-textcolor block float-left"></FaChild></span>
                <span className={`text-base font-medium flex-1 ${!openSide && "hidden"}`}>Add Child</span>
              </li>
              <li className={sideBarIconProperty} onClick={()=>navigate("/caseManager/addExcel")} >
                <span><BsPeopleFill className="text-3xl text-textcolor block float-left"></BsPeopleFill></span>
                <span className={`text-base font-medium flex-1 ${!openSide && "hidden"}`}>Add Bulk Data</span>
              </li>
              <li className={sideBarIconProperty} onClick={()=>navigate("/caseManager/list")}>
                <span><FaRegUserCircle className="text-3xl text-textcolor block float-left"></FaRegUserCircle></span>
                <span className={`text-base font-medium flex-1 ${!openSide && "hidden"}`}>Children List</span>
              </li>
              <li className={logoutIconProperty} onClick={handleLogout} >
                <span><FaArrowAltCircleRight className="text-3xl text-textcolor block float-left"></FaArrowAltCircleRight></span>
                <span className={`text-base font-medium flex-1 ${!openSide && "hidden"}`}>Logout</span>
              </li>
            </ul>
            }
          {user === "admin" &&
            <ul className="pt-2 ps-0">
              <li className={sideBarIconProperty} onClick={()=>navigate("/admin")} >
                <span><FaHome className="text-3xl text-textcolor block float-left"></FaHome></span>
                <span className={`text-base font-medium flex-1 ${!openSide && "hidden"}`}>Dashboard</span>
              </li>
              <li className={sideBarIconProperty} onClick={()=>navigate("/admin/addUser")} >
                <span><FaUserPlus className="text-3xl text-textcolor block float-left"></FaUserPlus></span>
                <span className={`text-base font-medium flex-1 ${!openSide && "hidden"}`}>Add User</span>
              </li>
              <li className={sideBarIconProperty} onClick={()=>navigate("/admin/managersList")} >
                <span><FaRegListAlt className="text-3xl text-textcolor block float-left"></FaRegListAlt></span>
                <span className={`text-base font-medium flex-1 ${!openSide && "hidden"}`}>Managers List</span>
              </li>
              <li className={sideBarIconProperty} onClick={()=>navigate("/admin/workersList")} >
                <span><FaClipboardList className="text-3xl text-textcolor block float-left"></FaClipboardList></span>
                <span className={`text-base font-medium flex-1 ${!openSide && "hidden"}`}>Workers List</span>
              </li>
              <li className={logoutIconProperty} onClick={()=>handleLogout()} >
                <span><FaArrowAltCircleRight className="text-3xl text-textcolor block float-left"></FaArrowAltCircleRight></span>
                <span className={`text-base font-medium flex-1 ${!openSide && "hidden"}`}>Logout</span>
              </li>
            </ul>
          }
        </div>
        </>
	)
};

export default SideBar;