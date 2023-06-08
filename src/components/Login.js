import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import img from './banner-2.jpg';
import { Toolbar } from '@mui/material';

const defaultTheme = createTheme({
  bgcolor: {
    primary: "#eeeeee",
    secondary: "#F4ECEC",
  },
  imgtheme: "#eeeeee",
  text: {
    t1: "#A72C63",
    t2: "#FFFFFF",
  },
});

export default function SignInSide() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh'}}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={6}
          md={8}
          lg={8}
          sx={{
            backgroundImage: `url(${img})`,
            backgroundColor: defaultTheme.imgtheme,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={6} md={4} component={Paper} elevation={6} square sx={{ backgroundColor: defaultTheme.bgcolor.secondary}}>
          <Toolbar />
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: `center`,
            }}
          >
            <Box 
              component="img"
              src="logo_scroll.png"
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{width:"250px", height:"100px"}}
              margin={3}
            />
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="dense"
                sx={{bgcolor: defaultTheme.text.t2}}
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                sx={{bgcolor:defaultTheme.text.t2}}
                margin="dense"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 , bgcolor:defaultTheme.text.t1}}
              >
                Sign In
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
