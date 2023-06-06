import React, {useState,useEffect} from "react";
import { useLocation,useNavigate } from "react-router-dom";
import img from "../logo_scroll.png";
import { List, Card, CardBody, CardTitle} from "reactstrap";


const ChildProfile= ({user}) => {
	const {state}=useLocation();
	const [child,setChild]=useState(state["children"]);
	const [keys,setKeys]=useState(Object.keys(child));
	const navigate=useNavigate();
	useEffect(()=>{
		if(user===null) navigate("/");
	},[user])
	useEffect(()=>{
		setKeys(Object.keys(child))
	},[child]);
	return (
	<div className="container overflow-y-auto bg-[#C1DDB4]"> 
		<Card body className=" !flex-row align-items-center justify-content-center m-2 p-2 mt-4" style={{boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2)'}}  > 
			<CardBody>
							<List type="unstyled">
								<h1 className="p-2 m-2"> Child Details for {child["id"]}</h1>
								{child!==undefined && keys.map((key)=> {
									return <li key={key} className="row m-2 p-1"> <strong className="col-3">{key} :</strong> <div className="col">{child[key]}</div></li>
								})}
							</List>
				</CardBody>
						<div className="flex-column align-self-start m-2 p-2 pt-4 col-3"><img alt="Child Photo" src={img}/>
						<div className="mt-4 p-2">
								<strong> Steps Done:</strong>
								<ul>
									<li> Verification 1</li>
									<li> Verification 2</li>
									<li> Verification 3</li>
								</ul>
						</div>
						<div className="mt-2 p-2">
								<strong> Deadline:</strong> 29/10/2023
						</div>
						<div className="mt-2 p-2">
							<label for="changeDeadline"><strong>Modify Deadline:</strong></label>
						</div>
						<div className="m-2 p-2 rounded-2 bg-color3">
							<input id="changeDeadline" name="changeDeadline" type="date" className="bg-transparent w-100"></input>
						</div>
						<Card body className="justify-content-center m-2 mt-4 p-2" > 
	<CardTitle className="m-2 p-2" tag="h4"> Assigned Ground Worker</CardTitle>
			<CardBody>
				<ul>
				<li>Ground worker name</li>
				<li>Comments</li>
				</ul>
				</CardBody>
		</Card>
						</div>
			</Card>
	
	</div>
	);
}

export default ChildProfile;
