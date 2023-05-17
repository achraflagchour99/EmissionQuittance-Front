import React, {useCallback, useEffect, useMemo, useState} from 'react';
import MaterialReactTable, {
  MRT_ColumnFiltersState,
    type MaterialReactTableProps,
    type MRT_Cell,
    type MRT_ColumnDef,
    type MRT_Row,
} from 'material-react-table';
import {
    Box,
    Button,
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
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
const ENDPOINT_URL = 'http://localhost:8081/quittances/search?';

export type Person = {
    id: number;
    intermediaireid: 8
    refQuittanceid: 2
    qtcRemiseid: 1
    habUtilisateurid: 1
    dateEcheance: '2024-05-04'
    dateTerme: '2022-05-04'
    dateeffet: '2022-05-04'
    nomclient: string
    ordre:string
};

const Examples = () => {
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [tableData, setTableData] = useState<Person[]>([]);
    const [validationErrors, setValidationErrors] = useState<{
        [cellId: string]: string;
    }>({});
    const [totalItems, setTotalItems] = useState(0);
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 5, //customize the default page size
    });
      const [searchCriteria, setSearchCriteria] = useState({
    refQuittanceid: '',
    dateDebut: '',
    dateFin: '',
    codePolice: '',
    pageNumber: '0',
    pageSize: '4',
  });

 

    const handleCreateNewRow = async (values: Person) => {
        try {
            // Make an API request to create a new person
            const response = await fetch('http://localhost:8081/polices/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });

            if (response.ok) {
                // If the API request is successful, fetch the updated data from the API
                const newData = await fetch('http://localhost:8081/polices/add').then((res) => res.json());
                setTableData(newData);
            } else {
                // Handle error case
                console.error('Failed to create a new person');
            }
        } catch (error) {
            console.error('Failed to create a new person', error);
        }
    };


    const handleSaveRowEdits: MaterialReactTableProps<Person>['onEditingRowSave'] =
        async ({ exitEditingMode, row, values }) => {
            if (!Object.keys(validationErrors).length) {
                tableData[row.index] = values;
                //send/receive api updates here, then refetch or update local table data for re-render
                setTableData([...tableData]);
                exitEditingMode(); //required to exit editing mode and close modal
            }
        };
    const fetchTableData = async (pageIndex: number, pageSize: number) => {
        try {
            const params: { [key: string]: string | number } = {
                page: pageIndex,
                size: pageSize,
            };
          //   const response = await axios.get<Person[]>(ENDPOINT_URL, { params });

          console.log('pageIndex '+pageIndex)
          console.log('pageSize '+pageSize)
       

             const response = await fetch(`http://localhost:8081/quittances/search?`+'&pageNumber='+pagination.pageIndex+'&pageSize='+pagination.pageSize+'&codePolice='+searchCriteria.codePolice+'&dateDebut='+searchCriteria.dateDebut+'&dateFin='+searchCriteria.dateFin);
            const responseData = await response.json();


          console.log(responseData);
           
            setTableData(responseData.content);
             setTotalItems(responseData.totalElements );
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchTableData(pagination.pageIndex,pagination.pageSize);
    }, [pagination.pageIndex,pagination.pageSize]);
    const handleCancelRowEdits = () => {
        setValidationErrors({});
    };

    const handleDeleteRow = useCallback(
        (row: MRT_Row<Person>) => {
            //send api delete request here, then refetch or update local table data for re-render
            tableData.splice(row.index, 1);
            setTableData([...tableData]);
        },
        [tableData],
    );

    

    const columns = useMemo<MRT_ColumnDef<Person>[]>(
        () => [
            {
                accessorKey: 'id',
                header: 'ID',
                enableColumnOrdering: false,
                enableEditing: false, //disable editing on this column
                enableSorting: false,
                size: 80,
            },

            {
                accessorKey: 'nomclient',
                header: '  nomclient', 
                
            },

            {
                accessorKey: 'dateEcheance',
                header: 'dateEcheance: ',
                size: 80,
                
            },
        ],
        [],
    );



    const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>(
      [],
    );
    const [globalFilter, setGlobalFilter] = useState('');
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isRefetching, setIsRefetching] = useState(false);
    const [rowCount, setRowCount] = useState(0);
    



    return (
        <>
<Box sx={{'& .MuiTextField-root': { m: 1, width: '25ch' },}}>
                <div className={"form-card"}>
            <form >
                <TextField
                    id="outlined-basic"
                    label="Numero  de  police"
                    variant="outlined"
                    type="text"
                    placeholder="Numéro de client"
                  

                    onChange={(e) =>
                      setSearchCriteria({ ...searchCriteria, codePolice: e.target.value })
                    }
                />
                <TextField
                    id="outlined-basic"
                    label="date Debut"
                    variant="outlined"
                    type="Date"

                    onChange={(e) =>
                      setSearchCriteria({ ...searchCriteria, dateDebut: e.target.value })
                    }
                     
                />
                <TextField
                    id="outlined-basic"
                    label="date Fin" 
                    type="Date"
                    placeholder="Nom commercial"    
                    onChange={(e) =>
                      setSearchCriteria({ ...searchCriteria, dateFin: e.target.value })
                    }
                    
                /> 
                <Button id={"search-button"} type="submit" variant="contained" startIcon={<ContentPasteSearchIcon />}>
                Rechercher
                </Button>
            </form>
                </div>
            </Box>
        
            <MaterialReactTable
                displayColumnDefOptions={{
                    'mrt-row-actions': {
                        muiTableHeadCellProps: {
                            align: 'center',
                        },
                        size: 120,
                    },
                }}
                columns={columns}
                data={tableData}
                manualPagination
                rowCount={totalItems}
  
                onPaginationChange={setPagination}
                 
                state={{
                  columnFilters,
                  globalFilter,
                  isLoading,
                  pagination,
                  showAlertBanner: isError,
                  showProgressBars: isRefetching,
                 
                }}
 

                editingMode="modal" //default
                enableColumnOrdering
                enableEditing
                onEditingRowSave={handleSaveRowEdits}
                onEditingRowCancel={handleCancelRowEdits}
                renderRowActions={({ row, table }) => (
                    <Box sx={{ display: 'flex', gap: '1rem' }}>
                        <Tooltip arrow placement="left" title="Edit">
                            <IconButton onClick={() => table.setEditingRow(row)}>
                                <Edit />
                            </IconButton>
                        </Tooltip>
                        <Tooltip arrow placement="right" title="Delete">
                            <IconButton color="error" onClick={() => handleDeleteRow(row)}>
                                <Delete />
                            </IconButton>
                        </Tooltip>
                    </Box>
                )}
                renderTopToolbarCustomActions={() => (
                    <Button
                        color="secondary"
                        onClick={() => setCreateModalOpen(true)}
                        variant="contained"
                    >
                        Create New Account
                    </Button>
                )}
            />
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
    columns: MRT_ColumnDef<Person>[];
    onClose: () => void;
    onSubmit: (values: Person) => void;
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
            <DialogTitle textAlign="center">Create New Account</DialogTitle>
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
                <Button onClick={onClose}>Cancel</Button>
                <Button color="secondary" onClick={handleSubmit} variant="contained">
                    Create New Account
                </Button>
            </DialogActions>
        </Dialog>
    );
};

 
export default Examples;