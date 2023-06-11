import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { List, Card, CardBody, Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from "reactstrap";
import { FaSearch } from "react-icons/fa";
import { db } from "../../firebase"
import { collection, getDocs } from "firebase/firestore";
import img from "../../profile.webp";

const ChildrenList = ({ user, id }) => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen(!dropdownOpen);

  useEffect(() => {
    if (user !== "CaseManager") navigate("/");
  }, [user]);

  const [children, setChildren] = useState([]);
  const childrenCollectionRef = collection(db, "children");
  useEffect(() => {
    const getChildren = async () => {
      const data = await getDocs(childrenCollectionRef);
      setChildren(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getChildren();
  }, []);
  const childrenLists = () => {
    return (
      <div className="row mt-2">
        {children
          .filter((children) => {
            if (search === "Search" || search === "") {
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
                className="col col-lg-5 !flex-row align-items-center !bg-sideBarColor1 !border-none justify-content-center m-2 p-2 cursor-pointer"
                key={children["Case Number"]}
                style={{ boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.2)" }}
                onClick={() =>
                  navigate(`/caseManager/profiles/${children["id"]}`, {
                    state: { children },
                  })
                }
              >
                <div>
                  <img
                    alt="Child Photo"
                    src={
                      children["Image"] !== undefined ? children["Image"] : img
                    }
                    className="w-60 h-40"
                  />
                </div>
                <CardBody>
                  <List type="unstyled">
                    <li>
                      {" "}
                      <strong>Name :</strong> {children["Name"]}
                    </li>
                    <li>
                      {" "}
                      <strong>Age :</strong> {children["Age"]}
                    </li>
                    <li>
                      {" "}
                      <strong>District :</strong> {children["District"]}
                    </li>
                    <li>
                      {" "}
                      <strong>State :</strong> {children["State"]}
                    </li>
                    <li>
                      {" "}
                      <strong>Case Number :</strong> {children["Case Number"]}
                    </li>
                  </List>
                </CardBody>
              </Card>
            );
          })}
      </div>
    );
  };
  return (
    <div className="container lg:mt-4 overflow-y-scroll bg-color2">
      <div className="row mt-4 h-16">
        <div className="col-6 col-lg-10 w-full p-2">
          <div className="rounded-md w-auto text-xl p-2 flex align-items-center bg-white shadow-md hover:shadow-xl">
            <span>
              <FaSearch className="text-lg text-black block float-left me-2"></FaSearch>
            </span>
            <input
              className="w-95 bg-inherit text-slate-800 align-self-center font-sans placeholder:text-black focus-visible:outline-0"
              type="text"
              placeholder={"Search"}
              onChange={(event) => setSearch(event.target.value)}
            ></input>
          </div>
        </div>
        <div className="col-auto col-lg-2 mt-2 md:p-2 p-1">
          <Dropdown
            isOpen={dropdownOpen}
            toggle={toggle}
            direction="down"
            onChange={(event) => console.log(event)}
          >
            <DropdownToggle
              size="lg"
              className="rounded-md w-full h-auto !text-textcolor text-2xl p-2 border-0 !bg-color3 shadow-md"
              caret
            >
              {filter === "" ? "Select Filter" : filter}
            </DropdownToggle>
            <DropdownMenu className="text-textcolor">
              <DropdownItem onClick={() => setFilter("Name")}>
                Name
              </DropdownItem>
              <DropdownItem onClick={() => setFilter("District")}>
                District
              </DropdownItem>
              <DropdownItem onClick={() => setFilter("District")}>
                Case Number
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
      {/* <div className="row mt-4 h-16">
			<button className="col-2 text-white m-2 rounded-pill bg-color3" onClick={()=>setFilter("Assigned")}>Assigned </button>
			<button className="col-2 text-white m-2 rounded-pill bg-color3" onClick={()=>setFilter("Unassigned")}> Unassigned</button>
			<button className="col-2 text-white m-2 rounded-pill bg-color3" onClick={()=>setFilter("Completed")}> Completed</button>
		</div> */}
      {children.length > 0 ? (
        childrenLists()
      ) : (
        <div
          className="spinner-border m-5 p-4"
          style={{ position: "relative", top: "50%", left: "50%" }}
          role="status"
        ></div>
      )}
    </div>
  );
};

export default ChildrenList;