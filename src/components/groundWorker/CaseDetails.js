import React, {useState,useEffect} from "react";
import { Outlet, useLocation,useNavigate } from "react-router-dom";
import {GiCheckMark} from 'react-icons/gi'
import img from "../../profile.webp";
import { Card, } from "reactstrap";
import { database, db, storage } from "../../firebase";

const ViewProfile = ({ user, id }) => {
  const { state } = useLocation();
	const location=useLocation();
  const [child, setChild] = useState(state);
  const [deadLine, setDeadLine] = useState("");
  const [keys, setKeys] = useState(Object.keys(child));
  const [step, setStep] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    if (user !== "GroundWorker") navigate("/");
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

  return (
    <div className="overflow-y-auto bg-color2">
			{ location.pathname.split("/").length===4 &&
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
        </Card>
}
				<Outlet/>
    </div>
  );
};

export default ViewProfile;
