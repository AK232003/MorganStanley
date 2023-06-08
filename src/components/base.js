import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import NavDrawergs from './groundworker/navbardrawerground';
import NavDraweradmin from './admin/navbardraweradmin';
import NavDrawercm from './casemanager/navbardrawercm';
import Cardlist from './allcards';
import Addchild from './casemanager/addchild';
import AddchildXL from './casemanager/addchildxl';
import { Outlet } from "react-router-dom";
import PdfGrid from './document';
import CreateUser from './admin/createuser';

const drawerWidth = 240;

const theme = createTheme({
    appbar: {
        bgcolor: "#362740",
    }
});

function Base({navBar}) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
          <Box sx={{ display: 'flex'}}>
          <CssBaseline />
          <AppBar
              position="fixed"
              sx={{
                  width: { sm: `calc(100% - ${drawerWidth}px)` },
                  ml: { sm: `${drawerWidth}px` },
                  bgcolor: theme.appbar.bgcolor,
                  height: {height:"65px", sm:"85px"}
              }}
          >
              <Toolbar>
              <IconButton
                  color="inherit"

                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                  sx={{ mt: 1, mr: 2, display: { sm: 'none' } }}
              >
                  <MenuIcon />
              </IconButton>
                  {/* <img src="logo_scroll.png" width="110px"/> */}
                  <Box 
                      component="img"
                      src="logo_scroll.png"
                      sx={{
                          marginTop:{marginTop:10, sm:2},
                          height: {height:"45px", sm:"55px"},
                          width: {width: "120px", sm:"160px"}
                      }}
                      justifyContent="center"
                  />
              </Toolbar>
          </AppBar>
          <Box
              component="nav"
              sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
              aria-label="mailbox folders"
          >
              {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
              <Drawer
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                  keepMounted: true, // Better open performance on mobile.
              }}
              sx={{
                  display: { xs: 'block', sm: 'none' },
                  '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
              }}
              >
              {navBar}
              </Drawer>
              <Drawer
              variant="permanent"
              sx={{
                  display: { xs: 'none', sm: 'block' },
                  '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
              }}
              open
              >
              {navBar}
              </Drawer>
          
          </Box>
          <Box
              component="main"
              sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` }}}
              marginTop="10px"
          >
            <Toolbar />
            {/* <Addchild /> */}
            {/* <Cardlist /> */}

            {/* <PdfGrid /> */}
            <CreateUser />
          </Box>
          </Box>
      </ThemeProvider>
    </div>
  );
}

export default Base;