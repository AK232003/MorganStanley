import React from "react";
import SideBar from "./SideBar";
import NavBar from "./Navbar";
import { Outlet } from "react-router-dom";

const Main=({user,setUser}) =>{

	return(
		<>
		<div className="flex flex-col w-full">
			<NavBar user={user} />
			<div className="flex pd-0">
				<SideBar user={user} setuser={(value)=>setUser(value)}/>
				<Outlet/>
			</div>
		</div>
		</>
	)
}

export default Main;