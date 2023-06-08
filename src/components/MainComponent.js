import React from "react";
import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";

const Main=({user,setUser}) =>{

	return(
		<>
			<SideBar user={user} setuser={(value)=>setUser(value)}/>
			<Outlet/>
		</>
	)
}

export default Main;