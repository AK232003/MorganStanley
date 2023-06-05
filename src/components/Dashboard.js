import {React} from "react";
import { Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
const Dashboard= () =>{
  const navigate=useNavigate();
  return (
    <div className="p-7">
      <h1>DashBoard!</h1>
      <Button className="rounded-2" onClick={()=> navigate('addChild')}> Add child</Button>
    </div>
  );
}
export default Dashboard
