import React, { useEffect } from 'react'
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import {  Grid, Box,Paper, InputLabel, FormControl, NativeSelect, TableBody, TableContainer, TableHead, TableRow  } from '@mui/material';
import {  Typography, MenuItem, Select,Divider  } from '@mui/material';
import axios from 'axios';  
import { Form, SelectPicker, Table } from 'rsuite';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import {
    fetchIntermediaires,
    fetchPolice,
    fetchVersionsCommerciales,
    fetchRefQuittances,
    fetchRemise,
    ExtractSaveQuittance,
    fetchmaxValues,
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
import { idCodePoliceState, jsonDataQuittance, jsonDatalibelle } from '../recoil/atoms';
import '../style.css'; // Import the CSS file 
import { List } from 'immutable';
 
 


function QuittanceAdd( ) {  

 
  const [tableData, setTableData] = useState([]);
  const [idCodePolice, setIdCodePolice] = useRecoilState(idCodePoliceState);
  const [jsonQuittances, setJsonQuittance] = useRecoilState(jsonDataQuittance);
  const [jsonDataLibelle, setJsonDataLibelle] = useRecoilState(jsonDatalibelle);
  

  const handleTableDataChange = (data: React.SetStateAction<never[]>) => {
    setTableData(data);
    // You can perform any additional operations with the updated data here
  };


  const extractSaveQuittance = () => { 
    
    try{
      const dateDebut = new Date(formData.datedebut);
      const dateFin = new Date(formData.datefin);
  
    if(dateDebut < dateFin  ){
      if( formData.primenette-formData.tauxcommission>formData.montontremise){
        toast.error('Montant  de remise insufisant', { position: toast.POSITION.TOP_RIGHT });
        return;
      }
      const jsonData = JSON.stringify(formData);
      setJsonQuittance(jsonData);  
      if(jsonData !=null){
      toast.success("Quittance  bien Enregistrer  veuillez passer a l'etape  suivante");}
      else{
        toast.error('Erreur  il y  a un probleme', { position: toast.POSITION.TOP_RIGHT });
      }
    }else{
      toast.error('Date date debut ne  doit pas etre  inferrieur au  date  fin !', { position: toast.POSITION.TOP_RIGHT });
    }}
    catch(error)   { 
      console.log(error);
      toast.error('Erreur lors de la requête !', { position: toast.POSITION.TOP_RIGHT });
    };
    

  }


    const [intermediaires, setIntermediaires] = useState<intermediarePayload[] | null>(null); 
    const [polices, setPolices] = useState<PolicePayload[] | null>(null);
    const [versionsCommerciales, setVersionsCommerciales] = useState <VersionsCommerciales[] | null>(null);
    const [refQuittances, setRefQuittances] = useState<RefQuittancePayload[] | null>(null);
  

 

    const [formData, setFormData] = useState({
        exercice: "",
        ordre: new Date().getFullYear().toString(), 
        intermediaireid: 1,
        refQuittanceid: 1,
        qtcRemiseid: 1,
        habUtilisateurid: 5923310,
        policeid: 21,  
        versioncommerciale:0,
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
        idCodePolice:0,
        montontremise:0
      
      });
    
      const [formDataLibelle, setFormDataLibelle] = useState({
        
        versionCommerialLibelle:"",
        intermediairesLibelle:""
      
      });


      const handleInputChange = (event: { target: { name: any; value: any; }; }) => {
      //  handleFormSubmit();
        const { name, value } = event.target;
        setFormData((prevState) => ({
         
          ...prevState,
          [name]: value,
         
        }),
        ); 
        console.log(formData)
        //Update  the  data  from  the formData to  Json
      //  handleFormSubmit();
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


      const RemiseFunction = async () => {
        try {  // Provide the ID of the remise you want to fetch
          const data = await fetchRemise(formData.qtcRemiseid);
          // Use the data returned by the API call
          setFormData(prevFormData => ({
            ...prevFormData,
            montontremise: data.montantRemise
          }));  
        } catch (error) {
          console.error(error);
        }
      };

     
      const handleFormSubmit = () => {
        const jsonData = JSON.stringify(formData);
        setJsonQuittance(jsonData);
        console.log(jsonQuittances);
      };

 
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

  
            setCodePoliceAPI(formData.idCodePolice); 

            RemiseFunction();
             console.log("voyage")
          console.log(jsonQuittances);
        };
    
        fetchData();
      }, [formDataLibelle.intermediairesLibelle,formDataLibelle.versionCommerialLibelle,formData.ordre,formData.exercice,formData.numeroquittance,formData.primenette,formData.montantaccessoire,formData.tauxcommission,formData.tauxtaxe,formData.versioncommerciale,formData.idCodePolice,formData.qtcRemiseid,jsonQuittances]);
 


      const handleBlur =   ()  => {
       
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
          .then(async data => {
           
            if (data.length === 0) {
              alert("Police non trouvée");
            }  
            else{

              const maxValues = await fetchmaxValues();  
              console.log('maxValues')
             console.log(data)

              setIdCodePolice(codePolice.toString());
             
          
              const updatedFormData = { ...formData, policeid: data[0].id
              ,  versioncommerciale: data[0].prdVersioncommerciale.id
              ,  intermediaireid: data[0].intermediaire.id

     

            ,tauxprimenette: data[0].primeNette
          ,tauxcommission: data[0].tauxComm
        ,tauxtaxe:data[0].taxe
      ,montanttaxeparafiscale:data[0].mnt_taxe_parafiscale
    ,montantaccessoire:data[0].acce


    ,exercice:maxValues.exercice+1
    ,numeroquittance:maxValues.numeroquittance+1
  };

  const updatedFormDataLibelle = { ...formDataLibelle, 
    
     versionCommerialLibelle: data[0].prdVersioncommerciale.nomcommercial
    ,intermediairesLibelle:data[0].intermediaire.nomCommercial
};

     
              setFormData(updatedFormData); 
              setFormDataLibelle(updatedFormDataLibelle);
               
              const updatedData =[updatedFormDataLibelle.versionCommerialLibelle, updatedFormDataLibelle.intermediairesLibelle];
              const updatedList = List<string>(updatedData); // Convert the array to List<string>
              setJsonDataLibelle(updatedList);
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


<Form  onSubmit={extractSaveQuittance}>
  
   <Grid container spacing={1} xs={12} sm={12}  sx={{  }} >
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
          InputProps={{
            readOnly: true,
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

     


  
<input 
  id="versioncommerciale"
  name="versioncommerciale"   
  value={formData.versioncommerciale}
  onChange={handleInputChange} 
  type="hidden" 
  
  className="hidden-textfield" // Add the CSS class here
/>


<Grid item xs={12} sm={4}> 
   <TextField 
       id="versionCommerialLibelle"
       name="versionCommerialLibelle" 
       label="version commerciale"
       variant="outlined"
       value={formDataLibelle.versionCommerialLibelle}
       onChange={handleInputChange} 
       type="text"
       fullWidth
       InputLabelProps={{
         shrink: true,
       }}
       InputProps={{
        readOnly: true,
      }}
  /> 
 
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
          InputProps={{
            readOnly: true,
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
          InputProps={{
            readOnly: true,
          }}
        />
      </Grid>

      <input 
  id="intermediaireid"
  name="intermediaireid"   
  value={formData.intermediaireid}
  onChange={handleInputChange} 
  type="hidden" 
  
  className="hidden-textfield" // Add the CSS class here
/>

      <Grid item xs={12} sm={4}>
      <TextField 
       id="intermediairesLibelle"
       name="intermediairesLibelle" 
       label="Intermediaire"
       variant="outlined"
       value={formDataLibelle.intermediairesLibelle}
       onChange={handleInputChange} 
       type="text"
       fullWidth
       InputLabelProps={{
         shrink: true,
       }}
       InputProps={{
        readOnly: true,
      }}
  /> 
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
        id="remise"
        name="remise"
        label="Remise"
        variant="outlined"
        value={formData.montontremise}
         
        onChange={handleInputChange}
        type="text"
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{
          readOnly: true,
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
      InputProps={{
        readOnly: true,
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
              InputProps={{
                readOnly: true,
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
              InputProps={{
                readOnly: true,
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

         


  <Grid item xs={12}>
    {/* <Button variant="contained" color="primary" type="submit" onClick={extractSaveQuittance}>
      Veuillez  Ajouter  la  quittance
    </Button> */}

{/* <input color="primary"   type="submit" value="Veuillez  Ajouter  la  quittance" /> */}


<Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
            <Button type="submit" variant="contained" color="primary">
            Veuillez  Ajouter  la  quittance 
            </Button>
          </Grid>

</Grid>
</Grid>
</Form>

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

