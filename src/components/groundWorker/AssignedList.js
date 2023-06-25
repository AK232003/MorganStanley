import React, {useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { List, Card, CardBody,Input} from "reactstrap";
import { FaSearch } from "react-icons/fa";
import { db } from "../../firebase"
import { collection, getDocs, query } from "firebase/firestore";
import img from "../../profile.webp";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

const AssignedList=({user, id})=>{
	const navigate = useNavigate();
	const { t } = useTranslation();
	const [children, setChildren] = useState([]);
	const [filter,setFilter]=useState("Name")
	const [search,setSearch] = useState("");
	const childrenCollectionRef = collection(db, "children");
	useEffect(() => {
		const getChildren = async () => {
			const data = await getDocs(childrenCollectionRef);
			setChildren(data.docs.map((doc) => ({...doc.data(), id:doc.id})))
		};
		getChildren();
	}, [])
	const childrenLists=()=>{
		return (
			<div className="grid  grid-cols-1 md:grid-cols-2 gap-0 mt-2">
        {children
          .filter((children) => {
            if (
              search === "Search" ||
              search === "" ||
              filter === "Select Filter"
            ) {
              return children;
            } else if (
              children[filter].toLowerCase().includes(search.toLowerCase())
            ) {
              return children;
            }
          })
          .map((children) => {
            return (
              <Card
                body
                className="align-items-center !bg-sideBarColor1 !border-none justify-content-center m-2 p-2"
                key={children["id"]}
                style={{ boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.2)" }}
              >

                <div className="flex flex-row w-full">
                  <div className="flex flex-col basis-2/5">
                  <img
                    alt="Child Photo"
                    src={
                      children["Image"] !== undefined ? children["Image"] : img
                    }
                    className="rounded-full basis-4/5 w-36 h-36"
                  />
                    <div className="m-1 p-1 text-textcolor basis-1/5 justify-self-center md:text-base text-sm">
                      <strong>Case No:</strong> {children["Case Number"]}
                    </div>
                </div>
                <CardBody className="flex flex-col basis-3/5 p-1  ps-2">
                  <List type="unstyled basis-4/5 md:text-base text-sm">
                    <li>
                      {" "}
                      <strong>{t('Name')} :</strong> {children["Name"]}
                    </li>
                    <li>
                      {" "}
                      <strong>{t('Age')} :</strong> {children["Age"]}
                    </li>
                    <li>
                      {" "}
                      <strong>{t('District')} :</strong> {children["District"]}
                    </li>
                    <li>
                      {" "}
                      <strong>{t('State')} :</strong> {children["State"]}
                    </li>
                  </List>
                  <button
                    className="p-2 rounded-3 basis-1/5 bg-buttonColor justify-self-end text-white w-full"
                    onClick={()=> navigate(`/groundWorker/caseDetails/${children["id"]}`, {state: children})}>
                    {" "}
                    View Progress
                  </button>
                </CardBody>
                </div>
              </Card>
            );
          })}
      </div>)
	}
	return (
<div className="container sm:mt-4 overflow-y-scroll rounded-3 bg-color2">
	<div className="row mt-4 h-16">
			<div className="col-8 col-md-10 w-full p-2">
			<div className="rounded-md w-auto text-xl p-2 flex align-items-center bg-white shadow-md hover:shadow-xl">
			<span><FaSearch className="text-lg text-black block float-left me-2"></FaSearch></span>
			<input className="w-95 bg-inherit text-slate-800 align-self-center font-sans placeholder:text-black focus-visible:outline-0" type="text" placeholder={t("Search")} onChange={(event)=>setSearch(event.target.value)}></input>
			</div>
			</div>
			<div className="col-4 col-md-2 mt-2 md:p-2 p-1">
			<Input type="select" name="filter" id="filter" className="rounded-md w-full h-auto text-2xl p-2 border-0 !bg-color3 shadow-md" onChange={(event)=>setFilter(event.target.value)}>
				<option>{t("Name")}</option>
				<option>{t("District")}</option>
				<option>{t("Case Number")}</option>
			</Input>
			</div>
		</div>

		{children.length>0? childrenLists() :<div className="spinner-border m-5 p-4" style={{position: "relative" ,top: "50%", left: "50%"}} role="status"></div>}
</div>
);
	
}

export default AssignedList;