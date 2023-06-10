import {React} from "react";
import { FaBars, FaRegUserCircle, FaTasks, FaArrowAltCircleRight, FaChild, FaHome, FaUserPlus,FaRegListAlt, FaClipboardList,FaComments  } from 'react-icons/fa';
import {BsPeopleFill}from 'react-icons/bs'
import { useNavigate } from "react-router-dom";

const SideBar=({user,setuser,open,handdleToggle,openSide})=>{
  const navigate=useNavigate();
  const sideBarIconProperty = "text-lg text-textcolor bg-color3 rounded-1 p-2 flex items-center gap-x-4 mt-2 hover:bg-color6 cursor-pointer";
  const logoutIconProperty = `${openSide ? "w-64" : "w-24"} absolute bottom-0 text-xl text-logoutContent duration-300 bg-logoutButton rounded-0 p-3 items-center bg-logoutButton cursor-pointer justify-items-center align-self-center`;
  const sideIconProperty = `${openSide ? "w-64" : "w-24"} h-16 text-xl text-color2 duration-300 bg-sideBarColor2 rounded-0 p-2 items-center bg-sideBarColor2 cursor-pointer justify-items-center`;

  const handleLogout= ()=>{
    localStorage.setItem('user',null);
    setuser(null);
    navigate("/");
  }
  
	return (
    <>
	<div className={`h-screen sm:h-9/10  ${openSide ? "w-64" : "w-24"} ${!open && "hidden"} 
  ${open && "w-1/2 opacity-100"} bg-sideBarColor1 duration-300 rounded-none md:relative  absolute md:top-14 top-0 opacity-100 hover:shadow-sideBarColor1 hover:opacity-100 md:block z-10`}>
    <div className={sideIconProperty}>
    <FaBars className={`md:!m-0 md:!ms-4 h-6 w-6 md:h-12  md:w-12 cursor-pointer text-sideBarColor1 duration-500 visible ${openSide && "rotate-[180deg]"}`} onClick={() => handdleToggle()} style={{margin: "0.5rem 1rem"}}></FaBars>
    </div>
    <div className = {`px-4 pb-4 pt-3`}>
            {user === "CaseManager" &&
            <>
            <ul className="ps-0">
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
              <li className={sideBarIconProperty} onClick={()=>navigate("/caseManager/taskComments")} >
                <span><FaComments className="text-3xl text-textcolor block float-left"></FaComments></span>
                <span className={`text-base font-medium flex-1 ${!openSide && "hidden"}`}>Task Comments</span>
              </li>
            </ul>
              {/* <div className={logoutIconProperty} onClick={handleLogout} >
                <span><FaArrowAltCircleRight className="text-3xl text-textcolor block float-left"></FaArrowAltCircleRight></span>
                <span className={`text-base font-medium flex-1 m-2 ${!openSide && "hidden"}`}>Logout</span>
              </div> */}
            </>
            }
          {user === "Admin" &&
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
              <li className={sideBarIconProperty} onClick={()=>navigate("/admin/childrenProfiles")} >
                <span><FaChild className="text-3xl text-textcolor block float-left"></FaChild></span>
                <span className={`text-base font-medium flex-1 ${!openSide && "hidden"}`}>Children Profiles</span>
              </li>
            </ul>
        </div>
          }
        </div>
            <div className={logoutIconProperty} onClick={handleLogout} >
            <span><FaArrowAltCircleRight className="mx-3 mb-2 text-3xl text-logoutContent block float-left"></FaArrowAltCircleRight></span>
            <span className={`text-base font-medium ${!openSide && "hidden"}`}>Logout</span>
          </div>
        </div>
        </>
	)
};

export default SideBar;