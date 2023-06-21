import React, { useEffect } from 'react'
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import {  Grid, Box,Paper, InputLabel, FormControl, NativeSelect, TableBody, TableContainer, TableHead, TableRow  } from '@mui/material';
import {  Typography, MenuItem, Select,Divider  } from '@mui/material';
import axios from 'axios';  
import { SelectPicker, Table } from 'rsuite';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
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
import config from '../../../../config/config';
import QuittanceGarantie from './QuittanceGarantie';
import TableExample from './QuittancetestGrnt';
import { useRecoilState } from 'recoil';
import { idCodePoliceState } from '../recoil/atoms';
  
 
 


function QuittanceAdd( ) {  

  const [tableData, setTableData] = useState([]);
  const [idCodePolice, setIdCodePolice] = useRecoilState(idCodePoliceState);


  const handleTableDataChange = (data: React.SetStateAction<never[]>) => {
    setTableData(data);
    // You can perform any additional operations with the updated data here
  };



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
        }) ); 
      };
    
      const handleSubmit = (event: { preventDefault: () => void; }) => {


        axios.post(`${config.apiUrl}/quittances`, formData)
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
    

      const [CodePoliceAPI, setCodePoliceAPI] = useState(0);

 
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

 console.log(formData.idCodePolice);

            setCodePoliceAPI(formData.idCodePolice);
            console.log('Hello 2 '+CodePoliceAPI)
        };
    
        fetchData();
      }, [formData.idCodePolice]);
 


      const handleBlur = () => {
        const codePolice = formData.idCodePolice; 
        const apiUrl = `${config.apiUrl}/polices/search?codePolice=${codePolice}`;
      
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
              setIdCodePolice(codePolice.toString());
              console.log('codePolice.toString() '+ codePolice.toString());  
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
    
  


<Box sx={{ padding: '5rem', margin:'20px', backgroundColor: '#FFFFFF',justifyContent: 'center' }}  >
  <Typography variant="h5" align="center" color="primary" gutterBottom>
    Ajouter quittance
  </Typography>



  <form onSubmit={handleSubmit}>
   <Grid container spacing={3} xs={12} sm={12}  sx={{  }} >
      <Grid item xs={12} sm={4}>
        <TextField
          id="numeroquittance"
          name="numeroquittance"
          label="Numero quittance"
          variant="outlined"
          placeholder="9900202308905182"
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
          label="Numero police"
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
      <FormControl fullWidth>
  <InputLabel variant="standard" htmlFor="uncontrolled-native">
  Version commerciale
  </InputLabel>
  <NativeSelect 
       id="versioncommerciale"
       name="versioncommerciale" 
       variant="outlined"
       value={formData.versioncommerciale}
       onChange={handleInputChange} 
  > 
  <option  > Selectionner Version comm </option>
   
    {versionsCommerciales?.map((versionsCommerciale: any) => (
      
            <option key={versionsCommerciale.id} value={versionsCommerciale.id}>{versionsCommerciale.nomcommercial}</option>
          ))}
 
  </NativeSelect>
</FormControl>
</Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          id="exercice"
          name="exercice"
          label="Exercice"
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
          label="Ordre"
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
      <FormControl fullWidth>
  <InputLabel variant="standard" htmlFor="uncontrolled-native">
  Intermediaire
  </InputLabel>
  <NativeSelect 
       id="intermediaireid"
       name="intermediaireid" 
       variant="outlined"
       value={formData.intermediaireid}
       onChange={handleInputChange} 
  > 
  <option  > Selectionner Intermediaire </option>
   
    {intermediaires?.map((intermediaire: any) => (
      
            <option key={intermediaire.id} value={intermediaire.id}>{intermediaire.nomCommercial}</option>
          ))}
 
  </NativeSelect>
</FormControl>
</Grid>

      

      
 



        


      <Grid item xs={12} sm={4}>
      <FormControl fullWidth>
  <InputLabel variant="standard" htmlFor="uncontrolled-native">
  Etat Quittance
  </InputLabel>
  <NativeSelect 
        id="refQuittanceid"
        name="refQuittanceid" 
       variant="outlined"
       value={formData.refQuittanceid}
          onChange={handleInputChange}
  > 
  <option  > Selectionner Etat Quittance </option>
   
    {refQuittances?.map((refQuittance: any) => (
      
            <option key={refQuittance.id} value={refQuittance.id}>{refQuittance.etatQuittance}</option>
          ))}
 
  </NativeSelect>
</FormControl>
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
      id="dateemission"
      name="dateemission"
      label="Date Emission"
      variant="outlined"
      value={formData.dateemission}
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
      id="dateetat"
      name="dateetat"
      label="Date Etat"
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
      label="Date Debut"
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
      label="Date Fin"
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

  <Divider orientation="vertical" sx={{ my: 10 }} variant="fullWidth" color="secondary" />

  <Grid item xs={12} sm={4}>
    <TextField
      id="tauxtaxe"
      name="tauxtaxe"
      label="Taux Taxe"
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
              label="Taux Commission"
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
              id="montanttaxeparafiscale"
              name="montanttaxeparafiscale"
              label="Montant Taxe Parafiscale"
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
      <FormControl fullWidth>
  <InputLabel variant="standard" htmlFor="uncontrolled-native">
  Montant Accessoire
  </InputLabel>
  <NativeSelect 
        id="montantaccessoire"
        name="montantaccessoire" 
        variant="outlined"
        value={formData.montantaccessoire}
        onChange={handleInputChange}
  > 
  <option  > Selectionner Etat Quittance </option>
   
    {options?.map((option: any) => (
      
            <option key={option} value={option}>{option}</option>
          ))}
 
  </NativeSelect>
</FormControl>
</Grid>



          
          <label htmlFor=""></label>
          <Grid item xs={12} sm={4}>
          <TextField
          id="primeGareEve"
          name="primeGareEve"
          label="Prime Gare Eve"
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

          {/* <QuittanceGarantie  CodePolice={formData.idCodePolice}/> */}



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
function styled(TableCell: (props: import("@mui/material").TableCellProps) => JSX.Element) {
  throw new Error('Function not implemented.');
}

