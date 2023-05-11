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
import store from './Store';
import { useDispatch } from 'react-redux';

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

export default function SignInSide(props: any) {


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

 
  const dispatch = useDispatch();
     
  const authentifier = (event: { preventDefault: () => void; }) => {


    axios.post('http://localhost:8081/api/v1/auth/authenticate', login)
    .then(response => {
      console.log(response.data.access_token);
      props.onDataReceived("Hello from Fille1 "+response.data);
      window.location.href = '/';

alert(response.data.access_token )
      dispatch({ type: 'SET_VALUE', payload: response.data.access_token });


      localStorage.setItem('token', response.data.access_token);

    //  toast.success('Connexion réussie !');
    })
    .catch(error => {
      toast.error('Connexion échouée.');
      console.log(error);
    });



    event.preventDefault();
    console.log(login);
  };




  const [login, setLogin] = useState({
    email: '',
    password: '', 
  });


  return (
    <ThemeProvider theme={theme}>
      <ToastContainer />
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
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
                label="utilisateur"
                name="user"
                autoFocus
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
      </Grid>
    </ThemeProvider>
  );
}
