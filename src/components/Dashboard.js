import {React, useEffect} from "react";
import { useNavigate, Link } from "react-router-dom";
import { Grid } from "@mui/material";
import Pie_chart from "./charts";
import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';

const Dashboard= ({user}) =>{
  const navigate=useNavigate();
  const labels1 = ["Adopted", "Free to Adopt", "Surrendered"];
  const title1 = 'Number of Children'
  const data1 = [100, 200, 50];
  // var piechart = Pie_chart(labels1, data1, title1)
  useEffect(()=>{
    if(user===null) navigate("/");
  },[user])
  return (
    <div className="container m-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
      <div className="text-textcolor justify-self-start rounded-4 bg-color3 px-1 sm:px-3 py-1 drop-shadow-md ">
         <div className="font-sans text-justify align-text-bottom fw-bold text-2xl sm:text-4xl">Dashboard</div>
      </div>
        <button className="justify-self-start sm:justify-self-end p-2 rounded-pill bg-themecolor shadow-md drop-shadow-md text-white hover:shadow-themecolor/[0.5]" onClick={()=>navigate("/caseManager/addChild")} > Add child</button>
      </div>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={8} md={4}>
          <Pie_chart labels = {labels1} data={data1} title={title1}/>
        </Grid>
      </Grid>
    </div>
  );
}
export default Dashboard
