import React, {useState,useEffect} from "react";
import { useLocation,useNavigate } from "react-router-dom";
import img from "../../logo_scroll.png";
import { List, Card, CardBody, CardTitle} from "reactstrap";
import { database, db, storage } from "../../firebase";
import { Accordion, AccordionBody, AccordionHeader, AccordionItem, Form, FormGroup, FormText, FormFeedback, Label, Input, Col, Button } from 'reactstrap';
import { FieldValue, arrayUnion, getDocs, getDoc, updateDoc, doc, getFirestore, collection, setDoc } from "firebase/firestore";




const ChildProfile= ({user}) => {
	const {state}=useLocation();
	const [child,setChild]=useState(state["children"]);
  const [deadLine, setDeadLine] = useState("");
	const [wid, setWid]=useState("");
	const [wmsg, setWmsg]=useState("");
	const [keys,setKeys]=useState(Object.keys(child));
	const [text,setText]=useState("");
	const [gwId,setGWID]=useState("");
	const [report,setReport]=useState("");
  const [step, setStep] = useState(0);
  const [substep, setSubStep] = useState(0);
	// const [assignedStatus,setAssignedStatus]=useState("");

	const navigate=useNavigate();
	const [open, setOpen] = useState('1');
  // const [temp, setTemp] = useState('1');
	const [imageUpload, setImageUpload] = useState(null);
	const toggle = (id) => {
		if (open === id) {
			setOpen();
		} else {
			setOpen(id);
		}
	};

  let temp = 0

	useEffect(() => {
    if (user !== "caseManager") navigate("/");
    console.log("Hi there")

    // Set Setps Completed in the Process
    // --------------------------------
    database.ref(`cases/Process/` + child["id"] + "/isComplete/").on("value", (snapshot) => {
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



// Case Creation Section(Worker Assigned to Children)
// (mId to be changed to the manager Id)
// ----------------------------------------
const handleCase = (element) => {
  // Case Creation
  element.preventDefault();

  const usersRef = db.collection("cases").doc(child["id"]);
  const usersRef2 = db.collection("children").doc(child["id"]);

  usersRef.get().then((doc) => {
    
    if (!doc.exists) {
      // Initial Case Report
      usersRef2.get().then((d) => {
        console.log(d.data()["Case Number"]);
        db.collection("cases")
          .doc(child["id"])
          .set({
            "Bal Asha Enrolment": d.data()["Date Of Birth"],
            "Date of Admission": d.data()["Date Of Birth"],

            "Date of Last Follow up": d.data()["Date Of Birth"],
            "Last Follow up": "",
            "Remark of Bal Asha Social Work": "",
            "Remark": "",
            "Manager ID": "MId",
            "Worker IDs": [element.target[2].value],
          });
      });
    
      // Process Track
      database.ref(`cases/Process/` + child["id"]).update({
        isComplete: 0,
      });
      database.ref(`cases/Process/` + child["id"] + "/Step1").update({
        isComplete: false,
      });
      database.ref(`cases/Process/` + child["id"] + "/Step1/Step1").update({
        isComplete: false,
        text: "",
        docs: "",
        stat: "In Progress",
      });
      database.ref(`cases/Process/` + child["id"] + "/Step1/Step2").update({
        isComplete: false,
        text: "",
        docs: "",
        stat: "In Progress",
      });
      database.ref(`cases/Process/` + child["id"] + "/Step1/Step3").update({
        isComplete: false,
        text: "",
        docs: "",
        stat: "In Progress",
      });
      database.ref(`cases/Process/` + child["id"] + "/Step1/Step4").update({
        isComplete: false,
        text: "",
        docs: "",
        stat: "In Progress",
      });
      database.ref(`cases/Process/` + child["id"] + "/Step1/Step5").update({
        isComplete: false,
        text: "",
        docs: "",
        stat: "In Progress",
      });
      database.ref(`cases/Process/` + child["id"] +"/Step2").update({
        isComplete: false,
        text: "",
        docs:"",
        stat: "In Progress",
      });
      database.ref(`cases/Process/` + child["id"] + "/Step3").update({
        isComplete: false,
        text: "",
        docs: "",
        stat: "In Progress",
      });
      database.ref(`cases/Process/` + child["id"] + "/Step4").update({
        isComplete: false,
        text: "",
        docs: "",
        stat: "In Progress",
      });
      console.log("Success!")
      

    } 
    else
    {
    // Reassign to different worker
      console.log("Reassigning to Worker: ", element.target[2].value);
      usersRef2.get().then((d) => {
        var pathRef = db.collection("cases").doc(child["id"]);
        updateDoc(pathRef, {
          "Worker IDs": arrayUnion(element.target[2].value),
        });
      });
    }
  });
 

  // RealTime Deadline
  // ------------------------------
  let currentDate = new Date();
  let futureDate = new Date(currentDate);
  futureDate.setMonth(currentDate.getMonth() + 1);
  console.log(futureDate.toDateString());
  database.ref(`cases/DeadLine/` + child["id"]).set({
    DeadLine: futureDate.toDateString(),
  });
  setDeadLine(futureDate.toString());
  // -----------------------------------
}
// ----------------------------------------



// DeadLine Section
// -----------------------------------
	const handleDeadLine = (e) => {
    e.preventDefault();
    console.log(e.target[0].value)
    database.ref(`cases/DeadLine/` + child["id"]).update({
      DeadLine: e.target[0].value,
    });
    setDeadLine(e.target[0].value)
	}
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
	  }
// -------------------------------------------
  

// Handle Accpet Section 
// --------------------------------------
  const handleAccept = (e) =>{
    e.preventDefault()
    console.log("HI there!")
    setStep(1)
    setSubStep(1)
    console.log(step, substep)
    console.log("Accepted")
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


    if(step === 1)
    {
       database.ref(`cases/Process/` + child["id"] + `/Step1/Step1`).update({
         isComplete: true,
         stat: "Complete",
       });
       let isStep1Complete = true;
       for(let i=1; i<=5; i++)
       {
          database.ref(`cases/Process/` + child["id"] + `/Step1/Step${i}/isComplete`).once("value", (snapshot) => {
            isStep1Complete = snapshot.val() && isStep1Complete;
          });
       }
       if(isStep1Complete){
         database.ref(`cases/Process/` + child["id"]).update({
           isComplete: 1,
         });
       }
    }
    else 
    {
       database.ref(`cases/Process/` + child["id"] + `/Step${step}`).update({
         isComplete: true,
         stat: "Complete",
       });
       database.ref(`cases/Process/` + child["id"] ).update({
         isComplete: step,
       });
    }   
  }
  // ----------------------------------


// Handle Reject Section
  // -------------------------------------
  const handleReject = (e) =>{
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
    } 
    else {
      database.ref(`cases/Process/` + child["id"] + `/Step${step}`).update({
        isComplete: false,
        text: "",
        docs: "",
        stat: "In Progress",
      });

    }

  }
// ---------------------------------------------


	return (
    <div className="container overflow-y-auto bg-[#C1DDB4]">
      <Card
        body
        className=" !flex-row align-items-center justify-content-center m-2 p-2 mt-4"
        style={{ boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.2)" }}
      >
        <CardBody>
          <List type="unstyled">
            <h1 className="p-2 m-2"> Child Details for {child["id"]}</h1>
            {child !== undefined &&
              keys.map((key) => {
                return (
                  <li key={key} className="row m-2 p-1">
                    {" "}
                    <strong className="col-3">{key} :</strong>{" "}
                    <div className="col">{child[key]}</div>
                  </li>
                );
              })}
          </List>
        </CardBody>
        <div className="flex-column align-self-start m-2 p-2 pt-4 col-3">
          <img alt="Child Photo" src={img} />
          <div className="mt-4 p-2">
            <strong>Steps Completed:</strong>
            <ul>
              {step >= 1 && <li>Verification 1</li>}
              {step >= 2 && <li>Verification 2</li>}
              {step >= 3 && <li>Verification 3</li>}
              {step >= 4 && <li>Verification 3</li>}
            </ul>
          </div>
          <div className="mt-2 p-2">
            <strong> Deadline:</strong> {deadLine}
          </div>
          <div className="mt-2 p-2">
            <label for="changeDeadline">
              <strong>Modify Deadline:</strong>
            </label>
            <Form onSubmit={(event) => handleDeadLine(event)}>
              <FormGroup row>
                <Label for="dob" sm={2}>
                  {" "}
                  Date{" "}
                </Label>
                <Col sm={10}>
                  <Input
                    id="dob"
                    name="dob"
                    placeholder="Date of Birth"
                    type="date"
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <div className="col-2 m-2">
                  <Button type="submit" color="primary">
                    Change Deadline
                  </Button>
                </div>
              </FormGroup>
            </Form>
          </div>
          <div className="m-2 p-2 rounded-2 bg-color3">
            <Accordion
              className="overflow-y-scroll overflow-x-hidden h-full"
              open={open}
              toggle={toggle}
            >
              <Form onSubmit={(event) => handleCase(event)}>
                <AccordionItem>
                  <AccordionHeader targetId="1">Edit</AccordionHeader>
                  <AccordionBody accordionId="1">
                    <FormGroup row>
                      <Label for="wid" sm={2}>
                        {" "}
                        Worker ID{" "}
                      </Label>
                      <Col sm={10}>
                        <Input
                          id="wid"
                          name="wid"
                          placeholder="Worker ID"
                          type="text"
                        />
                      </Col>
                    </FormGroup>
                    {/* <FormGroup row>
                      <Label for="status" sm={2}>
                        Status
                      </Label>
                      <Col sm={10}>
                        <Input id="status" name="status" type="select">
                          <option>Not Assigned</option>
                          <option>Assigned</option>
                          <option>Completed </option>
                        </Input>
                      </Col>
                    </FormGroup> */}
                    <FormGroup row>
                      <div className="col-2 m-2">
                        <Button type="submit" color="primary">
                          Assign
                        </Button>
                      </div>
                    </FormGroup>
                  </AccordionBody>
                </AccordionItem>
              </Form>
            </Accordion>
          </div>
          {/* Assigned Worker Card */}

          <Card body className="justify-content-center m-2 mt-4 p-2">
            <CardTitle className="m-1 p-1" tag="h4">
              {" "}
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
              {/* {assignedStatus === "Assigned" && (
                <div className="row mt-1">
                  <div className="col m-1 p-1 bg-color3 rounded-pill">
                    <Button className="w-full bg-transparent !border-none !text-textcolor">
                      Accept
                    </Button>
                  </div>
                  <div className="col m-1 p-1 bg-color3 rounded-pill">
                    <Button className="w-full bg-transparent !border-none !text-textcolor">
                      Reject
                    </Button>
                  </div>
                </div> */}
              {/* )} */}
            </CardBody>
          </Card>
          <Accordion open={open} toggle={toggle}>
            <Form onSubmit={(event) => handleComment(event)}>
              <AccordionItem>
                <AccordionHeader targetId="2">Comments</AccordionHeader>
                <AccordionBody accordionId="2">
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
                </AccordionBody>
              </AccordionItem>
            </Form>
          </Accordion>
        </div>
      </Card>
    </div>
  );
}

export default ChildProfile;
