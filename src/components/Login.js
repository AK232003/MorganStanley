import { React, useRef, useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = ({setuser}) => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(()=>{
      // setuser(document.cookie.split("=")[1]);
      // if(document.cookie.split("=")[1]!==null) navigate(document.cookie.split("=")[1]);

  },[])
  async function handleSubmitLogin(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      console.log(emailRef.current.value, passwordRef.current.value);
      const workerType = await login(emailRef.current.value, passwordRef.current.value);
       if (workerType === "GroundWorker" ) {
          setuser("groundWorker");
         navigate("groundWorker");
       } else if(workerType === "CaseManager"){
        setuser("caseManager")
         navigate("caseManager");
        }
        else if(workerType === "admin") {
         setuser("admin")
          navigate("admin");
        
       }
    } catch {
      setError("Incorrect Username or Password");
    }

    setLoading(false);
  }
  return (
    <div id="loginpage" className="w-100">
      <div className="grid mt-4 place-content-center">
        <div
          className="rounded-5"
          style={{ backgroundColor: "rgb(178 176 176 / 60%)" }}
        >
          <div className="row mt-5 mx-5">
            <img
              src="./logo_scroll.png"
              alt="logo"
              className="col-10 offset-1 col-sm-8 offset-sm-2 h-20 place-self-center bg-white/[.4] rounded-3"
            />
            {/* {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )} */}
          </div>
          <div className="row m-1 flex-column">
            <form
              onSubmit={handleSubmitLogin}
              className="col-10 offset-1 font-sans fw-semibold text-sm md:text-base"
            >
              <div className="form-outline mb-4">
                <label className="form-label text-black"> Email </label>
                <input
                  type="email"
                  id="email"
                  className="form-control form-control-lg rounded-3 !border-transparent"
                  ref={emailRef}
                  required
                  style={{ background: "rgb(178 176 176 / 50%)" }}
                />
              </div>
              <div className="form-outline mb-4">
                <label className="form-label text-black "> Password </label>
                <input
                  type="password"
                  id="pass"
                  className="form-control form-control-lg rounded-3 !border-transparent"
                  ref={passwordRef}
                  required
                  style={{ background: "rgb(178 176 176 / 50%)" }}
                />
              </div>
              <div className="d-flex justify-content-around align-items-center mb-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="!bg-themecolor btn d-block w-100 rounded-pill font-sans fw-medium text-sm md:text-base !text-textcolor"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
