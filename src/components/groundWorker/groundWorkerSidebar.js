import { React, useEffect, useState } from "react";
import { FaLongArrowAltLeft } from "react-icons/fa";
import {TbCircleNumber1,TbCircleNumber2,TbCircleNumber3,TbCircleNumber4} from "react-icons/tb"
import { Link, useNavigate, useLocation } from "react-router-dom";
import { GiCheckMark } from "react-icons/gi";
import { FaClipboardList } from "react-icons/fa";
import logo from "../../logo_scroll.png";
import { database, db, storage } from "../../firebase";

const GroundWorkerSidebar = ({
  user,
  setuser,
  open,
  handdleToggle,
  openSide,
  id, 
  setId,
}) => {
  const [status, setStatus] = useState(4);
  const navigate=useNavigate();
  const location = useLocation().pathname;
  const child=useLocation()["state"];
  const caseID=child["id"];
  const sideBarIconProperty = "flex flex-col text-lg text-textcolor bg-color3 rounded-1 p-2 items-center gap-x-4 mt-2 hover:bg-color6 cursor-pointer";
  const [active, setActive] = useState(
    location.split("/").length > 3 ? location.split("/")[4] : "step0"
  );
  const toggleAccordion = (id) => {
    if (active === id) setActive("step0");
    else setActive(id);
  };
  const handleStep2 = () => {
    alert("Hi Button Pressed");
    console.log(child);
  };
  useEffect(() => {
    database.ref("childProfile/RB123/status").on("value", (snapshot) => {
      setStatus(snapshot.val());
      console.log(snapshot.val());
    });
  }, [location, child]);
  return (
    <>
        {user === "GroundWorker" && (
          <ul className="pt-2 ps-0">
            
            {/* Step-1 Button */}
            <li className="text-xl text-textcolor bg-color3 rounded-1 p-2 flex items-center gap-x-4 mt-2 hover:bg-color6 cursor-pointer" onClick={()=>navigate("/groundWorker/caseDetails")} >
                <span><FaLongArrowAltLeft className="text-3xl text-textcolor block float-left"></FaLongArrowAltLeft></span>
                <span className={`text-base font-medium flex-1 ${!openSide && "hidden"}`}>Back</span>
              </li>
              <li className={sideBarIconProperty}>
              <div onClick={() => {toggleAccordion("0");navigate(`/groundWorker/caseDetails/${child["id"]}`,{state: child}) }} className={`${openSide ?`h-auto`:"h-8"} text-center` }>
                <span>  <FaClipboardList className="text-3xl text-textcolor block float-left"></FaClipboardList> </span>
                <span className={`text-base font-medium ms-2 ${ !openSide && "hidden" }`}>
                   View Case Details And Report
                </span>
              </div>
            </li>
            <li className={sideBarIconProperty}>
              <div onClick={() => toggleAccordion("step1")} className={`${openSide ?`h-auto`:"h-8"} text-center` }>
                <span>  <TbCircleNumber1 className="text-3xl text-textcolor block float-left"></TbCircleNumber1> </span>
                <span className={`text-base font-medium ms-2 ${ !openSide && "hidden" }`}>
                  Step-1: Document Completition 
                </span>
              </div>
              <div>
                {active === "step1" && openSide && (
                  <ul className="pt-1 text-base font-medium">
                    <li>
                        <button className="flex-column justify-items-start bg-color2/[0.6] m-1  p-1 w-95 rounded-2 text-textcolor" onClick={()=>navigate(`/groundWorker/caseDetails/${child["id"]}/step1/newsPaperReport`,{state: child})}>
                          News Paper Report
                          {
                            <span>
                              <GiCheckMark className="text-base text-green-500 block float-right align-self-end"></GiCheckMark>
                            </span>
                          }{" "}
                          {/* get status accordingly*/}
                        </button>
                    </li>
                    <li>
                        <button className="flex-column justify-items-start bg-color2/[0.6] m-1  p-1 w-95 rounded-2 text-textcolor" onClick={()=>navigate(`/groundWorker/caseDetails/${child["id"]}/step1/TVReport`,{state: child})}>
                          TV Report
                          {
                            <span>
                              <GiCheckMark className="text-base text-green-500 block float-right align-self-end"></GiCheckMark>
                            </span>
                          }{" "}
                          {/* get status accordingly*/}
                        </button>
                    </li>
                    <li>
                        <button className="flex-column justify-items-start bg-color2/[0.6] m-1  p-1 w-95 rounded-2 text-textcolor" onClick={()=>navigate(`/groundWorker/caseDetails/${child["id"]}/step1/fileMisingReport`,{state: child})}>
                          File Missing Report
                          {
                            <span>
                              <GiCheckMark className="text-base text-green-500 block float-right align-self-end"></GiCheckMark>
                            </span>
                          }{" "}
                          {/* get status accordingly*/}
                        </button>
                    </li>
                    <li>
                        <button className="flex-column justify-items-start bg-color2/[0.6] m-1  p-1 w-95 rounded-2 text-textcolor" onClick={()=>navigate(`/groundWorker/caseDetails/${child["id"]}/step1/medicalReport`,{state: child})}>
                          Medical Report
                          {
                            <span>
                              <GiCheckMark className="text-base text-green-500 block float-right align-self-end"></GiCheckMark>
                            </span>
                          }{" "}
                          {/* get status accordingly*/}
                        </button>
                    </li>
                    <li>
                        <button className="flex-column justify-items-start bg-color2/[0.6] m-1  p-1 w-95 rounded-2 text-textcolor" onClick={()=>navigate(`/groundWorker/caseDetails/${child["id"]}/step1/siReport`,{state: child})}>
                          SI Report
                          {
                            <span>
                              <GiCheckMark className="text-base text-green-500 block float-right align-self-end"></GiCheckMark>
                            </span>
                          }{" "}
                          {/* get status accordingly*/}
                        </button>
                    </li>
                  </ul>
                )}
              </div>
            </li>
            {/* Step-2 Button */}
            <li className={sideBarIconProperty}>
              <div onClick={() =>{toggleAccordion("step2");navigate(`/groundWorker/caseDetails/${child["id"]}/step2`,{state: child}) }} className={`${openSide ?`h-auto`:"h-8"} text-center` }> {/* get status and make it status==true?toggleAccordion("step2"):"" */}
                <span>  <TbCircleNumber2 className="text-3xl text-textcolor block float-left"></TbCircleNumber2> </span>
                <span className={`text-base font-medium ms-2 ${ !openSide && "hidden" }`}>
                  Step-2: Get NOC Certificate 
                </span>
              </div>
            </li>

            {/* Step-3 Button */}
            <li className={sideBarIconProperty}>
              <div onClick={() => {toggleAccordion("step3");navigate(`/groundWorker/caseDetails/${child["id"]}/step3`,{state: child}) }} className={`${openSide ?`h-auto`:"h-8"} text-center` }>
                <span>  <TbCircleNumber3 className="text-3xl text-textcolor block float-left"></TbCircleNumber3> </span>
                <span className={`text-base font-medium ms-2 ${ !openSide && "hidden" }`}>
                  Step-3: Get LFA Certificate 
                </span>
              </div>
            </li>

            {/* Step-4 Button */}
            <li className={sideBarIconProperty}>
              <div onClick={() => {toggleAccordion("step4");navigate(`/groundWorker/caseDetails/${child["id"]}/step4`,{state: child}) }} className={`${openSide ?`h-auto`:"h-8"} text-center` }>
                <span>  <TbCircleNumber4 className="text-3xl text-textcolor block float-left"></TbCircleNumber4> </span>
                <span className={`text-base font-medium ms-2 ${ !openSide && "hidden" }`}>
                  Step-4: Upload Child to CARINGS
                </span>
              </div>
            </li>
          </ul>
        )}
    </>
  );
};

export default GroundWorkerSidebar;
