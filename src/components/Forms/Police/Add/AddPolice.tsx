import React, {useState, ChangeEvent, FormEvent, useEffect} from 'react';
import {TextField, Button, Box, Checkbox, FormControlLabel, Typography, Divider} from '@mui/material';
import axios from 'axios';
import Grid from "@mui/material/Grid";
import "../Search/SearchPolice.css"
import {   MenuItem } from '@mui/material';
import { Ville, VersionCom, Interm, Period, EtatPolice, PoliceData, TypeTerme } from '../Types/types';
import { fetchVilles, fetchVersions, fetchInterm, fetchPeriodes, fetchEtats, fetchTypesTermes } from '../Api/policeApi';
import { Stepper, Step, StepLabel } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Garanties from '../Garanties/garanties';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

const AddPolice: React.FC = () => {
    const [policeData, setPoliceData] = useState<PoliceData>({
        id: 0,
        codePolice: '',
        numClient: '',
        intermediaire: {id:0, nomCommercial: ''},
        raisonSociale: '',
        adresse: '',
        dateEffet: new Date(),
        primeNette: 0.0,
        taxe: 0.0,
        acce: 0.0,
        tauxComm:  0.0,
        dateTerme: new Date(),
        dateEtat: new Date(),
        dateEcheance: new Date(),
        mnt_taxe_eve: 0,
        mnt_taxe_parafiscale: 0,
        prdVersioncommerciale: {id:0, nomcommercial: ''},
        refVille: {id: 0, code: '', libelle: ''},
        refPolice: {id: 0, libelle: ''},
        terme: 'O',
        periodicite: {id: 0, type_periodicite: ''},
        typeTerme: {id: 0, terme: ''},
    });
    const [hasTerme, setHasTerme] = useState(false);
    const [villes, setVilles] = useState<Ville[]>([]);
    const [versions, setVersions] = useState<VersionCom[]>([]);
    const [intermediaires, setIntermediaires] = useState<Interm[]>([]);
    const [periodicites, setPeriodicites] = useState<Period[]>([]);
    const [Etats, setEtats] = useState<EtatPolice[]>([]);   
    const [TypesTerme, setTypesTerme] = useState<TypeTerme[]>([]);
    const [selectedType, setSelectedType] = useState<TypeTerme | null>(null);
    const [selectedVille, setSelectedVille] = useState<Ville | null>(null);
    const [selectedVersion, setSelectedVersion] = useState<VersionCom | null>(null);
    const [selectedInterm, setSelectedInterm] = useState<Interm | null>(null);
    const [selectedPeriode, setSelectedPeriode] = useState<Period | null>(null);
    const [selectedEtat, setSelectedEtat] = useState<EtatPolice | null>(null);
    const [activeStep, setActiveStep] = useState(0);
    const steps = ['Données de la Police', 'Vérification des Garanties', 'Validation de la Police'];

    useEffect(() => {
      fetchVilles(setVilles);
      fetchVersions(setVersions);
      fetchInterm(setIntermediaires);
      fetchPeriodes(setPeriodicites);
      fetchEtats(setEtats);
      fetchTypesTermes(setTypesTerme);
    }, []);


    const validationSchema = Yup.object({
    taxe: Yup.number().positive().integer().nullable()
    .required('La taxe est requise')
    .test('taxe-sup', 'La taxe dépasse 15% de la prime', function (value) {
      const montantPrime = Number(this.parent.primeNette);
      return value <= 0.15 * montantPrime;
    }),
    dateEffet: Yup.date().required('La date d\'effet est requise'),
    dateEcheance: Yup.date()
      .min(Yup.ref('dateEffet'), 'La date d\'échéance doit être supérieure à la date d\'effet')
      .required('La date d\'échéance est requise'),
      acce: Yup.number()
      .oneOf([0, 10, 15, 20, 30], 'La valeur de l\'accessoire doit être 0, 10, 15, 20 ou 30')
      .required('L\'accessoire est requis'),
});
const isStepComplete = () => {
    const { taxe, dateEffet, dateEcheance } = formik.values;
    return !!taxe && !!dateEffet && !!dateEcheance /* et les autres conditions pour les autres champs */;
  };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setPoliceData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
      const handleNext = () => {
        if (formik.isValid && isStepComplete()) {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
      };
      const handleTaxeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const input = event.target.value;
        const onlyNumbers = input.replace(/[^0-9]/g, ''); // Filtrer uniquement les chiffres
        formik.setFieldValue('taxe', onlyNumbers);
      };
    
    const handleTermeChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { checked } = event.target;
        setHasTerme(checked);
        formik.values.terme='N';
    };
    const handleVilleChange = (event: ChangeEvent<{ value: unknown }>) => {
        const selectedVilleLibelle = event.target.value as string;
        const ville = villes.find((v) => v.libelle === selectedVilleLibelle);
        setSelectedVille(ville || null); 
      };
    const handleVersionChange = (event: ChangeEvent<{ value: unknown }>) => {
        const selectedVersion = event.target.value as string;
        const nomcommercial = versions.find((v) => v.nomcommercial === selectedVersion);
        setSelectedVersion(nomcommercial || null);
    };
    const handleIntermChange = (event: ChangeEvent<{ value: unknown }>) => {
        const selectedInterm = event.target.value as string;
        const intermediaire = intermediaires.find((i) => i.nomCommercial === selectedInterm);
        setSelectedInterm(intermediaire || null);
    };
    const handlePeriodeChange = (event: ChangeEvent<{ value: unknown }>) => {
        const selectedPeriode = event.target.value as string;
        const periode = periodicites.find((p) => p.type_periodicite === selectedPeriode);
        setSelectedPeriode(periode || null);
    };
    const handleEtatChange = (event: ChangeEvent<{ value: unknown }>) => {
        const selectedEtat = event.target.value as string;
        const etat = Etats.find((e) => e.libelle === selectedEtat);
        setSelectedEtat(etat || null);
    };
    const handleTypeChange = (event: ChangeEvent<{ value: unknown }>) => {
        const selectedType = event.target.value as string;
        const type = TypesTerme.find((e) => e.terme === selectedType);
        setSelectedType(type || null);
    };
    const handleSubmit = async () => {
        try {
          const requestData = {
            ...formik.values,
            refVille: selectedVille,
            refPolice: selectedEtat,
            periodicite: selectedPeriode,
            prdVersioncommerciale: selectedVersion,
            intermediaire: selectedInterm,
            typeTerme: selectedType,
          };
      
          if (!hasTerme) {
            requestData.dateTerme = undefined;
            requestData.typeTerme = null;
          }
      
          const response = await axios.post('http://localhost:8080/polices/add', requestData);
      
          window.location.href = `/consult-page/${response.data.codePolice}`;
        } catch (error) {
          console.error(error);
        }
      };
      
    const formik = useFormik<PoliceData>({
        initialValues: {
          id: 0,
          codePolice: '',
          numClient: '',
          intermediaire: { id: 0, nomCommercial: '' },
          raisonSociale: '',
          adresse: '',
          dateEffet: new Date(),
          primeNette: 0.0,
          taxe: 0.0,
          acce: 0.0,
          tauxComm: 0.0,
          dateTerme: new Date(),
          dateEtat: new Date(),
          dateEcheance: new Date(),
          mnt_taxe_eve: 0,
          mnt_taxe_parafiscale: 0,
          prdVersioncommerciale: { id: 0, nomcommercial: '' },
          refVille: { id: 0, code: '', libelle: '' },
          refPolice: { id: 0, libelle: '' },
          terme: 'O',
          periodicite: { id: 0, type_periodicite: '' },
          typeTerme: { id: 0, terme: '' },
        },
        validationSchema: validationSchema,
        onSubmit: () => {
            // No need to define an async function here
            handleSubmit();
          },
        });
    return (
        <Box
        sx={{
          padding: '2rem',
          marginTop: '0.5rem',
          marginBottom:'3rem',
          height: 'auto', // Utilisation de 'auto' pour la hauteur
          backgroundColor: 'white',
          border: 2,
          borderColor: '#a7bcb9',
          justifyContent: 'center',
          marginLeft: '1.8rem',
          marginRight: '2rem',
          borderRadius: '5px',
          boxShadow:
            '0px 2px 1px -1px rgba(0, 0, 0, 0.2), 1px 1px 3px 1px rgba(0, 0, 0, 0.2), 0px 1px 3px 0px rgba(0, 0, 0, 0.2)',
        }}
        >
            <Typography marginBottom={"20px"} variant="h6" align="center" color="primary" gutterBottom>
                    Nouvelle Police
            </Typography>
            <Box sx={{ paddingBottom: '1rem' }}>
  <Stepper activeStep={activeStep} alternativeLabel>
    {steps.map((label, index) => (
      <Step key={index}>
        <StepLabel>{label}</StepLabel>
      </Step>
    ))}
  </Stepper>
</Box>
  {activeStep === steps.length ? (
    <div>
      <Typography variant="h5" gutterBottom>
        Étape terminée
      </Typography>
      <Button variant="contained" color="primary" onClick={() => setActiveStep(0)}>
        Nouvelle police
      </Button>
    </div>
  ) : (
    <>
    {activeStep === 0 && (
            <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2} sx={{ margin: '0 auto', paddingRight:'2rem'}}>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            name="codePolice"
                            label="Numéro de Police"
                            value={formik.values.codePolice}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            fullWidth
                            size="small"
                            inputProps={{ maxLength: 15 }}
                            required
                            
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            name="prdVersioncommerciale"
                            label="Produit"
                            value={selectedVersion ? selectedVersion.nomcommercial : ''}
                            onChange={handleVersionChange}
                            fullWidth
                            select
                            size="small"
                        > {versions.map((v) => (
                        <MenuItem key={v.id} value={v.nomcommercial}>
                            {v.nomcommercial}
                        </MenuItem>
                    ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            name="intermediaire"
                            label="Intermédiaire"
                            value={selectedInterm ? selectedInterm.nomCommercial : ''}
                            onChange={handleIntermChange}
                            fullWidth
                            select
                            size="small"
                        > {intermediaires.map((i) => (
                        <MenuItem key={i.id} value={i.nomCommercial}>
                            {i.nomCommercial}
                        </MenuItem>
                    ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            name="numClient"
                            label="Code Client"
                            value={formik.values.numClient}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            fullWidth
                            size="small"
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            name="raisonSociale"
                            label="Raison Sociale"
                            value={formik.values.raisonSociale}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            fullWidth
                            size="small"
                            required
                        />
                    </Grid>
    
                    <Grid item xs={12} sm={4}>
                        <TextField
                            name="adresse"
                            variant="outlined"
                            label="Adresse"
                            value={formik.values.adresse}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            fullWidth
                            size="small"
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                         <TextField
              name="refVille"
              label="Ville"
              value={selectedVille ? selectedVille.libelle : ''}
              onChange={handleVilleChange}
              fullWidth
              select
              size="small"
              required
            >
              {villes.map((ville) => (
                <MenuItem key={ville.id} value={ville.libelle}>
                  {ville.libelle}
                </MenuItem>
              ))}
            </TextField>    
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            name="dateEffet"
                            onChange={formik.handleChange}
                            value={formik.values.dateEffet}
                            onBlur={formik.handleBlur}
                            label={formik.touched.dateEcheance && formik.errors.dateEcheance ? 'La date du prochaine échéance doit être supérieure à la date effet' : 'Date Effet'}
                            error={formik.touched.dateEcheance && formik.errors.dateEcheance ? true : false}
                            type="date"
                            fullWidth
                            size="small"
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            name="periodicite"
                            label="Periodicité"
                            value={selectedPeriode ? selectedPeriode.type_periodicite : ''}
                            onChange={handlePeriodeChange}
                            fullWidth
                            select
                            size="small"
                            > {periodicites.map((p) => (
                                <MenuItem key={p.id} value={p.type_periodicite}>
                                    {p.type_periodicite}
                                </MenuItem>
                            ))}
                                </TextField>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            name="dateEcheance"
                            label={formik.touched.dateEcheance && formik.errors.dateEcheance ? 'La date du prochaine échéance doit être supérieure à la date effet' : 'Date prochaine échéance'}
                            value={formik.values.dateEcheance}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.dateEcheance && formik.errors.dateEcheance ? true : false}
                            type="date"
                            fullWidth
                            size="small"
                        />
                    </Grid>
                     <Grid item xs={2} sm={4}>
                    <FormControlLabel
                        value="start"
                        control={<Checkbox
                        checked={hasTerme}
                        onChange={handleTermeChange}  />}
                        label="Terme"
                        labelPlacement="start"
        />
                    </Grid>
                    
                    {hasTerme && (
                    <>
                        <Grid item xs={12} sm={4}>
                        <TextField
                            name="dateTerme"
                            label="Date Terme"
                            value={formik.values.dateTerme}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            type="date"
                            fullWidth
                            size="small"
                        />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                         <TextField
                        name="typeTerme"
                        label="Type Terme"
                        value={selectedType ? selectedType.terme : ''}
                        onChange={handleTypeChange}
                        fullWidth
                        select
                        size="small"
                        required
                        >
                        {TypesTerme.map((t) => (
                            <MenuItem key={t.id} value={t.terme}>
                            {t.terme}
                            </MenuItem>
                        ))}
                        </TextField>    
                                </Grid>
                                </>
                                )}
                     <Grid item xs={12} />
                     <Grid item xs={12} />
                    <Grid item xs={12} sm={4}>
                        <TextField
                            name="primeNette"
                            label="Prime Nette"
                            value={formik.values.primeNette}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            fullWidth
                            size="small"
                            required
                            type='number'
                        />
                    </Grid>
                    
                    <Grid item xs={12} sm={4}>
                        <TextField
                            name="taxe"
                            label={formik.touched.taxe && formik.errors.taxe ? 'La taxe dépasse 15% du montant de la prime.' : 'Taxe'}
                            value={formik.values.taxe}
                            onChange={handleTaxeChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.taxe && formik.errors.taxe ? true : false}
                            fullWidth
                            size="small"
                            required
                            type='number'
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            name="acce"
                            label={formik.touched.acce && formik.errors.acce ? 'La valeur des accessoires doit être 0, 10, 15, 20 ou 30' : 'Accessoires'}
                            value={formik.values.acce}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.acce && formik.errors.acce ? true : false}
                            fullWidth
                            size="small"
                            required
                            type='number'
                        />
                    </Grid>
                    <Grid item xs={10} sm={4}>
                        <TextField
                            name="tauxComm"
                            label={formik.touched.tauxComm && formik.errors.tauxComm ? 'Le taux de commission ne doit pas dépasser 25%.' : 'Taux de commission'}
                            value={formik.values.tauxComm}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.tauxComm && formik.errors.tauxComm ? true : false}
                            fullWidth
                            size="small"
                            required
                            type='number'
                            inputProps={{
                                min: 0,
                              }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            name="mnt_taxe_eve"
                            label="Taxe événementielle"
                            value={formik.values.mnt_taxe_eve}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            fullWidth
                            size="small"
                            required
                            type='number'
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            name="mnt_taxe_parafiscale"
                            label="Taxe Parafiscale"
                            value={formik.values.mnt_taxe_parafiscale}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            fullWidth
                            size="small"
                            required
                            type='number'
                        />
                    </Grid>
                    <Grid item xs={12} />
                     <Grid item xs={12} />
                    <Grid item xs={12} sm={4}>
                        <TextField
                            name="refPolice"
                            label="Etat de Police"
                            value={selectedEtat ? selectedEtat.libelle : ''}
                            onChange={handleEtatChange}
                            fullWidth
                            select
                            size="small"
                        >
                             {Etats.map((e) => (
                <MenuItem key={e.id} value={e.libelle}>
                  {e.libelle}
                </MenuItem>
              ))}
            </TextField> 
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            name="dateEtat"
                            label="Date Etat"
                            value={formik.values.dateEtat}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            fullWidth
                            type="date"
                            size="small"
                            required
                        />
                    </Grid>
                </Grid>
                
        </form>
        )}
        {activeStep === 1 && (
             <Box sx={{ marginTop: '2rem', marginBottom: '3rem' }}>
                  {selectedVersion && <Garanties versionId={selectedVersion.id} />}
             </Box>
             
        )}
        {activeStep === 2 && (
          // Component to display in the third step
          <div>Mon 3eme composant</div>
        )}
        {/* Add more conditions for additional steps */}
      </>
    )}
    <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-between' }}>
      {activeStep !== 0 && (
        <Button onClick={() => setActiveStep((prevActiveStep) => prevActiveStep - 1)}>
          <KeyboardArrowLeft /> Retour
        </Button>
      )}
      <div style={{ flexGrow: 1 }} /> {/* Utilise l'espace disponible */}
      <Button
        type="submit"
        onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}
      >
        {activeStep === steps.length - 1 ? 'Ajouter' : 'Suivant'} <KeyboardArrowRight />
      </Button>
    </div>
        </Box>
    );
};

export default AddPolice;

