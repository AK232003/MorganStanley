import { React, useRef, useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Dropdown,DropdownItem,DropdownMenu, DropdownToggle,Input} from "reactstrap";

const AddUser = ({user}) => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const name = useRef();
  const phoneno = useRef();
  const uid = useRef();
  const [type,setType]=useState("");

  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen(!dropdownOpen);
  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
	const navigate=useNavigate();
	useEffect(()=>{
		if(user!=="admin") navigate("/");
	},[user])
  async function createUser(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      console.log(emailRef.current.value, passwordRef.current.value, uid.current.value, phoneno.current.value, name.current.value,type);
      await signup(emailRef.current.value, passwordRef.current.value, uid.current.value, phoneno.current.value, name.current.value,type);
    } catch {
      setError("Failed to create an account");
    }

    setLoading(false);
  }

  return (
    <>
      <div
        className="overflow-auto bg-color3 mt-2 rounded-2 p-2 max-w-lg justify-content-center"
      >
        <h1 className="mt-3 text-center"> Signup</h1>
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        <form className="d-flex flex-column overflow-y-auto">
        <div className="form-outline mb-2">
            <label className="form-label"> Name </label>
            <input
              type="text"
              id="name"
              className="form-control form-control-lg"
              ref={name}
              required
            />
          </div>
          <div className="form-outline mb-2">
            <label className="form-label"> Email </label>
            <input
              type="text"
              id="email"
              className="form-control form-control-lg"
              ref={emailRef}
              required
            />
          </div>
          <div className="form-outline mb-2">
            <label className="form-label"> Password </label>
            <input
              type="text"
              id="pass"
              className="form-control form-control-lg"
              ref={passwordRef}
              required
            />
          </div>
          <div className="form-outline mb-2">
            <label className="form-label"> Phone Number </label>
            <input
              type="text"
              id="phone"
              className="form-control form-control-lg"
              ref={phoneno}
              required
            />
          </div>
          <div className="form-outline mb-2">
            <label className="form-label"> User ID </label>
            <input
              type="text"
              id="uid"
              className="form-control form-control-lg"
              ref={uid}
              required
            />
          </div>
            <div className="form-outline mb-2">
              <label className="form-label"for= "photo"> Photo</label>
						<Input id="photo" name="photo" type="file" accept="..png .jpg .jpeg" onChange={handleFileChange}/>
            </div>
          <div className="form-outline mb-4">
            <label className="form-label"> User Type </label>
            <Dropdown isOpen={dropdownOpen} toggle={toggle}  direction="down" onChange={(event)=>console.log(event)}>
              <DropdownToggle size="sm" className="rounded-md w-full h-auto !text-textcolor text-base p-2 border-0 bg-white shadow-md" caret>{type===""?"Select User Type":type}</DropdownToggle>
              <DropdownMenu className="text-textcolor">
                <DropdownItem onClick={()=>setType("Admin")}>Admin</DropdownItem>
                <DropdownItem onClick={()=>setType("CaseManager")}>CaseManager</DropdownItem>
                <DropdownItem onClick={()=>setType("GroundWorker")}>GroundWorker</DropdownItem>
              </DropdownMenu>
            </Dropdown>

          </div>
          {/* <div className="form-outline mb-4">
            <label className="form-label" for="type"> User ID </label>
            <input
              type="select"
              name="type"
              id="type"
              className="form-control form-control-lg"
              onChange={(value)=>setType(value)}
              required
            >
              <option>CaseManager</option>
              <option>admin</option>
              <option>GroundWorker</option>
              </input>
          </div> */}
          <div className="flex flex-col justify-content-center md:flex-row mb-4 bg-color5 rounded-2">
            <button
              disabled={loading}
              className="w-30 m-1"
              onClick={(e) => createUser(e)}
            >
              Create User
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddUser;
