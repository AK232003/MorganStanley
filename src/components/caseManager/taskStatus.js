import React,{useEffect,useState} from "react";
import { useNavigate } from "react-router-dom";
import { List, Card, CardBody, Dropdown, DropdownToggle, CardTitle,DropdownMenu, DropdownItem, Button, Modal, ModalHeader, ModalBody, ModalFooter,Form, FormGroup,Label, Input } from "reactstrap";
import { FaSearch } from "react-icons/fa";
import { db,database } from "../../firebase"
import { collection, getDocs } from "firebase/firestore";
import img from "../../profile.webp";

const TaskStatus = ({ user, id }) => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");
  const [caseSelected, setCase] = useState("");
  const [children, setChildren] = useState([]);
  const [child, setChild] = useState(null);
  const [keys, setKeys] = useState(null);
  const childrenCollectionRef = collection(db, "children");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const [step, setStep] = useState(0);
  const [substep, setSubStep] = useState(0);

  const toggle = () => setDropdownOpen(!dropdownOpen);
	const toggleModal = (caseno) =>{
		setModal(!modal);
		// console.log(typeof(caseno));
		if(typeof(caseno)==="string"){
			setCase(caseno);
			setChild(children.filter(child => child["id"]===caseno)[0]);
			// console.log(child);
		}
		else setCase("");
	};
	useEffect(()=>{
		if(user!=="CaseManager") navigate("/");
	},[user])
    useEffect(() => {
        const getChildren = async () => {
            const data = await getDocs(childrenCollectionRef);
            setChildren(data.docs.map((doc) => ({...doc.data(), id:doc.id})))
        };
        getChildren();
    }, [])

		// Handle Accpet Section 
// --------------------------------------
const handleAccept = async (e) =>{
	e.preventDefault()
	setStep(1)
	setSubStep(1)
	console.log(step, substep)
	console.log("Accepted")

	const caseID = child.id;

	// const caseDocRef = db.collection("cases").doc(child["id"]);
	// const taskDocRef = db
	// 	.collection("task")
	// 	.doc(child["id"] + step.toString() + substep.toString());

	// taskDocRef
	// 	.get()
	// 	.then((taskDocSnapshot) => {
	// 		if (taskDocSnapshot.exists) {
	// 			const taskData = taskDocSnapshot.data();
	// 			caseDocRef
	// 				.update(taskData)
	// 				.then(() => {
	// 					console.log("Fields added successfully");
	// 				})
	// 				.catch((error) => {
	// 					console.error("Error updating case document: ", error);
	// 				});
	// 		} else {
	// 			console.log("Task document does not exist");
	// 		}
	// 	})
	// 	.catch((error) => {
	// 		console.error("Error retrieving task document: ", error);
	// 	});


	// if(step === 1)
	// {
	// 	 database.ref(`cases/Process/` + child["id"] + `/Step1/Step1`).update({
	// 		 isComplete: true,
	// 		 stat: "Complete",
	// 	 });
	// 	 let isStep1Complete = true;
	// 	 for(let i=1; i<=5; i++)
	// 	 {
	// 			database.ref(`cases/Process/` + child["id"] + `/Step1/Step${i}/isComplete`).once("value", (snapshot) => {
	// 				isStep1Complete = snapshot.val() && isStep1Complete;
	// 			});
	// 	 }
	// 	 if(isStep1Complete){
	// 		 database.ref(`cases/Process/` + child["id"]).update({
	// 			 isComplete: 1,
	// 		 });
	// 	 }
	// }
	// else 
	// {
	// 	 database.ref(`cases/Process/` + child["id"] + `/Step${step}`).update({
	// 		 isComplete: true,
	// 		 stat: "Complete",
	// 	 });
	// 	 database.ref(`cases/Process/` + child["id"] ).update({
	// 		 isComplete: step,
	// 	 });
	// }   
}
// ----------------------------------


  // Handle Reject Section
  // -------------------------------------
  const handleReject = (e) => {
    e.preventDefault();
    console.log("Rejected");
    const taskDocRef = db
      .collection("task")
      .doc(child["id"] + step.toString() + substep.toString());
    taskDocRef
      .delete()
      .then(() => {
        console.log("Document successfully deleted");
      })
      .catch((error) => {
        console.error("Error deleting document: ", error);
      });

    if (step === 1) {
      database
        .ref(`cases/Process/` + child["id"] + `/Step1/Step${substep}`)
        .update({
          isComplete: false,
          text: "",
          docs: "",
          stat: "In Progress",
        });
    } else {
      database.ref(`cases/Process/` + child["id"] + `/Step${step}`).update({
        isComplete: false,
        text: "",
        docs: "",
        stat: "In Progress",
      });
    }
  };



    const childrenLists=()=>{
        return (
            <div className="row mt-2">
            {children.filter(children => {
				if(search === "Search" || search === "") {
					return children;
				}
				else if(children[filter].toLowerCase().includes(search.toLowerCase())){
					return children;
				}
				}).map((children) => {
                return  (
				<Card body className="col col-lg-5 !flex-row align-items-center !bg-sideBarColor1 !border-none justify-content-center m-2 p-2" key={children["Case Number"]} style={{boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2)'}}> 
				<div><img alt="Child Photo" src={children["Image"]!==undefined?children["Image"]:img} className="w-60 h-40"/>
				<button className="m-2 p-2 rounded-pill bg-color4 text-textcolor w-full" onClick={()=>toggleModal(children["id"])}>Task Details</button>
				</div>
					<CardBody>
						<List type="unstyled">
							<li > <strong>Name :</strong> {children["Name"]}</li>
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
	<div className="container lg:mt-4 overflow-y-scroll bg-color2">
		<div className="row mt-4 h-16">
			<div className="col-6 col-lg-10 w-full p-2">
			<div className="rounded-md w-auto text-xl p-2 flex align-items-center bg-white shadow-md hover:shadow-xl">
			<span><FaSearch className="text-lg text-black block float-left me-2"></FaSearch></span>
			<input className="w-95 bg-inherit text-slate-800 align-self-center font-sans placeholder:text-black focus-visible:outline-0" type="text" placeholder={"Search"} onChange={(event)=>setSearch(event.target.value)}></input>
			</div>
			</div>
			<div className="col-auto col-lg-2 mt-2 md:p-2 p-1">
			<Dropdown isOpen={dropdownOpen} toggle={toggle}  direction="down" onChange={(event)=>console.log(event)}>
        <DropdownToggle size="lg" className="rounded-md w-full h-auto !text-textcolor text-2xl p-2 border-0 !bg-color3 shadow-md" caret>{filter===""?"Select Filter":filter}</DropdownToggle>
        <DropdownMenu className="text-textcolor">
          <DropdownItem onClick={()=>setFilter("Name")}>Name</DropdownItem>
          <DropdownItem onClick={()=>setFilter("District")}>District</DropdownItem>
          <DropdownItem onClick={()=>setFilter("District")}>Case Number</DropdownItem>
        </DropdownMenu>
      </Dropdown>
			</div>
		</div>
		<Modal centered isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Task Details for {caseSelected}</ModalHeader>
        <ModalBody>
          <CardTitle className="m-1 p-2" tag="h4">
            Assigned Ground Worker
          </CardTitle>

          <CardBody>
            <div className="row">
              <div className="col"> Worker ID</div>
              <div className="col">ID aayega idhar</div>
            </div>
            <div className="row">
              <div className="col"> Task Text</div>
              <div className="col overflow-y-scroll h-52">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </div>
            </div>
            <div className="row">
              <div className="col"> Related Files</div>
              <div className="col">
                <a href="." target="_blank" rel="noopener noreferrer">
                  Report Link
                </a>
              </div>
            </div>

            <div className="row mt-1">
              <div className="col m-1 p-1 bg-color3 rounded-pill">
                <Button
                  className="w-full bg-transparent !border-none !text-textcolor"
                  onClick={handleAccept}
                >
                  Accept
                </Button>
              </div>
              <div className="col m-1 p-1 bg-color3 rounded-pill">
                <Button
                  className="w-full bg-transparent !border-none !text-textcolor"
                  onClick={handleReject}
                >
                  Reject
                </Button>
              </div>
            </div>
          </CardBody>
        </ModalBody>

        <ModalFooter>
          <Button color="primary" onClick={toggleModal}>
            Do Something
          </Button>{" "}
          <Button color="secondary" onClick={toggleModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
      {children.length > 0 ? (
        childrenLists()
      ) : (
        <div
          className="spinner-border m-5 p-4"
          style={{ position: "relative", top: "50%", left: "50%" }}
          role="status"
        ></div>
      )}
    </div>
  );
};
export default TaskStatus;