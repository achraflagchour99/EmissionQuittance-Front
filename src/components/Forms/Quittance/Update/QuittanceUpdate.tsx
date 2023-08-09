import React, { useEffect,useState } from 'react' 
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
    IconButton,
    InputLabel,
    ListItem,
    ListItemAvatar,
    ListItemText,
    MenuItem,
    NativeSelect,
    Select,
    Stack,
    TextField,
    Tooltip,
} from '@mui/material';
import { Avatar, Form, List  } from 'rsuite';
import { Container } from 'react-bootstrap/lib/Tab';
import { UpdateQuittance, fetchGarantieToEachQuittance, fetchQuittance,ModificationQuittance, fetchRefQuittances } from '../../../../api/service/provideData';
import QuittancePayload from '../Add/QuittancePayload';
import { QuittanceDetailGarantiePayload } from '../../../../api/interface/QuittanceDetailGarantiePayload';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { dateFormat, formatDateForTextField } from '../../../../utils/features';
import AlertDialog from '../../../AlertDialog';
import { ListItemButton } from '@mui/joy';
import { blue } from '@mui/material/colors';
import { Typography } from '@mui/material';
import { RefQuittancePayload } from '../../../../api/interface/refQuittancePayload';


export interface SimpleDialogProps {
   
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
}

 
function SimpleDialog(props: SimpleDialogProps ) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

 
  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle style={{ textAlign: 'center' }}>Modification</DialogTitle>
      <List  >
        <Typography variant="h6" align="center"> Mis à jour avec succés</Typography>
      </List>
    </Dialog>
  );
}
 

 
function QuittanceUpdate () {

 
  const [refQuittances, setRefQuittances] = useState<RefQuittancePayload[] | null>(null);

    const [formData, setFormData] = useState ({
        exercice: "",
        ordre: "", 
        intermediaireid: 1,
        refQuittanceid: 1,
        qtcRemiseid: 0,
        habUtilisateurid: 5923310,
        policeid: 0,  
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
        montontremise:0,
        etatquittance:"",
        libelle:"",
        police :{ codePolice: "" ,intermediaire:{nomCommercial:""},prdVersioncommerciale:{nomcommercial:""},primeNette:""}
      
      });
      const { codequittance } = useParams()

      const options = [0, 10, 15, 20, 30];
      function provideDateQuittance(){
       return fetchQuittance(codequittance);
      }
      const [quittance, setquittance] = useState<QuittancePayload[] | null>(null);  
       
 
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

        
      useEffect(() => {
        const fetchData = async () => {

          const quittanceData = await fetchQuittance(codequittance);
          
          setquittance(quittanceData);
          setFormData(quittanceData);
          const refQuittancesData = await fetchRefQuittances();
          setRefQuittances(refQuittancesData);
         
          
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
    
        ModificationQuittance(formData)
        .then(() => {

          handleClickOpen("msg:any");
          console.log(formData)
          console.log("Fin")
         
          })
          .catch(() => {
            alert("bad")
          });
      }
      const [openDialog, setOpenDialog] = useState(false);
      const handleOpenDialog = () => {
        setOpenDialog(true);
      };
    
      const handleCloseDialog = () => {
        setOpenDialog(false);
      };




      const [open, setOpen] = React.useState(false);
      const [selectedValue, setSelectedValue] = React.useState();
    
      const handleClickOpen = (msg:String) => {
        setOpen(true);
      };
    
      const handleClose = (value: string) => {
        setOpen(false); 
      };


       
    return (
      <>
        <Box  >
     


    
      <SimpleDialog 
       
           
            open={open}
            onClose={handleClose} selectedValue={''}      />





     
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
         value={formData?.police.codePolice} 
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
         value={formData?.police.prdVersioncommerciale?.nomcommercial} 
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
     <TextField
         id="intermediaire"
         name="intermediaire"
         label="intermediaire"
         variant="outlined"
         value={formData.police.intermediaire.nomCommercial}
         
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
       value={formData.etatquittance} 
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
    value={  formData?.dateemission?formatDateForTextField(formData?.dateemission): ""  }
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
     value={ formData?.dateetat?formatDateForTextField(formData?.dateetat): "" }
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
     value={formData?.datedebut ? formatDateForTextField(formData.datedebut) : ""}
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
     value={formData?.datefin?formatDateForTextField(formData?.datefin):""}
     onChange={handleInputChange}
     type="date"
     fullWidth
     InputLabelProps={{
       shrink: true,
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
  
  <option  >   </option>
    {refQuittances?.map((refQuittance: any) => (
      
            <option key={refQuittance.id} value={refQuittance.id}>{refQuittance.etatQuittance}</option>
          ))}
 
  </NativeSelect>
</FormControl>
</Grid>


<br />
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
     value={formData?.police.primeNette}
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

<Grid container spacing={2} justifyContent="flex-end">
  <Grid item>
    <Button startIcon={<PrintIcon />} variant="contained" color="primary" onClick={handlePrint}>
      Imprimer
    </Button>
  </Grid>
  <Grid item>
    <Button  type="submit" variant="contained" color="primary">
      Update
    </Button>
  </Grid>
</Grid>
 
</Form>

 


    </Box>
 </>
    );
  };
  
  export default QuittanceUpdate;