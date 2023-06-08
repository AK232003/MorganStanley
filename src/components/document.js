import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import Grid from '@mui/material/Grid';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import IconButton from '@mui/material/IconButton';

const theme = createTheme({
    card: {
        palette: {
            bgcolor: "#EEEEEE",
        },
    }
});

function DocCard(){
    return(
        <Button sx={{width:"100%"}}> 
            <Card sx={{display:"flex", height:"60px", width:"100%", bgcolor: theme.card.palette.bgcolor}}>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Box marginright={2}>
                            <IconButton>
                                <PictureAsPdfIcon />
                            </IconButton>
                        </Box>
                        <Box marginLeft={2}>
                                <Typography variant="body2" color="text.secondary">
                                    Child Details ID: H573934 
                                </Typography>      
                        </Box>
                    </Box>
            </Card>
         </Button>
    )
}

function PdfGrid(){
    return(
        <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={4}>
                <DocCard />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={4}>
              <DocCard />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={4}>
              <DocCard />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={4}>
              <DocCard />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={4}>
              <DocCard />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={4}>
              <DocCard />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={4}>
              <DocCard />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={4}>
              <DocCard />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={4}>
              <DocCard />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={4}>
              <DocCard />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={4}>
              <DocCard />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={4}>
              <DocCard />
              </Grid>

        </Grid>  
    )
}

export default PdfGrid;
