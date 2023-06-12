import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { List, Card, CardBody, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Button, Modal, ModalHeader, ModalBody, ModalFooter,Form, FormGroup,Label, Input } from "reactstrap";
import { FaSearch } from "react-icons/fa";
import { db, database } from "../../firebase"
import { FieldValue, arrayUnion, getDocs, getDoc, updateDoc, doc, getFirestore, collection, setDoc, serverTimestamp } from "firebase/firestore";
import { addProcessAbandoned, addProcessAdmittedByGuardians, addProcessOrphaned, addProcessSurrendered, addDeadline, intializeCaseComment } from "../addCase";
import img from "../../profile.webp";
import { elementTypeAcceptingRef } from "@mui/utils";

function resolveAfter2Seconds() {
	return new Promise(resolve => {
	  setTimeout(() => {
		resolve('resolved');
	  }, 2000);
	});
  }

const AssignCases = ({ user, id }) => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const [modalReport, setModalReport] = useState(false);
  const [caseSelected, setCase] = useState("");
  const [children, setChildren] = useState([]);
  const [deadLine, setDeadLine] = useState("");
  const [workersList,setWorkersList]=useState(null);
  const [idToAssign, setID] = useState(null);
  const [nameToAssign, setname] = useState(null);
  const [child, setChild] = useState(null);
  const [keys, setKeys] = useState(null);
  const [dropdownOpen2, setDropdownOpen2] = useState(false);
  const toggle2 = () => setDropdownOpen2(!dropdownOpen2);
  const adminID = "admin"
  console.log(idToAssign)
//   const [worker, setWorker] = useState(null);
  const childrenCollectionRef = collection(db, "children");
  const toggleDropDown = () => setDropdownOpen(!dropdownOpen);
  // Case Creation Section(Worker Assigned to Children)
  // (mId to be changed to the manager Id)
  // ----------------------------------------
  const handleCase = async () => {
    // Case Creation
    // element.preventDefault();

    // console.log(element.target[0].value);
    const workerID = idToAssign;
    console.log(idToAssign)
    // const docRef = doc(db, "Users", workerID);
    // const docSnap = await getDoc(docRef)
    // 	.then((snapShot) => {
    // 		console.log(snapShot.data())
    // 	})

	let worker;
	let manager;
	let admin;

    await getDocs(collection(db, "Users")).then((querySnapshot) => {
      	worker = querySnapshot.docs.map((doc) => ({...doc.data(),id: doc.id,})).filter((u) => u.id == workerID || u["Name"].includes(workerID));
    })

	const managerRef = doc(db, "Users", id);
	const managerSnap = await getDoc(managerRef)
	manager = managerSnap.data()

	const adminRef = doc(db, "Users", adminID);
	const adminSnap = await getDoc(adminRef)
	admin = adminSnap.data()



	if(worker.length == 1) {
		const childID = child["Case Number"].split("/").join("");

		console.log(child)

		const caseRef = doc(db, "caseAssignment", childID);
		const caseSnap = await getDoc(caseRef)
		const caseData = caseSnap.data()

		let oldGWID = null
		let oldCMID = null

		if(caseData) { //if case already exists, delete from assigned groundworker and casemanager, reassign to both
			oldGWID = caseData["groundWorkerID"]
			oldCMID = caseData["caseManagerID"]

			let list;
			let i;

			console.log(caseData)

			if(oldGWID !== workerID && oldGWID) {
				const oldGWRef = doc(db, "Users", oldGWID)
				const oldGWSnap = await getDoc(oldGWRef)
				const oldGWData = oldGWSnap.data()

				list = JSON.parse(JSON.stringify(oldGWData["CasesList"]))
				i = list.indexOf(childID)
				if(i > -1) list.splice(i, 1)

				// console.log(list)
				await updateDoc(oldGWRef, {
					"CasesList": list
				})
			}

			if(oldCMID !== id && oldCMID) {
				const oldManagerRef = doc(db, "Users", oldCMID)
				const oldManagerSnap = await getDoc(oldManagerRef)
				const oldManagerData = oldManagerSnap.data()
				if(oldManagerData){
          list = JSON.parse(JSON.stringify(oldManagerData["CasesList"]))
          i = list.indexOf(childID)
          if(i > -1) list.splice(i, 1)
          await updateDoc(oldManagerRef, {
            "CasesList": list
          })
        }
			}			
		}

		console.log(childID);

		if(child["Child Category"] === "Orphaned - No Guardians") {
			addProcessOrphaned(childID)
		}
		else if(child["Child Category"] === "Abandoned / Family not traceable") {
			addProcessAbandoned(childID)
		}
		else if(child["Child Category"] === "Surrendered") {
			addProcessSurrendered(childID)
		}
		else if(child["Child Category"] === "Admitted by Guardians") {
			addProcessAdmittedByGuardians(childID)
		}
		addDeadline(childID, "");
		intializeCaseComment(childID)

		setDoc(doc(db, "caseAssignment", childID), {
			caseManagerID: id,
			groundWorkerID: workerID,
			dateAssigned: serverTimestamp()
		})
		
		let newList = JSON.parse(JSON.stringify(worker[0]["CasesList"]))
		newList.push(childID)

		const workerRef = doc(db, "Users", workerID);
		if(!oldGWID || oldGWID !== workerID) {
			await updateDoc(workerRef, {
				"CasesList": newList
			})
		}
    console.log()
		if(manager) {

      newList = JSON.parse(JSON.stringify(manager["CasesList"]))
      newList.push(childID)
      if(!oldCMID || oldCMID !== id) {
        await updateDoc(managerRef, {
          "CasesList": newList
        })
      }
    }


		if(!caseData){ //only add to case list for admin if case is new
			newList = JSON.parse(JSON.stringify(admin["CasesList"]))
			newList.push(childID)
			await updateDoc(adminRef, {
				"CasesList": newList
			})
		}

		console.log("task assigned")
	}
	else if(worker.length == 0) {
		console.log("no valid worker id/name match")
	}
	else {
		console.log("too many worker id/name matched, please be specific")
	}
};

  const toggleModalReport = (caseno) => {
    console.log(typeof caseno);
    setModalReport(!modalReport);
    if (typeof caseno === "string") {
      setCase(caseno);
      setChild(children.filter((child) => child["id"] === caseno)[0]);
    } else {
      setCase("");
      setChild(null);
    }
  };
  const toggleModal = (caseno) => {
    setModal(!modal);
    // console.log(typeof caseno);
    if (typeof caseno === "string") {
      setCase(caseno);
      setChild(children.filter((child) => child["id"] === caseno)[0]);
    //   console.log(child);
    } else setCase("");
  };
  useEffect(() => {
    if (user !== "CaseManager") navigate("/");
    const getWorkerList = () => {
      const usersRef = db.collection("Users");
  
      usersRef
        .doc("admin")
        .get()
        .then((doc) => {
          if (doc.exists) {
            const data = doc.data();
            let workerList = data.WorkersList;
            workerList=workerList.slice(1);
            db.collection("Users").where('UserID','in',workerList).get().then((docs)=>{
              let workers=[];
    
              if(!docs.empty) {
                docs.forEach((doc)=>{workers.push(doc.data())});
                setWorkersList(workers);
              }
            })
          } 
        })
        .catch((error) => {
          console.log("Error getting Users document:", error);
        });
    };
    getWorkerList();
  }, [user]);
  useEffect(() => {
    if (child !== null) setKeys(Object.keys(child));
  }, [child]);

  useEffect(() => {
    const getChildren = async () => {
      const data = await getDocs(childrenCollectionRef);
      setChildren(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getChildren();
  }, []);

  const childrenLists = () => {
    return (
    <div className="grid  grid-cols-1 md:grid-cols-2 gap-0 mt-2">
        {children
          .filter((children) => {
            if (
              search === "Search" ||
              search === "" ||
              filter === "Select Filter"
            ) {
              return children;
            } else if (
              children[filter].toLowerCase().includes(search.toLowerCase())
            ) {
              return children;
            }
          })
          .map((children) => {
            return (
              <Card
                body
                className="align-items-center !bg-sideBarColor1 !border-none justify-content-center m-2 p-2"
                key={children["id"]}
                style={{ boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.2)" }}
              >

                <div className="flex flex-row w-full">
                  <div className="flex flex-col basis-2/5">
                  <img
                    alt="Child Photo"
                    src={
                      children["Image"] !== undefined ? children["Image"] : img
                    }
                    className="rounded-full basis-4/5 w-36 h-36"
                  />
                    <div className="m-1 p-1 text-textcolor basis-1/5 justify-self-center md:text-base text-sm">
                      <strong>Case No:</strong> {children["Case Number"]}
                    </div>
                </div>
                <CardBody className="flex flex-col basis-3/5 p-1  ps-2">
                  <List type="unstyled basis-4/5 md:text-base text-sm">
                    <li>
                      {" "}
                      <strong>Name :</strong> {children["Name"]}
                    </li>
                    <li>
                      {" "}
                      <strong>Age :</strong> {children["Age"]}
                    </li>
                    <li>
                      {" "}
                      <strong>District :</strong> {children["District"]}
                    </li>
                    <li>
                      {" "}
                      <strong>State :</strong> {children["State"]}
                    </li>
                  </List>
                  <button
                    className="p-2 rounded-3 basis-1/5 bg-buttonColor justify-self-end text-white w-full"
                    onClick={() => toggleModal(children["id"])}
                  >
                    {" "}
                    Assign
                  </button>
                </CardBody>
                </div>
              </Card>
            );
          })}
      </div>
    );
  };
  return (
    <div className="container lg:mt-4 overflow-y-scroll bg-color2">
      <div className="flex flex-row w-full">
        <div className="basis-8/10 w-full p-2 mt-1">
          <div className="rounded-md w-auto text-xl p-2 flex align-items-center bg-white shadow-md hover:shadow-xl">
            <span>
              <FaSearch className="text-lg text-black block float-left me-2"></FaSearch>
            </span>
            <input
              className="w-100 bg-inherit text-slate-800 align-self-center font-sans placeholder:text-black focus-visible:outline-0"
              type="text"
              placeholder={"Search"}
              onChange={(event) => setSearch(event.target.value)}
              ></input>
            </div>
        </div>
        <div className="basis-2/10 my-1 px-2 pt-2 ">
          <Dropdown
            isOpen={dropdownOpen}
            toggle={toggleDropDown}
            direction="down"
            className="shadow-md hover:shadow-xl max-h-full text-xl"
            onChange={(event) => console.log(event)}
          >
            <DropdownToggle
              size="lg"
              className="rounded-md w-auto h-auto !text-textcolor text-2xl p-2 border-0 !bg-buttonColor/[0.3] shadow-md"
              caret
            >
              {filter === "" ? "Filter" : filter}
            </DropdownToggle>
            <DropdownMenu className="text-textcolor">
              <DropdownItem onClick={() => setFilter("Name")}>
                Name
              </DropdownItem>
              <DropdownItem onClick={() => setFilter("District")}>
                District
              </DropdownItem>
              <DropdownItem onClick={() => setFilter("Case Number")}>
                Case Number
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
      {/* Assign Worker */}
      <Modal centered isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal} className="!bg-sideBarColor1 !border-none">
          Assign Worker for {caseSelected}
        </ModalHeader>
        <ModalBody className="!bg-sideBarColor1 !border-none">
            
          <Dropdown
                  isOpen={dropdownOpen2}
                  toggle={toggle2}
                  direction="down"
                  onChange={(event) => console.log(event)}
                >
                  <DropdownToggle
                    size="sm"
                    className="rounded-md w-full h-auto !text-textcolor text-base p-2 border-0 bg-white shadow-md"
                    caret
                  >
                    {idToAssign === null
                      ? "Select User"
                      : idToAssign + " " + nameToAssign}
                  </DropdownToggle>
                  <DropdownMenu className="text-textcolor">
                    {workersList &&
                      workersList.map((user) => {
                          return (
                            <DropdownItem
                              key={user["UserID"]}
                              onClick={() => {
                                setID(user["UserID"]);
                                setname(user["Name"])
                              }}
                            >
                              'Worker ID': {user["UserID"]} --- Name: {user["Name"]}
                            </DropdownItem>
                          );
                      })}
                  </DropdownMenu>
                </Dropdown>
        </ModalBody>

        <ModalFooter className="!bg-sideBarColor1 !border-none">
        <Button type="submit" className="!bg-buttonColor !border-none" onClick={()=>handleCase()}>
                  Assign
                </Button>
        </ModalFooter>
      </Modal>
      {/* Case Details */}
      <Modal
        centered
        isOpen={modalReport}
        toggle={toggleModalReport}
        fullscreen="md"
        size="lg"
      >
        <ModalHeader toggle={toggleModalReport}>
          Case Details for {caseSelected}
        </ModalHeader>
        <ModalBody>
          <ul type="unstyled" className="p-0">
            {child !== null &&
              keys !== null &&
              keys.map((key) => {
                return (
                  <li key={key} className="w-full m-2 p-1 flex">
                    {" "}
                    <strong className="w-1/3 ">{key} :</strong>{" "}
                    <div className="w-2/3">{child[key]}</div>
                  </li>
                );
              })}
            <li className="w-full m-2 p-1 flex">
              {" "}
              <strong className="w-1/3"> Deadline:</strong>{" "}
              <div className="w-2/3">{deadLine}</div>
            </li>
          </ul>
        </ModalBody>

        <ModalFooter></ModalFooter>
      </Modal>
      {/* <div className="row mt-4 h-16">
			<button className="col-2 text-white m-2 rounded-pill bg-color3" onClick={()=>setFilter("Assigned")}>Assigned </button>
			<button className="col-2 text-white m-2 rounded-pill bg-color3" onClick={()=>setFilter("Unassigned")}> Unassigned</button>
			<button className="col-2 text-white m-2 rounded-pill bg-color3" onClick={()=>setFilter("Completed")}> Completed</button>
		</div> */}
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

export default AssignCases;

// garbage

				  // RealTime Deadline
  // ------------------------------
//   let currentDate = new Date();
//   let futureDate = new Date(currentDate);
//   futureDate.setMonth(currentDate.getMonth() + 1);
//   console.log(futureDate.toDateString());
//   database.ref(`cases/DeadLine/` + child["id"]).set({
//     DeadLine: futureDate.toDateString(),
//   });
//   setDeadLine(futureDate.toString());
//   // -----------------------------------
// }


		// let casenumber = "ST15";
		// const docRef = doc(db, "children", casenumber);
		// const docSnap = await getDoc(docRef)
		// 	.then((snapShot) => {
		// 		console.log(snapShot.data())
		// 	})
		
	
		// const usersRef = db.collection("cases").doc(child["id"]);
		// const usersRef2 = db.collection("children").doc(child["id"]);
	
		// usersRef.get().then((doc) => {
			
			// if (!doc.exists) {
			// 	// Initial Case Report
			// 	usersRef2.get().then((d) => {
			// 		console.log(d.data()["Case Number"]);
			// 		db.collection("cases")
			// 			.doc(child["id"])
			// 			.set({
			// 				"Bal Asha Enrolment": d.data()["Date Of Birth"],
			// 				"Date of Admission": d.data()["Date Of Birth"],
	
			// 				"Date of Last Follow up": d.data()["Date Of Birth"],
			// 				"Last Follow up": "",
			// 				"Remark of Bal Asha Social Work": "",
			// 				"Remark": "",
			// 				"Manager ID": "MId",
			// 				"Worker IDs": [element.target[2].value],
			// 			});
			// 	});
			

			// 	console.log("Success!")
			// } 
			// else
			// {
			// // Reassign to different worker
			// 	console.log("Reassigning to Worker: ", element.target[2].value);
			// 	usersRef2.get().then((d) => {
			// 		var pathRef = db.collection("cases").doc(child["id"]);
			// 		updateDoc(pathRef, {
			// 			"Worker IDs": arrayUnion(element.target[2].value),
			// 		});
			// 	});
			// }