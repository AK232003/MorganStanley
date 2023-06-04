import { React, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmitLogin(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      console.log(emailRef.current.value, passwordRef.current.value);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate("/");
    } catch {
      setError("Incorrect Username or Password");
    }

    setLoading(false);
  }

  return (
    <div className="grid mt-4 place-content-center">
      <div className="row mt-5 mx-5">
        <img src="./logo_scroll.png" alt="logo" className="col-10 offset-1 col-sm-8 offset-sm-2 h-32 place-self-center"/> 
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        </div>
        <div className="row m-1 flex-column">

        <form onSubmit={handleSubmitLogin} className="col-10 offset-1 font-sans fw-semibold text-sm md:text-base">
          <div className="form-outline mb-4">
            <label className="form-label text-textcolor"> Email </label>
            <input
              type="email"
              id="email"
              className="form-control form-control-lg rounded-3"
              ref={emailRef}
              required
              style={{background: "#f4ecec"}}
              />
          </div>
          <div className="form-outline mb-4">
            <label className="form-label text-textcolor"> Password </label>
            <input
              type="password"
              id="pass"
              className="form-control form-control-lg rounded-3"
              ref={passwordRef}
              required
              style={{background: "#f4ecec"}}
              />
          </div>
          <div className="d-flex justify-content-around align-items-center mb-4">
            <p>
              Don't have an account?<Link to="/signup"> Signup </Link>
            </p>
          </div>
          <div className="d-flex justify-content-around align-items-center mb-4">
            <button
              type="submit"
              disabled={loading} 
              className="!bg-themecolor btn d-block w-100 rounded-pill font-sans fw-medium text-sm md:text-base !text-[#f4ecec]"
              >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
