import {React, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import PieChart from "../piechart";
import Linechart from "../linechart";
import Stackedareachart from "../stackedareachart";
import { Card, CardBody, CardTitle} from "reactstrap";
import { useTranslation } from "react-i18next";
import i18next from "i18next";


const Dashboard= ({user, id}) =>{

  const { t } = useTranslation();

  const navigate=useNavigate();
  const labels1 = [t('Adopted'), t('Free to Adopt'), t('Surrendered')];
  const title1 = t('Case Statistics')
  const data1 = [100, 200, 50];
  const data2 = [
    {
        name: 'January',
        Assigned: 300,
        Completed: 200,
        InProgress: 100, 
    },
    {
        name: 'February',
        Assigned: 400,
        Completed: 100,
        InProgress: 300, 
    },
    {
        name: 'March',
        Assigned: 500,
        Completed: 300,
        InProgress: 200, 
    },
];
  // var piechart = Pie_chart(labels1, data1, title1)
  
  useEffect(()=>{
    // console.log(user)
    
    if(user!=="CaseManager") navigate("/");
    
  },[user, id])
  return (
    <div className=" overflow-hidden">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 m-2">
      {/* <div className="text-textcolor justify-self-start rounded-1 bg-color3 px-1 sm:px-3 py-1 drop-shadow-md "> */}
         <div className="font-sans text-justify align-text-bottom fw-bold text-2xl sm:text-4xl">{t('CaseManager Dashboard')}</div>
      {/* </div> */}
        <button className="justify-self-start sm:justify-self-end p-2 rounded-pill bg-themecolor shadow-md drop-shadow-md text-white hover:shadow-themecolor/[0.5]" onClick={()=>navigate("/caseManager/addChild")} >{t('Add Child')}</button>
      </div>

    <div className="row">
      <Card className="col-sm-6 justify-content-center m-2 p-2 cursor-pointer" style={{boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2)'}}>
      <div style={{ display: 'flex', justifyContent: 'center'}}>
      <CardTitle tag="h5"><strong>{title1}</strong></CardTitle>
        </div>
          <CardBody>
            {/* <PieChart labels = {labels1} data={data1} title={title1}/> */}
            <Stackedareachart data1={data2}/>
          </CardBody>
      </Card>
      <Card className="col justify-content-center m-2 p-2 cursor-pointer" style={{boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2)'}}>
      <div style={{ display: 'flex', justifyContent: 'center'}}>
      <CardTitle tag="h5"><strong>{title1}</strong></CardTitle>
        </div>
          <CardBody>
            {/* <<PieChart labels = {labels1} data={data1} title={title1}/>> */}
            <PieChart data={data1} labels={labels1} title={title1}/>
          </CardBody>
      </Card>
    </div>
    
    </div>
  );
}
export default Dashboard;
