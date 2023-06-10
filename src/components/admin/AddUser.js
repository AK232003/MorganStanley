import { React, useRef, useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Dropdown,DropdownItem,DropdownMenu, DropdownToggle,Form,Input, FormGroup,Label,Button} from "reactstrap";
import { database, db, auth, storage } from "../../firebase";
import { getDownloadURL, ref as storageRef, uploadBytes, } from "firebase/storage";


const AddUser = ({user}) => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const name = useRef();
  const phoneno = useRef();
  const uid = useRef();
  const image = useRef();
  const [imageUpload, setImageUpload] = useState(null);
  const utype = useRef();
  const [type,setType]=useState("");
  const [open,setOpen]=useState(1);
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen(!dropdownOpen);

	const navigate=useNavigate();
	useEffect(()=>{
		if(user!=="admin") navigate("/");
	},[user])

  const handleDelete=(event) =>{
    event.preventDefault();
    console.log(event)
  }

  async function createUser(event){
    event.preventDefault();
    console.log("here")
    const id = uid.current.value.split("/").join("");
    const imagePath=storageRef(storage,`user/${id}`);
    uploadBytes(imagePath, imageUpload)
      .then((snapshot) => {
          getDownloadURL(snapshot.ref)
          .then(async (url) => {
            console.log(emailRef.current.value,passwordRef.current.value,type,uid.current.value,phoneno.current.value,name.current.value,url);
            await signup(emailRef.current.value,passwordRef.current.value,type,uid.current.value,phoneno.current.value,name.current.value,url)
        
        });
  })}

  // --------------------
  return (
    <>
      <div className="container overflow-auto rounded-2 max-w-lg justify-content-center">
        <div className="row mt-4"> 
        <button className="col-5 col-md-2 w-16 bg-color4 rounded-2 ms-0 m-2 mb-0 pb-0 p-1" onClick={()=>setOpen(1)}>Add User</button>
        <button className="col-5 col-md-2 w-16 bg-color4 rounded-2 m-2 mb-0 pb-0  p-1" onClick={()=>setOpen(2)}>Delete User</button>
        </div>
        <hr className="border-solid h-px m-1"></hr>
        <div className="row  bg-color3">
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        {open===1 &&
        <form className="d-flex flex-column overflow-y-auto" onSubmit={(e) =>createUser(e)}>
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
            <label className="form-label" for="photo">
              {" "}
              Photo
            </label>
            <Input
              id="photo"
              name="photo"
              type="file"
              ref={image}
              accept="image/*"
              onChange={(e) => {setImageUpload(e.target.files[0]);}}
              />
          </div>
          <div className="form-outline mb-4">
            <label className="form-label"> User Type </label>
            <Dropdown
              isOpen={dropdownOpen}
              toggle={toggle}
              direction="down"
              ref = {utype}
              onChange={(event) => console.log(event)}
              >
              <DropdownToggle
                size="sm"
                className="rounded-md w-full h-auto !text-textcolor text-base p-2 border-0 bg-white shadow-md"
                caret
                >
                {type === "" ? "Select User Type" : type}
              </DropdownToggle>
              <DropdownMenu className="text-textcolor">
                <DropdownItem onClick={() => setType("Admin")}>
                  Admin
                </DropdownItem>
                <DropdownItem onClick={() => setType("CaseManager")}>
                  CaseManager
                </DropdownItem>
                <DropdownItem onClick={() => setType("GroundWorker")}>
                  GroundWorker
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
          <div className="flex flex-col justify-content-center md:flex-row mb-4 bg-color5 rounded-2">
            <button
              disabled={loading}
              className="w-30 m-1"
              type="submit"
              >
              Create User
            </button>
          </div>
        </form>
        }
        {open===2 && 
        <Form className=" m-2" onSubmit={(event) => handleDelete(event)}>
        <FormGroup >
            <Label for="wid"> Select User ID/Name </Label>
              <Input id="wid" name="wid" placeholder="User ID/Name" type="text" />
          </FormGroup>
          <FormGroup row>
            <div className="col-2">
              <Button type="submit" color="primary">
                Delete
              </Button>
            </div>
          </FormGroup>
    </Form>
        }
      </div>
      </div>
    </>
  );
};

export default AddUser;
