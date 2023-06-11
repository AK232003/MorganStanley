import React, {useState,useEffect} from "react";
import SideBar from "./SideBar";
import NavBar from "./Navbar";
import { Outlet, useLocation } from "react-router-dom";

const Main=({user,setUser}) =>{
	const [open,setOpen] =useState(false);
	const [openSide, toggle] = useState(true);
	const {pathname}=useLocation();
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
	useEffect(()=>{
		if(width==true) handleToggle();
	},[pathname])
	return(
		<>
		<div className={`flex flex-row w-full h-screen`}>
			<div className="flex pd-0">
				<SideBar user={user} setuser={(value)=>setUser(value)} open={open} setOpen={(value)=>setOpen(value)} handdleToggle={()=>handleToggle()} openSide={openSide} toggle={toggle}/>
			</div>
			<div className={`grid grid-rows-12 flex-col w-full ${open && "blur-sm"}`}>
				<NavBar className="row-start-1" user={user} open={open} setOpen={(value)=>setOpen(value)} toggle={toggle}/>
				<div className={`row-span-11 mx-2 md:mx-4 mt-0 lg:ms-2 bg-color2 overflow-y-scroll max-h-screen}`}>
					<Outlet/>
				</div>
			</div>
		</div>
		</>
	)
}

export default Main;