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
  Button,
} from "reactstrap";
import { getDownloadURL, ref as storageRef, uploadBytes } from "firebase/storage";
import { database, db, storage } from "../../firebase";
const Report=() => {
  const location = useLocation();
  const [type, setType] = useState(location.pathname.split("/")[5]);
  const [step, setStep] = useState("");
  const [msg, setMsg] = useState("");
  const [newsReportText, setNewsReportText] = useState("");
  const [comments, setComments] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState("Loading");
  const id = location.pathname.split("/")[3];
  const [imageUpload, setImageUpload] = useState(null);
  const mapOfTypes = new Map();
  mapOfTypes.set("newsPaperReport", ["Newspaper Report", "Step1"]);
  mapOfTypes.set("TVReport", ["TV Report", "Step2"]);
  mapOfTypes.set("fileMisingReport", ["File Missing Report", "Step3"]);
  mapOfTypes.set("medicalReport", ["Medical Report", "Step4"]);
  mapOfTypes.set("siReport", ["SI Report", "Step5"]);

  const [substep, setSubStep] = useState(1);

  useEffect(() => {
    const ref = database.ref("childProfile"+`${id}`)
    setType(location.pathname.split("/")[5]);
    console.log(location)
    // setStep(mapOfTypes.get(type)[1]);
    // database.ref("childProfile/" + `${id}`).on("value", (snapshot) => {
    //   setStatus(snapshot.val()[step]);
    //   setMsg(snapshot.val()["ManagerMessage"]);
    // });
  }, [location]);
  const handleSubmitInformation = (e) => {
    e.preventDefault();
    setStep(1);
    setSubStep(1);

    console.log(newsReportText);
    console.log(comments)

    // const imageRef = storageRef(
    //   storage,
    //   `documents/${id}/NewsPublicationReport`
    // );

    // uploadBytes(imageRef, imageUpload)
    //   .then((snapshot) => {
    //     getDownloadURL(snapshot.ref)
    //       .then((url) => {
    //         db.collection("task")
    //           .doc(id + step.toString() + substep.toString())
    //           .set({
    //             "Photo Publication Report": url,
    //             "Photo Publication Text": e.target[0].value,
    //           })
    //           .then(() => {
    //             if (step === 1) {
    //               database
    //                 .ref(`cases/Process/` + id + `/Step1/Step`+`${substep}`)
    //                 .update({
    //                   isComplete: false,
    //                   text: id + step.toString() + substep.toString(),
    //                   docs: url,
    //                   stat: "In Review",
    //                 });
    //             } else {
    //               database.ref(`cases/Process/` + id + `/Step`+`${step}`).update({
    //                 isComplete: false,
    //                 text: id + step.toString() + "0",
    //                 docs: url,
    //                 stat: "In Review",
    //               });
    //             }
    //           })
    //           .catch((error) => {
    //             console.error("Error creating document: ", error);
    //           });
    //       })
    //       .catch((error) => {
    //         console.error("Error getting download URL: ", error);
    //       });
    //   })
    //   .catch((error) => {
    //     console.error("Error uploading bytes: ", error);
    //   });

    // // database.ref("childProfile/" + `${id}`).update({ [step]: "In Progress" });
    // // database.ref("childProfile/" + `${id}`).on("value", (snapshot) => {
    // //   setStatus(snapshot.val()[step]);
    // // });
    // console.log("Success!")
    setSubmitted(true);
  };

  // Comment Section(wId to be changed with the current workerId)
  // ----------------------------------
  const handleComment = (e) => {
    e.preventDefault();

    console.log(e.target[0].value);
    // database
    //   .ref(`cases/comments/` + id + `/Worker`)
    //   .once("value", (snapshot) => {
    //     const existingArray = snapshot.val() || [];

    //     const newArray = [
    //       ...existingArray,
    //       e.target[0].value + "@" + "wID" + "@" + new Date().toString(),
    //     ];

    //     database.ref(`cases/comments/` + id + `/Worker`).set(newArray);
    //   });
  };
  // ---------------------------------------

  return (
    <div className="w-95 md:w-3/5 bg-sideBarColor1  rounded-1 mx-2 md:ms-3 mt-3 md:me-0 drop-shadow-xl shadow-xl opacity-90 hover:shadow-sideBarColor1 hover:opacity-100 sm:block align-items-center justify-content-center overflow-y-scroll"> 
      <div className="row mt-3 m-2 w-95">
        <div className="col p-0 font-bold text-3xl">
          {" "}
          {mapOfTypes.get(type)[0]}
        </div>
        <div className="col-auto p-0"></div>
        <div className="font-medium bg-color2 justify-self-center p-2">
          {status}
        </div>
      </div>

      <div className="row m-2 mt-3 w-95">
        <Card className="my-4">
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
                    rows={3}
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

              <Button
                className="bg-color3 border-none text-textcolor"
                type="submit"
              >
                Submit
              </Button>
            </Form>

            {submitted && (
              <div className="mt-4">
                <h6>Your event report has been submitted.</h6>
                {/* Additional logic or message for submitted form */}
              </div>
            )}
          </CardBody>
        </Card>

        <Card className="my-4">
          <CardBody>
            <CardTitle tag="h5">Manager Message:</CardTitle>
            <CardSubtitle className="mb-3">{"HI"}</CardSubtitle>

            <Form onSubmit={handleComment}>
              <FormGroup>
                <Label for="comments">Comments:</Label>
                <Input
                  type="textarea"
                  name="comments"
                  id="comments"
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  placeholder="Enter your comments"
                  rows={3}
                />
              </FormGroup>

              <Button
                className="bg-color3 border-none text-textcolor"
                type="submit"
              >
                Submit
              </Button>
            </Form>

            {submitted && (
              <div className="mt-4">
                <h6>Your comment has been submitted.</h6>
                {/* Additional logic or message for submitted form */}
              </div>
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

export default Report;
