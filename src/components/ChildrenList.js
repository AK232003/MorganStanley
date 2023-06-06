import React, { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { List, Card, CardBody} from "reactstrap";

import { db } from "../firebase"
import { collection, getDocs } from "firebase/firestore";
import img from "../logo_scroll.png";

const ListTest = (user) => {
    const parameters= useParams();
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
        console.log(children)
    }, [])
    const childrenLists=()=>{
        return (
            <div className="row">
            {children.map((children) => {
                return  (<Card body className="col-3 align-items-center mx-2 my-2" key={children["Case Number"]} style={{boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2)'}}> 
								<img alt="Child Photo" src={img}/>
			    <CardBody>

                    <List type="unstyled">
                    <li > Name : {children["Age"]}</li>
                    <li > Age : {children["Age"]}</li>
                    <li > District : {children["District"]}</li>
                    <li > State : {children["State"]}</li>
                    <li > Case Number : {children["Case Number"]}</li>
                    </List>
				</CardBody>
			</Card>
            )
        })}
        </div>)
    }
    return (
	<div className="container mt-4">
        {children.length>0? childrenLists() :""}
	</div>
 );
}

export default ListTest;