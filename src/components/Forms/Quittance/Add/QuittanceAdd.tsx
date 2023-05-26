import React, { useEffect } from 'react'
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import {  Grid, Box,Paper  } from '@mui/material';
import {  Typography, MenuItem, Select,Divider  } from '@mui/material';
import axios from 'axios';  

import {
    fetchIntermediaires,
    fetchPolice,
    fetchVersionsCommerciales,
    fetchRefQuittances,
  } from '../../../../api/service/provideData';

  import  { PolicePayload } from '../../../../api/interface/policePayload';
  import  { VersionsCommerciales } from '../../../../api/interface/versionsCommercialesPayload';
  import  { RefQuittancePayload } from '../../../../api/interface/refQuittancePayload';
  import  { intermediarePayload } from '../../../../api/interface/intermediarePayload';
import { ToastContainer, toast } from 'react-toastify';
  
 
 


function QuittanceAdd( ) {  

    const [intermediaires, setIntermediaires] = useState<intermediarePayload[] | null>(null); 
    const [polices, setPolices] = useState<PolicePayload[] | null>(null);
    const [versionsCommerciales, setVersionsCommerciales] = useState <VersionsCommerciales[] | null>(null);
    const [refQuittances, setRefQuittances] = useState<RefQuittancePayload[] | null>(null);
  

 

    const [formData, setFormData] = useState({
        exercice: "",
        ordre: "", 
        intermediaireid: 1,
        refQuittanceid: 1,
        qtcRemiseid: 1,
        habUtilisateurid: 5923310,
         policeid: 21,  
        versioncommerciale:9985338,
        datedebut: "",
        datefin: "",
        tauxtaxe:0,
        montantaccessoire:0,
        tauxcommission:25,
        dateetat:"",
        villeclient:0   ,
        primenette   :0  ,
        montanttaxeparafiscale:0,
        primeGareEve:0,
        tauxprimenette:0,
        dateemission:"",
        numeroquittance:"",
        idCodePolice:0

      
      });
    
      const handleInputChange = (event: { target: { name: any; value: any; }; }) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      };
    
      const handleSubmit = (event: { preventDefault: () => void; }) => {


        axios.post('http://localhost:8081/quittances', formData)
        .then(response => {
          console.log(response.data);
          toast.success('Quittance bien  enregistrer !', { position: toast.POSITION.TOP_RIGHT });
        })
        .catch(error => {
          console.log(error);
          toast.error('Erreur lors de la requête !', { position: toast.POSITION.TOP_RIGHT });
        });



        event.preventDefault();
        console.log(formData);
      };

      const options = [0, 10, 15, 20, 30];


 
      useEffect(() => {
        const fetchData = async () => {
          const intermediairesData = await fetchIntermediaires();
          setIntermediaires(intermediairesData);
    
          const policesData = await fetchPolice();
          setPolices(policesData);
    
          const versionsCommercialesData = await fetchVersionsCommerciales();
          setVersionsCommerciales(versionsCommercialesData);
    
          const refQuittancesData = await fetchRefQuittances();
          setRefQuittances(refQuittancesData);
        };
    
        fetchData();
      }, []);
 


      const handleBlur = () => {
        const codePolice = formData.idCodePolice; 
        const apiUrl = `http://localhost:8081/polices/search?codePolice=${codePolice}`;
      
        fetch(apiUrl)
          .then(response => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error("Erreur lors de la recherche de la police");
            }
          })
          .then(data => {
           
            if (data.length === 0) {
              alert("Police non trouvée");
            }  
            else{
              console.log(data[0].id);  
              const updatedFormData = { ...formData, policeid: data[0].id };
              setFormData(updatedFormData); 
            }
          })
          .catch(error => {
            alert(error.message);
          });
      };

  return (
    <> 


<ToastContainer />
    
    <Typography variant="h5" align="center" color="primary" gutterBottom>
    Ajouter quittance
    </Typography>
    <Box sx={{ padding: '1rem' }}>
      <form onSubmit={handleSubmit}>


      


        <Grid container spacing={2}>
 


   <Grid item xs={12} sm={4}>
            <TextField
              id="numeroquittance"
              name="numeroquittance"
              label="Numero quittance "
              variant="outlined"
              placeholder='9900202308905182'
              value={formData.numeroquittance}
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
              id="idCodePolice"
              name="idCodePolice"
              label="Numero police "
              variant="outlined" 
              value={formData.idCodePolice}
              onChange={handleInputChange}
              type="text"
              onBlur={handleBlur}  
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
            />
   </Grid>


     
      

    <Grid item xs={12} sm={4}>
                <label> versioncommerciale</label>
        <Select 
          id="versioncommerciale"
          name="versioncommerciale" 
          label=" versioncommerciale "
          variant="outlined" 
          value={formData.versioncommerciale}
          onChange={handleInputChange}
          fullWidth
        >
             <MenuItem  >   </MenuItem>
          {versionsCommerciales?.map((versionsCommerciale: any) => (
            <MenuItem key={versionsCommerciale.id} value={versionsCommerciale.id}>
              {versionsCommerciale.nomcommercial}
            </MenuItem>
          ))}
        </Select>
      </Grid>


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
                <label>Intermediaire</label>
                <Select 
                id="intermediaireid"
                name="intermediaireid" 
                label="Numero intermediaire "
                variant="outlined" 
                value={formData.intermediaireid}
                onChange={handleInputChange}
                fullWidth
                >
                {intermediaires?.map((intermediaire: any) => (
                    <MenuItem key={intermediaire.id} value={intermediaire.id}>
                    {intermediaire.nomCommercial}
                    </MenuItem>
                ))}
                </Select>
         </Grid>


 

          <Grid item xs={12} sm={4}>
                <label>Etat Quittance</label>
        <Select 
          id="refQuittanceid"
          name="refQuittanceid" 
          label=" Quittance Nature "
          variant="outlined" 
          value={formData.refQuittanceid}
          onChange={handleInputChange}
          fullWidth
        >
          {refQuittances?.map((refQuittance: any) => (
            <MenuItem key={refQuittance.id} value={refQuittance.id}>
              {refQuittance.etatQuittance}
            </MenuItem>
          ))}
        </Select>
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
              id="dateemission "
              name="dateemission"
              label="Date  Emission "
              variant="outlined"
              value={formData.dateemission}
              onChange={handleInputChange}
              type="date"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
            />   </Grid>

          
            <Grid item xs={12} sm={4}>
                <TextField
                id="Dateetat"
                name="dateetat"
                label="Dateetat"
                variant="outlined"
                value={formData.dateetat}
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
          <Grid item xs={12} sm={4} >
            <TextField
             id="tauxprimenette"
             name="tauxprimenette"
             label="Taux Prime Nette"
              variant="outlined"
              value={formData.tauxprimenette}
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
            <TextField
              id="TtaxeParafiscale"
              name="montanttaxeparafiscale"
              label="T.taxeParafiscale"
              variant="outlined"
              value={formData.montanttaxeparafiscale}
              onChange={handleInputChange}
              type="number"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>

         

          <Grid item xs={12} sm={4}>
            <label htmlFor="">Montant Accessoire</label>
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
      <label htmlFor=""> </label>
      <Grid item xs={12} sm={4}>
            <TextField
              id="PrimeGareEve"
              name="primeGareEve"
              label="PrimeGareEve"
              variant="outlined"
              value={formData.primeGareEve}
              onChange={handleInputChange}
              type="number"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
            />
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
