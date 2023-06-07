import {React,useState} from "react";
import { FaBars, FaArrowAltCircleRight  } from 'react-icons/fa';
import { Link } from "react-router-dom";
import logo from "../../logo_scroll.png";

const GroundWorkerSidebar=({user,setuser,child})=>{
	const [openSide, toggle] = useState(true);
  const [open,setOpen] =useState(false);
	const [active,setActive]=useState(0);

  const sideBarProperty = "";
  const sideBarIconProperty = "text-xl text-textcolor w-full bg-color3 rounded-1 p-2 flex-column justify-start  gap-x-4 mt-2";

	const toggleAccordion=(id)=>{
		if(active===id) setActive(0);
		else setActive(id);
	}
  const handdleToggle=()=>{
    if(!open) toggle(!openSide); 
    open?setOpen(false):setOpen(open);
  }
	return (
    <>
    <div className={`h-14 w-14 ${!open && "row"} sm:!hidden rounded-1 m-2 p-1 relative bg-sideBarColor1 opacity-90 top-4 left-5 z-0 ${open&& "opacity-0"} overflow-hidden`}>
          <FaBars className="h-full w-full p-0 cursor-pointer text-textcolor visible" onClick={() =>{ setOpen(!open); toggle(true)}}></FaBars>
    </div>
	<div className={`h-95 sm:h-9/10 px-4 pb-4 pt-3 ${openSide ? "w-72" : "w-24"} ${!open && "hidden"} ${open && "w-95"} bg-sideBarColor1 duration-300 rounded-1 m-2 absolute top-1 sm:relative drop-shadow-2xl shadow-2xl opacity-90 hover:shadow-sideBarColor1 hover:opacity-100 sm:block z-10`}>
          <FaBars className={`h-12 w-12 cursor-pointer top-1 text-textcolor duration-500 visible ${openSide && "rotate-[180deg]"}`} onClick={() => handdleToggle()}></FaBars>
          {openSide &&
            <img alt="logo"
            src={logo}
            height="40"
            width="100%"
            className="pt-4"></img>}
            {user === "groundWorker" && 
            <ul className="pt-2 ps-0">
							<li> 
								<button className={sideBarIconProperty} onClick={()=>toggleAccordion(1)}>
                <span><FaArrowAltCircleRight className="text-3xl text-textcolor block float-left"></FaArrowAltCircleRight></span>
                <span className={`text-base font-medium ms-2 ${!openSide && "hidden"}`}>Step-1</span> 
								{active===1 && openSide && <ul className="pt-1 text-base font-medium">
									<li> 
								<Link to="step1/newsPaperReport" state={{child: child}} className="no-underline">
										<button className="flex-column justify-items-start bg-color2/[0.6] m-1 p-1 w-full rounded-2 text-textcolor"> 
										News paper Report
									</button>
									</Link>
										</li>
									<li> 
										<Link to="step1/TVReport" state={{child: child}} className="no-underline">
										<button className="flex-column justify-items-start bg-color2/[0.6] m-1 p-1 w-full rounded-2 text-textcolor"> 
										TV Report
									</button>
										</Link>
										</li>
									<li> 
										<Link to="step1/fileMisingReport" state={{child: child}} className="no-underline">
										<button className="flex-column justify-items-start bg-color2/[0.6] m-1 p-1 w-full rounded-2 text-textcolor"> 
										File Missing Report
									</button>
										</Link>
										</li>
									<li> 
										<Link to="step1/medicalReport" state={{child: child}} className="no-underline">
										<button className="flex-column justify-items-start bg-color2/[0.6] m-1 p-1 w-full rounded-2 text-textcolor"> 
										Medical Report
									</button>
										</Link>
										</li>
									<li> 
										<Link to="step1/siReport" state={{child: child}} className="no-underline">
										<button className="flex-column justify-items-start bg-color2/[0.6] m-1 p-1 w-full rounded-2 text-textcolor"> 
										SI Report
									</button>
										</Link>
										</li>
									</ul>}
								</button>
							</li>
							<li> 
								<button className={sideBarIconProperty} onClick={()=>toggleAccordion(2)} disabled>
								<span><FaArrowAltCircleRight className="text-3xl text-textcolor block float-left"></FaArrowAltCircleRight></span>
                <span className={`text-base font-medium ms-2 ${!openSide && "hidden"} `}>Step-2</span> 
								{active===2 && openSide && <ul className="pt-1 text-base font-medium">
									<li> 
								<Link to="step2" state={{child: child}} className="no-underline" disabled>
										<button className="flex-column justify-items-start bg-color2/[0.6] m-1 p-1 w-full rounded-2 "> 
										News paper Report
									</button>
									</Link>
										</li>
									<li> <button className="flex-column justify-items-start bg-color2/[0.6] m-1 p-1 w-full rounded-2 "> 
										TV Report
									</button>
										</li>
									<li> <button className="flex-column justify-items-start bg-color2/[0.6] m-1 p-1 w-full rounded-2 "> 
										File Missing Report
									</button>
										</li>
									<li> <button className="flex-column justify-items-start bg-color2/[0.6] m-1 p-1 w-full rounded-2 "> 
										Medical Report
									</button>
										</li>
									<li> <button className="flex-column justify-items-start bg-color2/[0.6] m-1 p-1 w-full rounded-2 "> 
										SI Report
									</button>
										</li>
									</ul>}
								</button>
							</li>
							<li> 
								<button className={sideBarIconProperty} onClick={()=>toggleAccordion(3)} disabled>
                <span><FaArrowAltCircleRight className="text-3xl text-textcolor block float-left"></FaArrowAltCircleRight></span>
                <span className={`text-base font-medium ms-2 ${!openSide && "hidden"}`}>Step-3</span> 
								{active===3 && openSide && <ul className="pt-1 text-base font-medium">
									<li> 
								<Link to="step3/newspaper" state={{child: child}} className="no-underline" disabled>
										<button className="flex-column justify-items-start bg-color2/[0.6] m-1 p-1 w-full rounded-2 "> 
										News paper Report
									</button>
									</Link>
										</li>
									<li> <button className="flex-column justify-items-start bg-color2/[0.6] m-1 p-1 w-full rounded-2 "> 
										TV Report
									</button>
										</li>
									</ul>}
								</button>
							</li>
							<li> <button className={sideBarIconProperty} onClick={()=>setuser(null)} >
                <span><FaArrowAltCircleRight className="text-3xl text-textcolor block float-left"></FaArrowAltCircleRight></span>
                <span className={`text-base font-medium ms-2 ${!openSide && "hidden"}`}>Logout</span> </button>
							</li>
            </ul>
            }
        </div>
        </>
	)
};

export default GroundWorkerSidebar;