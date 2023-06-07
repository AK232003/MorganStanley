import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { List, Card, CardBody} from "reactstrap";

import { db,database } from "../../firebase"
import { collection, getDocs } from "firebase/firestore";
import img from "../../logo_scroll.png";

const WorkersList = ({user}) => {
	const navigate=useNavigate();
	const [filter,setFilter]=useState("Completed")
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
            {worker.map((worker) => {
                return  (
						<Card body className="col col-sm-5 align-items-center justify-content-center m-2 p-2 cursor-pointer" key={worker["UserID"]} style={{boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2)'}}> 
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
	<div className="container sm:mt-4 overflow-y-scroll bg-[#C1DDB4]">
		<h2>Workers List</h2>
		<div className="row mt-4 h-16">
			<button className="col-2 text-white m-2 rounded-pill bg-color3" onClick={()=>setFilter("Assigned")}>Assigned </button>
			<button className="col-2 text-white m-2 rounded-pill bg-color3" onClick={()=>setFilter("Unassigned")}> Unassigned</button>
			<button className="col-2 text-white m-2 rounded-pill bg-color3" onClick={()=>setFilter("Completed")}> Completed</button>
		</div>
			{worker.length>0? workerLists() :<div className="spinner-border m-5 p-4" style={{position: "relative" ,top: "50%", left: "50%"}} role="status"></div>}
	</div>
 );
}

export default WorkersList;