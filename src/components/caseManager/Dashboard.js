import {React, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import PieChart from "../charts";
import { Card, CardBody, CardTitle} from "reactstrap";


const Dashboard= ({user}) =>{
  const navigate=useNavigate();
  const labels1 = ["Adopted", "Free to Adopt", "Surrendered"];
  const title1 = 'Case Statistics'
  const data1 = [100, 200, 50];
  // var piechart = Pie_chart(labels1, data1, title1)
  useEffect(()=>{
    // console.log(user)
    if(user!=="caseManager") navigate("/");
  },[user])
  return (
    <div className="container m-4 overflow-hidden">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
      {/* <div className="text-textcolor justify-self-start rounded-1 bg-color3 px-1 sm:px-3 py-1 drop-shadow-md "> */}
         <div className="font-sans text-justify align-text-bottom fw-bold text-2xl sm:text-4xl">Dashboard</div>
      {/* </div> */}
        <button className="justify-self-start sm:justify-self-end p-2 rounded-pill bg-themecolor shadow-md drop-shadow-md text-white hover:shadow-themecolor/[0.5]" onClick={()=>navigate("/caseManager/addChild")} > Add child</button>
      </div>
      <Card className="row col-sm-5 !flex-row align-items-center justify-content-center m-2 p-2 cursor-pointer" style={{boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2)'}}>
      <div style={{ display: 'flex', justifyContent: 'center'}}>
      <CardTitle tag="h5"><strong>{title1}</strong></CardTitle>
    </div>
          <CardBody>
            <PieChart labels = {labels1} data={data1} title={title1}/>
          </CardBody>
      </Card>
    </div>
  );
}
export default Dashboard;
