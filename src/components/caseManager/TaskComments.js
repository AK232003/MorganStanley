import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { List, Card, CardBody, Dropdown, DropdownToggle, Col,DropdownMenu, DropdownItem, Button, Modal, ModalHeader, ModalBody, ModalFooter,Form, FormGroup,Label, Input } from "reactstrap";
import { FaSearch } from "react-icons/fa";
import { db, database } from "../../firebase"
import { FieldValue, arrayUnion, getDocs, getDoc, updateDoc, doc, getFirestore, collection, setDoc } from "firebase/firestore";
import img from "../../profile.webp";

const TaskComments = ({ user, id }) => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const [modalDeadline, setModalReport] = useState(false);
  const [caseSelected, setCase] = useState("");
  const [children, setChildren] = useState([]);
  const [deadLine, setDeadLine] = useState("");
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
      })
      .catch((error) => {
        console.log("Error updating Deadline:", error);
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
      })
      .catch((error) => {
        console.log("Error sending comment:", error);
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
      <div className="row mt-2">
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
                className="col col-lg-5 !flex-row align-items-center !bg-sideBarColor1 !border-none justify-content-center m-2 p-2"
                key={children["id"]}
                style={{ boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.2)" }}
              >
                <div>
                  <img
                    alt="Child Photo"
                    src={
                      children["Image"] !== undefined ? children["Image"] : img
                    }
                    className="w-60 h-40"
                  />
                  <button
                    className="m-2 p-2 rounded-pill bg-color4 text-textcolor w-full"
                    onClick={() => toggleModal(children["id"])}
                  >
                    {" "}
                    See Comments
                  </button>
                </div>
                <CardBody>
                  <List type="unstyled">
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
                    <li>
                      {" "}
                      <strong>Case Number :</strong> {children["Case Number"]}
                    </li>
                  </List>
                  <button
                    className="m-2 p-2 rounded-pill bg-color4 text-textcolor w-full"
                    onClick={() => toggleModalDeadline(children["id"])}
                  >
                    {" "}
                    Set Deadline
                  </button>
                </CardBody>
              </Card>
            );
          })}
      </div>
    );
  };
  return (
    <div className="container lg:mt-4 overflow-y-scroll bg-color2">
      <div className="row mt-4 h-16">
        <div className="col-6 col-lg-10 w-full p-2">
          <div className="rounded-md w-auto text-xl p-2 flex align-items-center bg-white shadow-md hover:shadow-xl">
            <span>
              <FaSearch className="text-lg text-black block float-left me-2"></FaSearch>
            </span>
            <input
              className="w-95 bg-inherit text-slate-800 align-self-center font-sans placeholder:text-black focus-visible:outline-0"
              type="text"
              placeholder={"Search"}
              onChange={(event) => setSearch(event.target.value)}
            ></input>
          </div>
        </div>
        <div className="col-auto col-lg-2 mt-2 md:p-2 p-1">
          <Dropdown
            isOpen={dropdownOpen}
            toggle={toggleDropDown}
            direction="down"
            onChange={(event) => console.log(event)}
          >
            <DropdownToggle
              size="lg"
              className="rounded-md w-full h-auto !text-textcolor text-2xl p-2 border-0 !bg-color3 shadow-md"
              caret
            >
              {filter === "" ? "Select Filter" : filter}
            </DropdownToggle>
            <DropdownMenu className="text-textcolor">
              <DropdownItem onClick={() => setFilter("Name")}>
                Name
              </DropdownItem>
              <DropdownItem onClick={() => setFilter("District")}>
                District
              </DropdownItem>
              <DropdownItem onClick={() => setFilter("District")}>
                Case Number
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
      {/* Assign Worker */}
      <Modal centered isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>
          Comments for tasks related to {caseSelected}
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={(event) => handleComment(event)}>
            Comments History
            <FormGroup row>
              <Label for="mid" sm={2}>
                {" "}
                worker id{" "}
              </Label>
              <Col sm={10}>
                <div> worker message</div>
              </Col>
            </FormGroup>
            <FormGroup row>
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
            <FormGroup row>
              <div className="col-2 m-2">
                <Button type="submit" color="primary">
                  Submit
                </Button>
              </div>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
      {/* Case Details */}
      <Modal
        centered
        isOpen={modalDeadline}
        toggle={toggleModalDeadline}
        fullscreen="md"
        size="sm"
      >
        <ModalHeader toggle={toggleModalDeadline}>
          Deadlines for {caseSelected}
        </ModalHeader>
        <Form className="mt-2" onSubmit={(event) => handleDeadLine(event)}>
          <ModalBody>
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
          </ModalBody>
          <FormGroup row>
            <div className="m-2">
              <Button type="submit" color="primary">
                Change Deadline
              </Button>
            </div>
          </FormGroup>
        </Form>
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