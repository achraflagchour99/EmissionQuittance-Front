import React, {useState, ChangeEvent, FormEvent, useEffect} from 'react';
import {TextField, Button, Box, Checkbox, FormControlLabel} from '@mui/material';
import axios from 'axios';
import Grid from "@mui/material/Grid";
import "./SearchPolice.css"
import {   MenuItem, Select,Divider  } from '@mui/material';

interface Ville {
    id: number;
    code: string;
    libelle: string;
}
interface VersionCom {
    id: number;
    nomcommercial: string;
}
interface Interm {
    id: number;
    nomCommercial: string;
}
interface Period {
    id: number;
    type_periodicite: string;
}
interface Interm {
    id: number;
    nomCommercial: string;
}
interface EtatPolice {
    id: number;
    libelle: string;
}
interface PoliceData {
    id: number;
    codePolice: string;
    numClient: string;
    intermediaire: Interm;
    raisonSociale: string;
    adresse: string;
    dateEffet: Date;
    primeNette: bigint;
    taxe: bigint;
    acce: bigint;
    tauxComm: number;
    dateTerme: Date;
    dateEtat: Date;
    periodicite: Period;
    dateEcheance: Date;
    mnt_taxe_eve: number;
    mnt_taxe_parafiscale: number;
    prdVersioncommerciale: VersionCom;
    refVille: Ville;
    refPolice: EtatPolice;
    terme: string;
}

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
    const [createdPoliceCodePolice, setCreatedPoliceCodePolice] = useState<string | null>(null);
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
    const [showEcheance, setShowEcheance] = useState(false);
    useEffect(() => {
      fetchVilles();
      fetchVersions();
      fetchInterm();
      fetchPeriodes();
      fetchEtats();
    }, []);
  
    const fetchVilles = async () => {
        try {
          const response = await axios.get<any[]>('http://localhost:8081/villes');
          const villesData: Ville[] = response.data;
          setVilles(villesData);
          const villes = villesData.map((ville) => ville.libelle);
        } catch (error) {
          console.error(error);
        }
      };
    const fetchVersions = async () => {
        try {
            const response = await axios.get<any[]>('http://localhost:8081/versioncom/all');
            const versionsData: VersionCom[] = response.data;
            setVersions(versionsData)
            const versionscomm = versionsData.map((ver) => ver.nomcommercial);
        } catch (error) {
            console.error(error);
        }
    };
    const fetchInterm = async () => {
        try {
            const response = await axios.get<any[]>('http://localhost:8081/intermediaires');
            const intermData: Interm[] = response.data;
            setIntermediaires(intermData)
            const intermediaires = intermData.map((inter) => inter.nomCommercial);
        } catch (error) {
            console.error(error);
        }
    };
    const fetchPeriodes = async () => {
        try {
            const response = await axios.get<any[]>('http://localhost:8081/periodes');
            const periodesData: Period[] = response.data;
            setPeriodicites(periodesData)
            const periodes = periodesData.map((p) => p.type_periodicite);
        } catch (error) {
            console.error(error);
        }
    };
    const fetchEtats = async () => {
        try {
            const response = await axios.get<any[]>('http://localhost:8081/polices/etats');
            const etatsData: EtatPolice[] = response.data;
            setEtats(etatsData)
            const etats = etatsData.map((e) => e.libelle);
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setPoliceData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
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
        setShowEcheance(true);
    };
    const handleEtatChange = (event: ChangeEvent<{ value: unknown }>) => {
        const selectedEtat = event.target.value as string;
        const etat = Etats.find((e) => e.libelle === selectedEtat);
        setSelectedEtat(etat || null);
    };
    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
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

    return (
        <Box sx={{padding: '2rem', width: '70rem', marginBottom:'2rem', height: '35rem', backgroundColor: 'white' ,boxShadow: '2px 2px 2px 1px rgba(0, 0, 0, 0.2);', marginLeft:'3.75rem'}}>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
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
                            label="Date Effet"
                            value={policeData.dateEffet}
                            onChange={handleChange}
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
                    {showEcheance && (
                    <Grid item xs={12} sm={4}>
                        <TextField
                            name="dateEcheance"
                            label="Date Prochaine Echéance"
                            value={policeData.dateEcheance}
                            onChange={handleChange}
                            type="date"
                            fullWidth
                            size="small"
                        />
                    </Grid>
                    )}
                    <Grid item xs={12} sm={4}>
                        <TextField
                            name="primeNette"
                            label="Prime Nette"
                            value={policeData.primeNette}
                            onChange={handleChange}
                            fullWidth
                            size="small"
                            required
                        />
                    </Grid>
                
                    <Grid item xs={12} sm={4}>
                        <TextField
                            name="taxe"
                            label="Taxe"
                            value={policeData.taxe}
                            onChange={handleChange}
                            fullWidth
                            size="small"
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            name="acce"
                            label="Accessoires"
                            value={policeData.acce}
                            onChange={handleChange}
                            fullWidth
                            size="small"
                            required
                        />
                    </Grid>
                    <Grid item xs={10} sm={4}>
                        <TextField
                            name="tauxComm"
                            label="Taux Commission"
                            value={policeData.tauxComm}
                            onChange={handleChange}
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
                <div className='add-buttons'> 
                <Button  type="submit" variant="contained" color="success">
                            Ajouter
                        </Button>
                        <Button variant="contained" color="primary">
                            Liste de Polices
                        </Button>
                </div>
            </form>

        </Box>
    );
};

export default AddPolice;
