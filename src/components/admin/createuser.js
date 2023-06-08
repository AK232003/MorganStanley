import * as React from 'react';
import { Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

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

function CreateUser(){
    return (
        <ThemeProvider theme={defaultTheme}>
        <Box component="form" justifyContent="center" alignItems="center">
            <Typography display="flex" variant="h5" component="div" margin={2} justifyContent="center">
                Create User
            </Typography>
            <TextField
                margin="dense"
                sx={{bgcolor: defaultTheme.text.t2}}
                required
                fullWidth
                id="name"
                label="Name"
                name="Name"
                autoComplete="Name"
                autoFocus
              />
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
              <TextField
                margin="dense"
                sx={{bgcolor: defaultTheme.text.t2}}
                required
                fullWidth
                id="number"
                label="Phone Number"
                name="Phone Number"
                autoComplete="Phone Number"
                autoFocus
              />
              <TextField
                margin="dense"
                sx={{bgcolor: defaultTheme.text.t2}}
                required
                fullWidth
                id="id"
                label="User ID"
                name="User ID"
                autoComplete="User ID"
                autoFocus
              />
              <Box marginTop={1} display="flex" justifyContent="center" alignItems="center" flexDirection={{flexDirection:"column", sm:"row"}}>
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: {mt:3, sm:1}, mb: 1 , ml: 1, mr: 1, bgcolor:defaultTheme.text.t1}}
              >
                Create User
              </Button>
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 1, mb: 1 , ml: 1, mr: 1, bgcolor:defaultTheme.text.t1}}
              >
                Create Manager
              </Button>
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 1, mb: 1 , ml: 1, mr: 1, bgcolor:defaultTheme.text.t1}}
              >
                Create Admin
              </Button>
              </Box>
        </Box>
        </ThemeProvider>
    )
}

export default CreateUser;