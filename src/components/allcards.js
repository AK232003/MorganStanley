import React, { useEffect, useState } from "react";
import ChildCard from "./casemanager/childcard";
import Grid from '@mui/material/Grid';
import ManagerCard from "./admin/managercard";

function Cardlist(){
    return (
		<Grid container spacing={4}>
              <Grid item xs={12} sm={12} md={6} lg={4}>
                <ManagerCard />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={4}>
              <ManagerCard />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={4}>
              <ManagerCard />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={4}>
              <ManagerCard />
              </Grid>
        </Grid>  
    )
}

export default Cardlist;