import React, {useState} from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from "@mui/material/TextField";
import {Box, tableCellClasses} from "@mui/material";
import Button from "@mui/material/Button";
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import "./SearchPolice.css"
import {styled} from "@mui/material/styles";

const ENDPOINT_URL = 'http://localhost:8081/polices/search';

interface Resultat {
    id: number;
    codePolice: string;
    numClient: string;
    raisonSociale: string;
    adresse: string;
    dateEffet: string;
    primeNette: number;
    taxe: number;
    acce: number;
    tauxComm: number;
    dateTerme: string;
    dateEtat: string;
    ff: string;
    mnt_taxe_eve: number;
    mnt_taxe_parafiscale: number;
}
interface TablePaginationActionsProps {
count: number;
page: number;
rowsPerPage: number;
onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number,
) => void;
}
function SearchPolice() {
    const [numClient, setNumeroClient] = useState('');
    const [codePolice, setCodePolice] = useState('');
    const [nomcommercial, setNomCommercial] = useState('');
    const [ville, setVille] = useState('');
    const [resultats, setResultats] = useState<Resultat[]>([]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const params: { [key: string]: string } = {};
            if (numClient) params.numClient = numClient;
            if (codePolice) params.codePolice = codePolice;
            if (nomcommercial) params.nomcommercial = nomcommercial;
            if (ville) params.ville = ville;
            const response = await axios.get<Resultat[]>(ENDPOINT_URL, {params});
            setResultats(response.data);
        } catch (error) {
            console.error(error);
        }
    };
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: "#0f2ea2",
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        }, 
    }));

    return (
    <div>
            <Box sx={{'& .MuiTextField-root': { m: 1, width: '25ch' },}}>
                <div className={"form-card"}>
            <form onSubmit={handleSubmit}>
                <TextField
                    id="outlined-basic"
                    label="Numéro de client"
                    variant="outlined"
                    type="text"
                    placeholder="Numéro de client"
                    value={numClient}
                    onChange={(event) => setNumeroClient(event.target.value)}
                />
                <TextField
                    id="outlined-basic"
                    label="Code Police"
                    variant="outlined"
                    type="text"
                    value={codePolice}
                    onChange={(event) => setCodePolice(event.target.value)}
                />
                <TextField
                    id="outlined-basic"
                    label="Nom commercial"
                    variant="outlined"
                    type="text"
                    placeholder="Nom commercial"
                    value={nomcommercial}
                    onChange={(event) => setNomCommercial(event.target.value)}
                />
                <TextField
                    id="outlined-basic"
                    label="Ville"
                    variant="outlined"
                    type="text"
                    placeholder="Ville"
                    value={ville}
                    onChange={(event) => setVille(event.target.value)}
                />
                <Button id={"search-button"} type="submit" variant="contained" startIcon={<ContentPasteSearchIcon />}>
                Rechercher
                </Button>
            </form>
                </div>
            </Box>
            {resultats.length > 0 ? (
                <div className={"results-box"}>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow className={"row-names"}>
                                <StyledTableCell>Code Police</StyledTableCell>
                                <StyledTableCell>Numéro client</StyledTableCell>
                                <StyledTableCell>Raison sociale</StyledTableCell>
                                <StyledTableCell>Adresse</StyledTableCell>
                                <StyledTableCell>Date d'effet</StyledTableCell>
                                <StyledTableCell>Prime nette</StyledTableCell>
                                <StyledTableCell>Taxe</StyledTableCell>
                                <StyledTableCell>Acce</StyledTableCell>
                                <StyledTableCell>Taux comm</StyledTableCell>
                                <StyledTableCell>Date de terme</StyledTableCell>
                                <StyledTableCell>Date d'état</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {resultats.map((resultat) => (
                                <StyledTableRow key={resultat.id}>
                                    <StyledTableCell component="th" scope="row">{resultat.codePolice}</StyledTableCell>
                                    <StyledTableCell  align="left">{resultat.numClient}</StyledTableCell>
                                    <StyledTableCell align="left">{resultat.raisonSociale}</StyledTableCell>
                                    <StyledTableCell align="left">{resultat.adresse}</StyledTableCell>
                                    <StyledTableCell align="left">{resultat.dateEffet}</StyledTableCell>
                                    <StyledTableCell align="left">{resultat.primeNette}</StyledTableCell>
                                    <StyledTableCell align="left">{resultat.taxe}</StyledTableCell>
                                    <StyledTableCell align="left">{resultat.acce}</StyledTableCell>
                                    <StyledTableCell align="left">{resultat.tauxComm}</StyledTableCell>
                                    <StyledTableCell align="left">{resultat.dateTerme}</StyledTableCell>
                                    <StyledTableCell align="left">{resultat.dateEtat}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                </div>
            ) : null}
        </div>
    );
}


export default SearchPolice;