import * as React from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import HomeIcon from '@mui/icons-material/Home';
import LooksOneIcon from '@mui/icons-material/LooksOne';
import LooksTwoIcon from '@mui/icons-material/LooksTwo';
import Looks3Icon from '@mui/icons-material/Looks3';
import Looks4Icon from '@mui/icons-material/Looks4';
import LogoutIcon from '@mui/icons-material/Logout';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import TvIcon from '@mui/icons-material/Tv';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import SummarizeIcon from '@mui/icons-material/Summarize';

const theme = createTheme({
    sidebar: {
        palette: {
            primary: "#362740",
            secondary: "#EEEEEE",
        },
        divider: {
            primary: "#000000",
        },
        text:{
            primary1: "#FFFFFF",
            primary2: "#000000",
        },
        logout:{
            red: "#d50000",
            white: "#FFFFFF",
        }
    }
});

function ProcessItems({processVar}){
    const [open, setOpen] = React.useState(true);
    const handleClick = () => {
        setOpen(!open);
    };
    if(processVar===false)
    {
        return null
    }
    return(
        <>
        <ListItemButton onClick={handleClick}>
                            <ListItemIcon>
                            <LooksOneIcon />
                            </ListItemIcon>
                            <ListItemText primary="Document Completion" />
                            {open ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }}>
                                <ListItemIcon>
                                <NewspaperIcon />
                                </ListItemIcon>
                                <ListItemText primary="News Report" />
                            </ListItemButton>
                            <ListItemButton sx={{ pl: 4 }}>
                                <ListItemIcon>
                                <TvIcon />
                                </ListItemIcon>
                                <ListItemText primary="TV Report" />
                            </ListItemButton>
                            <ListItemButton sx={{ pl: 4 }}>
                                <ListItemIcon>
                                <PersonSearchIcon />
                                </ListItemIcon>
                                <ListItemText primary="Missing Report" />
                            </ListItemButton>
                            <ListItemButton sx={{ pl: 4 }}>
                                <ListItemIcon>
                                <MedicalInformationIcon />
                                </ListItemIcon>
                                <ListItemText primary="Medical Report" />
                            </ListItemButton>
                            <ListItemButton sx={{ pl: 4 }}>
                                <ListItemIcon>
                                <SummarizeIcon />
                                </ListItemIcon>
                                <ListItemText primary="SI Report" />
                            </ListItemButton>
                            </List>
                        </Collapse>
                        <ListItem disablePadding sx={{height:"40px", marginBottom:"0.5rem"}}>
                            <ListItemButton >
                                <ListItemIcon>
                                    <LooksTwoIcon />
                                </ListItemIcon>
                                <ListItemText primary="NOC Certificate"/>
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding sx={{height:"40px", marginBottom:"0.7rem"}}>
                            <ListItemButton >
                                <ListItemIcon>
                                    <Looks3Icon />
                                </ListItemIcon>
                                <ListItemText primary="LFA Certificate"/>
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding sx={{height:"40px", marginTop:"0.7rem"}}>
                            <ListItemButton >
                                <ListItemIcon>
                                    <Looks4Icon/>
                                </ListItemIcon>
                                <ListItemText primary="Upload to CARINGS"/>
                            </ListItemButton>
                        </ListItem>
        </>
    )
};

function NavDrawergw(){
  
    const stepvar = true;

    return (
        <ThemeProvider theme = {theme}>
                <Box sx={{
                    height: "100%",
                    bgcolor: theme.sidebar.palette.secondary,
                    display: "flex",
                    flexDirection: "column",
                }}>
                    <Box display="flex" justifyContent="center"  sx={{bgcolor: theme.sidebar.palette.primary, height:{height:"90px", sm:"65px"}}}>
                        <Box display="flex" justifyContent="center" sx={{marginTop:{marginTop:"1.4rem", sm:"0.7rem"}}}>
                            <Avatar alt="Remy Sharp" src="logo_scroll.png" sx={{width:"50px", height:"50px", bgcolor:theme.sidebar.text.primary1}}/>
                                <Box>
                                <Box display="flex" marginLeft={2} marginRight={1} marginTop={0} justifyContent="center">
                                    <Typography variant="h7" noWrap component="div" sx={{color:theme.sidebar.text.primary1}}>
                                    Name
                                    </Typography>
                                </Box>
                                <Box display="flex" marginLeft={2} marginRight={1} marginBottom={0} justifyContent="center">
                                    <Typography variant="h8" noWrap component="div" sx={{color:theme.sidebar.text.primary1}}>
                                    Ground Worker
                                    </Typography>
                                </Box>
                            </Box> 
                        </Box>
                    </Box>
                    {/* <Divider sx={{ borderBottomWidth: 2, bgcolor: theme.sidebar.divider.primary}}/> */}
                    
                    <Box display="flex" flexDirection="column" overflow="auto">
                    <Box paddingLeft={1}>
                    <List disablePadding justifyContent="center" >
                        <ListItem disablePadding sx={{height:"40px"}}>
                            <ListItemButton >
                                <ListItemIcon>
                                    <HomeIcon />
                                </ListItemIcon>
                                <ListItemText primary="Home"/>
                            </ListItemButton>
                        </ListItem>
                        <ProcessItems processVar={stepvar}/>
                    </List>
                    </Box >
                    <Box display="flex" justifyContent="center" position="fixed" bottom={0} sx={{width:"240px", bgcolor: theme.sidebar.logout.red}}>
                            <ListItem display="flex" flexDirection="row" sx={{height:"65px"}}>
                                <ListItemButton >
                                    <ListItemIcon>
                                        <LogoutIcon sx={{color: theme.sidebar.logout.white}}/>
                                    </ListItemIcon>
                                    <ListItemText primary="Log Out" sx={{color: theme.sidebar.logout.white}}/>
                                </ListItemButton>
                            </ListItem>
                    </Box>
                    </Box>
                </Box>

        </ThemeProvider>
    );
}

export default NavDrawergw;