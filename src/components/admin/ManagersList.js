import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { List, Card, CardBody} from "reactstrap";

import { db,database } from "../../firebase"
import { collection, getDocs } from "firebase/firestore";
import img from "../../logo_scroll.png";

const ManagersList = ({user}) => {
	const navigate=useNavigate();
	const [filter,setFilter]=useState("Completed")
	useEffect(()=>{
		if(user!=="admin") navigate("/");
	},[user])

    const[manager, setManager] = useState([]);
    const managerCollectionRef = database.ref("Users");
    useEffect(() => {
		managerCollectionRef.on('value', (snapshot) => {
			console.log(snapshot.val())
			const filteredData = Object.values(snapshot.val()).filter(item => item.userType==="CaseManager");
			console.log(filteredData);
			setManager(filteredData);
		  });
    }, [])
    const managerLists=()=>{
        return (
            <div className="row">
            {manager.map((manager) => {
                return  (
								<Card body className="col col-sm-5 !flex-row align-items-center justify-content-center m-2 p-2 cursor-pointer" key={manager["UserID"]} style={{boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2)'}}> 
								<div><img alt="Child Photo" src={manager["Image"]!==undefined?manager["Image"]:img} className="w-60 h-40"/>
								<button className="m-2 p-2 rounded-pill bg-color4 text-textcolor w-full" > Assign</button>
								</div>
								<CardBody>
												<List type="unstyled">
												<li > <strong>Name :</strong> {manager["Name"]}</li>
												<li > <strong>Phone :</strong> {manager["Phone"]}</li>
												</List>
									</CardBody>
								</Card>
            )})}
        </div>)
    }
    return (
	<div className="container sm:mt-4 overflow-y-scroll bg-[#C1DDB4]">
		<h2>Managers List</h2>
		<div className="row mt-4 h-16">
			<button className="col-2 text-white m-2 rounded-pill bg-color3" onClick={()=>setFilter("Assigned")}>Assigned </button>
			<button className="col-2 text-white m-2 rounded-pill bg-color3" onClick={()=>setFilter("Unassigned")}> Unassigned</button>
			<button className="col-2 text-white m-2 rounded-pill bg-color3" onClick={()=>setFilter("Completed")}> Completed</button>
		</div>
			{manager.length>0? managerLists() :<div className="spinner-border m-5 p-4" style={{position: "relative" ,top: "50%", left: "50%"}} role="status"></div>}
	</div>
 );
}

export default ManagersList;