import React, {useState, ChangeEvent, FormEvent, useEffect} from 'react';
import {TextField, Button, Box, Checkbox, FormControlLabel} from '@mui/material';
import axios from 'axios';
import {Link} from "react-router-dom";
import Typography from "@mui/material/Typography";
import ConsultPolicePage from "../../pages/ConsultPolicePage";
import SearchPolice from "./SearchPolice";
import Grid from "@mui/material/Grid";
import "./SearchPolice.css"
import {   MenuItem, Select,Divider  } from '@mui/material';
import { Margin } from '@mui/icons-material';
import { Label } from 'recharts';
import { alignProperty } from '@mui/material/styles/cssUtils';
import { set } from 'lodash';

interface Ville {
    id: number;
    code: string;
    libelle: string;
}

interface PoliceData {
    id: number;
    codePolice: string;
    numClient: string;
    raisonSociale: string;
    adresse: string;
    dateEffet: Date;
    primeNette: bigint;
    taxe: bigint;
    acce: bigint;
    tauxComm: number;
    dateTerme: Date;
    dateEtat: Date;
    periodicite: String; 
    ff: number;
    mnt_taxe_eve: number;
    mnt_taxe_parafiscale: number;
    prdVersioncommerciale: string;
    refVille: Ville;
    refPolice: string;
    terme: boolean;
}

const AddPolice: React.FC = () => {
    const [policeData, setPoliceData] = useState<PoliceData>({
        id: 0,
        codePolice: '',
        numClient: '',
        raisonSociale: '',
        adresse: '',
        dateEffet: new Date(),
        primeNette: BigInt(0),
        taxe:  BigInt(0),
        acce:  BigInt(0),
        tauxComm:  0.0,
        dateTerme: new Date(),
        dateEtat: new Date(),
        ff: 0.0,
        mnt_taxe_eve: 0,
        mnt_taxe_parafiscale: 0,
        prdVersioncommerciale: '',
        refVille: {id: 0, code: '', libelle: ''},
        refPolice: '',
        terme: false,
        periodicite: '',
    });
    const [hasTerme, setHasTerme] = useState(false);
    const [createdPoliceCodePolice, setCreatedPoliceCodePolice] = useState<string | null>(null);
    const [villesLibelle, setVillesLibelle] = useState<string[]>([]);
    const [villes, setVilles] = useState<Ville[]>([]);
    const [selectedVille, setSelectedVille] = useState<Ville | null>(null);

    useEffect(() => {
      fetchVilles();
    }, []);
  
    const fetchVilles = async () => {
        try {
          const response = await axios.get<any[]>('http://localhost:8081/villes');
          const villesData: Ville[] = response.data;
          setVilles(villesData);
          const villes = villesData.map((ville) => ville.libelle);
          setVillesLibelle(villes);
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
    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        try {
            const response = await axios.post(
                'http://localhost:8081/polices/add',
                {
                ...policeData,
                refVille: selectedVille,
                }
                );
            // Redirect to the PoliceDetails component with the codePolice as a parameter
            window.location.href = `/consult-page/${response.data.codePolice}`;
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Box sx={{padding: '2rem', width: '70rem', marginBottom:'2rem', height: '29rem', backgroundColor: 'white' ,boxShadow: '2px 2px 2px 1px rgba(0, 0, 0, 0.2);', marginLeft:'2.5rem'}}>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
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
                            value={policeData.prdVersioncommerciale}
                            onChange={handleChange}
                            fullWidth
                            select
                            size="small"
                        />
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
                            value={policeData.periodicite}
                            onChange={handleChange}
                            fullWidth
                            select
                            size="small"
                        />
                    </Grid>
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
                            required
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
                            name="ff"
                            label="FF"
                            value={policeData.ff}
                            onChange={handleChange}
                            fullWidth
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
                            label="Etat Police"
                            value={policeData.refPolice}
                            onChange={handleChange}
                            fullWidth
                            select
                            size="small"
                        />
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
