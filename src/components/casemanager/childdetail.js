import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Media } from 'reactstrap';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { Box, Toolbar } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';

const theme = createTheme({
    card: {
        palette: {
            bgcolor: "#EEEEEE",
        },
        buttons: {
            bgcolor: "#A72C63",
            txtcolor: "#FFFFFF",
        }
    }
});

function ChildDetails(){
    return(
        <ThemeProvider theme={theme}>
            <Card display="flex" flexDirection="row" sx={{backgroundColor:theme.card.palette.bgcolor}}>
                <Typography marginLeft={1.2} marginTop={2} variant="h4" component="div">
                    <b>Child Details for CI</b>
                </Typography>
                <Divider />
                <Box marginBottom={2} display="flex" justifyContent="space-between" alignItems="center">
                    <Box marginTop={1}>
                    <Typography marginLeft={2} variant="h6" component="body2">
                        <b>Case Status </b>
                    </Typography>
                    <br />
                    <Typography marginLeft={2}lineHeight={1} component="body2" color="text.secondary" sx={{fontSize:"0.8rem"}}> 
                        <b>Case Number: </b>
                    </Typography>
                    <br />
                    <Typography marginLeft={2} lineHeight={1} component="body2" color="text.secondary" sx={{fontSize:"0.8rem"}}> 
                        <b>Deadline: </b>
                    </Typography>
                    <br />
                    {/* <Typography marginLeft={2} lineHeight={1} component="body2" color="text.secondary" sx={{fontSize:"0.8rem"}}> 
                        <b>Case Manager: </b>
                    </Typography> */}
                    </Box>
                    <Box marginTop={2} marginRight={2}>
                        <Avatar alt="Remy Sharp" src="logo_scroll.png" sx={{width:"80px", height:"80px"}}/>
                    </Box>                   
                </Box>
                <Divider />
                <Typography marginLeft={2} lineHeight={1} variant="h6" component="body2">
                    <b>Case Details </b>
                </Typography>
                <br />
                <Typography margin={2} lineHeight={2.5} component="body2" color="text.secondary" sx={{fontSize:"0.8rem"}}> 
                    <b>Name: </b>
                </Typography>
                <br />
                <Typography margin={2} lineHeight={2.5} component="body2" color="text.secondary" sx={{fontSize:"0.8rem"}}> 
                    <b>Age: </b>
                </Typography>
                <br />
                <Typography margin={2} lineHeight={2.5} component="body2" color="text.secondary" sx={{fontSize:"0.8rem"}}> 
                    <b>Date of Birth: </b>
                </Typography>
                <br />
                <Typography margin={2} lineHeight={2.5} component="body2" color="text.secondary" sx={{fontSize:"0.8rem"}}> 
                    <b>Gender: </b>
                </Typography>
                <br />
                <Typography margin={2} lineHeight={2.5} component="body2" color="text.secondary" sx={{fontSize:"0.8rem"}}> 
                    <b>District: </b>
                </Typography>
                <br />
                <Typography margin={2} lineHeight={2.5} component="body2" color="text.secondary" sx={{fontSize:"0.8rem"}}> 
                    <b>State: </b>
                </Typography>
                <br />
                <Typography margin={2} lineHeight={2.5} component="body2" color="text.secondary" sx={{fontSize:"0.8rem"}}> 
                    <b>Child Category: </b>
                </Typography>
                <br />
                <Typography margin={2} lineHeight={2.5} component="body2" color="text.secondary" sx={{fontSize:"0.8rem"}}> 
                    <b>Disabled: </b>
                </Typography>
                <br />
                <Typography margin={2} lineHeight={2.5} component="body2" color="text.secondary" sx={{fontSize:"0.8rem"}}> 
                    <b>Siblings: </b>
                </Typography>
                <br />
                <Typography margin={2} lineHeight={2.5} component="body2" color="text.secondary" sx={{fontSize:"0.8rem"}}> 
                    <b>Gaurdians: </b>
                </Typography>
                <br />
                <Typography margin={2} lineHeight={2.5} component="body2" color="text.secondary" sx={{fontSize:"0.8rem"}}> 
                    <b>Case History: </b>
                </Typography>
                <br />
                <Typography margin={2} lineHeight={2.5} component="body2" color="text.secondary" sx={{fontSize:"0.8rem"}}> 
                    <b>Last Visit Since: </b>
                </Typography>
                <br />
                <Typography margin={2} lineHeight={2.5} component="body2" color="text.secondary" sx={{fontSize:"0.8rem"}}> 
                    <b>Total Shelter Home Stay: </b>
                </Typography>
                <br />
                <Typography margin={2} lineHeight={2.5} component="body2" color="text.secondary" sx={{fontSize:"0.8rem"}}> 
                    <b>Comments: </b>
                </Typography>
                <br />
            </Card>
            <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Box marginTop={2} marginLeft={0}>
                            
                        </Box>
                        <Box marginTop={2} marginRight={0}>
                            <Button type="submit" sx={{color:theme.card.buttons.txtcolor, bgcolor:theme.card.buttons.bgcolor}}>
                                Download PDF
                            </Button>
                        </Box>
                    </Box>
        </ThemeProvider>
    )
}

export default ChildDetails;