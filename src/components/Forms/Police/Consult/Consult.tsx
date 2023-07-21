import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, CircularProgress, Grid } from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';

const ConsultPolice: React.FC = () => {
  const { codePolice } = useParams();
  const [policeData, setPoliceData] = useState<any>({
    id: 0,
    codePolice: '',
    numClient: '',
    intermediaire: { id: 0, nomCommercial: '' },
    raisonSociale: '',
    adresse: '',
    dateEffet: '',
    primeNette: 0.0,
    taxe: 0.0,
    acce: 0.0,
    tauxComm: 0.0,
    dateTerme: '',
    dateEtat: '',
    dateEcheance: '',
    mnt_taxe_eve: 0,
    mnt_taxe_parafiscale: 0,
    prdVersioncommerciale: { id: 0, nomcommercial: '' },
    refVille: { id: 0, code: '', libelle: '' },
    refPolice: { id: 0, libelle: '' },
    terme: 'O',
    periodicite: { id: 0, type_periodicite: '' },
    typeTerme: { id: 0, terme: '' },
  });
  const [isLoading, setIsLoading] = useState(false);


  const fetchConsultData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`http://localhost:8081/polices/consult/${codePolice}`);
      const fetchedPoliceData = response.data;
      fetchedPoliceData.dateEffet = format(new Date(fetchedPoliceData.dateEffet), 'dd/MM/yyyy');
      fetchedPoliceData.dateTerme = format(new Date(fetchedPoliceData.dateTerme), 'dd/MM/yyyy');
      fetchedPoliceData.dateEtat = format(new Date(fetchedPoliceData.dateEtat), 'dd/MM/yyyy');
      fetchedPoliceData.dateEcheance = format(new Date(fetchedPoliceData.dateEcheance), 'dd/MM/yyyy');
      setPoliceData(fetchedPoliceData);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchConsultData();
  }, []);

  return (
    <Box>
      {isLoading ? (
        <div style={{ marginLeft: 10, marginTop: 100, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
          <CircularProgress />
        </div>
      ) : (
        <Box
          sx={{
            padding: '2rem',
            marginTop: '0.5rem',
            marginBottom: '3rem',
            height: 'auto',
            backgroundColor: 'white',
            border: 2,
            borderColor: '#a7bcb9',
            justifyContent: 'center',
            marginLeft: '1.8rem',
            marginRight: '2rem',
            borderRadius: '5px',
            boxShadow: '0px 2px 1px -1px rgba(0, 0, 0, 0.2), 1px 1px 3px 1px rgba(0, 0, 0, 0.2), 0px 1px 3px 0px rgba(0, 0, 0, 0.2)',
          }}
        >
          <Typography marginBottom={'20px'} variant="h6" align="center" color="primary" gutterBottom>
            Détails de Police
          </Typography>
          <form>
          <Grid container spacing={2} sx={{ margin: '0 auto', paddingRight:'2rem'}}>
          <Grid item xs={12} sm={4}>
            <TextField
              name="codePolice"
              label="Numéro de Police"
              value={policeData.codePolice}
              InputProps={{
                readOnly: true,
              }}
              fullWidth
              size="small"
            />
            </Grid>
            <Grid item xs={12} sm={4}>
            <TextField
              name="produit"
              variant="outlined"
              label="Produit"
              value={policeData.prdVersioncommerciale?.nomcommercial}
              InputProps={{
                readOnly: true,
              }}
              fullWidth
              size="small"
            />
            </Grid>
            <Grid item xs={12} sm={4}>
            <TextField
              name="intermediaire"
              label="Intermédiaire"
              value={policeData.intermediaire?.nomCommercial}
              InputProps={{
                readOnly: true,
              }}
              fullWidth
              size="small"
            />
            </Grid>
            <Grid item xs={12} sm={4}>
            <TextField
              name="numClient"
              label="Code Client"
              value={policeData.numClient}
              InputProps={{
                readOnly: true,
              }}
              fullWidth
              size="small"
            />
            </Grid>
            <Grid item xs={12} sm={4}>
            <TextField
              name="raisonSociale"
              label="Raison Sociale"
              value={policeData.raisonSociale}
              InputProps={{
                readOnly: true,
              }}
              fullWidth
              size="small"
            />
            </Grid>
            <Grid item xs={12} sm={4}>
            <TextField
              name="adresse"
              variant="outlined"
              label="Adresse"
              value={policeData.adresse}
              InputProps={{
                readOnly: true,
              }}
              fullWidth
              size="small"
            />
            </Grid>
            <Grid item xs={12} sm={4}>
            <TextField
              name="ville"
              variant="outlined"
              label="Ville"
              value={policeData.refVille?.libelle}
              InputProps={{
                readOnly: true,
              }}
              fullWidth
              size="small"
            />
            </Grid>
            <Grid item xs={12} sm={4}>
            <TextField
              name="dateEffet"
              variant="outlined"
              label="Date Effet"
              value={policeData.dateEffet}
              InputProps={{
                readOnly: true,
              }}
              fullWidth
              size="small"
            />
            </Grid>
            <Grid item xs={12} sm={4}>
            <TextField
              name="periode"
              variant="outlined"
              label="Periodicité"
              value={policeData.periodicite?.type_periodicite}
              InputProps={{
                readOnly: true,
              }}
              fullWidth
              size="small"
            />
            </Grid>
            <Grid item xs={12} sm={4}>
            <TextField
              name="dateEcheance"
              variant="outlined"
              label="Date prochaine échéance"
              value={policeData.dateEcheance}
              InputProps={{
                readOnly: true,
              }}
              fullWidth
              size="small"
            />
            </Grid>
            <Grid item xs={12} />
            <Grid item xs={12} />
            <Grid item xs={12} sm={4}>
            <TextField
              name="primenette"
              variant="outlined"
              label="Prime Nette"
              value={policeData.primeNette}
              InputProps={{
                readOnly: true,
              }}
              fullWidth
              size="small"
            />
            </Grid>
            <Grid item xs={12} sm={4}>
            <TextField
              name="taxe"
              variant="outlined"
              label="Taxe"
              value={policeData.taxe}
              InputProps={{
                readOnly: true,
              }}
              fullWidth
              size="small"
            />
            </Grid>
            <Grid item xs={12} sm={4}>
            <TextField
              name="accessoire"
              variant="outlined"
              label="Accessoires"
              value={policeData.acce}
              InputProps={{
                readOnly: true,
              }}
              fullWidth
              size="small"
            />
            </Grid>
            <Grid item xs={12} sm={4}>
            <TextField
              name="tauxcom"
              variant="outlined"
              label="Taux de Commission"
              value={policeData.tauxComm}
              InputProps={{
                readOnly: true,
              }}
              fullWidth
              size="small"
            />
            </Grid>
            <Grid item xs={12} sm={4}>
            <TextField
              name="taxeve"
              variant="outlined"
              label="Taxe événementielle"
              value={policeData.mnt_taxe_eve}
              InputProps={{
                readOnly: true,
              }}
              fullWidth
              size="small"
            />
            </Grid>
            <Grid item xs={12} sm={4}>
            <TextField
              name="taxepara"
              variant="outlined"
              label="Taxe Parafiscale"
              value={policeData.mnt_taxe_parafiscale}
              InputProps={{
                readOnly: true,
              }}
              fullWidth
              size="small"
            />
            </Grid>
            <Grid item xs={12} />
            <Grid item xs={12} />
            <Grid item xs={12} sm={4}>
            <TextField
              name="etatpolice"
              variant="outlined"
              label="Etat de Police"
              value={policeData.refPolice?.libelle}
              InputProps={{
                readOnly: true,
              }}
              fullWidth
              size="small"
            />
            </Grid>
            <Grid item xs={12} sm={4}>
            <TextField
              name="etatpolice"
              variant="outlined"
              label="Date Police"
              value={policeData.dateEtat}
              InputProps={{
                readOnly: true,
              }}
              fullWidth
              size="small"
            />
            </Grid>
            </Grid> 
          </form>
        </Box>
      )}
    </Box>
  );
};

export default ConsultPolice;
