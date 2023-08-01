import React, {useCallback, useEffect, useMemo, useState, ChangeEvent} from 'react';
import { fetchVilles, fetchVersions} from '../Api/policeApi';
import { Ville, VersionCom} from '../Types/types';
import MaterialReactTable, {
    type MaterialReactTableProps,
    type MRT_Cell,
    type MRT_ColumnDef,
    type MRT_Row,
} from 'material-react-table';
import {
    Box,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    MenuItem,
    Stack,
    TextField,
    Tooltip,
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import axios from "axios";
import "./SearchPolice.css"
import VisibilityIcon from '@mui/icons-material/Visibility';
import {Link} from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import config from '../../../../config/config';


const ENDPOINT_URL = `${config.apiUrl}/polices/search`;

export type Etat = {
    libelle: string;
}

export type Police = {
    codePolice: string;
    numClient: bigint;
    raisonSociale: string;
    adresse: string;
    dateEffet: Date;
    primeNette: bigint;
    taxe: bigint;
    acce: bigint;
    tauxComm: bigint;
    dateTerme: Date;
    dateEtat: Date;
    mnt_taxe_eve: bigint;
    mnt_taxe_parafiscale: bigint;
    prdVersioncommerciale: VersionCom;
    refVille: Ville;
    refPolice: Etat;
};

const SearchPolice = () => {
    const [numClient, setNumeroClient] = useState('');
    const [codePolice, setCodePolice] = useState('');
    const [villes, setVilles] = useState<Ville[]>([]);
    const [versions, setVersions] = useState<VersionCom[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [tableData, setTableData] = useState<Police[]>([]);
    const [validationErrors, setValidationErrors] = useState<{
        [cellId: string]: string;
    }>({});
    const [totalItems, setTotalItems] = useState(0);
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10, //customize the default page size
    });
    const [selectedVille, setSelectedVille] = useState<Ville | null>(null);
    const [selectedVersion, setSelectedVersion] = useState<VersionCom | null>(null);

    const handleCreateNewRow = async (values: Police) => {
        try {
            const response = await axios.post(`${config.apiUrl}/polices/add`, values);

            if (response.status === 201) {
                fetchTableData(pagination.pageIndex, pagination.pageSize);
            } else {
                console.error('Failed to create a new police');
            }
        } catch (error) {
            console.error('Failed to create a new police', error);
        }
    };


    const handleSaveRowEdits: MaterialReactTableProps<Police>['onEditingRowSave'] =
        async ({ exitEditingMode, row, values }) => {
            if (!Object.keys(validationErrors).length) {
                tableData[row.index] = values;
                //send/receive api updates here, then refetch or update local table data for re-render
                setTableData([...tableData]);
                exitEditingMode(); //required to exit editing mode and close modal
            }
        };
        const navigate = useNavigate();

        const handleSetEditingRow = (row: any) => {
          const codePolice = row.original.codePolice;
          // Redirect to the update component with the codePolice as a URL parameter
          navigate(`/police-update/${codePolice}`);
        };
        const handleSetConsultingRow = (row: any) => {
            const codePolice = row.original.codePolice;
            // Redirect to the update component with the codePolice as a URL parameter
            navigate(`/police-details/${codePolice}`);
          };
  
          
    const fetchTableData = async (pageIndex: number, pageSize: number) => {
        setIsLoading(true);
        try {
            const params: { [key: string]: string | number } = {
                page: pageIndex,
                size: pageSize,
            };
        
            if (numClient) params.numClient = numClient;
            if (codePolice) params.codePolice = codePolice;
            if (selectedVersion) params.versioncommerciale = selectedVersion?.nomcommercial ?? '';
            if (selectedVille) params.ville = selectedVille?.libelle ?? '';
            const response = await axios.get(ENDPOINT_URL, { params });
            const fetchedPoliceData = response.data;
            setTableData(fetchedPoliceData);
            setTotalItems(parseInt(response.headers['x-total-count']));
        } catch (error) { 
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        fetchTableData(pagination.pageIndex, pagination.pageSize);
    };
    useEffect(() => {
        fetchVilles(setVilles);
        fetchVersions(setVersions);
        fetchTableData(pagination.pageIndex,pagination.pageSize);
    }, [pagination.pageIndex, pagination.pageSize]);
    
    const handleCancelRowEdits = () => {
        setValidationErrors({});
    };

    const handleDeleteRow = useCallback(
        (row: MRT_Row<Police>) => {
            //send api delete request here, then refetch or update local table data for re-render
            tableData.splice(row.index, 1);
            setTableData([...tableData]);
        },
        [tableData],
    );
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

    const getCommonEditTextFieldProps = useCallback(
        (
            cell: MRT_Cell<Police>,
        ): MRT_ColumnDef<Police>['muiTableBodyCellEditTextFieldProps'] => {
            return {
                error: !!validationErrors[cell.id],
                helperText: validationErrors[cell.id],
                onBlur: (event) => {
                    const isValid =
                        cell.column.id === 'email'
                            ? validateEmail(event.target.value)
                            : cell.column.id === 'age'
                                ? validateAge(+event.target.value)
                                : validateRequired(event.target.value);
                    if (!isValid) {
                        //set validation error for cell if invalid
                        setValidationErrors({
                            ...validationErrors,
                            [cell.id]: `${cell.column.columnDef.header} is required`,
                        });
                    } else {
                        //remove validation error for cell if valid
                        delete validationErrors[cell.id];
                        setValidationErrors({
                            ...validationErrors,
                        });
                    }
                },
            };
        },
        [validationErrors],
    );

    const columns = useMemo<MRT_ColumnDef<Police>[]>(
        () => [
            {
                accessorKey: 'codePolice',
                header: 'Code Police',
                size: 100,
                muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
                    ...getCommonEditTextFieldProps(cell),
                }),
            },
            {
                accessorKey: 'numClient',
                header: 'Numero Client',
                size: 100,
                muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
                    ...getCommonEditTextFieldProps(cell),
                }),
            },
            {
                accessorKey: 'raisonSociale',
                header: 'Raison sociale',
                size: 100,
                muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
                    ...getCommonEditTextFieldProps(cell),
                    type: 'string',
                }),
            },
            {
                accessorKey: 'adresse',
                header: 'Adresse',
                size: 100,
                muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
                    ...getCommonEditTextFieldProps(cell),
                    type: 'string',
                }),
            },
            {
                accessorKey: 'dateEffet',
                header: 'Date Effet',
                size: 100,
                muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
                    ...getCommonEditTextFieldProps(cell),
                }), 
            },
            {
                accessorKey: 'primeNette',
                header: 'Prime Nette',
                size: 100,
                muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
                    ...getCommonEditTextFieldProps(cell),
                }),
            },
            {
                accessorKey: 'taxe',
                header: 'Taxe',
                size: 140,
                muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
                    ...getCommonEditTextFieldProps(cell),
                }),
            },
            {
                accessorKey: 'acce',
                header: 'Accessoires',
                size: 140,
                muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
                    ...getCommonEditTextFieldProps(cell),
                }),
            },
            {
                accessorKey: 'tauxComm',
                header: 'Taux Commission',
                size: 140,
                muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
                    ...getCommonEditTextFieldProps(cell),
                }),
            },
            {
                accessorKey: 'dateTerme',
                header: 'Date Terme',
                size: 140,
                muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
                    ...getCommonEditTextFieldProps(cell),
                }),
            },
            {
                accessorKey: 'dateEtat',
                header: 'Date Etat',
                size: 140,
                muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
                    ...getCommonEditTextFieldProps(cell),
                }),
            },
            {
                accessorKey: 'mnt_taxe_eve',
                header: 'Mnt Taxe Eve',
                size: 140,
                muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
                    ...getCommonEditTextFieldProps(cell),
                }),
            },
            {
                accessorKey: 'mnt_taxe_parafiscale',
                header: 'Mnt Taxe Paraf',
                size: 140,
                muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
                    ...getCommonEditTextFieldProps(cell),
                }),
            },
            {
                accessorKey: 'prdVersioncommerciale.nomcommercial',
                header: 'Produit VC',
                size: 140,
                muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
                    ...getCommonEditTextFieldProps(cell),
                }),
            },
            {
                accessorKey: 'refVille.libelle',
                header: 'Ville',
                size: 140,
                muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
                    ...getCommonEditTextFieldProps(cell),
                }),
            },
            {
                accessorKey: 'refPolice.libelle',
                header: 'Etat de Police',
                size: 140,
                muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
                    ...getCommonEditTextFieldProps(cell),
                }),
            },

        ],
        [getCommonEditTextFieldProps],
    );

    return (
        <>
<Box
  sx={{
    '& .MuiTextField-root': {
      m: 1,
      width: '25ch',
    },
    marginLeft: '0.4rem',
    height: '5rem',
    display: 'flex',
    justifyContent:'center',
    alignItems:'center',
  }}
>
<Box sx={{ marginBottom: '2rem', marginLeft: '1rem' }}>
  <form onSubmit={handleSubmit}>
    <TextField
      id="outlined-basic"
      label="Numéro de client"
      variant="outlined"
      size="small"
      type="text"
      value={numClient}
      onChange={(event) => setNumeroClient(event.target.value)}
      InputLabelProps={{
        shrink: true,
      }}
      className="customTextField"
    />
        <TextField
    id="outlined-basic"
    label="Code Police"
    variant="outlined"
    type="text"
    value={codePolice}
    onChange={(event) => setCodePolice(event.target.value)}
    InputLabelProps={{
        shrink: true,
    }}
    inputProps={{ maxLength: 15 }}
    className="customTextField"
/>

    <TextField
      id="outlined-basic"
      variant="outlined"
      size="small"
      label="Produit"
      value={selectedVersion ? selectedVersion.nomcommercial : ''}
      onChange={handleVersionChange}
      InputLabelProps={{
        shrink: true,
      }}
      select
      sx={{
        height: '0.5rem', // Adjust the height as needed
      }}
    >
      <MenuItem value="">Aucune option</MenuItem> {/* Option vide */}
      {versions.map((v) => (
        <MenuItem key={v.id} value={v.nomcommercial}>
          {v.nomcommercial}
        </MenuItem>
      ))}
    </TextField>
    <TextField
      name="refVille"
      label="Ville"
      value={selectedVille ? selectedVille.libelle : ''}
      onChange={handleVilleChange}
      fullWidth
      select
      size="small"
      InputLabelProps={{
        shrink: true,
      }}
      sx={{
        height: '2.5rem', // Adjust the height as needed
      }}
    >
      <MenuItem value="">Aucune option</MenuItem> {/* Option vide */}
      {villes.map((ville) => (
        <MenuItem key={ville.id} value={ville.libelle}>
          {ville.libelle}
        </MenuItem>
      ))}
    </TextField>
    <Button id="search-button" type="submit" variant="contained" startIcon={<SearchIcon />}>
      Rechercher
    </Button>
  </form>
</Box>
</Box>
            <Box  sx={{marginLeft:'1.8rem',
                       marginRight:'2.5rem', 
                       marginBottom:'2rem', 
                       borderRadius: '5px',
                       border: 2,
                       borderColor: '#a7bcb9',
                       boxShadow:
                       '0px 2px 1px -1px rgba(0, 0, 0, 0.2), 1px 1px 3px 1px rgba(0, 0, 0, 0.2), 0px 1px 3px 0px rgba(0, 0, 0, 0.2)',
                     }}>
            <Box>
            {isLoading ? (
                // Show the loading animation if isLoading is true
                <div style={{ marginLeft:10, marginTop:100, display: "flex", justifyContent: "center", alignItems: "center", height: "200px" }}>
                    <CircularProgress />
                </div>
            ) : (
            <MaterialReactTable
                displayColumnDefOptions={{
                    'mrt-row-actions': {
                        muiTableHeadCellProps: {
                            align: 'center',
                        },
                        size: 50,
                    },
                }}
                columns={columns}
                data={tableData}
                manualPagination
                rowCount={totalItems}
                onPaginationChange={setPagination}
                state={{pagination}}
                editingMode="modal" //default
                enableColumnOrdering
                enableEditing
                onEditingRowSave={handleSaveRowEdits}
                onEditingRowCancel={handleCancelRowEdits}
                renderRowActions={({ row, table }) => (
                    <Box sx={{ display: 'flex', gap: '1rem' }}>
                        <Tooltip arrow placement="left" title="Modifier">
                            <IconButton onClick={() => handleSetEditingRow(row)}>
                                <Edit />
                            </IconButton>
                        </Tooltip>
                        <Tooltip arrow placement="right" title="Consulter">
                            <IconButton  onClick={() => handleSetConsultingRow(row)}>
                                <VisibilityIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>
                )}
                renderTopToolbarCustomActions={() => (
                    <Link to={'/police-add'}>
                    <Button
                        id={"add-button"}
                        color="primary"
                        variant="contained"
                    >
                        Nouvelle Police
                    </Button>
                    </Link>
                )}
            />
            )}
            </Box>
            </Box>
            <CreateNewAccountModal
                columns={columns}
                open={createModalOpen}
                onClose={() => setCreateModalOpen(false)}
                onSubmit={handleCreateNewRow}
            />
        </>
        
    );
};

interface CreateModalProps {
    columns: MRT_ColumnDef<Police>[];
    onClose: () => void;
    onSubmit: (values: Police) => void;
    open: boolean;
}

//example of creating a mui dialog modal for creating new rows
export const CreateNewAccountModal = ({
                                          open,
                                          columns,
                                          onClose,
                                          onSubmit,
                                      }: CreateModalProps) => {
    const [values, setValues] = useState<any>(() =>
        columns.reduce((acc, column) => {
            acc[column.accessorKey ?? ''] = '';
            return acc;
        }, {} as any),
    );

    const handleSubmit = () => {
        //put your validation logic here
        onSubmit(values);
        onClose();
    };

    return (
        <Dialog open={open}>
            <DialogTitle textAlign="center">Police</DialogTitle>
            <DialogContent>
                <form onSubmit={(e) => e.preventDefault()}>
                    <Stack
                        sx={{
                            width: '100%',
                            minWidth: { xs: '300px', sm: '360px', md: '400px' },
                            gap: '1.5rem',
                        }}
                    >
                        {columns.map((column) => (
                            <TextField
                                key={column.accessorKey}
                                label={column.header}
                                name={column.accessorKey}
                                onChange={(e) =>
                                    setValues({ ...values, [e.target.name]: e.target.value })
                                }
                            />
                        ))}
                    </Stack>
                </form>
            </DialogContent>
            <DialogActions sx={{ p: '1.25rem' }}>
                <Button variant="outlined" onClick={onClose}>Fermer</Button>
                <Button color="primary" onClick={handleSubmit} variant="contained">
                    Créer
                </Button>
            </DialogActions>
        </Dialog>
    );
};

const validateRequired = (value: string) => !!value.length;
const validateEmail = (email: string) =>
    !!email.length &&
    email
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        );
const validateAge = (age: number) => age >= 18 && age <= 50;

export default SearchPolice;