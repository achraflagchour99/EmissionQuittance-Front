import React, { useEffect,useState } from 'react' 
import {
    Box,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    FormControl,
    Grid,
    IconButton,
    InputLabel,
    MenuItem,
    NativeSelect,
    Select,
    Stack,
    TextField,
    Tooltip,
} from '@mui/material';
import { Form  } from 'rsuite';


 
function QuittanceUpdate () {


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
        idCodePolice:0,
        montontremise:0
      
      });

    return (
      <>
     <Box>
     <Form  >
  
  <Grid container spacing={1} xs={12} sm={12}  sx={{  }} >
     <Grid item xs={12} sm={4}>
       <TextField
         id="numeroquittance"
         name="numeroquittance"
         label="Numero quittance"
         variant="outlined"
         placeholder="9900202308905182"
         value={formData.numeroquittance}
        
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
 Version commerciale
 </InputLabel>
 {/* <NativeSelect 
      id="versioncommerciale"
      name="versioncommerciale" 
      variant="outlined"
      value={formData.versioncommerciale} 
 > 
 <option  > Selectionner Version comm </option>
  
   {versionsCommerciales?.map((versionsCommerciale: any) => (
     
           <option key={versionsCommerciale.id} value={versionsCommerciale.id}>{versionsCommerciale.nomcommercial}</option>
         ))}

 </NativeSelect> */}
</FormControl>
</Grid>
     <Grid item xs={12} sm={4}>
       <TextField
         id="exercice"
         name="exercice"
         label="Exercice"
         variant="outlined"
         value={formData.exercice} 
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
     
 > 
 {/* <option  > Selectionner Intermediaire </option>
  
   {intermediaires?.map((intermediaire: any) => (
     
           <option key={intermediaire.id} value={intermediaire.id}>{intermediaire.nomCommercial}</option>
         ))} */}

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
         
 > 
 {/* <option  > Selectionner Etat Quittance </option>
  
   {refQuittances?.map((refQuittance: any) => (
     
           <option key={refQuittance.id} value={refQuittance.id}>{refQuittance.etatQuittance}</option>
         ))} */}

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
    // onChange={handleInputChange}
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
   //  onChange={handleInputChange}
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
   //  onChange={handleInputChange}
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
 //    onChange={handleInputChange}
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
    // onChange={handleInputChange}
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
   //  onChange={handleInputChange}
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
            // onChange={handleInputChange}
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
           //  onChange={handleInputChange}
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
     //  onChange={handleInputChange}
 > 
 {/* <option  > Selectionner Etat Quittance </option>
  
   {options?.map((option: any) => (
     
           <option key={option} value={option}>{option}</option>
         ))} */}

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
       //  onChange={handleInputChange}
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

<input color="primary" type="submit" value="Veuillez  Ajouter  la  quittance" />


</Grid>
</Grid>
</Form>
    </Box>
 </>
    );
  };
  
  export default QuittanceUpdate;