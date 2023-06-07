import { React, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AssignedList from "./AssignedList";


const GroundWorkerDashboard = ({ user }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (user !== "groundWorker") navigate("/");
  }, [user]);
  return (
    <div className="container m-auto">
      <div className="row">
        {/* <div className="text-textcolor justify-self-start rounded-1 bg-color3 px-1 sm:px-3 py-1 drop-shadow-md "> */}
        <div className="font-sans text-justify align-text-bottom fw-bold text-2xl sm:text-4xl mt-4">
          GroundWorker Dashboard
        </div>
      </div>
        <AssignedList id={"groundWorker Id will be passed here"}/>
    </div>
  );
};
export default GroundWorkerDashboard;
