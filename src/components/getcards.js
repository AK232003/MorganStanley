import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Media } from 'reactstrap';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

const theme = createTheme({
    card: {
        palette: {
            bgcolor: "#EEEEEE",
        },
    }
});

function MediaCard() {
  return (
    <ThemeProvider theme={theme}>
    <Card sx={{ maxWidth: 345, bgcolor:theme.card.palette.bgcolor}}>
      <CardMedia
        sx={{ height: 140 }}
        image="logo_scroll.png"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
            Case 1
        </Typography>
        <Typography variant="body2" color="text.secondary">
            All info
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">View Case</Button>
      </CardActions>
    </Card>
    </ThemeProvider>
  );
}

export default MediaCard;