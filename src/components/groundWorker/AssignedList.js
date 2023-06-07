import React, {useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase"
import { collection, getDocs } from "firebase/firestore";
import img from "../../logo_scroll.png";
import { List, Card, CardBody} from "reactstrap";

const AssignedList=({id})=>{
	const navigate = useNavigate();

	const[children, setChildren] = useState([]);
	const [filter,setFilter]=useState("Completed")
	const childrenCollectionRef = collection(db, "children");
	useEffect(() => {
			const getChildren = async () => {
					const data = await getDocs(childrenCollectionRef);
					setChildren(data.docs.map((doc) => ({...doc.data(), id:doc.id})))
			};
			getChildren();
	}, [])
	const childrenLists=()=>{
			return (
					<div className="row">
					{children.map((children) => {
							return  (
							<Card body className="col col-sm-5 gap-2 !flex-row align-items-center justify-content-center m-2 p-2 cursor-pointer" key={children["Case Number"]} style={{boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2)'}}  onClick={()=> navigate(`/groundWorker/caseDetails/${children["id"]}`, {state: {children}})}> 
							<div><img alt="Child Photo" src={children["Image"]!==undefined?children["Image"]:img} className="w-60 h-40"/>
							<button className="m-2 p-2 rounded-pill bg-color4 text-textcolor w-full" > Assign</button>
							</div>
							<CardBody>
											<List type="unstyled">
											<li > <strong>Name :</strong> {children["Age"]}</li>
											<li > <strong>Age :</strong> {children["Age"]}</li>
											<li > <strong>District :</strong> {children["District"]}</li>
											<li > <strong>State :</strong> {children["State"]}</li>
											<li > <strong>Case Number :</strong> {children["Case Number"]}</li>
											</List>
								</CardBody>
							</Card>
					)})}
			</div>)
	}
	return (
<div className="container sm:mt-4 overflow-y-scroll rounded-3 bg-[#C1DDB4]">
	<div className="row mt-4 h-16">
		<button className="col-2 text-white m-2 rounded-pill bg-color3" onClick={()=>setFilter("Assigned")}>Assigned </button>
		<button className="col-2 text-white m-2 rounded-pill bg-color3" onClick={()=>setFilter("Unassigned")}> Unassigned</button>
		<button className="col-2 text-white m-2 rounded-pill bg-color3" onClick={()=>setFilter("Completed")}> Completed</button>
	</div>
		{children.length>0? childrenLists() :<div className="spinner-border m-5 p-4" style={{position: "relative" ,top: "50%", left: "50%"}} role="status"></div>}
</div>
);
	
}

export default AssignedList;