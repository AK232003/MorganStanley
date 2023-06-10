import { React, useRef, useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";

import { collection, getDocs, setDoc, doc, serverTimestamp } from "firebase/firestore";
import { db, database } from "../firebase";
// import addProcess from "./addCase";
import { addProcessOrphaned } from "./addCase";

const Login = ({setUser, setId}) => {

  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  // const [userID, setuserID] = useState(null)
  // const [userHash, userHash] = useState(null);
  const [userType, setuserType] = useState(null);
  const navigate = useNavigate();

  const [caseData, setCaseData] = useState([]);
  const fetchData = async () => {
    await getDocs(collection(db, "cases"))
    .then((querySnapshot) => {
      const newData = querySnapshot.docs
        .map((doc) => ({...doc.data(), id:doc.id}));
      setCaseData(newData)
      console.log(newData);
      console.log(querySnapshot.metadata.fromCache)
    })
  }


  useEffect(()=>{

    // fetchData()
  },[])    
  async function handleSubmitLogin(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      console.log(emailRef.current.value, passwordRef.current.value);
      const userHash = await login(emailRef.current.value, passwordRef.current.value);
      console.log(userHash)

      database.ref(`Users/${userHash[0]}/userID/`).once('value')
      .then((snapshot) => {
        setId(snapshot.val());
        console.log(snapshot.val(), "id");
      })
      .catch((error) => {
        console.log('Error fetching data:', error);
      });
      setUser(userHash[1]);
      if (userHash[1] === "GroundWorker" ) {
         console.log("ground worker route")
         setUser("groundWorker");
         navigate("groundWorker");
        } else if(userHash[1] === "CaseManager"){
         console.log("case manager route")
         setUser("CaseManager")
         navigate("caseManager");
        }
        else if(userHash[1] === "Admin") {
          console.log("admin route")
         setUser("Admin")
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
