import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Media } from 'reactstrap';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { Box } from '@mui/material';

const theme = createTheme({
    card: {
        palette: {
            bgcolor: "#EEEEEE",
        },
    }
});

function ChildCard() {
  return (
    <ThemeProvider theme={theme}>
    <Card sx={{display:"flex", height:"200px", maxWidth:"360px"}}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography gutterBottom variant="h6" component="div">
          <b>Case Number </b> 12  
          </Typography>
          <Typography variant="body2" color="text.secondary">
          <b>Name: </b> ABC 
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <b>Age: </b> 12 
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <b>District: </b> 12 
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <b>State: </b> 12 
          </Typography>
        </CardContent>
      <CardActions>
        <Button size="small">View Case</Button>
      </CardActions>
      </Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" margin={2}> 
      <CardMedia
        component="img"
        sx={{ width: 120}}
        image="logo_scroll.png"
        />
      </Box>
    </Card>
    </ThemeProvider>
  );
}

export default ChildCard;