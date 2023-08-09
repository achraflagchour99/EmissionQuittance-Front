import React, { useEffect,useRef,useState } from 'react' 
import { useParams } from 'react-router-dom'
import  PrintIcon from '@mui/icons-material/Print';
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
    Hidden,
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
import { Container } from 'react-bootstrap/lib/Tab';
import { UpdateQuittance, fetchGarantieToEachQuittance, fetchQuittance } from '../../../../api/service/provideData';
import QuittancePayload from '../Add/QuittancePayload';
import { QuittanceDetailGarantiePayload } from '../../../../api/interface/QuittanceDetailGarantiePayload';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { dateFormat } from '../../../../utils/features';  
import ReactToPrint from 'react-to-print';
import ComponentToPrint from '../Print/ComponentToPrint';

 
function QuittanceView () {

  const componentRef = useRef(null);
  // Initialize with the correct type

    const [formData, setFormData] = useState ({
        exercice: "",
        ordre: "", 
        intermediaireid: 1,
        refQuittanceid: 1,
        qtcRemiseid: 1,
        habUtilisateurid: 5923310,
         policeid: 21,  
        versioncommerciale:9985338,
        datedebut: "2023-06-08",
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
        montontremise:0,
        etatquittance:"",
        libelle:"",
        police :{ codePolice: "" ,intermediaire:{nomCommercial:""},prdVersioncommerciale:{nomcommercial:""},primeNette:"" }
      
      });
      const { codequittance } = useParams()

      const options = [0, 10, 15, 20, 30];
      function provideDateQuittance(){
       return fetchQuittance(codequittance);
      }
      const [quittance, setquittance] = useState<QuittancePayload[] | null>(null); 
      const [quittanceGarantie, setquittancegarantie] = useState<QuittanceDetailGarantiePayload[]   >( ); 
       
 
      useEffect(() => {
        const fetchData = async () => {

          const quittanceData = await fetchQuittance(codequittance);
          
          setquittance(quittanceData);
          setFormData(quittanceData);
          console.log(quittanceData)
          console.log(quittance)
          const quittanceGarantieData = await fetchGarantieToEachQuittance(codequittance);
          setquittancegarantie(quittanceGarantieData);
          console.log("Boucca")
          console.log(quittanceGarantie)
        };
    
        fetchData();
      }, [codequittance] );
 
    console.log("test")
     console.log(quittance) 
     const handlePrint = () => {
        const printableContent = document.getElementById('printable-content');
        if (printableContent) {
          const originalContent = document.body.innerHTML;
          document.body.innerHTML = printableContent.innerHTML;
          window.print();
          document.body.innerHTML = originalContent;
        } else {
          console.error('Printable content not found');
        }
      };
      
      
      const HandlClickUpdateQuittance = () => { 
    
        UpdateQuittance(formData)
        .then(() => {
           alert("Good")
          })
          .catch(() => {
            alert("bad")
          });
        
    
      }
 
       
    return (
      <>
        <Box sx={{ marginLeft: 'auto', padding: '5rem',marginRight: 'auto', maxWidth: '80%', backgroundColor: '#FFFFFF',justifyContent: 'center' }}>
     
     <Form onSubmit={HandlClickUpdateQuittance} id="printable-content" > 
     <Grid item xs={12} sm={4}>
        <h1>Quittance #{formData.numeroquittance}</h1>
        </Grid>
  <Grid  container spacing={2} xs={12} sm={12}  sx={{  }} >
    

     <Grid item xs={12} sm={4}>
       <TextField
         id="numeroquittance"
         name="numeroquittance"
         label="Numero quittance"
         variant="outlined"
         placeholder="9900202308905182" 
        value={formData?.numeroquittance}
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
         value={formData?.police?.codePolice} 
         type="text" 
         fullWidth
         InputLabelProps={{
           shrink: true,
         }}
       />
     </Grid>

    


     <Grid item xs={12} sm={4}>
     <TextField
         id="prdVersioncommerciale"
         name="prdVersioncommerciale"
         label="nomcommercial"
         variant="outlined"
         value={formData.police?.prdVersioncommerciale.nomcommercial} 
         type="text"
         fullWidth
         InputLabelProps={{
           shrink: true,
         }}
       />
</Grid>
     <Grid item xs={12} sm={4}>
       <TextField
         id="exercice"
         name="exercice"
         label="Exercice"
         variant="outlined"
         value={formData?.exercice} 
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
         value={formData?.ordre}
         
         type="text"
         fullWidth
         InputLabelProps={{
           shrink: true,
         }}
       />
     </Grid>

  

     <Grid item xs={12} sm={4}>
     <TextField
         id="intermediaire"
         name="intermediaire"
         label="intermediaire"
         variant="outlined"
         value={formData.police?.intermediaire.nomCommercial}
         
         type="text"
         fullWidth
         InputLabelProps={{
           shrink: true,
         }}
       />
</Grid>

     

     




       


     <Grid item xs={12} sm={4}>
     <TextField
       id="etatquittance"
       name="etatquittance"
       label="etatquittance"
       variant="outlined"
       value={formData?.etatquittance} 
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
       value={formData?.qtcRemiseid} 
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
       value={formData?.montontremise}
        
       
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
     value={formData?.habUtilisateurid}
     
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
    value={ (new Date(formData?.dateemission).toLocaleDateString())}
    // onChange={handleInputChange}
    type="text"
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
     value={(new Date(formData?.dateetat).toLocaleDateString())}
   //  onChange={handleInputChange}
     type="text"
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
     value={ (new Date(formData?.datedebut).toLocaleDateString())} 
   //  onChange={handleInputChange}
     type="text"
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
     value={(new Date(formData?.datefin).toLocaleDateString())}
 //    onChange={handleInputChange}
     type="text"
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
     value={formData?.tauxtaxe}
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
     value={formData.police?.primeNette}
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
             value={formData?.tauxcommission}
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
             value={formData?.montanttaxeparafiscale}
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
       value={formData?.montantaccessoire}
     //  onChange={handleInputChange}
 > 
   <option  > {formData?.montantaccessoire} </option>
  
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
         value={formData?.primeGareEve}
       //  onChange={handleInputChange}
         type="number"
         fullWidth
         InputLabelProps={{
         shrink: true,
         }}
         />
         </Grid>

        


 <Grid item xs={12}>
  






</Grid>
</Grid>
 
</Form>

 
      













<TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Garantie</TableCell>
            <TableCell align="right">Primenette</TableCell>
            <TableCell align="right">Montant commission</TableCell>
            <TableCell align="right">TauxTaxeParafiscale</TableCell>
            <TableCell align="right">PrimeGareEve</TableCell>
            <TableCell align="right">Taux taxe</TableCell>
            <TableCell align="right">Montant accessoire</TableCell>
            
            
          </TableRow>
        </TableHead>
        <TableBody>
          {quittanceGarantie?.map((row ) => (
            <TableRow
              key={row?.idgarantie}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
              {row?.libelle}
              </TableCell> 
              <TableCell align="right">{row?.primenette}</TableCell>
              <TableCell align="right">{row?.montantcommission}</TableCell>
              <TableCell align="right">{row?.TauxTaxeParafiscale}</TableCell>
              <TableCell align="right">{row?.Tauxtaxe}</TableCell>
              <TableCell align="right">{row?.Montantaccessoire}</TableCell>
              
              <TableCell align="right">{row?.PrimeGareEve}</TableCell>
               
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    <ReactToPrint
        trigger={() => <Button startIcon={<PrintIcon />} variant="contained" color="primary">Imprimer</Button>}
        content={() => componentRef.current}
      />

      <div style={{ display: 'none'  }}>
<ComponentToPrint 
  ref={componentRef}
  quittanceData={formData}  
/></div>

    </Box>
 </>
    );
  };
  
  export default QuittanceView;