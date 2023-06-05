import { React, useRef, useState } from "react";
import { Form, Label, FormGroup, Input, Col, Button } from "reactstrap";
import { useAuth } from "../context/AuthContext";
import { getDatabase, ref, update, child, get, set } from "firebase/database";

const Signup = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmitLogin(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      console.log(emailRef.current.value, passwordRef.current.value);
      await signup(emailRef.current.value, passwordRef.current.value);
    } catch {
      setError("Failed to create an account");
    }

    setLoading(false);
  }

  return (
    <>
      <img src="./logo_scroll.png" alt="logo"></img>
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
        <form onSubmit={handleSubmitLogin} className="d-flex flex-column">
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
              type="submit"
              disabled={loading}
              className="btn btn-primary btn-lg btn-block"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Signup;
