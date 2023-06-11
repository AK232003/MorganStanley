import React, {useState,useEffect} from "react";
import { useLocation,useNavigate } from "react-router-dom";
import {GiCheckMark} from 'react-icons/gi'
import img from "../../profile.webp";
import { List, Card, CardBody, CardTitle} from "reactstrap";
import { database, db, storage } from "../../firebase";
import { Accordion, AccordionBody, AccordionHeader, AccordionItem, Form, FormGroup, FormText, FormFeedback, Label, Input, Col, Button } from 'reactstrap';
import { FieldValue, arrayUnion, getDocs, getDoc, updateDoc, doc, getFirestore, collection, setDoc } from "firebase/firestore";




const ChildProfile = ({ user, id }) => {
  const { state } = useLocation();
  const [child, setChild] = useState(state["children"]);
  const [deadLine, setDeadLine] = useState("");
  const [wid, setWid] = useState("");
  const [wmsg, setWmsg] = useState("");
  const [keys, setKeys] = useState(Object.keys(child));
  const [text, setText] = useState("");
  const [gwId, setGWID] = useState("");
  const [report, setReport] = useState("");
  const [step, setStep] = useState(0);
  const [substep, setSubStep] = useState(0);
  // const [assignedStatus,setAssignedStatus]=useState("");

  const navigate = useNavigate();
  const [open, setOpen] = useState("1");
  // const [temp, setTemp] = useState('1');
  const [imageUpload, setImageUpload] = useState(null);
  const toggle = (id) => {
    if (open === id) {
      setOpen();
    } else {
      setOpen(id);
    }
  };

  let temp = 0;

  useEffect(() => {
    if (user !== "CaseManager") navigate("/");
    console.log("Hi there");

    // Set Setps Completed in the Process
    // --------------------------------
    database
      .ref(`cases/Process/` + child["id"] + "/isComplete/")
      .on("value", (snapshot) => {
        console.log("Steps Completed", snapshot.val());
        setStep(snapshot.val());
      });
    // ---------------------------------

    //  Set Deadline From Database
    //  -----------------------
    database
      .ref(`cases/DeadLine/` + child["id"] + "/DeadLine")
      .on("value", (snapshot) => {
        setDeadLine(snapshot.val());
        console.log("DeadLine", snapshot.val());
      });
    // -----------------------
  }, [child, user]);

  // DeadLine Section
  // -----------------------------------
  const handleDeadLine = (e) => {
    e.preventDefault();
    console.log(e.target[0].value);
    database.ref(`cases/DeadLine/` + child["id"]).update({
      DeadLine: e.target[0].value,
    });
    setDeadLine(e.target[0].value);
  };
  // ---------------------------------------

  // Comment Section(mId to be changed with the current managerId)
  // -----------------------------------------
  const handleComment = (e) => {
    e.preventDefault();
    database
      .ref(`cases/comments/` + child["id"] + `/Manager`)
      .once("value", (snapshot) => {
        const existingArray = snapshot.val() || [];

        const newArray = [
          ...existingArray,
          e.target[1].value + "@" + "mID" + "@" + new Date().toString(),
        ];

        database
          .ref(`cases/comments/` + child["id"] + `/Manager`)
          .set(newArray);
      });
  };
  // -------------------------------------------

  // Handle Accpet Section
  // --------------------------------------
  const handleAccept = (e) => {
    e.preventDefault();
    console.log("HI there!");
    setStep(1);
    setSubStep(1);
    console.log(step, substep);
    console.log("Accepted");
    const caseDocRef = db.collection("cases").doc(child["id"]);
    const taskDocRef = db
      .collection("task")
      .doc(child["id"] + step.toString() + substep.toString());

    taskDocRef
      .get()
      .then((taskDocSnapshot) => {
        if (taskDocSnapshot.exists) {
          const taskData = taskDocSnapshot.data();
          caseDocRef
            .update(taskData)
            .then(() => {
              console.log("Fields added successfully");
            })
            .catch((error) => {
              console.error("Error updating case document: ", error);
            });
        } else {
          console.log("Task document does not exist");
        }
      })
      .catch((error) => {
        console.error("Error retrieving task document: ", error);
      });

    if (step === 1) {
      database.ref(`cases/Process/` + child["id"] + `/Step1/Step1`).update({
        isComplete: true,
        stat: "Complete",
      });
      let isStep1Complete = true;
      for (let i = 1; i <= 5; i++) {
        database
          .ref(`cases/Process/` + child["id"] + `/Step1/Step${i}/isComplete`)
          .once("value", (snapshot) => {
            isStep1Complete = snapshot.val() && isStep1Complete;
          });
      }
      if (isStep1Complete) {
        database.ref(`cases/Process/` + child["id"]).update({
          isComplete: 1,
        });
      }
    } else {
      database.ref(`cases/Process/` + child["id"] + `/Step${step}`).update({
        isComplete: true,
        stat: "Complete",
      });
      database.ref(`cases/Process/` + child["id"]).update({
        isComplete: step,
      });
    }
  };
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
  // ---------------------------------------------

  return (
    <div className="overflow-y-auto bg-color2">
      <Card
        body
        className=" md:!flex-row !bg-color5/[0.6] m-2 p-2 mt-4"
        style={{ boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.2)" }}
      >
        <div className="mt-3">
          <div className="row">
            <h1 className="col-6 p-2 m-2"> Child Details for {child["id"]}</h1>
            <img className="col-4" alt="Child Photo" src={img} />
          </div>
          <ul type="unstyled" className="p-0">
            {child !== undefined &&
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
          <div className="mt-4 p-2">
            <strong>Steps Completed:</strong>
            <ul className="p-0">
              {step >= 1 && (
                <li>
                  <span>
                    <GiCheckMark className="text-base text-green-500 block float-left"></GiCheckMark>
                  </span>
                  Verification 1
                </li>
              )}
              {step >= 2 && (
                <li>
                  <span>
                    <GiCheckMark className="text-base text-green-500 block float-left"></GiCheckMark>
                  </span>
                  Verification 2
                </li>
              )}
              {step >= 3 && (
                <li>
                  <span>
                    <GiCheckMark className="text-base text-green-500 block float-left"></GiCheckMark>
                  </span>
                  Verification 3
                </li>
              )}
              {step >= 4 && (
                <li>
                  <span>
                    <GiCheckMark className="text-base text-green-500 block float-left"></GiCheckMark>
                  </span>
                  Verification 4
                </li>
              )}
            </ul>
          </div>
        </div>
        {/* <div className="mt-2 p-2">
            <label for="changeDeadline">
              <strong>Modify Deadline:</strong>
            </label>
            <Form className="mt-2" onSubmit={(event) => handleDeadLine(event)}>
            <FormGroup > 
								<Input id="dob" name="dob" placeholder="Date of Birth" type="date" />
							</FormGroup>
              <FormGroup>
								<Button type="submit" color="primary" block>
									Change Deadline
								</Button>
							</FormGroup>
            </Form>
          </div> */}
        {/* <div className="m-2 p-2 rounded-2 bg-color2">
              <Form className=" m-2" onSubmit={(event) => handleCase(event)}>
                <div className="font-bold text-2xl mb-2" >Edit</div>
                  <FormGroup >
											<Label for="wid"> Worker ID </Label>
												<Input id="wid" name="wid" placeholder="Worker ID" type="text" />
										</FormGroup>
                    <FormGroup row>
                      <div className="col-2 m-2">
                        <Button type="submit" color="primary">
                          Assign
                        </Button>
                      </div>
                    </FormGroup>
              </Form>
          </div>
          {/* Assigned Worker Card */}

        {/* <div className="justify-content-center m-2 mt-4 p-2 bg-color2 rounded-2">
            <CardTitle className="m-1 p-2" tag="h4">
              Assigned Ground Worker
            </CardTitle>

            <CardBody>
              <div className="row">
                <div className="col"> Worker ID</div>
                <div className="col">{gwId}</div>
              </div>
              <div className="row">
                <div className="col"> Task Text</div>
                <div className="col">{text}</div>
              </div>
              <div className="row">
                <div className="col"> Related Files</div>
                <div className="col">
                  <a href={report} target="_blank" rel="noopener noreferrer">
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
          </div>
          <div className="justify-content-center m-2 mt-4 p-2 bg-color2 rounded-2">
            <Form onSubmit={(event) => handleComment(event)}>
                Comments
                  <FormGroup row>
                    <Label for="mid" sm={2}>
                      {" "}
                      {wid}{" "}
                    </Label>
                    <Col sm={10}>
                      <div>{wmsg}</div>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="mid" sm={2}>
                      {" "}
                      Manager ID{" "}
                    </Label>
                    <Col sm={10}>
                      <Input
                        id="mid"
                        name="mid"
                        placeholder="Manager ID"
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
          </div> */}
      </Card>
    </div>
  );
};

export default ChildProfile;
