import {React, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import PieChart from "../piechart";
import { List, Card, CardBody,CardTitle, Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from "reactstrap";
import Barchart from "../barchart";
import { FaSearch } from "react-icons/fa";
import { db } from "../../firebase"
import { collection, getDocs } from "firebase/firestore";
import img from "../../logo_scroll.png";
import profile from "../../profile.webp"

const AdminDashboard= ({user, id}) =>{
  const navigate=useNavigate();
  const [filter,setFilter]=useState("")
	const [search,setSearch] = useState("");
	const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen(!dropdownOpen);
  const labels1 = ["Adopted", "Free to Adopt", "Surrendered"];
  const title1 = 'Case Statistics'
  const title2 = "Child Statistics"
  const data1 = [100, 200, 50];
  // var piechart = Pie_chart(labels1, data1, title1)
  console.log(user, id);
  useEffect(()=>{
    if(user!=="Admin") navigate("/");
    
  },[user])
  const[children, setChildren] = useState([]);
    const childrenCollectionRef = collection(db, "children");
    useEffect(() => {
        const getChildren = async () => {
            const data = await getDocs(childrenCollectionRef);
            setChildren(data.docs.map((doc) => ({...doc.data(), id:doc.id})))
        };
        getChildren();
        console.log(children)
    }, [])
    const childrenLists=()=>{
        return (
            <div className="flex flex-row flex-nowrap mt-2 overflow-x-scroll">
            {children.filter(children => {
				if(search === "Search" || search === "") {
					return children;
				}
				else if(children[filter].toLowerCase().includes(search.toLowerCase())){
					return children;
				}
				}).map((children) => {
                return  (
				<div className="basis-52 shrink-0 align-items-center !bg-sideBarColor1 !border-none justify-content-center m-2 p-2" key={children["Case Number"]} style={{boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2)'}} > 
        <div>
          <img alt="Child Photo"  src={profile} loading="lazy" className="w-40 h-40 rounded-full" onerror={img}/>
          {/* src={children["Image"]!==undefined || children["Image"]===""?children["Image"]:img} */}
				</div>
				<CardBody>
								<List type="unstyled">
								<li > <strong>Name :</strong> {children["Name"]}</li>
								<li > <strong>Age :</strong> {children["Age"]}</li>
								<li > <strong>District :</strong> {children["District"]}</li>
								<li > <strong>State :</strong> {children["State"]}</li>
								<li > <strong>Case Number :</strong> {children["Case Number"]}</li>
								</List>
					</CardBody>
				</div>
            )})}
        </div>)
    }
  return (
    <div className="overflow-hidden">
      <div className="row m-2">
      <div className="col-6 text-textcolor justify-self-start rounded-4 bg-color3 px-1 sm:px-3 py-1 drop-shadow-md ">
         <div className="font-sans text-justify align-text-bottom fw-bold text-2xl sm:text-4xl">Dashboard</div>
      </div>
        <button className="col-3 offset-3 justify-self-start sm:justify-self-end p-2 rounded-pill bg-themecolor shadow-md drop-shadow-md text-white hover:shadow-themecolor/[0.5]" onClick={()=>navigate("/admin/addUser")} > Add User</button>
      </div>
      <div className="row">
      <Card className="col-sm-6 justify-content-center m-2 p-2 cursor-pointer" style={{boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2)'}}>
      <div style={{ display: 'flex', justifyContent: 'center'}}>
      <CardTitle tag="h5"><strong>{title2}</strong></CardTitle>
        </div>
          <CardBody>
            <PieChart labels = {labels1} data={data1} title={title1}/>
          </CardBody>
      </Card>
      <Card className="col justify-content-center m-2 p-2 cursor-pointer" style={{boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2)'}}>
      <div style={{ display: 'flex', justifyContent: 'center'}}>
      <CardTitle tag="h5"><strong>{title1}</strong></CardTitle>
        </div>
          <CardBody>
            {/* <<PieChart labels = {labels1} data={data1} title={title1}/>> */}
            <Barchart />
          </CardBody>
      </Card>
    </div>
    <hr className="border-solid" />
    <div className="row">
    <div className="col-6 col-lg-10 w-full p-2">
			<div className="rounded-md w-auto text-xl p-2 flex align-items-center bg-white shadow-md hover:shadow-xl">
			<span><FaSearch className="text-lg text-black block float-left me-2"></FaSearch></span>
			<input className="w-95 bg-inherit text-slate-800 align-self-center font-sans placeholder:text-black focus-visible:outline-0" type="text" placeholder={"Search"} onChange={(event)=>setSearch(event.target.value)}></input>
			</div>
			</div>
			<div className="col-auto col-lg-2 mt-2 md:p-2 p-1">
			<Dropdown isOpen={dropdownOpen} toggle={toggle}  direction="down" onChange={(event)=>console.log(event)}>
        <DropdownToggle size="lg" className="rounded-md w-full h-auto !text-textcolor text-2xl p-2 border-0 !bg-color3 shadow-md" caret>{filter===""?"Select Filter":filter}</DropdownToggle>
        <DropdownMenu className="text-textcolor">
          <DropdownItem onClick={()=>setFilter("Name")}>Name</DropdownItem>
          <DropdownItem onClick={()=>setFilter("District")}>District</DropdownItem>
          <DropdownItem onClick={()=>setFilter("District")}>Case Number</DropdownItem>
        </DropdownMenu>
      </Dropdown>
			</div>
    {children.length>0? childrenLists() :<div className="spinner-border m-5 p-4" style={{position: "relative" ,top: "50%", left: "50%"}} role="status"></div>}
    </div>
    </div>
  );
}
export default AdminDashboard;
