import React, {useState,useEffect} from "react";
import { useLocation,useNavigate } from "react-router-dom";
import {GiCheckMark} from 'react-icons/gi'
import { FaRegClock } from "react-icons/fa";
import img from "../../profile.webp";
import { Card, } from "reactstrap";
import { database, db, storage } from "../../firebase";
import html2pdf from 'html2pdf.js';
import { t } from "i18next";

const ChildProfile = ({ user, id }) => {
  const { state } = useLocation();
  const [child, setChild] = useState(state["children"]);
  const [deadLine, setDeadLine] = useState("");
  const [keys, setKeys] = useState(Object.keys(child));
  const [steps, setSteps] = useState(0);
  const [stepKey,setStepkey] =useState(null)
  const navigate = useNavigate();
  const pdfGenerate = () => {
    const element = document.getElementById('profilePDF');
    const options = {
      margin: 0,
      filename: 'profile.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'pt', format: 'a4', orientation: 'portrait' },
      autoPaging: true
    };
  
    html2pdf().set(options).from(element).save();
  };
  useEffect(() => {
    if (user !== "CaseManager") navigate("/");
    console.log("Hi there");
    console.log(child["id"])
    db.collection("caseProcesses").doc(child["id"]).get().then((doc)=>{
      setSteps(doc.data())
      setStepkey(Object.keys(steps))
    } 
    )
    // Set Setps Completed in the Process
    // --------------------------------
    // database
    //   .ref(`cases/Process/` + child["id"] + "/isComplete/")
    //   .on("value", (snapshot) => {
    //     console.log("Steps Completed", snapshot.val());
    //     setStep(snapshot.val());
    //   });
    // // ---------------------------------

    // //  Set Deadline From Database
    // //  -----------------------
    // database
    //   .ref(`cases/DeadLine/` + child["id"] + "/DeadLine")
    //   .on("value", (snapshot) => {
    //     setDeadLine(snapshot.val());
    //     console.log("DeadLine", snapshot.val());
    //   });
    // -----------------------
  }, [child]);

  return (
    <div>
    <div className="overflow-y-auto bg-color2" >
      <Card
        body
        className=" md:!flex-row !bg-color5/[0.6] m-2 md:p-5 mt-4"
        style={{ boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.2)" }}
        id="profilePDF"
      >
        <div className="mt-3">
          <div className="row justify-content-between">
            <h1 className="col-6 col-sm-9 p-2 m-2"> Child Details for {child["id"]}</h1>
            <img className="col-4 col-sm-2 w-20 h-30" alt="Child Photo" src={child["Image"]!==null?child["Image"]:img} />
          </div>
          <ul type="unstyled" className="p-0">
            {child !== undefined &&
              keys.map((key) => {
                if(key==="Image") return;
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
              <strong className="w-1/3"> {t('Deadline')}:</strong>{" "}
              <div className="w-2/3">{deadLine}</div>
            </li>
          </ul>
          <div className="mt-4 p-2">
            <strong>{t('Steps Completed')}:</strong>
            <ul>
            {stepKey &&
              stepKey.forEach((step) =>{
                console.log(step)
                return (<li>
                  <div>
                    {steps[step]}
                  </div>
                    <div>
                      <div>Document Link: <a href={steps[step["Docs"]]}>Link</a></div>
                      <div>Status: {steps[step["Status"]]==="Completed"?<span><GiCheckMark className="text-3xl text-green-500 block float-right align-self-end"></GiCheckMark></span>
                  :<span><FaRegClock className="text-3xl text-yellow-500 block float-right align-self-end"></FaRegClock></span> }</div>
                      <div>Report: {steps[step["text"]]}</div>
                    </div>
                </li>)
              })}
              </ul>
          </div>
        </div>
        </Card>
    </div>
    <div className=" md:!flex-row m-2 sm:p-2 mt-2">
    <button className="p-2 rounded-3 bg-buttonColor text-white w-full sm:w-1/3 md:w-1/4 " onClick={pdfGenerate}>Download Report PDF</button>
    </div>
</div>
  );
};

export default ChildProfile;
