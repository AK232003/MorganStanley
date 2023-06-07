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
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import BadgeIcon from '@mui/icons-material/Badge';
import EngineeringIcon from '@mui/icons-material/Engineering';
import LogoutIcon from '@mui/icons-material/Logout';

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

function NavDraweradmin(){

    return (
        <ThemeProvider theme = {theme}>
                <Box sx={{
                    height: "100%",
                    bgcolor: theme.sidebar.palette.secondary,
                    display: "flex",
                    flexDirection: "column",
                }}>
                    <Box display="flex" justifyContent="center"  sx={{bgcolor: theme.sidebar.palette.primary, height:"85px"}}>
                        <Box display="flex" justifyContent="center" marginTop={2}>
                            <Avatar alt="Remy Sharp" src="logo_scroll.png" sx={{width:"50px", height:"50px", bgcolor:theme.sidebar.text.primary1}}/>
                                <Box>
                                <Box display="flex" marginLeft={2} marginRight={1} marginTop={0} justifyContent="center">
                                    <Typography variant="h7" noWrap component="div" sx={{color:theme.sidebar.text.primary1}}>
                                    Name
                                    </Typography>
                                </Box>
                                <Box display="flex" marginLeft={2} marginRight={1} marginBottom={0} justifyContent="center">
                                    <Typography variant="h8" noWrap component="div" sx={{color:theme.sidebar.text.primary1}}>
                                    Administrator
                                    </Typography>
                                </Box>
                            </Box> 
                        </Box>
                    </Box>
                    <Divider sx={{ borderBottomWidth: 2, bgcolor: theme.sidebar.divider.primary}}/>
                    
                    <Box paddingLeft={1} sx={{height:"81%"}}>
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
                                    <GroupAddIcon />
                                </ListItemIcon>
                                <ListItemText primary="Add User"/>
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding sx={{height:"60px"}}>
                            <ListItemButton >
                                <ListItemIcon>
                                    <BadgeIcon />
                                </ListItemIcon>
                                <ListItemText primary="Manager List"/>
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding sx={{height:"60px"}}>
                            <ListItemButton >
                                <ListItemIcon>
                                    <EngineeringIcon />
                                </ListItemIcon>
                                <ListItemText primary="Worker List"/>
                            </ListItemButton>
                        </ListItem>
                    </List>
                    </Box>
                    <Divider sx={{ borderBottomWidth: 2, bgcolor: theme.sidebar.divider.primary}}/>
                    <Box paddingLeft={1.5} sx={{bgcolor: theme.sidebar.logout.red}}>
                        <List>
                            <ListItem disablePadding sx={{height:"60px"}}>
                                <ListItemButton >
                                    <ListItemIcon>
                                        <LogoutIcon sx={{color: theme.sidebar.logout.white}}/>
                                    </ListItemIcon>
                                    <ListItemText primary="Log Out" sx={{color: theme.sidebar.logout.white}}/>
                                </ListItemButton>
                            </ListItem>
                        </List>
                    </Box>
                </Box>

        </ThemeProvider>
    );
}

export default NavDraweradmin;