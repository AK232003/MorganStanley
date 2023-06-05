import {React} from "react";
import { Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
const Dashboard= () =>{
  const navigate=useNavigate();
  return (
    <div className="container m-4">
      <div className="grid grid-cols-2 gap-2">
      <div className="text-gray-500 justify-self-start rounded-4 bg-white px-3 py-1">
         <div className="font-sans text-justify fw-bold text-4xl">Dashboard</div>
      </div>
        <button className=" col-2 justify-self-end rounded-pill bg-themecolor text-white" onClick={()=> navigate('addChild')}> Add child</button>
      </div>
    </div>
  );
}
export default Dashboard
