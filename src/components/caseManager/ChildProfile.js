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
	const [wid, setWid]=useState("");
	const [wmsg, setWmsg]=useState("");
	const [keys,setKeys]=useState(Object.keys(child));
	const [text,setText]=useState("");
	const [gwId,setGWID]=useState("");
	const [report,setReport]=useState("");
  const [step, setStep] = useState(1);
	// const [assignedStatus,setAssignedStatus]=useState("");
	const [date, setDate]=useState(null);
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
  let temp = 0;

  

	useEffect(() => {
    if (user !== "caseManager") navigate("/");
    database.ref(`childProfile/${child["id"]}/Status`).on("value", (snapshot) => {
      setStep(snapshot.val());
      console.log("Step", snapshot.val());
     });
    if (step === 1) {
      database
        .ref(`childProfile/${child["id"]}/Step1`)
        .on("value", (snapshot) => {
          if (snapshot.val() === "In Progress") {
            db.collection("cases")
              .doc(child["id"])
              .get()
              .then((d) => {
                setText(d.data()["Photo Publication Text"]);
                setReport(d.data()["Photo Publication Report"]);
                setGWID(d.data()["Worker IDs"].slice(-1)[0]);
                temp = 1;
                console.log("HIHI1")
                // setAssignedStatus(d.data()["Status"]);
                console.log(d.data());
              });
          }
        });

      database
        .ref(`childProfile/${child["id"]}/Step2`)
        .on("value", (snapshot) => {
          if (snapshot.val() === "In Progress") {
            db.collection("cases")
              .doc(child["id"])
              .get()
              .then((d) => {
                setText(d.data()["TV Telecasting Text"]);
                setReport(d.data()["TV Telecasting Report"]);
                setGWID(d.data()["Worker IDs"].slice(-1)[0]);
                temp = 2;
                console.log("HIHI2");
                // setAssignedStatus(d.data()["Status"]);
                console.log(d.data());
              });
          }
        });

      database
        .ref(`childProfile/${child["id"]}/Step3`)
        .on("value", (snapshot) => {
          if (snapshot.val() === "In Progress") {
            db.collection("cases")
              .doc(child["id"])
              .get()
              .then((d) => {
                setText(d.data()["Final Report Police Text"]);
                setReport(d.data()["Final Report Police"]);
                setGWID(d.data()["Worker IDs"].slice(-1)[0]);
                temp = 3;
                console.log("HIHI3");
                // setAssignedStatus(d.data()["Status"]);
                console.log(d.data());
              });
          }
        });

      database
        .ref(`childProfile/${child["id"]}/Step4`)
        .on("value", (snapshot) => {
          if (snapshot.val() === "In Progress") {
            db.collection("cases")
              .doc(child["id"])
              .get()
              .then((d) => {
                setText(d.data()["Medical Text AV"]);
                setReport(d.data()["Medical Report AV"]);
                setGWID(d.data()["Worker IDs"].slice(-1)[0]);
                temp = 4;
                console.log("HIHI4");
                // setAssignedStatus(d.data()["Status"]);
                console.log(d.data());
              });
          }
        });

      database
        .ref(`childProfile/${child["id"]}/Step5`)
        .on("value", (snapshot) => {
          if (snapshot.val() === "In Progress") {
            db.collection("cases")
              .doc(child["id"])
              .get()
              .then((d) => {
                setText(d.data()["Medical Text AV"]);
                setReport(d.data()["Previous Organization Final Report"]);
                setGWID(d.data()["Worker IDs"].slice(-1)[0]);
                temp = 5;
                console.log("HIHI5");
                // setAssignedStatus(d.data()["Status"]);
                console.log(d.data());
              });
          }
        });
    } else if (step === 2) {
      db.collection("cases")
        .doc(child["id"])
        .get()
        .then((d) => {
          setText(d.data()["DCPU Text"]);
          setReport(d.data()["NOC Report"]);
          setGWID(d.data()["Worker IDs"].slice(-1)[0]);
          // setAssignedStatus(d.data()["Status"]);
          console.log(d.data());
        });
    } else if (step === 3) {
      db.collection("cases")
        .doc(child["id"])
        .get()
        .then((d) => {
          setText(d.data()["CWC Text"]);
          setReport(d.data()["LFA Report"]);
          setGWID(d.data()["Worker IDs"].slice(-1)[0]);
          // setAssignedStatus(d.data()["Status"]);
          console.log(d.data());
        });
    } else if (step === 4) {
      db.collection("cases")
        .doc(child["id"])
        .get()
        .then((d) => {
          setText(d.data()["CCI or SAA Report"]);
          setReport(d.data()["Bal Asha Investigation Report"]);
          setGWID(d.data()["Worker IDs"].slice(-1)[0]);
          // setAssignedStatus(d.data()["Status"]);
          console.log(d.data());
        });
    }

  

    // setKeys(Object.keys(child));
    // const ref = database.ref("childProfile/" + child["id"]);

    // ref.on("value", (snapshot) => {
    //   console.log(snapshot.val().WorkerID);
    //   setWid(snapshot.val().WorkerID);
    //   setWmsg(snapshot.val().workerMessage);
    // });
  }, [child, user]);


	const handleSubmitInformation = (element) => { 
		element.preventDefault();
   
		// console.log(element.target[1].value, assignStatus, child["id"])
		const usersRef = db.collection("cases").doc(child["id"]);
		// const usersRef1 = collection(db, "children");
		const usersRef2 = db.collection("children").doc(child["id"]);
		// const docsSnap = await getDocs(colRef);
		// getDocs(usersRef1).then((snap) =>{
		// 	snap.forEach(d => console.log(d.data()))
		// })

		usersRef.get().then((doc) => {
		if(!doc.exists) {
			usersRef2.get().then((d) => {
				console.log(d.data()["Case Number"])
				db.collection("cases").doc(child["id"]).set({	
					"CCI or SAA Name": "",
					"Bal Asha Enrolment": d.data()["Date Of Birth"],
					"Date of Admission": d.data()["Date Of Birth"],
					"Photo Publication Report": "",
					"Photo Publication Text": "",
					"TV Telecasting Text": "",
					"TV Telecasting Report": "",
					"Final Report Police": "",
					"Final Report Police Text": "",
					"Medical Report AV": "",
					"Medical Text AV":"",
					"Previous Organization Final Report": "",
					"DCPU Text": "",
					"NOC Report": "",
					"CWC Text": "",
					"LFA Report": "",
					"CCI or SAA Report": "",
					"Bal Asha Investigation Report": "",
					"Final Report District Wonan and Child Development": "",
					"Free for Adoption": d.data()["Date Of Birth"],
					"MER": d.data()["Date Of Birth"],
					"CSR": d.data()["Date Of Birth"],
					"Carings Upload": d.data()["Date Of Birth"],
					"Date of Last Follow up": d.data()["Date Of Birth"],
					"Last Follow up": "",
					"Remark of Bal Asha Social Work": "",
					"Remark": "",
					// "Deadline": element.target[1].value,
					"Manager ID": element.target[1].value,
					"Worker IDs": [element.target[2].value],
				}) 
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
      // -----------------------------------

        // database.ref("childProfile/"+`${id}`).update({[step] :"In Progress"})
        
					// AssignStatus: element.target[3].value,
					// WorkerID: element.target[2].value,
					// ManagerID: element.target[1].value,
					// Step1: "Proposal",
					// Step2: "Proposal",
					// Step3: "Proposal",
					// Step4: "Proposal",
					// Step5: "Proposal",
					// Step6: "Proposal",
					// Step7: "Proposal",
					// Step8: "Proposal",
					// Status: 1,

					// Deadline: element.target[1].value// ISO can also be used
				  

				  setWid(element.target[2].value)
				  console.log(wid);
		}

		else {
			console.log("Here2", doc.exists);
			usersRef2.get().then((d) => {
			var pathRef = db.collection("cases").doc(child["id"])
			updateDoc(pathRef , {
				// "Deadline": element.target[1].value,
				"Manager ID": element.target[1].value,
				// "Worker IDs": element.target[3].value !== "" ? arrayUnion(element.target[3].value) : arrayUnion(),
				"Worker IDs": arrayUnion(element.target[2].value),
			
		}); 
			});
			
		}
	});
		// database
		// 		  .ref("childProfile/" + child["id"])
		// 		  .set({
		// 			AssignStatus: element.target[3].value,
		// 			WorkerID: element.target[2].value,
		// 			ManagerID: element.target[1].value,
		// 			// Deadline: element.target[1].value// ISO can also be used
		// 		  });
		
		// setWid(element.target[2].value)
		// console.log(wid);
		
		db.collection("children").doc(child["id"]).update({
			"Status": element.target[3].value,
		})
	}

// DeadLine Section
// -----------------------------------
	const handleDeadLine = (e) => {
    e.preventDefault();
    console.log(e.target[0].value)
    database.ref(`cases/DeadLine/` + child["id"]).update({
      DeadLine: e.target[0].value,
    });
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
  


  const handleAccept = () =>{
    if(step == 1)
    {
        
        database
          .ref("childProfile/" + `${child["id"]}`)
          .update({ Step1: "Completed" }); 
    }
    
  }
  const handleReject = () =>{
    console.log("Rejected");
  }



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
            <strong> Steps Done:</strong>
            <ul>
              <li> Verification 1</li>
              <li> Verification 2</li>
              <li> Verification 3</li>
            </ul>
          </div>
          <div className="mt-2 p-2">
            <strong> Deadline:</strong> 29/10/2023
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
              <Form onSubmit={(event) => handleSubmitInformation(event)}>
                <AccordionItem>
                  <AccordionHeader targetId="1">Edit</AccordionHeader>
                  <AccordionBody accordionId="1">
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
                          type="text"
                        />
                      </Col>
                    </FormGroup>
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
                    <FormGroup row>
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
