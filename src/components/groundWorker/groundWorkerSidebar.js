import { React, useEffect, useState } from "react";
import { FaBars, FaArrowAltCircleRight } from "react-icons/fa";
import {TbCircleNumber1,TbCircleNumber2,TbCircleNumber3,TbCircleNumber4} from "react-icons/tb"
import { Link, useNavigate, useLocation } from "react-router-dom";
import { GiCheckMark } from "react-icons/gi";
import logo from "../../logo_scroll.png";
import { database, db, storage } from "../../firebase";

const GroundWorkerSidebar = ({
  user,
  setuser,
  child,
  open,
  handdleToggle,
  openSide,
  id, 
  setId,
}) => {
  const [status, setStatus] = useState(4);
  const navigate = useNavigate();
  const location = useLocation().pathname;
  const sideBarIconProperty = "text-lg text-textcolor bg-color3 rounded-1 p-2 flex items-center gap-x-4 mt-2 hover:bg-color6 cursor-pointer";
  const logoutIconProperty = `${openSide ? "w-64" : "w-24"} absolute bottom-0 text-xl text-logoutContent duration-300 bg-logoutButton rounded-0 p-3 items-center bg-logoutButton cursor-pointer justify-items-center align-self-center`;
  const sideIconProperty = `${openSide ? "w-64" : "w-24"} h-16 text-xl text-color2 duration-300 bg-sideBarColor2 rounded-0 p-2 items-center bg-sideBarColor2 cursor-pointer justify-items-center`;
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
  const handleLogout = () => {
    localStorage.setItem('user',null);
    setuser(null);
    setId(null);
    navigate("/");
  };
  useEffect(() => {
    if (location.split("/").length > 3) setActive(location.split("/")[4]);
    database.ref("childProfile/RB123/status").on("value", (snapshot) => {
      setStatus(snapshot.val());
      console.log(snapshot.val());
    });
  }, [location, child]);
  return (
    <>
      <div
        className={`h-screen sm:h-9/10  ${openSide ? "w-64" : "w-24"} ${!open && "hidden"} 
        ${open && "w-1/2 opacity-100"} bg-sideBarColor1 duration-300 rounded-none md:relative  absolute md:top-14 top-0 opacity-100 hover:shadow-sideBarColor1 hover:opacity-100 md:block z-10`}>
        <div className={sideIconProperty}>
        <FaBars
          className={`md:!m-0 md:!ms-4 h-6 w-6 md:h-12 md:w-12 cursor-pointer top-1 text-sideBarColor1 duration-500 visible ${
            openSide && "rotate-[180deg]"
          }`} style={{margin: "0.5rem 1rem"}}
          onClick={() => handdleToggle()}
        ></FaBars>
        </div>
        <div className="px-4 pb-4 pt-3"> 
        {user === "GroundWorker" && (
          <ul className="pt-2 ps-0">
            {/* Step-1 Button */}
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
                      <Link
                        to="step1/newsPaperReport"
                        state={{ child: child }}
                        className="no-underline"
                      >
                        <button className="flex-column justify-items-start bg-color2/[0.6] m-1  p-1 w-95 rounded-2 text-textcolor">
                          News Paper Report
                          {
                            <span>
                              <GiCheckMark className="text-base text-green-500 block float-right align-self-end"></GiCheckMark>
                            </span>
                          }{" "}
                          {/* get status accordingly*/}
                        </button>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="step1/TVReport"
                        state={{ child: child }}
                        className="no-underline"
                      >
                        <button className="flex-column justify-items-start bg-color2/[0.6] m-1  p-1 w-95 rounded-2 text-textcolor">
                          TV Report
                          {
                            <span>
                              <GiCheckMark className="text-base text-green-500 block float-right align-self-end"></GiCheckMark>
                            </span>
                          }{" "}
                          {/* get status accordingly*/}
                        </button>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="step1/fileMisingReport"
                        state={{ child: child }}
                        className="no-underline"
                      >
                        <button className="flex-column justify-items-start bg-color2/[0.6] m-1  p-1 w-95 rounded-2 text-textcolor">
                          File Missing Report
                          {
                            <span>
                              <GiCheckMark className="text-base text-green-500 block float-right align-self-end"></GiCheckMark>
                            </span>
                          }{" "}
                          {/* get status accordingly*/}
                        </button>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="step1/medicalReport"
                        state={{ child: child }}
                        className="no-underline"
                      >
                        <button className="flex-column justify-items-start bg-color2/[0.6] m-1  p-1 w-95 rounded-2 text-textcolor">
                          Medical Report
                          {
                            <span>
                              <GiCheckMark className="text-base text-green-500 block float-right align-self-end"></GiCheckMark>
                            </span>
                          }{" "}
                          {/* get status accordingly*/}
                        </button>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="step1/siReport"
                        state={{ child: child }}
                        className="no-underline"
                      >
                        <button className="flex-column justify-items-start bg-color2/[0.6] m-1  p-1 w-95 rounded-2 text-textcolor">
                          SI Report
                          {
                            <span>
                              <GiCheckMark className="text-base text-green-500 block float-right align-self-end"></GiCheckMark>
                            </span>
                          }{" "}
                          {/* get status accordingly*/}
                        </button>
                      </Link>
                    </li>
                  </ul>
                )}
              </div>
            </li>
            {/* Step-2 Button */}
            <li className={sideBarIconProperty}>
              <div onClick={() => toggleAccordion("step2")} className={`${openSide ?`h-auto`:"h-8"} text-center` }> {/* get status and make it status==true?toggleAccordion("step2"):"" */}
                <span>  <TbCircleNumber2 className="text-3xl text-textcolor block float-left"></TbCircleNumber2> </span>
                <span className={`text-base font-medium ms-2 ${ !openSide && "hidden" }`}>
                  Step-2: Get NOC Certificate 
                </span>
              </div>
              <div>
                {active === "step2" && openSide && (
                  <ul className="pt-1 text-base font-medium">
                    <li>
                      <Link
                        to="step1/newsPaperReport"
                        state={{ child: child }}
                        className="no-underline"
                      >
                        <button className="flex-column justify-items-start bg-color2/[0.6] m-1  p-1 w-95 rounded-2 text-textcolor">
                          News Paper Report
                          {
                            <span>
                              <GiCheckMark className="text-base text-green-500 block float-right align-self-end"></GiCheckMark>
                            </span>
                          }{" "}
                          {/* get status accordingly*/}
                        </button>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="step1/TVReport"
                        state={{ child: child }}
                        className="no-underline"
                      >
                        <button className="flex-column justify-items-start bg-color2/[0.6] m-1  p-1 w-95 rounded-2 text-textcolor">
                          TV Report
                          {
                            <span>
                              <GiCheckMark className="text-base text-green-500 block float-right align-self-end"></GiCheckMark>
                            </span>
                          }{" "}
                          {/* get status accordingly*/}
                        </button>
                      </Link>
                    </li> 
                  </ul>
                )}
              </div>
            </li>

            {/* Step-3 Button */}
            <li className={sideBarIconProperty}>
              <div onClick={() => toggleAccordion("step3")} className={`${openSide ?`h-auto`:"h-8"} text-center` }>
                <span>  <TbCircleNumber3 className="text-3xl text-textcolor block float-left"></TbCircleNumber3> </span>
                <span className={`text-base font-medium ms-2 ${ !openSide && "hidden" }`}>
                  Step-3: Get LFA Certificate 
                </span>
              </div>
              <div>
                {active === "step3" && openSide && (
                  <ul className="pt-1 text-base font-medium">
                    <li>
                      <Link
                        to="step1/newsPaperReport"
                        state={{ child: child }}
                        className="no-underline"
                      >
                        <button className="flex-column justify-items-start bg-color2/[0.6] m-1  p-1 w-95 rounded-2 text-textcolor">
                          News Paper Report
                          {
                            <span>
                              <GiCheckMark className="text-base text-green-500 block float-right align-self-end"></GiCheckMark>
                            </span>
                          }{" "}
                          {/* get status accordingly*/}
                        </button>
                      </Link>
                    </li>
                  </ul>
                )}
              </div>
            </li>

            {/* Step-4 Button */}
            <li className={sideBarIconProperty}>
              <div onClick={() => toggleAccordion("step4")} className={`${openSide ?`h-auto`:"h-8"} text-center` }>
                <span>  <TbCircleNumber4 className="text-3xl text-textcolor block float-left"></TbCircleNumber4> </span>
                <span className={`text-base font-medium ms-2 ${ !openSide && "hidden" }`}>
                  Step-4: Upload Child to CARINGS
                </span>
              </div>
              <div>
                {active === "step4" && openSide && (
                  <ul className="pt-1 text-base font-medium">
                    <li>
                      <Link
                        to="step4/newsPaperReport"
                        state={{ child: child }}
                        className="no-underline"
                      >
                        <button className="flex-column justify-items-start bg-color2/[0.6] m-1  p-1 w-95 rounded-2 text-textcolor">
                          News Paper Report
                          {
                            <span>
                              <GiCheckMark className="text-base text-green-500 block float-right align-self-end"></GiCheckMark>
                            </span>
                          }{" "}
                          {/* get status accordingly*/}
                        </button>
                      </Link>
                    </li>
                  </ul>
                )}
              </div>
            </li>
          </ul>
        )}
        </div>
        <div className={logoutIconProperty} onClick={handleLogout} >
            <span><FaArrowAltCircleRight className="mx-3 mb-2 text-3xl text-logoutContent block float-left"></FaArrowAltCircleRight></span>
            <span className={`text-base font-medium flex-1 m-2 ${!openSide && "hidden"}`}>Logout</span>
          </div>
      </div>
    </>
  );
};

export default GroundWorkerSidebar;
