import { React, useState, useEffect } from "react";
import { Accordion, AccordionBody, AccordionItem, Form, FormGroup, Label, Input, Col, Button } from 'reactstrap';
import { useNavigate,Link } from "react-router-dom";
import { database, db, storage } from "../../firebase";
import * as XLSX from "xlsx";
import { setDoc, doc } from "firebase/firestore";
import { getDownloadURL, ref as storageRef, uploadBytes, } from "firebase/storage";
import {IoIosArrowDropdown} from 'react-icons/io'
const AddChild = ({ user, id }) => {
  const [open, setOpen] = useState("1");
  const [imageUpload, setImageUpload] = useState(null);
  const toggle = (id) => {
    if (open === id) {
      setOpen();
    } else {
      setOpen(id);
    }
  };

  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (selectedFile) {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(selectedFile);
      fileReader.onload = (e) => {
        const bufferArray = e.target.result;
        const wb = XLSX.read(bufferArray, { type: "buffer" });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws);
        data.forEach((element) => {
          // Write the child profile document to Firestore
          const id = element["Case Number"].split("/").join("");
          db.collection("children")
            .doc(id)
            .set(element)
            .then(() => {
              console.log("Document successfully written with ID: ", id);
              // Create an entry in the Realtime Database for the child profile
              database
                .ref("childProfile/" + id)
                .set(db.collection("children").doc(id).id);
            })
            .catch((error) => {
              console.error("Error writing document: ", error);
            });
        });
      };
    }
  };

  const handleSubmitInformation = async (element) => {
    element.preventDefault();
    console.log(element);

    const id = element.target[9].value.split("/").join("");
    let url;
    // const storage = getStorage()
    const imageRef = storageRef(storage, `children/${id}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setDoc(doc(db, "children", id), {
          Name: element.target[0].value,
          Gender: element.target[1].value,
          "Date of Birth": element.target[2].value,
          Age: element.target[3].value,
          "Child Category": element.target[4].value,
          Image: url,
          State: element.target[6].value,
          District: element.target[7].value,
          Home: element.target[8].value,
          "Case Number": element.target[9].value,
          "Reason For Admission": element.target[10].value,
          "Reason For Flagging": element.target[11].value,
          "Last Visit Since": element.target[12].value,
          "Last Call Since": element.target[13].value,
          Guardian: element.target[14].value,
          Sibling: element.target[15].value,
          "Total Shelter Home Stay": element.target[16].value,
          "Case History": element.target[17].value,
        });
      });
    });
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (user !== "CaseManager") navigate("/");
  }, [user]);
  return (
    <div className="container mt-4 bg-color2">
      <Accordion
        className="row overflow-y-scroll overflow-x-hidden"
        open={open}
        toggle={toggle}
      >
        <Form
          className="!bg-color5/[0.6] !border-none rounded-2"
          onSubmit={(event) => handleSubmitInformation(event)}
        >
          <AccordionItem className="!bg-transparent">
            <h4 className="m-2 ms-4 cursor-pointer" onClick={() => toggle("1")}>
              Section-1
              <span>
                <IoIosArrowDropdown className="text-4xl block float-right"></IoIosArrowDropdown>
              </span>
            </h4>
            <AccordionBody className="!bg-transparent" accordionId="1">
              <FormGroup row>
                <Label for="fullname" sm={2}>
                  {" "}
                  Full Name{" "}
                </Label>
                <Col sm={10}>
                  <Input
                    id="fullname"
                    name="fullname"
                    placeholder="Full Name"
                    type="text"
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="gender" sm={2}>
                  {" "}
                  Gender{" "}
                </Label>
                <Col sm={10}>
                  <Input
                    id="gender"
                    name="gender"
                    placeholder="Gender"
                    type="text"
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="dob" sm={2}>
                  {" "}
                  Date of Birth{" "}
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
                <Label for="age" sm={2}>
                  {" "}
                  Estimated Age{" "}
                </Label>
                <Col sm={10}>
                  <Input
                    id="age"
                    name="age"
                    placeholder="Estimated Age"
                    type="text"
                  />
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label for="childCategory" sm={2}>
                  {" "}
                  Category{" "}
                </Label>
                <Col sm={10}>
                  <Input id="childCategory" name="category" type="select">
                    <option> Abandoned / Family not traceable</option>
                    <option> Surrendered</option>
                    <option> Orphaned - No Guardians </option>
                    {/* <option> Child Admitted in CCI by Family </option> */}
                    <option> Admitted by Guardians </option>
                  </Input>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="image" sm={2}>
                  {" "}
                  Image{" "}
                </Label>
                <Col sm={10}>
                  <Input
                    id="image"
                    name="image"
                    placeholder="Image"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      setImageUpload(e.target.files[0]);
                    }}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="state" sm={2}>
                  {" "}
                  State{" "}
                </Label>
                <Col sm={10}>
                  <Input
                    id="state"
                    name="state"
                    placeholder="State"
                    type="text"
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="disctrict" sm={2}>
                  {" "}
                  District{" "}
                </Label>
                <Col sm={10}>
                  <Input
                    id="disctrict"
                    name="disctrict"
                    placeholder="Disctrict"
                    type="text"
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="home" sm={2}>
                  {" "}
                  Home{" "}
                </Label>
                <Col sm={10}>
                  <Input id="home" name="home" placeholder="Home" type="text" />
                </Col>
              </FormGroup>
            </AccordionBody>
            <hr className="solid" />
            <h4
              className="me-2 ms-4 mt-3 mb-3 cursor-pointer"
              onClick={() => toggle("2")}
            >
              Section-2
              <span>
                <IoIosArrowDropdown className="text-4xl block float-right"></IoIosArrowDropdown>
              </span>
            </h4>
            <AccordionBody accordionId="2">
              <FormGroup row>
                <Label for="caseno" sm={2}>
                  {" "}
                  Case Number{" "}
                </Label>
                <Col sm={10}>
                  <Input
                    id="caseno"
                    name="caseno"
                    placeholder="Case Number"
                    type="text"
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="rfa" sm={2}>
                  {" "}
                  Reason For Admission{" "}
                </Label>
                <Col sm={10}>
                  <Input
                    id="rfa"
                    name="rfa"
                    placeholder="Reason For Admission"
                    type="textarea"
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="rff" sm={2}>
                  {" "}
                  Reason For Flagging{" "}
                </Label>
                <Col sm={10}>
                  <Input
                    id="rff"
                    name="rff"
                    placeholder="Reason For Flagging"
                    type="text"
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="lvs" sm={2}>
                  {" "}
                  Last Visit Since<span className="text-red-500">*</span>{" "}
                </Label>
                <Col sm={10}>
                  <Input
                    id="lvs"
                    name="lvs"
                    placeholder="Last Visit Since"
                    type="text"
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="lcs" sm={2}>
                  {" "}
                  Last Call Since{" "}
                </Label>
                <Col sm={10}>
                  <Input
                    id="lcs"
                    name="lcs"
                    placeholder="Last Call Since"
                    type="text"
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="guardian" sm={2}>
                  {" "}
                  Guardian{" "}
                </Label>
                <Col sm={10}>
                  <Input
                    id="guardian"
                    name="guardian"
                    placeholder="Guardian"
                    type="text"
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="sibling" sm={2}>
                  Sibling Details
                </Label>
                <Col sm={10}>
                  <Input
                    id="sibling"
                    name="sibling"
                    placeholder="Sibling Details"
                    type="text"
                  />
                </Col>
              </FormGroup>
              <FormGroup row></FormGroup>

              <FormGroup row>
                <Label for="casehistory" sm={2}>
                  Case History
                </Label>
                <Col sm={10}>
                  <Input
                    id="casehistory"
                    name="casehistory"
                    placeholder="Case History"
                    type="textarea"
                  />
                </Col>
              </FormGroup>
            </AccordionBody>
          </AccordionItem>
          <FormGroup row>
            <div className="m-2 justify-items-center">
              <Button
                type="submit"
                className="!bg-color3 !border-none !text-textcolor"
              >
                Submit
              </Button>
            </div>
          </FormGroup>
        </Form>
      </Accordion>
      <div className="row">
        <Form onSubmit={(event) => handleUpload(event)}>
          <div className="row m-2 text-3xl font-bold">Insert Excel Sheet</div>
          <div className="row m-1">
            <div className="col-12 col-sm-8 col-lg-6">
              <Input
                id="excelsheet"
                name="excelsheet"
                type="file"
                accept=".xlsx"
                onChange={handleFileChange}
              />
            </div>
          </div>
          <FormGroup row>
            <div className="col-2 m-2">
              <Button
                type="submit"
                className="!bg-color3 !border-none !text-textcolor"
                onClick={handleUpload}
              >
                Submit
              </Button>
            </div>
          </FormGroup>
        </Form>
      </div>
    </div>
  );
};
export default AddChild


// GARBAGE
		// const id = element["Case Number"].split("/").join("");
		// const id = element.target[11].value.split("/").join("");
		// const imageRef = storageRef(storage, `children/${id}`);
		// let dt = new Date();
		// dt.setMonth(dt.getMonth()+1);
		// console.log(dt);
		// uploadBytes(imageRef, imageUpload)
    //   .then((snapshot) => {
    //     getDownloadURL(snapshot.ref)
    //       .then((url) => {
		// 	db.collection("children").doc(id).set({
		// 		"Name": element.target[1].value,
		// 		"Gender": element.target[2].value,
		// 		"Date Of Birth": element.target[3].value,
		// 		"Age": element.target[4].value,
		// 		"Child Category":element.target[5].value,
		// 		"Image": url,
		// 		"State": element.target[7].value,
		// 		"District": element.target[8].value,
		// 		"Home": element.target[9].value,
		// 		"Case Number": element.target[11].value,
		// 		"Reason For Admission": element.target[12].value,
		// 		"Reason For Flagging": element.target[13].value,
		// 		"Last Visit Since": element.target[14].value,
		// 		"Last Call Since": element.target[15].value,
		// 		"Guardian": element.target[16].value,
		// 		"Sibling": element.target[17].value,
		// 		"Total Shelter Home Stay": element.target[18].value,
		// 		// "CWC Last Review": element.target[19].value,
		// 		// "Last CWC Order": element.target[20].value,
		// 		"Case History": element.target[19].value,
		// 		// "Documents Completed": element.target[23].value,
		// 		// "Documents Pending": element.target[24].value,
		// 		// "News Paper Publications Pending": element.target[25].value,
		// 		// "Police Report Pending": element.target[26].value,
		// 		// "Surrender Pending": element.target[27].value,
		// 		// "Status": element.target[28].value
		// 	}).then(() => {
		// 		console.log("Document successfully written with ID: ", id);
		// 		// Create an entry in the Realtime Database for the child profile
		// 		// database
		// 		//   .ref("childProfile/" + id)
		// 		//   .set({
		// 		// 	AssignStatus: "Not Assigned",
		// 		// 	WorkerID: "",
		// 		// 	ManagerID: "",
		// 		// 	Deadline: dt.toISOString().substring(0, 10) // ISO can also be used
		// 		//   });

		// 		   	database.ref(`cases/comments/` + id ).set({
    //         			Worker: ["Start"],
    //         		 	Manager: ["Start"],
    //       			 });
		// 	  })
		// 	  .catch((error) => {
		// 		console.error("Error writing document: ", error);
		// 	  });
    //       })
		// console.log(user);   
      // })


							{/* <AccordionHeader targetId="3">Section-3</AccordionHeader>
							<AccordionBody accordionId="3">
							<FormGroup row>
								<Label for="docscomp" sm={2}>Documents Completed</Label>
								<Col sm={10}>
									<Input id="docscomp" name="docscomp" placeholder="Documents Completed" type="text"/></Col>
							</FormGroup>
							<FormGroup row>
								<Label for="docspend" sm={2}>Documents Pending</Label>
								<Col sm={10}>
									<Input id="docspend" name="docspend" placeholder="Documents Pending" type="text"/></Col>
							</FormGroup>
							<FormGroup row>
								<Label for="newspend" sm={2}>News Paper Publications Pending</Label>
								<Col sm={10}>
									<Input id="newspend" name="newspend" placeholder="News Paper Publications Pending" type="text"/></Col>
							</FormGroup>
							<FormGroup row>
								<Label for="policepend" sm={2}>Police Report Pending</Label>
								<Col sm={10}>
									<Input id="policepend" name="policepend" placeholder="Police Report Pending" type="text"/></Col>
							</FormGroup>
							<FormGroup row>
								<Label for="surrenderpend" sm={2}>Surrender Pending</Label>
								<Col sm={10}>
									<Input id="surrenderpend" name="surrenderpend" placeholder="Surrender Pending" type="text"/></Col>
							</FormGroup>
							<FormGroup row>
								<Label for="status" sm={2}>Status</Label>
								<Col sm={10}>
								<Input id="status" name="status" type="select" >
										<option>Not Assigned</option>	
										<option>Assigned</option>
										<option>Completed </option>
									</Input>
								</Col>
							</FormGroup>
					</AccordionBody> */}
												{/* <FormGroup row>
								<Label for="cwclr" sm={2}>CWC Last Review</Label>
								<Col sm={10}>
									<Input id="cwclr" name="cwclr" placeholder="CWC last review" type="date"/></Col>
							</FormGroup>
							<FormGroup row>
								<Label for="cwclo" sm={2}>Last CWC Order</Label>
								<Col sm={10}>
									<Input id="cwclo" name="cwclo" placeholder="CWC last order" type="text"/></Col>
							</FormGroup> */}