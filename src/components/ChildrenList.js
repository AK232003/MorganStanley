import React, { cloneElement, useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { List, Card, CardBody} from "reactstrap";

import { storage } from "../firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { db } from "../firebase"
import { collection, getDocs } from "firebase/firestore"


const ListTest = (user) => {
    const parameters= useParams();
	const navigate=useNavigate();
	useEffect(()=>{
		if(user===null) navigate("/");
	},[user])
	
	// const [documentList,setList]=useState([]);
	// useEffect(()=>{
	// 	const getDocuments= async()=>{
	// 		const collectionName=parameters.id.toString();
	// 		const response=await fetch(`http://localhost:5050/collections/${collectionName}`);
	// 		if(!response.ok){
	// 			return;
	// 		}
	// 		const documents=await response.json();
	// 		setList(documents);
	// 	}
	// 	getDocuments();
	// 	return;
	// },[])
	// const documentsView=()=>{
	// 	const keys=Object.keys(documentList[0]);
	// 	return (<div className="row">
	// 	{documentList.map((document) => {
	// 		return  (<Card body className="col-3 mx-2 my-2" key={document._id} style={{boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2)'}}> 
	// 		<CardBody>
	// 			<List type="unstyled">
	// 			{keys.map( (field)=>{ return <li key={field}> {field} : {document[field]}</li>})}
	// 			</List>
	// 			</CardBody>
	// 		</Card>
	// 	) })}
	// </div>)}

    const[children, setChildren] = useState([]);
    const childrenCollectionRef = collection(db, "children");
    useEffect(() => {
        const getChildren = async () => {
            const data = await getDocs(childrenCollectionRef);
            console.log(data.docs);
            setChildren(data.docs.map((doc) => ({...doc.data(), id:doc.id})))
        };

        getChildren();
        console.log(children)
    }, [])
    const childrenLists=()=>{
        const keys=Object.keys(children[0]);
        console.log(keys)
        return (
            <div className="row">
            {children.map((children) => {
                return  (<Card body className="col-3 mx-2 my-2" key={children["Case Number"]} style={{boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2)'}}> 
			    <CardBody>
                    <List type="unstyled">
                    {keys.map( (field)=>{ return <li key={field}> {field} : {children[field]}</li>})}
                    </List>
				</CardBody>
			</Card>
            )
        })}
        </div>)
    }
    return (
	<div >
        {/* <h1>hein</h1> */}
        {children.length>0? childrenLists() :""}
	</div>
 );
}

export default ListTest;