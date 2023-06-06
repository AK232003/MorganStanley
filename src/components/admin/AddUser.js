import { React, useRef, useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const AddUser = ({user}) => {
  const emailRef = useRef();
  const passwordRef = useRef();
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
      console.log(emailRef.current.value, passwordRef.current.value, userType);
      await signup(emailRef.current.value, passwordRef.current.value, userType);
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
            <label className="form-label"> Email </label>
            <input
              type="email"
              id="email"
              className="form-control form-control-lg"
              ref={emailRef}
              required
            />
          </div>
          <div className="form-outline mb-4">
            <label className="form-label"> Password </label>
            <input
              type="password"
              id="pass"
              className="form-control form-control-lg"
              ref={passwordRef}
              required
            />
          </div>
          <div className="d-flex justify-content-around align-items-center mb-4">
            <p>
              Don't have an account?
              {/* <Link to="/signup"> Signup </Link> */}
            </p>
          </div>
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
