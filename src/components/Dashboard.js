import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import "bootstrap/dist/css/bootstrap.min.css";
import LogoutIcon from '@mui/icons-material/Logout';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import Button from '@mui/material/Button';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const theme = createTheme({
  palette: {
    background: {
      paper: '#F4ECEC',
    },
    txt: {
      primary: '#F4ECEC',
    },
    appbar: {
      primary: '#362740',
    },
    addchild: {
      primary: '#69BF64',
    },
  },
});

const drawerWidth = 250;

function Dashboard() {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar sx={{ height: "20%", bgcolor: 'appbar.primary', justifyContent: 'center' }}>
        <img src="logo_scroll.png" />
      </Toolbar>
      <Divider />
      <List>
        {['Profile', '1', '2', '3', '4', 'Logout'].map((text, index) => {
          let icon = null;
          if (index === 0) {
            icon = <AccountBoxIcon />;
          } else if (index === 1) {
            icon = null;
          } else if (index === 2) {
            icon = null;
          } else if (index === 3) {
            icon = null;
          } else if (index === 4) {
            icon = null;
          } else if (index === 5) {
            icon = <LogoutIcon />;
          }

          return (
            <ListItem key={text} >
              <ListItemButton alignItems='flex'>
                <ListItemIcon>
                  {icon}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </div>
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box>
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100%px)` },
            ml: { sm: `${drawerWidth}px` },
            bgcolor: "appbar.primary",
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'block' }, color: "txt.primary" }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h5" noWrap component="div" sx={{ color: "txt.primary" }}>
              HOME PAGE
            </Typography>
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            sx={{
              display: { xs: 'block', sm: 'block' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
          >
            {drawer}
          </Drawer>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', position: 'fixed', bottom: 0, right: 0, padding: '1rem', width: '100%' }} >
        <Button variant="contained" sx={{ height: 40, bgcolor: 'addchild.primary' }} startIcon={<PersonAddIcon />}>
          Add Child
        </Button>
      </Box>
    </ThemeProvider>
  );
}

export default Dashboard;
