import React, {useState,useEffect} from "react";
import SideBar from "./SideBar";
import NavBar from "./Navbar";
import { Outlet } from "react-router-dom";

const Main=({user,setUser}) =>{
	const [open,setOpen] =useState(false);
	const [openSide, toggle] = useState(true);
	const handleToggle=()=>{
    if(!open) toggle(!openSide); 
    open?setOpen(false):setOpen(open);
  }
	const [width,setIsSmallScreen]=useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 640); // Adjust the threshold value as needed
    };

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
	return(
		<>
		<div className={`flex flex-row w-full h-screen`}>
			<div className="flex pd-0">
				<SideBar user={user} setuser={(value)=>setUser(value)} open={open} setOpen={(value)=>setOpen(value)} handdleToggle={()=>handleToggle()} openSide={openSide} toggle={toggle}/>
			</div>
			<div className={`grid flex-col w-full ${open && "blur-sm"}`}>
				<NavBar user={user} open={open} setOpen={(value)=>setOpen(value)} toggle={toggle}/>
				<div className={`container mx-auto mt-1 lg:ms-2 bg-color2 overflow-y-scroll max-h-screen}`}>
				<Outlet/>
				</div>
			</div>
		</div>
		</>
	)
}

export default Main;