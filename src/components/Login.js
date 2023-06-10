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
      setuser(document.cookie.split("=")[1]);
      if(document.cookie.split("=")[1]!==undefined) navigate(document.cookie.split("=")[1]);

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
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 640); // Adjust the threshold value as needed
    };

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="flex w-screen h-screen">
      <div
        className="hidden sm:block md:block sm:w-1/2 lg:w-3/5 bg-cover bg-center loginpage"
      />
      <div className={`w-full sm:w-1/2 lg:w-2/5 bg-loginbg flex flex-col justify-center p-8 ${isSmallScreen ? `loginpage` : ''}`}>
        <div className={`mx-auto rounded-2xl ${isSmallScreen && "bg-loginbg/[0.75] "}`}>
          <div className="mx-4 my-4">

          <img
            src="logo_scroll.png"
            alt="Logo"
            className="w-64 h-24 mb-6"
            />
          <form onSubmit={handleSubmitLogin}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-themecolor mb-1">
                <b>Email Address</b>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                ref={emailRef}
                required
                className="w-full bg-t2 px-4 py-2 rounded bg-white/[0.4]"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-themecolor mb-1">
                <b>Password</b>
              </label>
              <input
                type="password"
                id="password"
                name="password"
                ref={passwordRef}
                required
                className="w-full bg-t2 px-4 py-2 rounded bg-white/[0.4]"
                />
            </div>
            {/* <div className="mb-4">
              <input type="checkbox" id="remember" className="mr-2" />
              <label htmlFor="remember" className="text-themecolor">
              Remember me
              </label>
            </div> */}
            <button
              type="submit"
              className="w-full bg-themecolor mt-3 mb-2 px-4 py-2 rounded text-white"
              >
              <b>Sign In</b>
            </button>
          </form>
            </div>
        </div>
      </div>
    </div>
  )
};

export default Login;
