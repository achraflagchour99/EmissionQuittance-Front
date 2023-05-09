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
import {Box, CircularProgress, InputLabel, MenuItem, Select, tableCellClasses} from "@mui/material";
import Button from "@mui/material/Button";
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import "./SearchPolice.css"
import {styled} from "@mui/material/styles";
import TablePagination from "@mui/material/TablePagination";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from '@mui/icons-material/Update';
import ManageSearchRoundedIcon from '@mui/icons-material/ManageSearchRounded';
import IconButton from "@mui/material/IconButton";
import ConsultPolicePage from "../../pages/ConsultPolicePage";
import {Link} from "react-router-dom";


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
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [totalItems, setTotalItems] = useState(0);

    const fetchData = async (page: number, rowsPerPage: number) => {
        setIsLoading(true);
        try {
            const params: { [key: string]: string | number } = {
                page: page,
                size: rowsPerPage,
            };
            if (numClient) params.numClient = numClient;
            if (codePolice) params.codePolice = codePolice;
            if (nomcommercial) params.nomcommercial = nomcommercial;
            if (ville) params.ville = ville;
            const response = await axios.get<Resultat[]>(ENDPOINT_URL, { params });
            setResultats(response.data);
            setTotalItems(parseInt(response.headers['x-total-count']));
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPage(newPage);
        fetchData(newPage, rowsPerPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const newRowsPerPage = parseInt(event.target.value, 10);
        setRowsPerPage(newRowsPerPage);
        fetchData(page, newRowsPerPage);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        fetchData(page,rowsPerPage); // Fetch data using the current page number
    };
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: "#243075FF",
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
        '&.selected': {
            backgroundColor: theme.palette.action.hover,
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
        {isLoading ? (
            // Show the loading animation if isLoading is true
            <div style={{ marginLeft:10, marginTop:100, display: "flex", justifyContent: "center", alignItems: "center", height: "200px" }}>
                <CircularProgress />
            </div>
        ) : resultats.length > 0 ? (
                <div className={"results-box"}>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell >Code Police</StyledTableCell>
                                <StyledTableCell>Numéro client</StyledTableCell>
                                <StyledTableCell>Raison sociale</StyledTableCell>
                                <StyledTableCell>Date d'effet</StyledTableCell>
                                <StyledTableCell>Date de terme</StyledTableCell>
                                <StyledTableCell>Date d'état</StyledTableCell>
                                <StyledTableCell>Consulter</StyledTableCell>
                                <StyledTableCell>Modifier</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {resultats.map((resultat) => (
                                <StyledTableRow key={resultat.id}>
                                    <StyledTableCell component="th" scope="row">{resultat.codePolice}</StyledTableCell>
                                    <StyledTableCell  align="left">{resultat.numClient}</StyledTableCell>
                                    <StyledTableCell align="left">{resultat.raisonSociale}</StyledTableCell>
                                    <StyledTableCell align="left">{resultat.dateEffet}</StyledTableCell>
                                    <StyledTableCell align="left">{resultat.dateTerme}</StyledTableCell>
                                    <StyledTableCell align="left">{resultat.dateEtat}</StyledTableCell>
                                    <StyledTableCell>
                                        <Link to={`/consult-page/${resultat.codePolice}`}>
                                            <IconButton id="consult-icon" color="primary" component="button">
                                                <ManageSearchRoundedIcon />
                                            </IconButton>
                                        </Link>
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        <IconButton id={"update-icon"} color="primary" component="button">
                                       <UpdateIcon />
                                        </IconButton>
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                    <TablePagination
                        component="div"
                        rowsPerPageOptions={[5, 10, 25, 50]}
                        count={totalItems}
                        page={page}
                        onPageChange={handleChangePage}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </div>
            ) : null}
        </div>
    );
}


export default SearchPolice;