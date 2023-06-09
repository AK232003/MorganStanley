import {React,useEffect,useState} from "react";
import { FaBars, FaArrowAltCircleRight  } from 'react-icons/fa';
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../../logo_scroll.png";
import { Accordion,AccordionItem } from "reactstrap";
import { database, db, storage } from "../../firebase";

const GroundWorkerSidebar=({user,setuser,child,open,handdleToggle,openSide})=>{

  const [status, setStatus] = useState(4);
	const navigate=useNavigate();
	const location=useLocation().pathname;
  const sideBarIconProperty = "text-xl text-textcolor bg-color3/[0.2] rounded-1 p-2 flex items-center gap-x-4 mt-2 hover:bg-color4/[0.8] cursor-pointer";
  const logoutIconProperty = "text-xl text-textcolor bg-logoutButton rounded-1 p-2 flex items-center gap-x-4 mt-2 hover:bg-logoutButton/[0.8] cursor-pointer";
	const [active,setActive]=useState(location.split("/").length>=4?location.split("/")[4]:"0");
  console.log(active,location.split("/")[4],location.split("/").length>=4?location.split("/")[4]:"0")

  const toggleAccordion=(id)=>{
		if(active===id) setActive("0");
		else setActive(id);
	}
  	const handleStep2=()=>{
		alert("Hi Button Pressed");
		console.log(child)
  	}
	const handleLogout= ()=>{
    // document.cookie="user=; expires="+ new Date(-99).toUTCString();
    	setuser(null);
    	navigate("/");
  	}
	useEffect(()=>{
    let tempArr = location.split("/");
    if (tempArr.length > 4) {
      setActive(Number(tempArr[4][4]));
    }
	database.ref("childProfile/RB123/status").on('value',(snapshot)=>{
			setStatus(snapshot.val())
			console.log(snapshot.val())
		})
	},[location, child])
	return (
    <>
      <div
        className={`h-screen sm:h-9/10 px-4 pb-4 pt-3 ${
          openSide ? "w-72" : "w-24"
        } ${!open && "hidden"} ${
          open && "w-1/2 opacity-100"
        } bg-sideBarColor1 duration-300 rounded-1 md:relative absolute md:top-14 top-0 drop-shadow-2xl shadow-2xl opacity-90 hover:shadow-sideBarColor1 hover:opacity-100 md:block z-10`}
      >
        <FaBars
          className={`h-12 w-12 cursor-pointer top-1 text-textcolor duration-500 visible ${
            openSide && "rotate-[180deg]"
          }`}
          onClick={() => handdleToggle()}
        ></FaBars>
        {openSide && (
          <img
            alt="logo"
            src={logo}
            height="40"
            width="100%"
            className="pt-4"
          ></img>
        )}
          <Accordion className="pt-2 ps-0">
            {/* Step-1 Button */}
            <ul>
              <AccordionItem
            className={sideBarIconProperty}
                onClick={() => toggleAccordion("1")}>
              <li >
                <span>
                  <FaArrowAltCircleRight className="text-3xl text-textcolor block float-left"></FaArrowAltCircleRight>
                </span>
                <span
                  className={`text-base font-medium ms-2 ${
                    !openSide && "hidden"
                  }`}
                >
                  Step-1: Document Completion
                </span>
                {active === "step1" && openSide && (
                  <ul className="pt-1 text-base font-medium">
                    <li>
                      <Link
                        to="step1/newsPaperReport"
                        state={{ child: child }}
                        className="no-underline"
                      >
                        <button className="flex-column justify-items-start bg-color2/[0.6] m-1  p-1 w-95 rounded-2 text-textcolor">
                          News paper Report
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
                        </button>
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
            </AccordionItem>

            {/* <li>
              <div
                className={sideBarIconProperty}
                onClick={() => toggleAccordion(2)}
              >
                <span>
                  <FaArrowAltCircleRight className="text-3xl text-textcolor block float-left"></FaArrowAltCircleRight>
                </span>
                <span
                  className={`text-base font-medium ms-2 ${
                    !openSide && "hidden"
                  } `}
                >
                  Step-2
                </span>
                {active === 2 && openSide && (
                  <ul className="pt-1 text-base font-medium">
                    <li>
                      <Link
                        to="step2"
                        state={{ child: child }}
                        className="no-underline"
                        disabled
                      >
                        <button className="flex-column justify-items-start bg-color2/[0.6] m-1 p-1 w-full rounded-2 ">
                          News paper Report
                        </button>
                      </Link>
                    </li>
                    <li>
                      {" "}
                      <button className="flex-column justify-items-start bg-color2/[0.6] m-1 p-1 w-full rounded-2 ">
                        TV Report
                      </button>
                    </li>
                    <li>
                      {" "}
                      <button className="flex-column justify-items-start bg-color2/[0.6] m-1 p-1 w-full rounded-2 ">
                        File Missing Report
                      </button>
                    </li>
                    <li>
                      {" "}
                      <button className="flex-column justify-items-start bg-color2/[0.6] m-1 p-1 w-full rounded-2 ">
                        Medical Report
                      </button>
                    </li>
                    <li>
                      {" "}
                      <button className="flex-column justify-items-start bg-color2/[0.6] m-1 p-1 w-full rounded-2 ">
                        SI Report
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            </li> */}
            {/* Step-2 Button */}
            <AccordionItem>

            <li className={sideBarIconProperty}>
              <button
                onClick={() => handleStep2()}
                disabled={!(status === 2)}
                >
                <span>
                  <FaArrowAltCircleRight className="text-3xl text-textcolor block float-left"></FaArrowAltCircleRight>
                </span>
                <span
                  className={`text-base font-medium ms-2  ${
                    !openSide && "hidden"
                  }`}
                  >
                  Step-2: Get NOC Certificate
                </span>{" "}
              </button>
            </li>
                  </AccordionItem>

            {/* Step-3 Button */}
            <li className={sideBarIconProperty}>
              <button
                onClick={() => handleStep2()}
                disabled={!(status === 3)}
              >
                <span>
                  <FaArrowAltCircleRight className="text-3xl text-textcolor block float-left"></FaArrowAltCircleRight>
                </span>
                <span
                  className={`text-base font-medium ms-2  ${
                    !openSide && "hidden"
                  }`}
                >
                  Step-3: Get LFA Certificate
                </span>{" "}
              </button>
            </li>

            {/* Step-4 Button */}
            <li className={sideBarIconProperty}>
              <button
                onClick={() => handleStep2()}
                disabled={!(status === 4)}
              >
                <span>
                  <FaArrowAltCircleRight className="text-3xl text-textcolor block float-left"></FaArrowAltCircleRight>
                </span>
                <span
                  className={`text-base font-medium ms-2  ${
                    !openSide && "hidden"
                  }`}
                >
                  Step-4: Upload Child to CARINGS
                </span>{" "}
              </button>
            </li>

            {/* Logout Button */}
            <li className={logoutIconProperty}>
              {" "}
              <button
                onClick={() => handleLogout()}
              >
                <span>
                  <FaArrowAltCircleRight className="text-3xl text-textcolor block float-left"></FaArrowAltCircleRight>
                </span>
                <span
                  className={`text-base font-medium ms-2 ${
                    !openSide && "hidden"
                  }`}
                >
                  Logout
                </span>{" "}
              </button>
            </li>
          </ul>

          </Accordion>
      </div>
    </>
  );
};

export default GroundWorkerSidebar;