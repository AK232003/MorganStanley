import { React, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PieChart from "../charts";
import { Card, CardBody, CardTitle } from "reactstrap";

const GroundWorkerDashboard = ({ user }) => {
  const navigate = useNavigate();
  const labels1 = ["Adopted", "Free to Adopt", "Surrendered"];
  const title1 = "Case Statistics";
  const data1 = [100, 200, 50];
  // var piechart = Pie_chart(labels1, data1, title1)
  useEffect(() => {
    if (user !== "groundWorker") navigate("/");
  }, [user]);
  return (
    <div className="container m-4 overflow-hidden">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {/* <div className="text-textcolor justify-self-start rounded-1 bg-color3 px-1 sm:px-3 py-1 drop-shadow-md "> */}
        <div className="font-sans text-justify align-text-bottom fw-bold text-2xl sm:text-4xl">
          GroundWorker Dashboard
        </div>
        {/* </div> */}
        <button
          className="justify-self-start sm:justify-self-end p-2 rounded-pill bg-themecolor shadow-md drop-shadow-md text-white hover:shadow-themecolor/[0.5]"
          onClick={() => navigate("/caseManager/addChild")}
        >
          {" "}
          Add child
        </button>
      </div>
    </div>
  );
};
export default GroundWorkerDashboard;
