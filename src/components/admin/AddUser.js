import { React, useRef, useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const AddUser = ({user}) => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const name = useRef();
  const phoneno = useRef();
  const uid = useRef();
  // const [type,setType]=useState();

  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
	const navigate=useNavigate();
	useEffect(()=>{
		if(user!=="admin") navigate("/");
	},[user])
  async function createUser(e, userType) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      console.log(emailRef.current.value, passwordRef.current.value, userType, uid.current.value, phoneno.current.value, name.current.value);
      await signup(emailRef.current.value, passwordRef.current.value, userType, uid.current.value, phoneno.current.value, name.current.value);
    } catch {
      setError("Failed to create an account");
    }

    setLoading(false);
  }

  return (
    <>
      <div
        className="container-md"
        style={{ maxWidth: "500px", marginTop: "100px" }}
      >
        <h1 className="mt-100 text-center"> Signup</h1>
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        <form className="d-flex flex-column">
        <div className="form-outline mb-4">
            <label className="form-label"> Name </label>
            <input
              type="text"
              id="name"
              className="form-control form-control-lg"
              ref={name}
              required
            />
          </div>
          <div className="form-outline mb-4">
            <label className="form-label"> Email </label>
            <input
              type="text"
              id="email"
              className="form-control form-control-lg"
              ref={emailRef}
              required
            />
          </div>
          <div className="form-outline mb-4">
            <label className="form-label"> Password </label>
            <input
              type="text"
              id="pass"
              className="form-control form-control-lg"
              ref={passwordRef}
              required
            />
          </div>
          <div className="form-outline mb-4">
            <label className="form-label"> Phone Number </label>
            <input
              type="text"
              id="phone"
              className="form-control form-control-lg"
              ref={phoneno}
              required
            />
          </div>
          <div className="form-outline mb-4">
            <label className="form-label"> User ID </label>
            <input
              type="text"
              id="uid"
              className="form-control form-control-lg"
              ref={uid}
              required
            />
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
          <div className="d-flex justify-content-around align-items-center mb-4">
            <button
              type="button"
              disabled={loading}
              className="btn btn-primary btn-lg btn-block"
              onClick={(e) => createUser(e, "GroundWorker")}
            >
              Create User
            </button>
            <button
              type="button"
              disabled={loading}
              className="btn btn-primary btn-lg btn-block"
              onClick={(e) => createUser(e, "admin")}
            >
              Create Admin
            </button>

            <button
              type="button"
              disabled={loading}
              className="btn btn-primary btn-lg btn-block"
              onClick={(e) => createUser(e, "CaseManager")}
            >
              Create Manager
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddUser;
