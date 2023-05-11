import React, { useEffect } from 'react'
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import {  Grid, Box } from '@mui/material';
import {  Typography, MenuItem, Select,Divider  } from '@mui/material';
import axios from 'axios'; 
import { useDispatch, useSelector } from 'react-redux';
import store from "../../../LoginPage/Store";  

interface MyState {
    value: string;
  }

 
  

 


function QuittanceAdd( ) {  



   


    const dispatch = useDispatch();
    const value = useSelector((state: MyState) => state.value);


    dispatch({ type: 'SET_VALUE', payload: "response.data" });
    console.log('fe '+value);  

    const [formData, setFormData] = useState({
        exercice: "",
        ordre: "",
        villeclient: 2,
        intermediaireid: 8,
        refQuittanceid: 2,
        qtcRemiseid: 1,
        habUtilisateurid: 1,
        policeid: 5,
        dateEcheance: "",
        dateTerme: "",
        dateeffet: "",


        datedebut: "",
        datefin: "",

        tauxtaxe:0,
        montantaccessoire:0,
        tauxcommission:25
      });
    
      const handleInputChange = (event: { target: { name: any; value: any; }; }) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      };
    
      const handleSubmit = (event: { preventDefault: () => void; }) => {


        axios.post('http://localhost:8081/quittances/', formData)
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.log(error);
        });



        event.preventDefault();
        console.log(formData);
      };

      const options = [0, 10, 15, 20, 30];



      dispatch({ type: 'SET_VALUE', payload: "response.data" });
      console.log('fe '+value);  


      useEffect(() => {
       
      }, [value]);


      

  return (
    <> 



    
    <Typography variant="h5" align="center" color="primary" gutterBottom>
    Ajouter quittance
    </Typography>
    <Box sx={{ padding: '1rem' }}>
      <form onSubmit={handleSubmit}>


      


        <Grid container spacing={2}>


        <Grid item xs={12} sm={4}>
            <TextField
              id="exercice"
              name="exercice"
              label="exercice"
              variant="outlined"
              value={formData.exercice}
              onChange={handleInputChange}
              type="text"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              id="ordre"
              name="ordre"
              label="ordre"
              variant="outlined"
              value={formData.ordre}
              onChange={handleInputChange}
              type="text"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              id="villeclient"
              name="villeclient"
              label="villeclient"
              variant="outlined"
              value={formData.villeclient}
              onChange={handleInputChange}
              type="text"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              id="intermediaireid"
              name="intermediaireid"
              label="intermediaireid"
              variant="outlined"
              value={formData.intermediaireid}
              onChange={handleInputChange}
              type="text"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              id="refQuittanceid"
              name="refQuittanceid"
              label="refQuittanceid"
              variant="outlined"
              value={formData.refQuittanceid}
              onChange={handleInputChange}
              type="text"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              id="qtcRemiseid"
              name="qtcRemiseid"
              label="qtcRemiseid"
              variant="outlined"
              value={formData.qtcRemiseid}
              onChange={handleInputChange}
              type="text"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              id="habUtilisateurid"
              name="habUtilisateurid"
              label="habUtilisateurid"
              variant="outlined"
              value={formData.habUtilisateurid}
              onChange={handleInputChange}
              type="text"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              id="policeid"
              name="policeid"
              label="policeid"
              variant="outlined"
              value={formData.policeid}
              onChange={handleInputChange}
              type="text"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>





          <Grid item xs={12} sm={4}>
            <TextField
              id="dateEcheance"
              name="dateEcheance"
              label="Date d'échéance"
              variant="outlined"
              value={formData.dateEcheance}
              onChange={handleInputChange}
              type="date"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              id="dateTerme"
              name="dateTerme"
              label="Date de terme"
              variant="outlined"
              value={formData.dateTerme}
              onChange={handleInputChange}
              type="date"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              id="dateeffet"
              name="dateeffet"
              label="Date d'effet"
              variant="outlined"
              value={formData.dateeffet}
              onChange={handleInputChange}
              type="date"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              id="datedebut"
              name="datedebut"
              label="datedebut"
              variant="outlined"
              value={formData.datedebut}
              onChange={handleInputChange}
              type="date"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              id="datefin"
              name="datefin"
              label="datefin"
              variant="outlined"
              value={formData.datefin}
              onChange={handleInputChange}
              type="date"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>

          <Divider orientation="vertical"  sx={{ my: 10 }}  variant="fullWidth" color="secondary"   /> 

 
       

          <Grid item xs={12} sm={4} >
            <TextField
              id="tauxtaxe"
              name="tauxtaxe"
              label="tauxtaxe"
              variant="outlined"
              value={formData.tauxtaxe}
              onChange={handleInputChange}
              type="number"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              id="tauxcommission"
              name="tauxcommission"
              label="tauxcommission"
              variant="outlined"
              value={formData.tauxcommission}
              onChange={handleInputChange}
              type="number"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>

         

          <Grid item xs={12} sm={4}>
        <Select
          id="montantaccessoire"
          name="montantaccessoire"
          label="montantaccessoire"
          variant="outlined"
          value={formData.montantaccessoire}
          onChange={handleInputChange}
          fullWidth
        >
          {options.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </Grid>

       
          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>

</>
  )
}

export default QuittanceAdd    

function configureStore(arg0: { reducer: { value: any; }; }) {
    throw new Error('Function not implemented.');
}
