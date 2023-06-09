import React,{useState,useEffect} from "react";
import { useLocation, useNavigate,Outlet, useParams, useMatch} from "react-router-dom";
import { List} from "reactstrap";
import GroundWorkerSidebar from "./groundWorkerSidebar";
import NavBar from "../Navbar";
const CaseDetails= ({user,setuser})=>{
	const location=useLocation();
	const [child,setChild]=useState(location.state["children"]);
	const [keys,setKeys]=useState(Object.keys(child));
	const [open,setOpen] =useState(false);
	const [openSide, toggle] = useState(true);
	const handleToggle=()=>{
    if(!open) toggle(!openSide); 
    open?setOpen(false):setOpen(open);
  }
	const navigate=useNavigate();
	useEffect(()=>{
		if(user!=="groundWorker") navigate("/");
		setKeys(Object.keys(child))
	},[child,user]);
	return (
		<div className={`flex flex-row w-full`}>
		<div className="flex pd-0">
			<GroundWorkerSidebar user={user} setuser={setuser} child={child} open={open} setOpen={(value)=>setOpen(value)} handdleToggle={()=>handleToggle()} openSide={openSide} toggle={toggle}/>
		</div>
		<div className={`flex flex-col w-full ${open && "blur-sm"}`}>
			<NavBar user={"/"+user} open={open} setOpen={(value)=>setOpen(value)} toggle={toggle}/>
		<div className="h-95 w-95 sm:h-9/10 sm:w-2/5 bg-sideBarColor1  rounded-1 ms-3 mt-3 me-0 sm:m-2 sm:relative drop-shadow-xl shadow-xl opacity-90 hover:shadow-sideBarColor1 hover:opacity-100 sm:block align-items-center justify-content-center overflow-y-scroll"> 
			<List type="unstyled">
				<div className="p-2 m-2 font-bold text-3xl "> Child Details for {child["id"]}</div>
				{child!==undefined && keys.map((key)=> {
					return <li key={key} className="row m-2 p-1"> <strong className="col-3">{key} :</strong> <div className="col">{child[key]}</div></li>
				})}
			</List>
		</div>
			<Outlet/>
		</div>
		</div>
	)
}

export default CaseDetails;