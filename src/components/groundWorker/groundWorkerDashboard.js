import { React, useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { List, Card, CardBody,CardTitle} from 'reactstrap';
import Barchart from "../barchart";
import PieChart from "../piechart";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

const GroundWorkerDashboard = ({ user, setuser, id, setId }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [open,setOpen] =useState(false);
	const [openSide, toggle] = useState(true);
  const labels1 = [t('Adopted'), t('Free to Adopt'), t('Surrendered')];
  const title1 = t('Case Statistics')
  const title2 = t('Child Statistics')
  const data1 = [100, 200, 50];
	const handleToggle=()=>{
    if(!open) toggle(!openSide); 
    open?setOpen(false):setOpen(open);
  }
  const handleLogout= ()=>{
    localStorage.setItem('user',null);
    setuser(null);
    setId(null);
    navigate("/");
  }
  useEffect(() => {
    if (user !== "GroundWorker") navigate("/");
    console.log(user, id)
  }, [user]);
  return (
    <>
    <button onClick={() => i18next.changeLanguage('en')}>English</button>
               <button onClick={() => i18next.changeLanguage('hi')}>Hindi</button>
               <button onClick={() => i18next.changeLanguage('mr')}>Marathi</button> 
      <div className="row">
        <div className="col-auto font-sans text-justify align-text-bottom fw-bold text-2xl sm:text-4xl mt-4">
        {t("GroundWorker Dashboard")}
        </div>
      </div>
      <div className="row">
      <Card className="col-sm-6 justify-content-center m-2 p-2 cursor-pointer" style={{boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2)'}}>
      <div style={{ display: 'flex', justifyContent: 'center'}}>
      <CardTitle tag="h5"><strong>{title2}</strong></CardTitle>
        </div>
          <CardBody>
            <PieChart labels = {labels1} data={data1} title={title1}/>
          </CardBody>
      </Card>
      <Card className="col justify-content-center m-2 p-2 cursor-pointer" style={{boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2)'}}>
      <div style={{ display: 'flex', justifyContent: 'center'}}>
      <CardTitle tag="h5"><strong>{title1}</strong></CardTitle>
        </div>
          <CardBody>
            {/* <<PieChart labels = {labels1} data={data1} title={title1}/>> */}
            <Barchart />
          </CardBody>
      </Card>
    </div>
    </>
  );
};
export default GroundWorkerDashboard;
