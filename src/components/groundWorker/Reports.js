import React, {useEffect, useState} from "react";
import {  useLocation } from "react-router-dom";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Form,
  FormGroup,
  Col,
  Label,
  Input,
  Button, Modal, ModalHeader, ModalBody
} from "reactstrap";
import { getDownloadURL, ref as storageRef, uploadBytes } from "firebase/storage";
import { FieldValue, arrayUnion, getDocs, getDoc, updateDoc, doc, getFirestore, collection, setDoc } from "firebase/firestore";
import { database, db, storage } from "../../firebase";
const Report=({stepType}) => {
  const location = useLocation();
  const [type, setType] = useState(stepType===1?location.pathname.split("/")[5]:stepType);
  const [modal, setModal] = useState(false);
  const toggleModal = () => {
    setModal(!modal);
  };

  const [workerComments, setWorkerComments] = useState([]);
  const [workerTime, setWorkerTime] = useState([]);
  const [newsReportText, setNewsReportText] = useState("");
  const [managerComments, setManagerComments] = useState("");
  const [managerTime, setManagerTime] = useState([]);
  const [comments, setComments] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState("Loading");
  const id = location.pathname.split("/")[3];
  const [imageUpload, setImageUpload] = useState(null);
  const mapOfTypes = new Map();
  mapOfTypes.set("newsPaperReport", ["Newspaper Report", "Step1","NPR"]);
  mapOfTypes.set("TVReport", ["TV Report", "Step2","TVR"]);
  mapOfTypes.set("fileMisingReport", ["File Missing Report", "Step3","FMR"]);
  mapOfTypes.set("medicalReport", ["Medical Report", "Step4","MR"]);
  mapOfTypes.set("siReport", ["SI Report", "Step5","TVR"]);
  mapOfTypes.set("finalPoliceReport", ["Final Police Report", "Step6","FPR"]);
  mapOfTypes.set("PDC", ["Parent's Death Certificate", "Step7","PDC"]);
  mapOfTypes.set("orphanCertificate", ["Orphan Certificate", "Step8","OC"]);
  mapOfTypes.set("gtReport", ["Guardian Trace Report", "Step9","GTR"]);
  mapOfTypes.set("surrenderDeed",["Surrender Deed","Step1","SurrenderDeed"])
  mapOfTypes.set(2,["NOC","Step2","NOC"])
  mapOfTypes.set(3,["LFA","Step3","LFA"])
  mapOfTypes.set(4,["CARINGS upload","Step4","Carings"])

  useEffect(() => {
    setType(stepType===1?location.pathname.split("/")[5]:stepType);
    console.log(location.pathname.split("/"))
    console.log(stepType,type);
    // setStep(mapOfTypes.get(type)[1]);
    db.collection(`caseProcesses`).doc(`${id}`).get().then((doc)=>{
      
      let temp1=stepType;
      if(stepType===1){temp1=type; }
      else temp1=stepType;
      console.log(temp1);
      console.log(doc.data(),mapOfTypes.get(temp1)[2])
      console.log(doc.data()[mapOfTypes.get(temp1)[2]])
      if(doc.data()){
        let temp=doc.data()[mapOfTypes.get(temp1)[2]]["Status"]
        if(temp){
          setStatus(temp);
        }
        else{
          setStatus("Not Available")
        }
      }
      else{
        setStatus("Not Available")
      }
    })
    
    db.collection("caseComments").doc(`${id}`).get().then((doc)=>{
      console.log(doc.data())
      if(doc.data()){
        setWorkerComments(doc.data()["WorkerComment"])
        setWorkerTime(doc.data()["WorkerTime"])
        setManagerComments(doc.data()["ManagerComment"])
        setManagerTime(doc.data()["ManagerTime"])
        console.log(workerComments,managerComments)
      }
      else{
        setComments("Not Available");
      }
    })
  }, [location]);
  const handleSubmitInformation = (e) => {
    e.preventDefault();
    const step=mapOfTypes.get(type)[2];
    console.log(step)

    console.log(newsReportText);
    console.log(comments)

    const imageRef = storageRef(
      storage,
      `documents/${id}/${step}`
    );

    uploadBytes(imageRef, imageUpload)
      .then((snapshot) => {
        getDownloadURL(snapshot.ref)
          .then((url) => {
            db.collection("task")
              .doc(id+"-" + step)
              .set({
                  Docs: url,
                  Status: "Review",
                  Text:  e.target[0].value,
                  isComplete: false,
              })
              .then(() => {
                console.log("task added!")
                setSubmitted(true);
                alert(`${step} Report Added!`)
              })
              .catch((error) => {
                console.error("Error creating document: ", error);
              });
          })
          .catch((error) => {
            console.error("Error getting download URL: ", error);
          });
      })
  };

  // Comment Section(wId to be changed with the current workerId)
  // ----------------------------------
  const handleComment = (e) => {
    e.preventDefault();
    var date = new Date();
    var docRef = db.collection("caseComments").doc(id);
    docRef.update({
        WorkerComment: arrayUnion(e.target[0].value),
        WorkerTime: arrayUnion(date),
      }).then(() => {
        console.log("Reply Sent Succesfully!");
        // alert{"Comment added"}
      })
      .catch((error) => {
        alert("Error sending comment:", error);
      });
  };
  // ---------------------------------------

  return (
    <div className="bg-sideBarColor1 rounded-1 mx-2 md:ms-3 mt-3 md:me-0 drop-shadow-xl shadow-xl opacity-90 hover:shadow-sideBarColor1 hover:opacity-100 sm:block align-items-center justify-content-center overflow-y-scroll"> 
      <div className="row mt-3 m-2 w-95">
        <div className="col-9 p-0 font-bold text-3xl">
          {" "}
          {mapOfTypes.get(type)[0]}
        </div>
        <div className="col-3 p-2 rounded-2 font-medium bg-color2 ">
          {status}
        </div>
      </div>

      <div className="row m-2 my-4 mt-3 bg-sideBarColor1 w-max-fit">
          <CardBody>
            <CardTitle tag="h5">Event Report:</CardTitle>
            <Form onSubmit={handleSubmitInformation}>
              <FormGroup row>
                <Label for="newsreporttext" sm={2}>
                  Report:
                </Label>
                <div className="col-sm-10">
                  <Input
                    type="textarea"
                    name="newsreporttext"
                    id="newsreporttext"
                    value={newsReportText}
                    onChange={(e) => setNewsReportText(e.target.value)}
                    placeholder="Enter news report text"
                    rows={10}
                  />
                </div>
              </FormGroup>

              <FormGroup row>
                <Label for="image" sm={2}>
                  Files:
                </Label>
                <div className="col-sm-10">
                  <Input
                    type="file"
                    name="image"
                    id="image"
                    onChange={(e) => {
                      setImageUpload(e.target.files[0]);
                    }}
                  />
                </div>
              </FormGroup>
              <div className="flex justify-between">

              <Button
                className="!bg-buttonColor !border-none text-textcolor"
                type="submit"
                >
                Submit
              </Button>
            <Button className="!bg-buttonColor !border-none text-textcolor" onClick={()=>toggleModal()}>
                    View and Add Comments
            </Button>
              </div>
            </Form>
          </CardBody>

          <Modal centered isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>
          Comments for tasks related to {location.pathname.split("/")[3]}.
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={(event) => handleComment(event)}>
            Comments History: {comments}. 
            <div>
              {managerComments && managerComments.map((comment)=> comment)}
            </div>
            <div>
              Worker Comments. {`\n`}
              {workerComments && workerComments.map((comment)=> comment)}
            </div>
            <FormGroup row>
              <Label for="mid" sm={2}>
                {" "}
                Manager id{" "}
              </Label>
              <Col sm={10}>
                <div> Manager message</div>
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
      </div>
    </div>
  );
}

export default Report;
