import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { List, Card, CardBody, Dropdown, DropdownToggle, Col,DropdownMenu, DropdownItem, Button, Modal, ModalHeader, ModalBody, ModalFooter,Form, FormGroup,Label, Input } from "reactstrap";
import { FaSearch } from "react-icons/fa";
import { db, database } from "../../firebase"
import { FieldValue, arrayUnion, getDocs, getDoc, updateDoc, doc, getFirestore, collection, setDoc } from "firebase/firestore";
import img from "../../profile.webp";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

const TaskComments = ({ user, id }) => {

  const { t } = useTranslation();

  const navigate = useNavigate();
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const [modalDeadline, setModalReport] = useState(false);
  const [caseSelected, setCase] = useState("");
  const [children, setChildren] = useState([]);
  const [deadLine, setDeadLine] = useState("");
  const [workerComments, setWorkerComments] = useState([]);
  const [workerTime, setWorkerTime] = useState([]);
  const [comments, setComments] = useState([]);
  const [managerComments, setManagerComments] = useState("");
  const [managerTime, setManagerTime] = useState([]);
  const [child, setChild] = useState(null);
  const [keys, setKeys] = useState(null);
  const childrenCollectionRef = collection(db, "children");
  const toggleDropDown = () => setDropdownOpen(!dropdownOpen);

  // DeadLine Section
  // -----------------------------------
  const handleDeadLine = (e) => {
    e.preventDefault();
    var docRef = db.collection("caseDeadlines").doc(child["id"].toString());
    docRef
      .update({
        Deadline: e.target[0].value,
      })
      .then(() => {
        console.log("Deadline updated successfully!");
        setDeadLine(e.target[0].value);
        alert("Deadline Set!");
      })
      .catch((error) => {
        console.log("Error updating Deadline:", error);
        alert("Error updating Deadline");
      });
    setDeadLine(e.target[0].value);
  };
  // ---------------------------------------
  // Comment Section(mId to be changed with the current managerId)
  // -----------------------------------------
  const handleComment = (e) => {
    e.preventDefault();
    var date = new Date();
    var docRef = db.collection("caseComments").doc(child["id"].toString());
    docRef
      .update({
        ManagerComment: arrayUnion(e.target[0].value),
        ManagerTime: arrayUnion(date),
      })
      .then(() => {
        console.log("Reply Sent Succesfully!");
        alert("Reply Set!");
      })
      .catch((error) => {
        console.log("Error sending comment:", error);
        alert("Error sending Reply");
      });
  };
  // -------------------------------------------

  // Case Creation Section(Worker Assigned to Children)
  // (mId to be changed to the manager Id)
  // // ----------------------------------------
  // 	const handleCase = (element) => {
  // 		// Case Creation
  // 		element.preventDefault();

  // 		const usersRef = db.collection("cases").doc(child["id"]);
  // 		const usersRef2 = db.collection("children").doc(child["id"]);

  // 		usersRef.get().then((doc) => {

  // 			if (!doc.exists) {
  // 				// Initial Case Report
  // 				usersRef2.get().then((d) => {
  // 					console.log(d.data()["Case Number"]);
  // 					db.collection("cases")
  // 						.doc(child["id"])
  // 						.set({
  // 							"Bal Asha Enrolment": d.data()["Date Of Birth"],
  // 							"Date of Admission": d.data()["Date Of Birth"],

  // 							"Date of Last Follow up": d.data()["Date Of Birth"],
  // 							"Last Follow up": "",
  // 							"Remark of Bal Asha Social Work": "",
  // 							"Remark": "",
  // 							"Manager ID": "MId",
  // 							"Worker IDs": [element.target[2].value],
  // 						});
  // 				});

  // 				// Process Track
  // 				database.ref(`cases/Process/` + child["id"]).update({
  // 					isComplete: 0,
  // 				});
  // 				database.ref(`cases/Process/` + child["id"] + "/Step1").update({
  // 					isComplete: false,
  // 				});
  // 				database.ref(`cases/Process/` + child["id"] + "/Step1/Step1").update({
  // 					isComplete: false,
  // 					text: "",
  // 					docs: "",
  // 					stat: "In Progress",
  // 				});
  // 				database.ref(`cases/Process/` + child["id"] + "/Step1/Step2").update({
  // 					isComplete: false,
  // 					text: "",
  // 					docs: "",
  // 					stat: "In Progress",
  // 				});
  // 				database.ref(`cases/Process/` + child["id"] + "/Step1/Step3").update({
  // 					isComplete: false,
  // 					text: "",
  // 					docs: "",
  // 					stat: "In Progress",
  // 				});
  // 				database.ref(`cases/Process/` + child["id"] + "/Step1/Step4").update({
  // 					isComplete: false,
  // 					text: "",
  // 					docs: "",
  // 					stat: "In Progress",
  // 				});
  // 				database.ref(`cases/Process/` + child["id"] + "/Step1/Step5").update({
  // 					isComplete: false,
  // 					text: "",
  // 					docs: "",
  // 					stat: "In Progress",
  // 				});
  // 				database.ref(`cases/Process/` + child["id"] +"/Step2").update({
  // 					isComplete: false,
  // 					text: "",
  // 					docs:"",
  // 					stat: "In Progress",
  // 				});
  // 				database.ref(`cases/Process/` + child["id"] + "/Step3").update({
  // 					isComplete: false,
  // 					text: "",
  // 					docs: "",
  // 					stat: "In Progress",
  // 				});
  // 				database.ref(`cases/Process/` + child["id"] + "/Step4").update({
  // 					isComplete: false,
  // 					text: "",
  // 					docs: "",
  // 					stat: "In Progress",
  // 				});
  // 				console.log("Success!")

  // 			}
  // 			else
  // 			{
  // 			// Reassign to different worker
  // 				console.log("Reassigning to Worker: ", element.target[2].value);
  // 				usersRef2.get().then((d) => {
  // 					var pathRef = db.collection("cases").doc(child["id"]);
  // 					updateDoc(pathRef, {
  // 						"Worker IDs": arrayUnion(element.target[2].value),
  // 					});
  // 				});
  // 			}
  // 		});
  //   // RealTime Deadline
  //   // ------------------------------
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

  const toggleModalDeadline = (caseno) => {
    console.log(typeof caseno);
    setModalReport(!modalDeadline);
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
    console.log(typeof caseno);
    if (typeof caseno === "string") {
      setCase(caseno);
      setChild(children.filter((child) => child["id"] === caseno)[0]);
      console.log(child);
    } else setCase("");
  };
  useEffect(() => {
    if (user !== "CaseManager") navigate("/");
  }, [user]);
  useEffect(() => {
    if (child !== null) setKeys(Object.keys(child));
    if(child!=null){
      db.collection("caseComments").doc(`${child["id"]}`).get().then((doc)=>{
      console.log(doc.data())
      if(doc.data()){
        setWorkerComments(doc.data()["WorkerComment"])
        setWorkerTime(doc.data()["WorkerTime"])
        setManagerComments(doc.data()["ManagerComment"])
        setManagerTime(doc.data()["ManagerTime"])
        console.log(workerComments,managerComments);
      }
      else{
        setComments("Not Available");
      }
    }
    )}},[child]);

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
            if (search === "Search" || search === "") {
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
                      <strong>{t('Name')} :</strong> {children["Name"]}
                    </li>
                    <li>
                      {" "}
                      <strong>{t('Age')} :</strong> {children["Age"]}
                    </li>
                    <li>
                      {" "}
                      <strong>{t('District')} :</strong> {children["District"]}
                    </li>
                    <li>
                      {" "}
                      <strong>{t('State')} :</strong> {children["State"]}
                    </li>
                    <li>
                      {" "}
                      <strong>{t('Case Number')} :</strong> {children["Case Number"]}
                    </li>
                  </List>
                  <button
                    className="p-2 relative bottom-0 rounded-2 bg-buttonColor text-white w-full"
                    onClick={() => toggleModal(children["id"])}
                  >
                    {" "}
                    Comments/Deadline
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
                {t('Name')}
              </DropdownItem>
              <DropdownItem onClick={() => setFilter("District")}>
                {t('District')}
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
          Comments for tasks related to {caseSelected}
        </ModalHeader>
        <ModalBody className="!bg-sideBarColor1 !border-none">
          <Form onSubmit={(event) => handleComment(event)}>
            Comments History {comments}
            <div className="flex flex-row m-2  mb-4">
              <div className="basis-1/2 border-solid border-2">
              <div className="text-semibold text-xl">Manager Comments.</div>
                <ul>
                {managerComments && managerComments.map((comment)=>{ return( <li> {comment} </li>)})}
                </ul>
              </div>
              <div className="basis-1/2 border-solid border-2">
              <div className="text-semibold text-xl">Worker Comments. </div>
              {workerComments && workerComments.map((comment)=> { return( <li> {comment} </li>)})}
              </div>
                </div>
            <FormGroup row className="mt-2">
              <Label for="mid" sm={2}>
                {" "}
                Comments{" "}
              </Label>
              <Col sm={10}>
                <Input
                  id="mid"
                  name="mid"
                  placeholder="Comments"
                  type="textarea"
                />
              </Col>
            </FormGroup>
        <Button type="submit" className="!bg-buttonColor !border-none mb-3" block>
                  Submit
                </Button>
          </Form>
          <Form className="mt-4" onSubmit={(event) => handleDeadLine(event)}>
            <label for="changeDeadline">
              <strong>Modify Deadline:</strong>
            </label>
            <FormGroup>
              <Input
                id="dob"
                name="dob"
                placeholder="Date of Birth"
                type="date"
              />
            </FormGroup>
              <Button type="submit" className="!bg-buttonColor !border-none" block>
                Change Deadline
              </Button>
        </Form>
        </ModalBody>
        <ModalFooter className="!bg-sideBarColor1 !border-none"> 
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

export default TaskComments;