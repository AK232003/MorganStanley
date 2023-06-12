import {React, useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import PieChart from "../piechart";
import Linechart from "../linechart";
import Stackedareachart from "../stackedareachart";
import { FaSearch } from "react-icons/fa";
import { List, Card, CardBody,CardTitle, Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from "reactstrap";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import { db } from "../../firebase"
import { collection, getDocs } from "firebase/firestore";
import profile from "../../profile.webp"
const Dashboard= ({user, id}) =>{

  const { t } = useTranslation();
  const [filter,setFilter]=useState("")
  const [search,setSearch] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen(!dropdownOpen);
  const navigate=useNavigate();
  const labels1 = [t('Adopted'), t('Free to Adopt'), t('Surrendered')];
  const title1 = t('Case Statistics')
  const data1 = [100, 200, 50];
  const data2 = [
    {
        name: 'January',
        Assigned: 300,
        Completed: 200,
        InProgress: 100, 
    },
    {
        name: 'February',
        Assigned: 400,
        Completed: 100,
        InProgress: 300, 
    },
    {
        name: 'March',
        Assigned: 500,
        Completed: 300,
        InProgress: 200, 
    },
];
  // var piechart = Pie_chart(labels1, data1, title1)
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
          <img alt="Child Photo" loading="lazy" className="w-40 h-40 rounded-full" 
          src={children["Image"]!==undefined || children["Image"]===""?children["Image"]:profile} />
				</div>
				<CardBody>
								<List type="unstyled">
								<li > <strong>{t('Name')} :</strong> {children["Name"]}</li>
								<li > <strong>{t('Status')} :</strong> {children["Age"]}</li>
								<li > <strong>{t('Deadline')} :</strong> {children["District"]}</li>
								</List>
					</CardBody>
				</div>
            )})}
        </div>)
    }
  useEffect(()=>{
    // console.log(user)
    
    if(user!=="CaseManager") navigate("/");
    
  },[user, id])
  return (
    <div className=" overflow-hidden">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 m-2">
      {/* <div className="text-textcolor justify-self-start rounded-1 bg-color3 px-1 sm:px-3 py-1 drop-shadow-md "> */}
         <div className="font-sans text-justify align-text-bottom fw-bold text-2xl sm:text-4xl">{t('CaseManager Dashboard')}</div>
      {/* </div> */}
        <button className="justify-self-end p-2 rounded-pill bg-themecolor shadow-md drop-shadow-md text-white hover:shadow-themecolor/[0.5]" onClick={()=>navigate("/caseManager/addChild")} >{t('Add Child')}</button>
      </div>

    <div className="row">
      <Card className="col-sm-6 justify-content-center m-2 p-2 cursor-pointer" style={{boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2)'}}>
      <div style={{ display: 'flex', justifyContent: 'center'}}>
      <CardTitle tag="h5"><strong>{title1}</strong></CardTitle>
        </div>
          <CardBody>
            {/* <PieChart labels = {labels1} data={data1} title={title1}/> */}
            <Stackedareachart data1={data2}/>
          </CardBody>
      </Card>
      <Card className="col justify-content-center m-2 p-2 cursor-pointer" style={{boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2)'}}>
      <div style={{ display: 'flex', justifyContent: 'center'}}>
      <CardTitle tag="h5"><strong>{title1}</strong></CardTitle>
        </div>
          <CardBody>
            {/* <<PieChart labels = {labels1} data={data1} title={title1}/>> */}
            <PieChart data={data1} labels={labels1} title={title1}/>
          </CardBody>
      </Card>
    </div>
    <hr className="border-solid" />
    <div className="row">
      <div className="font-sans text-justify align-text-bottom fw-bold text-2xl sm:text-4xl"> {t('Approaching Deadlines')}</div>
      <div className="flex flex-row w-full">
        <div className="basis-8/10 w-full p-2 mt-1">
          <div className="rounded-md w-auto text-xl p-2 flex align-items-center bg-white shadow-md hover:shadow-xl">
            <span>
              <FaSearch className="text-lg text-black block float-left me-2"></FaSearch>
            </span>
            <input
              className="w-100 bg-inherit text-slate-800 align-self-center font-sans placeholder:text-black focus-visible:outline-0"
              type="text"
              placeholder={"Search"}
              onChange={(event) => setSearch(event.target.value)}
            ></input>
          </div>
        </div>
        <div className="basis-2/10 my-1 px-2 pt-2 ">
          <Dropdown
            isOpen={dropdownOpen}
            toggle={toggle}
            direction="down"
            className="shadow-md hover:shadow-xl max-h-full text-xl"
            onChange={(event) => console.log(event)}
          >
            <DropdownToggle
              size="lg"
              className="rounded-md w-auto h-auto !text-textcolor text-2xl p-2 border-0 !bg-buttonColor/[0.3] shadow-md"
              caret
            >
              {filter === "" ? "Filter" : filter}
            </DropdownToggle>
            <DropdownMenu className="text-textcolor">
              <DropdownItem onClick={() => setFilter("Name")}>
                Name
              </DropdownItem>
              <DropdownItem onClick={() => setFilter("District")}>
                District
              </DropdownItem>
              <DropdownItem onClick={() => setFilter("Case Number")}>
                Case Number
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    {children.length>0? childrenLists() :<div className="spinner-border m-5 p-4" style={{position: "relative" ,top: "50%", left: "50%"}} role="status"></div>}
    </div>
    </div>
  );
}
export default Dashboard;
