import React, { useEffect, useState } from "react";
import MediaCard from "./getcards";
import Grid from '@mui/material/Grid';

function Cardlist(){
    return (
		<Grid container spacing={4}>
              <Grid item xs={12} sm={12} md={6} lg={4}>
                <MediaCard />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={4}>
                <MediaCard />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={4}>
                <MediaCard />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={4}>
                <MediaCard />
              </Grid>
        </Grid>  
    )
}

export default Cardlist;