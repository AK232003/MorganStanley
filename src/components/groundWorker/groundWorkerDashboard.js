import { React, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowAltCircleRight } from "react-icons/fa";
import AssignedList from "./AssignedList";
import { Button } from "reactstrap";

const GroundWorkerDashboard = ({ user, setuser }) => {
  const navigate = useNavigate();
  const handleLogout= ()=>{
    // document.cookie="user=; expires="+ new Date(-99).toUTCString();
    setuser(null);
    navigate("/");
  }
  useEffect(() => {
    if (user !== "groundWorker") navigate("/");
  }, [user]);
  return (
    <div className="container m-auto">
      <div className="row">
        {/* <div className="text-textcolor justify-self-start rounded-1 bg-color3 px-1 sm:px-3 py-1 drop-shadow-md "> */}
        <div className="col-auto font-sans text-justify align-text-bottom fw-bold text-2xl sm:text-4xl mt-4">
          GroundWorker Dashboard
        </div>
        <div className="col-auto align-self-end justify-self-end">

        <Button onClick={()=>handleLogout()}  className="!bg-color4">
                <span><FaArrowAltCircleRight className="text-3xl text-textcolor block float-left"></FaArrowAltCircleRight></span>
                <span className="text-base font-medium ms-2  text-textcolor">Logout</span> </Button>
        </div>
      </div>
        <AssignedList id={"groundWorker Id will be passed here"}/>
    </div>
  );
};
export default GroundWorkerDashboard;
