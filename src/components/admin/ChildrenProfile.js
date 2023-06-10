import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { List, Card, CardBody, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Button, Modal, ModalHeader, ModalBody, ModalFooter,Form, FormGroup,Label, Input } from "reactstrap";
import { FaSearch } from "react-icons/fa";
import { db, database } from "../../firebase"
import { FieldValue, arrayUnion, getDocs, getDoc, updateDoc, doc, getFirestore, collection, setDoc } from "firebase/firestore";
import img from "../../profile.webp";

const ChildrenProfile = ({ user, id }) => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const [modalReport, setModalReport] = useState(false);
  const [caseSelected, setCase] = useState("");
  const [children, setChildren] = useState([]);
  const [deadLine, setDeadLine] = useState("");
  const [child, setChild] = useState(null);
  const [keys, setKeys] = useState(null);
  const childrenCollectionRef = collection(db, "children");
  const toggleDropDown = () => setDropdownOpen(!dropdownOpen);

  const toggleModalReport = (caseno) => {
    console.log(typeof caseno);
    setModalReport(!modalReport);
    if (typeof caseno === "string") {
      setCase(caseno);
      setChild(children.filter((child) => child["id"] === caseno)[0]);
    } else {
      setCase("");
      setChild(null);
    }
  };
  const toggleModal = (caseno) => {
    setModal(!modal);
    console.log(typeof caseno);
    if (typeof caseno === "string") {
      setCase(caseno);
      setChild(children.filter((child) => child["id"] === caseno)[0]);
      console.log(child);
    } else setCase("");
  };
  useEffect(() => {
    if (user !== "Admin") navigate("/");
  }, [user]);
  useEffect(() => {
    if (child !== null) setKeys(Object.keys(child));
  }, [child]);

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
                className="col col-lg-5 !flex-row align-items-center !bg-sideBarColor1 !border-none justify-content-center m-2 p-2"
                key={children["Case Number"]}
                style={{ boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.2)" }}
              >
                <div>
                  <img
                    alt="Child Photo"
                    src={
                      children["Image"] !== undefined ? children["Image"] : img
                    }
                    className="w-60 h-40"
                  />
                  <button
                    className="m-2 p-2 rounded-pill bg-color4 text-textcolor w-full"
                    onClick={() => toggleModal(children["Case Number"])}
                  >
                    {" "}
                    Profile
                  </button>
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
                  <button
                    className="m-2 p-2 rounded-pill bg-color4 text-textcolor w-full"
                    onClick={() => toggleModalReport(children["id"])}
                  >
                    {" "}
                    Case Report
                  </button>
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
            toggle={toggleDropDown}
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
      {/* Assign Worker */}
      <Modal
        centered
        isOpen={modal}
        toggle={toggleModal}
        fullscreen="md"
        size="lg"
      >
        <ModalHeader toggle={toggleModal}>
          Assign Worker for {caseSelected}
        </ModalHeader>
        <ModalBody>
          <ul type="unstyled" className="p-0">
            {child !== null &&
              keys !== null &&
              keys.map((key) => {
                return (
                  <li key={key} className="w-full m-2 p-1 flex">
                    {" "}
                    <strong className="w-1/3 ">{key} :</strong>{" "}
                    <div className="w-2/3">{child[key]}</div>
                  </li>
                );
              })}
            <li className="w-full m-2 p-1 flex">
              {" "}
              <strong className="w-1/3"> Deadline:</strong>{" "}
              <div className="w-2/3">{deadLine}</div>
            </li>
          </ul>
        </ModalBody>

        <ModalFooter>
          <Button color="primary" onClick={toggleModal}>
            Do Something
          </Button>{" "}
          <Button color="secondary" onClick={toggleModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
      {/* Case Details */}
      <Modal
        centered
        isOpen={modalReport}
        toggle={toggleModalReport}
        fullscreen="md"
        size="lg"
      >
        <ModalHeader toggle={toggleModalReport}>
          Case Details for {caseSelected}
        </ModalHeader>
        <ModalBody>
          <ul type="unstyled" className="p-0">
            {child !== null &&
              keys !== null &&
              keys.map((key) => {
                return (
                  <li key={key} className="w-full m-2 p-1 flex">
                    {" "}
                    <strong className="w-1/3 ">{key} :</strong>{" "}
                    <div className="w-2/3">{child[key]}</div>
                  </li>
                );
              })}
            <li className="w-full m-2 p-1 flex">
              {" "}
              <strong className="w-1/3"> Deadline:</strong>{" "}
              <div className="w-2/3">{deadLine}</div>
            </li>
          </ul>
        </ModalBody>

        <ModalFooter></ModalFooter>
      </Modal>
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

export default ChildrenProfile;