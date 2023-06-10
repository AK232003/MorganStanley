import { React, useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowAltCircleRight } from "react-icons/fa";
import AssignedList from "./AssignedList";
import { Button } from "reactstrap";
import NavBar from "../Navbar";

const GroundWorkerDashboard = ({ user, setuser, id, setId }) => {
  const navigate = useNavigate();
  const [open,setOpen] =useState(false);
	const [openSide, toggle] = useState(true);
	const handleToggle=()=>{
    if(!open) toggle(!openSide); 
    open?setOpen(false):setOpen(open);
  }
  const handleLogout= ()=>{
    localStorage.setItem('user',null);
    setuser(null);
    setId(null);
    navigate("/");
  }
  useEffect(() => {
    if (user !== "GroundWorker") navigate("/");
    console.log(user, id)
  }, [user]);
  return (
    <>
    <NavBar user={"/"+user} open={open} setOpen={(value)=>setOpen(value)} toggle={toggle}/>
    <div className="container m-auto">
      <div className="row justify-between">
        {/* <div className="text-textcolor justify-self-start rounded-1 bg-color3 px-1 sm:px-3 py-1 drop-shadow-md "> */}
        <div className="col-auto font-sans text-justify align-text-bottom fw-bold text-2xl sm:text-4xl mt-4">
          GroundWorker Dashboard
        </div>
        <div className="col-auto align-self-end">
        <Button onClick={()=>handleLogout()}  className="!bg-logoutButton ">
                <span><FaArrowAltCircleRight className="text-3xl text-textcolor block float-left"></FaArrowAltCircleRight></span>
                <span className="text-base font-medium ms-2  text-textcolor">Logout</span> </Button>
        </div>
      </div>
        <AssignedList id={"groundWorker Id will be passed here"}/>
    </div>
    </>
  );
};
export default GroundWorkerDashboard;
