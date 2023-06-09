import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { List, Card, CardBody,Input} from "reactstrap";
import { FaSearch } from "react-icons/fa";
import { db,database } from "../../firebase"
import { collection, getDocs } from "firebase/firestore";
import img from "../../logo_scroll.png";

const WorkersList = ({user}) => {
	const navigate=useNavigate();
	const [filter,setFilter]=useState("Name")
	const [search,setSearch] = useState("");
	useEffect(()=>{
		if(user!=="admin") navigate("/");
	},[user])

    const[worker, setWorker] = useState([]);
	const workerCollectionRef = database.ref("Users");
    useEffect(() => {
		workerCollectionRef.on('value', (snapshot) => {
			console.log(snapshot.val())
			const filteredData = Object.values(snapshot.val()).filter(item => item.userType==="GroundWorker");
			console.log(filteredData);
			setWorker(filteredData);
		  });
    }, [])
    const workerLists=()=>{
        return (
            <div className="row">
            {worker.filter(worker => {
				if(search === "Search" || search === "") {
					return worker;
				}
				else if(worker[filter].toLowerCase().includes(search.toLowerCase())){
					return worker;
				}
				}).map((worker) => {
                return  (
						<Card body className="col col-md-5 align-items-center justify-content-center m-2 p-2 cursor-pointer" key={worker["UserID"]} style={{boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2)'}}> 
						<img alt="Child Photo" src={worker["Image"]!==undefined?worker["Image"]:img} className="w-60 h-40"/>
						
						<CardBody>
							<List type="unstyled">
												<li > <strong>Name :</strong> {worker["Name"]}</li>
												<li > <strong>Phone :</strong> {worker["Phone"]}</li>
								</List>
							</CardBody>
						</Card>
					)})}
        </div>)
    }
    return (
	<div className="container sm:mt-4 overflow-y-scroll bg-color2">
		<h2>Workers List</h2>
		<div className="row mt-4 h-16">
			<div className="col-8 col-md-10 w-full p-2">
			<div className="rounded-md w-auto text-xl p-2 flex align-items-center bg-white shadow-md hover:shadow-xl">
			<span><FaSearch className="text-lg text-black block float-left me-2"></FaSearch></span>
			<input className="w-95 bg-inherit text-slate-800 align-self-center font-sans placeholder:text-black focus-visible:outline-0" type="text" placeholder={"Search"} onChange={(event)=>setSearch(event.target.value)}></input>
			</div>
			</div>
			<div className="col-4 col-md-2 mt-2 md:p-2 p-1">
			<Input type="select" name="filter" id="filter" className="rounded-md w-full h-auto text-2xl p-2 border-0 !bg-color3 shadow-md" onChange={(event)=>setFilter(event.target.value)}>
				<option>Name</option>
			</Input>
			</div>
		</div>
		{/* <div className="row mt-4 h-16">
			<button className="col-2 text-white m-2 rounded-pill bg-color3" onClick={()=>setFilter("Assigned")}>Assigned </button>
			<button className="col-2 text-white m-2 rounded-pill bg-color3" onClick={()=>setFilter("Unassigned")}> Unassigned</button>
			<button className="col-2 text-white m-2 rounded-pill bg-color3" onClick={()=>setFilter("Completed")}> Completed</button>
		</div> */}
			{worker.length>0? workerLists() :<div className="spinner-border m-5 p-4" style={{position: "relative" ,top: "50%", left: "50%"}} role="status"></div>}
	</div>
 );
}

export default WorkersList;