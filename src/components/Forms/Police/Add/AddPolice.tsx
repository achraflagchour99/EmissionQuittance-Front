import React, {useState, ChangeEvent, FormEvent, useEffect} from 'react';
import {TextField, Button, Box, Checkbox, FormControlLabel, Typography} from '@mui/material';
import axios from 'axios';
import Grid from "@mui/material/Grid";
import "../Search/SearchPolice.css"
import {   MenuItem } from '@mui/material';
import { Ville, VersionCom, Interm, Period, EtatPolice, PoliceData } from './Types/types';
import { fetchVilles, fetchVersions, fetchInterm, fetchPeriodes, fetchEtats } from './Api/policeApi';
import { Stepper, Step, StepLabel } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const AddPolice: React.FC = () => {
    const [policeData, setPoliceData] = useState<PoliceData>({
        id: 0,
        codePolice: '',
        numClient: '',
        intermediaire: {id:0, nomCommercial: ''},
        raisonSociale: '',
        adresse: '',
        dateEffet: new Date(),
        primeNette: BigInt(0),
        taxe:  BigInt(0),
        acce:  BigInt(0),
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
    });
    const [hasTerme, setHasTerme] = useState(false);
    const [villes, setVilles] = useState<Ville[]>([]);
    const [versions, setVersions] = useState<VersionCom[]>([]);
    const [intermediaires, setIntermediaires] = useState<Interm[]>([]);
    const [periodicites, setPeriodicites] = useState<Period[]>([]);
    const [Etats, setEtats] = useState<EtatPolice[]>([]);
    const [selectedVille, setSelectedVille] = useState<Ville | null>(null);
    const [selectedVersion, setSelectedVersion] = useState<VersionCom | null>(null);
    const [selectedInterm, setSelectedInterm] = useState<Interm | null>(null);
    const [selectedPeriode, setSelectedPeriode] = useState<Period | null>(null);
    const [selectedEtat, setSelectedEtat] = useState<EtatPolice | null>(null);
    const [activeStep, setActiveStep] = useState(0);
    const [taxe, setTaxe] = useState<string>('');
    const steps = ['Données de la Police', 'Vérification des Garanties', 'Validation de la Police'];

    useEffect(() => {
      fetchVilles(setVilles);
      fetchVersions(setVersions);
      fetchInterm(setIntermediaires);
      fetchPeriodes(setPeriodicites);
      fetchEtats(setEtats);
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
    const handleSubmit = async () => {
        try {
            const response = await axios.post(
                'http://localhost:8081/polices/add',
                {
                ...policeData,
                refVille: selectedVille,
                refPolice: selectedEtat,
                periodicite: selectedPeriode,
                prdVersioncommerciale: selectedVersion,
                intermediaire: selectedInterm,
                }
                );
            // Redirect to the PoliceDetails component with the codePolice as a parameter
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
          primeNette: BigInt(0),
          taxe: BigInt(0),
          acce: BigInt(0),
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
        },
        validationSchema: validationSchema,
        onSubmit: () => {
            // No need to define an async function here
            handleSubmit();
          },
        });
    return (
       <Box sx={{ padding: '2rem', marginBottom: '2rem', marginTop: '0.1rem', height: '38rem', backgroundColor: 'white', justifyContent: 'center', boxShadow: '2px 2px 2px 1px rgba(0, 0, 0, 0.2)', marginLeft: '2rem', marginRight: '2rem' }}>
            <Typography marginBottom={"20px"} variant="h6" align="center" color="primary" gutterBottom>
                    Nouvelle Police
            </Typography>
        <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label, index) => (
                <Step key={index}>
                     <StepLabel>{label}</StepLabel>
                </Step>
            ))}
        </Stepper>
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
            <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2} sx={{ margin: '0 auto', paddingRight:'2rem'}}>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            name="codePolice"
                            label="Code Police"
                            value={policeData.codePolice}
                            onChange={handleChange}
                            fullWidth
                            size="small"
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            name="prdVersioncommerciale"
                            label="Version Commerciale"
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
                            label="Num Client"
                            value={policeData.numClient}
                            onChange={handleChange}
                            fullWidth
                            size="small"
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            name="raisonSociale"
                            label="Raison Sociale"
                            value={policeData.raisonSociale}
                            onChange={handleChange}
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
                            value={policeData.adresse}
                            onChange={handleChange}
                            fullWidth
                            size="small"
                            required
                        />
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
                    <Grid item xs={12} sm={4}>
                        <TextField
                            name="dateTerme"
                            label="Date Terme"
                            value={policeData.dateTerme}
                            onChange={handleChange}
                            type="date"
                            fullWidth
                            size="small"
                        />
                    </Grid>
                    )}
                    
                    <Grid item xs={12} sm={4}>
                        <TextField
                            name="dateEtat"
                            label="Date Etat"
                            value={policeData.dateEtat}
                            onChange={handleChange}
                            fullWidth
                            type="date"
                            size="small"
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            name="mnt_taxe_eve"
                            label="Taxe EVE"
                            value={policeData.mnt_taxe_eve}
                            onChange={handleChange}
                            fullWidth
                            size="small"
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            name="mnt_taxe_parafiscale"
                            label="Taxe Parafiscale"
                            value={policeData.mnt_taxe_parafiscale}
                            onChange={handleChange}
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
                            name="refPolice"
                            label="Etat De Police"
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
                </Grid>
                <div style={{ gap: '1.2rem', display: 'flex', justifyContent: 'flex-end' }}>
        {activeStep !== 0 && (
          <Button variant="contained" color="primary" onClick={() => setActiveStep((prevActiveStep) => prevActiveStep - 1)}>
          <ArrowBackIcon /> Retour
        </Button>
        )}
        <Button type="submit" variant="contained" color="success" onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}>
  {activeStep === steps.length - 1 ? 'Ajouter' : 'Suivant'} <NavigateNextIcon />
</Button>
      </div>
        </form>
        )}
        </Box>
    );
};

export default AddPolice;
