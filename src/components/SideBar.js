import {React} from "react";
import { FaBars, FaRegUserCircle, FaTasks, FaArrowAltCircleRight, FaChild, FaHome, FaUserPlus,FaRegListAlt, FaClipboardList  } from 'react-icons/fa';
import {BsPeopleFill}from 'react-icons/bs'
import { useNavigate } from "react-router-dom";

const SideBar=({user,setuser,open,handdleToggle,openSide})=>{
  const navigate=useNavigate();
  const sideBarIconProperty = "text-lg text-textcolor bg-color3/[0.2] rounded-1 p-2 flex items-center gap-x-4 mt-2 hover:bg-color4/[0.8] cursor-pointer";
  const logoutIconProperty = `${openSide ? "w-52" : "w-12"} text-xl text-textcolor duration-300 bg-logoutButton rounded-1 p-2 items-center gap-x-4 mt-2 hover:bg-logoutButton/[0.8] cursor-pointer justify-items-center fixed bottom-3`;

  const handleLogout= ()=>{
    // document.cookie="user=; expires="+ new Date(-99).toUTCString();
    setuser(null);
    navigate("/");
  }
  
	return (
    <>
	<div className={`h-screen sm:h-9/10 px-4 pb-4 pt-3 ${openSide ? "w-64" : "w-24"} ${!open && "hidden"} 
  ${open && "w-1/2 opacity-100"} bg-sideBarColor1 duration-300 rounded-none md:relative  absolute left-0 md:top-14 top-0 drop-shadow-2xl shadow-2xl opacity-90 hover:shadow-sideBarColor1 hover:opacity-100 md:block z-10`}>
          <FaBars className={`h-12 w-12 cursor-pointer top-1 text-textcolor duration-500 visible ${openSide && "rotate-[180deg]"}`} onClick={() => handdleToggle()}></FaBars>
            {user === "caseManager" &&
            <>
            <ul className="pt-2 ps-0">
              <li className={sideBarIconProperty} onClick={()=>navigate("/caseManager")} >
                <span><FaHome className="text-3xl text-textcolor block float-left"></FaHome></span>
                <span className={`text-base font-medium flex-1 ${!openSide && "hidden"}`}>Dashboard</span>
              </li>
              <li className={sideBarIconProperty} onClick={()=>navigate("/caseManager/addChild")} >
                <span><FaChild className="text-3xl text-textcolor block float-left"></FaChild></span>
                <span className={`text-base font-medium flex-1 ${!openSide && "hidden"}`}>Add Child</span>
              </li>
              <li className={sideBarIconProperty} onClick={()=>navigate("/caseManager/profiles")}>
                <span><FaRegUserCircle className="text-3xl text-textcolor block float-left"></FaRegUserCircle></span>
                <span className={`text-base font-medium flex-1 ${!openSide && "hidden"}`}>Children Profiles</span>
              </li>
              <li className={sideBarIconProperty} onClick={()=>navigate("/caseManager/reports")} >
                <span><BsPeopleFill className="text-3xl text-textcolor block float-left"></BsPeopleFill></span>
                <span className={`text-base font-medium flex-1 ${!openSide && "hidden"}`}>Assign Cases</span>
              </li>
              <li className={sideBarIconProperty} onClick={()=>navigate("/caseManager/taskStatus")} >
                <span><FaTasks className="text-3xl text-textcolor block float-left"></FaTasks></span>
                <span className={`text-base font-medium flex-1 ${!openSide && "hidden"}`}>Task Status</span>
              </li>
            </ul>
              <div className={logoutIconProperty} onClick={handleLogout} >
                <span><FaArrowAltCircleRight className="text-3xl text-textcolor block float-left"></FaArrowAltCircleRight></span>
                <span className={`text-base font-medium flex-1 m-2 ${!openSide && "hidden"}`}>Logout</span>
              </div>
            </>
            }
          {user === "admin" &&
          <div className="h-full flex flex-col ">
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
            </ul>
            <div className={logoutIconProperty} onClick={handleLogout} >
            <span><FaArrowAltCircleRight className="text-3xl text-textcolor block float-left"></FaArrowAltCircleRight></span>
            <span className={`text-base font-medium flex-1 m-2 ${!openSide && "hidden"}`}>Logout</span>
          </div>
        </div>
          }
        </div>
        </>
	)
};

export default SideBar;