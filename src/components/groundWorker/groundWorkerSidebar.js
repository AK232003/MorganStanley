import { React, useEffect, useState } from "react";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { TbCircleNumber1, TbCircleNumber2, TbCircleNumber3, TbCircleNumber4 } from "react-icons/tb"
import { Link, useNavigate, useLocation } from "react-router-dom";
import { GiCheckMark } from "react-icons/gi";
import { FaClipboardList,FaRegClock } from "react-icons/fa";
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
  const mapOfTypes = new Map();
  mapOfTypes.set("NPR", ["Newspaper Report","newsPaperReport"]);
  mapOfTypes.set("TVR", ["TV Report","TVReport"]);
  mapOfTypes.set("FMR", ["File Missing Report","fileMisingReport"]);
  mapOfTypes.set("MR", ["Medical Report","medicalReport"]);
  mapOfTypes.set("SIR", ["SI Report","siReport"]);
  mapOfTypes.set("FPR", ["Final Police Report","finalPoliceReport"]);
  mapOfTypes.set("PDC", ["Parent's Death Certificate","PDC"]);
  mapOfTypes.set("OC", ["Orphan Certificate","orphanCertificate"]);
  mapOfTypes.set("GTR", ["Guardian Trace Report","gtReport"]);
  mapOfTypes.set("SurrenderDeed",["Surrender Deed","surrenderDeed"])
  mapOfTypes.set("NOC",["NOC","step2"])
  mapOfTypes.set("LFA",["LFA","step3"])
  mapOfTypes.set("Carings",["CARINGS upload","step4"])
  const [status, setStatus] = useState(null);
  const navigate = useNavigate();
  const location = useLocation().pathname;
  const child = useLocation()["state"];
  const caseID = child["id"];
  const [category, setCategory] = useState(child["Child Category"]);
  const [presentMap,setMap]=useState();
  const sideBarIconProperty = " flex flex-col text-lg text-textcolor bg-color3 rounded-1 p-2 flex items-center gap-x-4 mt-2 hover:bg-hoverColor cursor-pointer";
  const [active, setActive] = useState(
    location.split("/").length > 3 ? location.split("/")[4] : "0"
  );
    console.log(active)
  const toggleAccordion = (id) => {
    if(category==="Surrenedered") return;
    if (active === id) setActive("step0");
    else setActive(id);
  };
  useEffect(() => {
    console.log("here",caseID)
    db.collection("caseProcesses").doc(`${caseID}`).get().then((doc)=>{
      let temp=Object.keys(doc.data())
      temp.forEach((key)=>{
        if(key!=="isComplete"){
          let tempval=new Array();
          let iter=mapOfTypes.get(key);
          for(let i=0;i<iter.length;i++){
            tempval.push(iter[i]);
          }
          tempval.push(doc.data()[key]["isComplete"])
          mapOfTypes.set(key,tempval);
        }
      })
      setMap(mapOfTypes);
    })
    console.log(presentMap)
  }, []);
  return (
    <>
      {user === "GroundWorker" && (
        <ul className="pt-2 ps-0">
          <li className={`text-xl text-textcolor bg-color3 rounded-1 p-2 flex items-center gap-x-4 mt-2 hover:bg-hoverColor cursor-pointer`} onClick={() => navigate("/groundWorker/caseDetails")} >
            <span><FaLongArrowAltLeft className="text-3xl text-textcolor block float-left"></FaLongArrowAltLeft></span>
            <span className={`text-base font-medium flex-1 ${!openSide && "hidden"}`}>Back</span>
          </li>
          <li className={sideBarIconProperty + `${active==="0" && " bg-hoverColor"}`}>
            <div onClick={() => { toggleAccordion("0"); navigate(`/groundWorker/caseDetails/${child["id"]}`, { state: child }) }} className={`${openSide ? `h-auto` : "h-8"} text-center`}>
              <span>  <FaClipboardList className="text-3xl text-textcolor block float-left"></FaClipboardList> </span>
              <span className={`text-base font-medium ms-2 ${!openSide && "hidden"}`}>
                View Case Details And Report
              </span>
            </div>
          </li>

          <li className={sideBarIconProperty + `${active==="step1" && " bg-hoverColor"}`}>
            {category==="Surrendered"? 
            <div onClick={() => navigate(`/groundWorker/caseDetails/${child["id"]}/step1/surrenderDeed`,{state: child})} className={`${openSide ?`h-auto`:"h-8"} text-center` }>
             {presentMap.get("SurrenderDeed")[2] ? <span><GiCheckMark className="text-3xl text-green-500 block float-right align-self-end"></GiCheckMark></span>
                  :<span><FaRegClock className="text-3xl text-yellow-500 block float-right align-self-end"></FaRegClock></span> }
            <span className={`text-base font-medium ms-2 ${ !openSide && "hidden" }`}>
              Step-1: Surrender Deed 
            </span>
              </div>
            : <div onClick={() => toggleAccordion("step1")} className={`${openSide ?`h-auto`:"h-8"} text-center` }>
                <span>  <TbCircleNumber1 className="text-3xl text-textcolor block float-left"></TbCircleNumber1> </span>
                <span className={`text-base font-medium ms-2 ${ !openSide && "hidden" }`}>
                  Step-1: Document Completion 
                </span>
              </div>
              }
              <div className="w-full">
                {active === "step1" && openSide && (
                  <ul className="pt-1 ps-0 text-base font-medium w-full">
                    <li>
                        <button className="justify-items-end bg-color2/[0.6] m-1  p-1 w-95 rounded-2 text-textcolor" onClick={()=>navigate(`/groundWorker/caseDetails/${child["id"]}/step1/newsPaperReport`,{state: child})}>
                          News Paper Report
                          {console.log(presentMap.get("NPR"))}
                          {presentMap.get("NPR")[2] ? <span><GiCheckMark className="text-base text-green-500 block float-right align-self-end"></GiCheckMark></span>
                    :<span><FaRegClock className="text-base text-yellow-500 block float-right align-self-end"></FaRegClock></span> }
                        </button>
                    </li>
                    <li>
                        <button className="justify-items-end bg-color2/[0.6] m-1  p-1 w-95 rounded-2 text-textcolor" onClick={()=>navigate(`/groundWorker/caseDetails/${child["id"]}/step1/TVReport`,{state: child})}>
                          TV Report
                          {presentMap.get("TVR")[2] ? <span><GiCheckMark className="text-base text-green-500 block float-right align-self-end"></GiCheckMark></span>
                    :<span><FaRegClock className="text-base text-yellow-500 block float-right align-self-end"></FaRegClock></span> }
                        </button>
                    </li>
                    {category==="Abandoned / Family not traceable" &&
                    <li>
                        <button className="justify-items-end bg-color2/[0.6] m-1  p-1 w-95 rounded-2 text-textcolor" onClick={()=>navigate(`/groundWorker/caseDetails/${child["id"]}/step1/fileMisingReport`,{state: child})}>
                          File Missing Report
                          {presentMap.get("FMR")[2] ? <span><GiCheckMark className="text-xl text-green-500 block float-right align-self-end"></GiCheckMark></span>
                    :<span><FaRegClock className="text-xl text-yellow-500 block float-right align-self-end"></FaRegClock></span> }
                        </button>
                    </li>}
                    <li>
                        <button className="justify-items-end bg-color2/[0.6] m-1  p-1 w-95 rounded-2 text-textcolor" onClick={()=>navigate(`/groundWorker/caseDetails/${child["id"]}/step1/medicalReport`,{state: child})}>
                          Medical Report
                          {presentMap.get("MR")[2] ? <span><GiCheckMark className="text-xl text-green-500 block float-right align-self-end"></GiCheckMark></span>
                    :<span><FaRegClock className="text-xl text-yellow-500 block float-right align-self-end"></FaRegClock></span> }
                        </button>
                    </li>
                    <li>
                        <button className="justify-items-end bg-color2/[0.6] m-1  p-1 w-95 rounded-2 text-textcolor" onClick={()=>navigate(`/groundWorker/caseDetails/${child["id"]}/step1/siReport`,{state: child})}>
                          SI Report
                          {presentMap.get("SIR")[2] ? <span><GiCheckMark className="text-xl text-green-500 block float-right align-self-end"></GiCheckMark></span>
                        :<span><FaRegClock className="text-xl text-yellow-500 block float-right align-self-end"></FaRegClock></span> }
                        </button>
                    </li>
                    <li>
                        <button className="justify-items-end bg-color2/[0.6] m-1  p-1 w-95 rounded-2 text-textcolor" onClick={()=>navigate(`/groundWorker/caseDetails/${child["id"]}/step1/finalPoliceReport`,{state: child})}>
                          Final Police Report
                          {presentMap.get("FPR")[2] ? <span><GiCheckMark className="text-xl text-green-500 block float-right align-self-end"></GiCheckMark></span>
                      :<span><FaRegClock className="text-xl text-yellow-500 block float-right align-self-end"></FaRegClock></span> }
                        </button>
                    </li>
                    { category==="Orphaned - No Guardians" &&
                    <>
                      <li>
                        <button className="justify-items-end bg-color2/[0.6] m-1  p-1 w-95 rounded-2 text-textcolor" onClick={()=>navigate(`/groundWorker/caseDetails/${child["id"]}/step1/orphanCertificate`,{state: child})}>
                        Orphan Certificate
                          {presentMap.get("OC")[2] ? <span><GiCheckMark className="text-xl text-green-500 block float-right align-self-end"></GiCheckMark></span>
                       :<span><FaRegClock className="text-xl text-yellow-500 block float-right align-self-end"></FaRegClock></span> }
                        </button>
                      </li>
                      <li>
                        <button className="justify-items-end bg-color2/[0.6] m-1  p-1 w-95 rounded-2 text-textcolor" onClick={()=>navigate(`/groundWorker/caseDetails/${child["id"]}/step1/PDC`,{state: child})}>
                        Parent's Death Certificate
                          {presentMap.get("PDC")[2] ? <span><GiCheckMark className="text-xl text-green-500 block float-right align-self-end"></GiCheckMark></span>
                     :<span><FaRegClock className="text-xl text-yellow-500 block float-right align-self-end"></FaRegClock></span> }
                        </button>
                    </li>
                    </>
                      }
                    {category==="Admitted by Guardians" &&
                    <li>
                        <button className="justify-items-end bg-color2/[0.6] m-1  p-1 w-95 rounded-2 text-textcolor" onClick={()=>navigate(`/groundWorker/caseDetails/${child["id"]}/step1/gtReport`,{state: child})}>
                          Guardin Trace Report
                          {presentMap.get("GTR")[2] ? <span><GiCheckMark className="text-xl text-green-500 block float-right align-self-end"></GiCheckMark></span>
                        :<span><FaRegClock className="text-xl text-yellow-500 block float-right align-self-end"></FaRegClock></span> }
                        </button>
                    </li>}
                  </ul>)}
              </div>
          </li>
          {category!=="Surrendered" &&
            <li className={sideBarIconProperty + `${active==="step2" && " bg-hoverColor"}`}>
            <div onClick={() => { toggleAccordion("step2"); navigate(`/groundWorker/caseDetails/${child["id"]}/step2`, { state: child }) }} className={`${openSide ? `h-auto` : "h-8"} text-center`}> {/* get status and make it status==true?toggleAccordion("step2"):"" */}
              <span>  <TbCircleNumber2 className="text-3xl text-textcolor block float-left"></TbCircleNumber2> </span>
              <span className={`text-base font-medium ms-2 ${!openSide && "hidden"}`}>
                Step-2: Get NOC Certificate
              </span>
            </div>
          </li>
          }

          {/* Step-3 Button */}
          <li className={sideBarIconProperty+ `${active==="step3" && " bg-hoverColor"}`}>
            <div onClick={() => { toggleAccordion("step3"); navigate(`/groundWorker/caseDetails/${child["id"]}/step3`, { state: child }) }} className={`${openSide ? `h-auto` : "h-8"} text-center`}>
            { category==="Surrendered"?(presentMap.get("LFA")[2] ? <span><GiCheckMark className="text-3xl text-green-500 block float-right align-self-end"></GiCheckMark></span>
                  :<span><FaRegClock className="text-3xl text-yellow-500 block float-right align-self-end"></FaRegClock></span>): 
                  <span>  <TbCircleNumber3 className="text-3xl text-textcolor block float-left"></TbCircleNumber3> </span> 
                }
              <span className={`text-base font-medium ms-2 ${!openSide && "hidden"}`}>
                Step-{category!=="Surrendered"?3:2}: Get LFA Certificate
              </span>
            </div>
          </li>

          {/* Step-4 Button */}
          <li className={sideBarIconProperty+ `${active==="step4" && " bg-hoverColor"}`}>
            <div onClick={() => { toggleAccordion("step4"); navigate(`/groundWorker/caseDetails/${child["id"]}/step4`, { state: child }) }} className={`${openSide ? `h-auto` : "h-8"} text-center`}>
            { category==="Surrendered"?(presentMap.get("Carings")[2] ? <span><GiCheckMark className="text-3xl text-green-500 block float-right align-self-end"></GiCheckMark></span>
                  :<span><FaRegClock className="text-3xl text-yellow-500 block float-right align-self-end"></FaRegClock></span>): 
                  <span>  <TbCircleNumber4 className="text-3xl text-textcolor block float-left"></TbCircleNumber4> </span> 
                }
              <span className={`text-base font-medium ms-2 ${!openSide && "hidden"}`}>
                Step-{category!=="Surrendered"?4:3}: Upload Child to CARINGS
              </span>
            </div>
          </li>
        </ul>
      )}
    </>
  );
};

export default GroundWorkerSidebar;
