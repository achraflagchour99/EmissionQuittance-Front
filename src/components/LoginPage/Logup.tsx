 import React, {useCallback, useEffect, useMemo, useState,createContext} from 'react';
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import rmaLogo from "../../assets/images/rma-logo.bmp";
import rmaImage from "../../assets/images/rma-image.png";
import classes from "./Login.module.css";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import { BrowserRouter, Routes, Route,HashRouter} from 'react-router-dom'  
import { useDispatch, useSelector } from 'react-redux';
import store from './Store'; 
import jwtDecode from 'jwt-decode';



type State = {
  value: string;
  setValue: (value: string) => void;
};

function Copyright(props: any) {

 

  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://www.rmaassurance.com/">
        RMA
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

interface MyState {
  value: string;
}


export default function SignUpSide(props: any) {

 

 
   
     
  const authentifier = (event: { preventDefault: () => void; }) => {


    axios.post('http://localhost:8081/api/v1/auth/register', login)
    .then(response => {
      
    

  
       
 
    const decodedToken = jwtDecode(response.data.access_token);
    const nom = (decodedToken as { lastname: string }).lastname;
    const prenom = (decodedToken as { firstName: string }).firstName;

    
    const user = { nom, prenom };
    localStorage.setItem('user', JSON.stringify(user));
 
 

      localStorage.setItem('token', response.data.access_token);
      toast.success('Utilisateur bien enregistrer');
window.location.href = '/SignIn';
    //  toast.success('Connexion réussie !');
    })
    .catch(error => {
      console.log(login.email,login.password)
      toast.error('Connexion échouée.');
      console.log(error);
    });



    event.preventDefault();
    console.log(login);
  };




  const [login, setLogin] = useState({
    email: '',
    password: '', 
    firstname: '', 
    lastname: '', 

  });


  return (
    <ThemeProvider theme={theme}>
      <ToastContainer />
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
       
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              className={classes.logo}
              src={rmaLogo}
              alt=" dentreprise"
            ></img>
              <Box    >


              <TextField
                margin="normal"
                required
                fullWidth
                id="user"
                label="firstname"
                name="firstname"
                autoFocus
                onChange={(e) =>
                  setLogin({ ...login, firstname: e.target.value })
                }
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="lastname"
                label="lastname"
                type="text"
                id="lastname" 
                onChange={(e) =>
                  setLogin({ ...login, lastname: e.target.value })
                }
              />
                <TextField
                margin="normal"
                required
                fullWidth
                name="text"
                label="Adresse"
                type="text"
                id="email" 
                onChange={(e) =>
                  setLogin({ ...login, email: e.target.value })
                }
              />
                <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="mot de passe"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) =>
                  setLogin({ ...login, password: e.target.value })
                }
              />
              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={authentifier}
              >
                Login
              </Button>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://source.unsplash.com/random)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}>
            <img src={rmaImage} className={classes.image} alt="rma headquartures"></img>
          </Grid>
      </Grid>
    </ThemeProvider>
  );
}
