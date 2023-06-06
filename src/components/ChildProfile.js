import React, {useState} from "react";
import { useLocation } from "react-router-dom";
import img from "../logo_scroll.png";
import { List, Card, CardBody} from "reactstrap";


const ChildProfile= () => {
	const {state}=useLocation();
	const [child,setChild]=useState(state["children"]);
	console.log(child)
	return (<div className="container"> 
		<Card body className=" !flex-row align-items-center justify-content-center m-2 p-2 cursor-pointer" style={{boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2)'}}  > 
								<CardBody>
												<List type="unstyled">
													{/* {child && child.keys.forEach((key)=> {
														return <li key={key}> <strong>{key} :</strong> {child[key]}</li>
													})} */}
												</List>
									</CardBody>
											<div className="align-self-start m-2 p-2 pt-4"><img alt="Child Photo" src={img}/></div>
								</Card>
	</div>);
}

export default ChildProfile;
