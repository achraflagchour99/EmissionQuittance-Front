import React, { useEffect,useState } from 'react' 
import { useParams } from 'react-router-dom'
import  PrintIcon from '@mui/icons-material/Print';
import './style.css';
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
import { Container } from 'react-bootstrap/lib/Tab';
import { ModificationGarantieQuittance, UpdateQuittance, fetchGarantieToEachQuittance, fetchQuittance } from '../../../../api/service/provideData';
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
import { Edit, WidthFull } from '@mui/icons-material';
 



 
function QuittanceGarantieUpdate () {

  const [isDialogOpen, setDialogOpen] = useState(false);
  // State to store the selected row data
  const [selectedRow, setSelectedRow] = useState<QuittanceDetailGarantiePayload | null>(null);





 
      const { codequittance } = useParams()

    
      function provideDateQuittance(){
       return fetchQuittance(codequittance);
      }
      const [quittance, setquittance] = useState<QuittancePayload[] | null>(null); 
      const [quittanceGarantie, setquittancegarantie] = useState<QuittanceDetailGarantiePayload[]   >( ); 
      const [formDataGarantie, setFormDataGarantie] = useState({  
        id: 0, 
        libelle: "",
        primenette: 0,
        Tauxtaxe: 0,
        Montantaccessoire: 0,
        tauxcommission: 0,
        montantcommission: 0, 
        PrimeGareEve: 0,
        TauxTaxeParafiscale: 0,
      });

 
      useEffect(() => {
        const fetchData = async () => {

          const quittanceData = await fetchQuittance(codequittance);
          
         
          const quittanceGarantieData = await fetchGarantieToEachQuittance(codequittance);
          setquittancegarantie(quittanceGarantieData);
        
        };
        console.log(formDataGarantie);

          ModificationGarantieQuittance(formDataGarantie)
        .then(() => {
      
          console.log("Fin")
         
          })
          .catch(() => {
            alert("bad")
          });


        fetchData();

      }, [codequittance,formDataGarantie] );
 
  
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
      const [updatedPrimenettes, setUpdatedPrimenettes] = useState({});
      
 
     

      const handleRowClick = (row: QuittanceDetailGarantiePayload) => {
        // Handle the action here, e.g., show the entire line in a dialog
        console.log(row.id);

        setSelectedRow(row);
        // Open the dialog
        setDialogOpen(true);
      };
      const handleCloseDialog = () => {
        setDialogOpen(false);
      };      
    

    

      const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
      
        const formData = new FormData(event.currentTarget);
        const id = formData.get('id');
        const libelle = formData.get('libelle');
        const primenette = formData.get('primenette');
        const montantCommission = formData.get('montantCommission');
        const tauxcommission = formData.get('tauxcommission');
        const TauxTaxeParafiscale = formData.get('TauxTaxeParafiscale');
        const primeGareEve = formData.get('primeGareEve');
        const Tauxtaxe = formData.get('Tauxtaxe');
        const Montantaccessoire = formData.get('Montantaccessoire');
      
        setFormDataGarantie({
          id:  id ? parseInt(id.toString(), 10) : 0 ,
          libelle: libelle ? libelle.toString() : "",
          primenette: primenette ? parseFloat(primenette.toString()) : 0,
          Tauxtaxe: Tauxtaxe ? parseFloat(Tauxtaxe.toString()) : 0,
          Montantaccessoire: Montantaccessoire ? parseFloat(Montantaccessoire.toString()) : 0,
          tauxcommission: tauxcommission ? parseFloat(tauxcommission.toString()) : 0,
          montantcommission: montantCommission ? parseFloat(montantCommission.toString()) : 0, 
          PrimeGareEve: primeGareEve ? parseFloat(primeGareEve.toString()) : 0,
          TauxTaxeParafiscale: TauxTaxeParafiscale ? parseFloat(TauxTaxeParafiscale.toString()) : 0,
        });
       

        // ModificationGarantieQuittance(formDataGarantie)
        // .then(() => {
      
        //   console.log("Fin")
         
        //   })
        //   .catch(() => {
        //     alert("bad")
        //   });

      //  console.log(formDataGarantie)
      };

    return (
      <>
        <Box  >
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
                  <TableCell align="right">Taux commission</TableCell>
                  <TableCell align="right">Montant accessoire</TableCell>
                  <TableCell align="right">Actions</TableCell>             
          </TableRow>
        </TableHead>
        <TableBody>
          {quittanceGarantie?.map((row ) => (
            <TableRow
              key={row?.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}    >
              <TableCell component="th" scope="row">
              {row?.libelle}
              </TableCell> 
                    <TableCell align="right">
                    <span>
                          
                           { row?.primenette}   
                          </span>
                       
                 
                  </TableCell>
                  <TableCell align="right">
                  <span> {row?.montantcommission}   </span>
                  </TableCell>
              <TableCell align="right"> <span>{row?.TauxTaxeParafiscale}</span></TableCell>
              <TableCell align="right"><span>{row?.Tauxtaxe} </span></TableCell>
              <TableCell align="right"><span>{row?.Montantaccessoire} </span></TableCell>
              
              <TableCell align="right"><span>{row?.tauxcommission} </span></TableCell>
              <TableCell align="right"><span>{row?.PrimeGareEve} </span></TableCell>
               
               <TableCell align="right">
                    <IconButton onClick={() => handleRowClick(row)} >
                        <Edit /> 
                    </IconButton>
                  </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
<div >
       <Dialog open={isDialogOpen} onClose={handleCloseDialog} PaperProps={{ style: { width: '100%' } }}>
        <DialogTitle>Row Details</DialogTitle>
        <DialogContent>
        <form onSubmit={handleFormSubmit} id="printable-content"     >
      {/* Render the details of the selected row inside the Dialog */}
      {selectedRow && (
        <>
           
            
          <input type="hidden" value={String(selectedRow.id)} name="id"/>
          <Box my={2}>
            <TextField
              label="Garantie"
              type="text"
              defaultValue={selectedRow.libelle}
              name="libelle"
              InputProps={{ readOnly: true }}
              fullWidth
              variant="outlined"
            />
          </Box>
          
          <Box my={2}>
            <TextField
              label="Primenette"
              type="number"
              defaultValue={selectedRow.primenette}
              name="primenette"
              fullWidth
              variant="outlined"
            />
          </Box>
          <Grid item xs={12} sm={6}>
          <Box my={2}  >
            <TextField
              label="Montant commission"
              type="number"
              defaultValue={selectedRow.montantcommission}
              name="montantCommission"
              fullWidth
              variant="outlined"
            />
          </Box>
          </Grid>
          <Box my={2}>
            <TextField
              label="Taux Taxe Parafiscale"
              type="number"
              defaultValue={selectedRow.TauxTaxeParafiscale}
              name="TauxTaxeParafiscale"
              fullWidth
              variant="outlined"
            />
          </Box>
          <Box my={2}>
            <TextField
              label="Prime Gare Eve"
              type="number"
              defaultValue={selectedRow.PrimeGareEve}
              name="primeGareEve"
              fullWidth
              variant="outlined"
            />
          </Box>
          <Box my={2}>
            <TextField
              label="Taux taxe"
              type="number"
              defaultValue={selectedRow.Tauxtaxe}
              name="Tauxtaxe"
              fullWidth
              variant="outlined"
            />
          </Box>
          <Box   my={2}>
            <TextField
              label="Taux commission"
              type="number"
              defaultValue={selectedRow.tauxcommission}
              name="tauxcommission"
              fullWidth
              variant="outlined"
            />
          </Box>
          <Box my={2}>
            <TextField
              label="Montant accessoire"
              type="number"
              defaultValue={selectedRow.Montantaccessoire}
              name="Montantaccessoire"
              fullWidth
              variant="outlined"
            />
          </Box>

          {/* Add other fields as needed */}
        </>
      )}
      <Box my={4}>
        <Button type="submit" variant="contained" color="primary">
          Update
        </Button>
      </Box>
    </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      </div>

      
    </Box>
 </>
    );
  };
  
  export default QuittanceGarantieUpdate;

function setUpdatedPrimenettes(arg0: (prevState: any) => any) {
  throw new Error('Function not implemented.');
}
