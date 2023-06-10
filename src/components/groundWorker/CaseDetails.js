import React,{useState,useEffect} from "react";
import { useLocation, useNavigate,Outlet, useParams, useMatch} from "react-router-dom";
import { List} from "reactstrap";
import GroundWorkerSidebar from "./groundWorkerSidebar";
import NavBar from "../Navbar";
const CaseDetails= ({user,setuser, id, setId})=>{
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
		if(user!=="GroundWorker") navigate("/");
		setKeys(Object.keys(child))
	},[child,user]);
	return (
		<div className={`flex flex-row w-full bg-color2 overflow-hidden`}>
		<div className="flex pd-0">
			<GroundWorkerSidebar user={user} setuser={setuser} id = {id} setId = {setId} child={child} open={open} setOpen={(value)=>setOpen(value)} handdleToggle={()=>handleToggle()} openSide={openSide} toggle={toggle}/>
		</div>
		<div className={`flex flex-col w-full  ${open && "blur-sm"}`}>
			<NavBar user={"/"+user} open={open} setOpen={(value)=>setOpen(value)} toggle={toggle}/>
			<div className="max-h-70 lg:h-full flex flex-col md:flex-row  w-full mt-0 m-2 bg-color2 overflow-hidden">
			<div className=" w-95 md:w-3/5 bg-sideBarColor1  rounded-1 mx-2 md:ms-3 mt-3 md:me-0 drop-shadow-xl shadow-xl opacity-90 hover:shadow-sideBarColor1 hover:opacity-100 sm:block align-items-center justify-content-center overflow-y-scroll"> 
				<List type="unstyled">
					<div className="p-2 m-2 font-bold text-3xl "> Child Details for {child["id"]}</div>
					{child!==undefined && keys.map((key)=> {
						return <li key={key} className="row m-2 md:m-1 p-1"> <strong className="col-4 ms-1 p-0">{key}:</strong> <div className="col p-0 text-clip">{ child[key]}</div></li>
					})}
				</List>
			</div>
			
			<Outlet/>
		</div>
		</div>
		</div>
	)
}

export default CaseDetails;