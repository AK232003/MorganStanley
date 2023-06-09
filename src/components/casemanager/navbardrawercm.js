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
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import FilePresentIcon from '@mui/icons-material/FilePresent';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import LogoutIcon from '@mui/icons-material/Logout';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import ForumIcon from '@mui/icons-material/Forum';


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

function NavDrawercm(){

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
                                    Case Manager
                                    </Typography>
                                </Box>
                            </Box> 
                        </Box>
                    </Box>
                    <Divider sx={{ borderBottomWidth: 2, bgcolor: theme.sidebar.divider.primary}}/>
                    
                    <Box paddingLeft={1} sx={{height:"80%"}}>
                    <List justifyContent="center" >
                        <ListItem disablePadding sx={{height:"60px"}}>
                            <ListItemButton >
                                <ListItemIcon>
                                    <HomeIcon />
                                </ListItemIcon>
                                <ListItemText primary="Home"/>
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding sx={{height:"60px"}}>
                            <ListItemButton >
                                <ListItemIcon>
                                    <PersonAddIcon />
                                </ListItemIcon>
                                <ListItemText primary="Add Child"/>
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding sx={{height:"60px"}}>
                            <ListItemButton >
                                <ListItemIcon>
                                    <FilePresentIcon />
                                </ListItemIcon>
                                <ListItemText primary="Add Bulk Data"/>
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding sx={{height:"60px"}}>
                            <ListItemButton >
                                <ListItemIcon>
                                    <FormatListBulletedIcon />
                                </ListItemIcon>
                                <ListItemText primary="Children List"/>
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding sx={{height:"60px"}}>
                            <ListItemButton >
                                <ListItemIcon>
                                    <FormatListNumberedIcon />
                                </ListItemIcon>
                                <ListItemText primary="Cases List"/>
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding sx={{height:"60px"}}>
                            <ListItemButton >
                                <ListItemIcon>
                                    <ForumIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Proposals"/>
                            </ListItemButton>
                        </ListItem>
                    </List>
                    </Box>
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

        </ThemeProvider>
    );
}

export default NavDrawercm;