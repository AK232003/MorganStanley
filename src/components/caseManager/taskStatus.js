import React,{useEffect,useState} from "react";
import { useNavigate } from "react-router-dom";
import { List, Card, CardBody, Dropdown, DropdownToggle, CardTitle,DropdownMenu, DropdownItem, Button, Modal, ModalHeader, ModalBody, ModalFooter,Form, FormGroup,Label, Input } from "reactstrap";
import { FaSearch } from "react-icons/fa";
import { db,database } from "../../firebase"
import { collection, getDocs, doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import img from "../../profile.webp";

const TaskStatus = ({ user, id }) => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");
  const [caseSelected, setCase] = useState("");
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [casesList, setCasesList] = useState([0])
  const [keys, setKeys] = useState(null);
  const childrenCollectionRef = collection(db, "task");
  
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const [step, setStep] = useState(0);
  const [substep, setSubStep] = useState(0);
  const mapOfTypes=new Map();
  mapOfTypes.set("NPR","Newspaper Report");
  mapOfTypes.set("TVR","TV Report");
  mapOfTypes.set("FMR","File Missing Report");
  mapOfTypes.set("MR","Medical Report");
  mapOfTypes.set("SIR","SI Report");
  mapOfTypes.set("FPR","Final Police Report");
  mapOfTypes.set("PDC","Parent's Death Certificate");
  mapOfTypes.set("OC","Orphan Certificate");
  mapOfTypes.set("GTR","Guardian Trace Report");
  mapOfTypes.set("SurrenderDeed","Surrender Deed")
  mapOfTypes.set("NOC","NOC")
  mapOfTypes.set("LFA","LFA")
  mapOfTypes.set("Carings","CARINGS upload")
  const toggle = () => setDropdownOpen(!dropdownOpen);
	const toggleModal = (caseno) =>{
		setModal(!modal);
		// console.log(typeof(caseno));
		if(typeof(caseno)==="string"){
			setCase(caseno);
			setTask(tasks.filter(task => task["id"]===caseno)[0]);
			// console.log(children.filter(child => child["id"]===caseno)[0]);
		}
		else setCase("");
	};
	useEffect(()=>{
		if(user!=="CaseManager") navigate("/");
	},[user])
    useEffect(() => {
      const fetchWorkerID=async (id)=>{
        await db.collection("caseAssignment").doc(id).get().then((doc)=>{
          if(doc.exists){
            console.log(doc.data()["groundWorkerID"]);
            return doc.data()["groundWorkerID"];
          }
          else{
            return 123;
          }
        })
      }
      // fetchWorkerID("ST15");
        const getTasks = async () => {
          const data = await getDocs(childrenCollectionRef);
          // console.log(data.docs)
          setTasks(data.docs.map((doc) => ({...doc.data(), id:doc.id})))
          // let temp=tasks;
          // temp.map((doc)=>({...doc, workerID: fetchWorkerID(doc["id"].split("-")[0])}))
          // console.log(temp)
          // setTasks(temp);
          // console.log(tasks)
          const managerRef = doc(db, "Users", id)
          const casesSnap = await getDoc(managerRef)
          let casesDataList = casesSnap.data()["CasesList"]
          casesDataList.splice(0,1)
      
          // console.log(casesDataList)
          // console.log(data)

          setCasesList(casesDataList)
        };
        getTasks();
    }, [])

		// Handle Accpet Section 
// --------------------------------------
const handleAccept = async (e) =>{
	e.preventDefault()
	console.log("Accepted")

  console.log(task["id"])

	const tempTaskID = task["id"]
	let t = tempTaskID.split("-");
	const caseID = t[0]
	const docType = t[1]
	// console.log(docType)

	// const caseID = child.id;
	// console.log(caseID)

	const caseAssignRef = doc(db, "caseAssignment", caseID)
	const caseAssignSnap = await getDoc(caseAssignRef)
	// console.log(caseAssignSnap.data())
	let GWID = caseAssignSnap.data()["groundWorkerID"]
	let CMID = caseAssignSnap.data()["caseManagerID"]

	const taskRef = doc(db, "task", tempTaskID);
	const taskSnap = await getDoc(taskRef)
	const taskData = taskSnap.data()
	console.log(taskData)

	const processRef = doc(db, "caseProcesses", caseID)
	// const processSnap = doc(processRef)

	let processUpdate = {}
	processUpdate[docType] = {
		"Docs": taskData["Docs"],
		"Status": "Completed",
		"Text": taskData["Text"],
		"isComplete": true
	}

	await updateDoc(processRef, processUpdate)

	deleteDoc(doc(db, "task", task["id"]))

	console.log("Task Accepted!")

}
// ----------------------------------
  // Handle Reject Section
  // -------------------------------------
  const handleReject = (e) => {
    e.preventDefault();

    deleteDoc(doc(db, "task", task["id"]))
  };

  const taskLists=()=>{
    return (
        <div className="row mt-2">
        {tasks.filter(task => {
    if(search === "Search" || search === "") {
      return task;
    }
    else if(task[filter].toLowerCase().includes(search.toLowerCase())){
      return task;
    }
    }).map((task) => {
            return  (
    <Card body className="col col-lg-5 align-items-center !bg-sideBarColor1 !border-none justify-content-center m-2 p-2" key={task["id"]} style={{boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2)'}}> 
      <CardBody>
        <List type="unstyled">
          {/* {console.log(task["workerID"])} */}
          <li > <strong>Task :</strong> {mapOfTypes.get(task["id"].split("-")[1])}</li>
          <li > <strong>Docs :</strong> {<a href={task["Docs"]}>Task Report Link</a>}</li>
          <li > <strong>Status :</strong> {task["Status"]}</li>
          <li > <strong>Text :</strong> {task["Text"]}</li>
          <li > <strong>Status :</strong> {task["isComplete"]?"Completed":"In Progress"}</li>
        </List>
      </CardBody>
    <div>
    <button className="m-2 p-2 rounded-2 bg-buttonColor text-white w-full" onClick={()=>toggleModal(task["id"])}>Task Details</button>
    </div>
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
      {tasks.length > 0 ? (
        taskLists()
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
