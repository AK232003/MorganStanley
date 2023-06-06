import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { List, Card, CardBody} from "reactstrap";

import { db } from "../firebase"
import { collection, getDocs } from "firebase/firestore";
import img from "../logo_scroll.png";

const ChildrenList = (user) => {
	const navigate=useNavigate();
	useEffect(()=>{
		if(user===null) navigate("/");
	},[user])

    const[children, setChildren] = useState([]);
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
								<Card body className="col-3 align-items-center mx-2 my-2 cursor-pointer" key={children["Case Number"]} style={{boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2)'}}  onClick={()=> navigate(`/groundWorker/list/${children["id"]}`)}> 
								<img alt="Child Photo" src={img}/>
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
	<div className="container mt-4 overflow-y-scroll">
        {children.length>0? childrenLists() :<div className="spinner-border m-5 p-4" style={{position: "relative" ,top: "50%", left: "50%"}} role="status"></div>}
	</div>
 );
}

export default ChildrenList;