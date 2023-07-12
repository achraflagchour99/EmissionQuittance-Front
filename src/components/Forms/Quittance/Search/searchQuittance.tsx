import React, {useCallback, useEffect, useMemo, useState} from 'react';
import { Navigate } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
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
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField,
    Tooltip,
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import "../../Police/Search/SearchPolice.css"
import {
  fetchIntermediaires,
  fetchPolice,
  fetchVersionsCommerciales,
  fetchRefQuittances,
} from '../../../../api/service/provideData';
import { RefQuittancePayload } from '../../../../api/interface/refQuittancePayload';
import config from '../../../../config/config';
//import config from ''

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
    exercice:string, 
    police: {
      codePolice: string;
    };
};

const Examples = () => {
  let navigate=useNavigate()
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
    const [searchCriteria, setSearchCriteria] = useState<{
      refQuittanceid: string;
      dateDebut: string;
      refNatureQuittance: string;
      dateFin: string;
      codePolice: string;
      pageNumber: string;
      pageSize: string ;
      policecode :string;
    }>({
      refQuittanceid: '',
      dateDebut: '',
      refNatureQuittance: "",
      dateFin: '',
      codePolice: '',
      pageNumber: '0',
      pageSize: '4' ,
      policecode :''
    });

  
    const handleCreateNewRow = async (values: Person) => {
    
    };


   
        const [responseData, setResponseData] = useState<any>(null);
       
    const fetchTableData = async (pageIndex: number, pageSize: number) => {
      setIsLoading(true);
        try {
            const params: { [key: string]: string | number } = {
                page: pageIndex,
                size: pageSize,
            };


            const response = await fetch(`${config.apiUrl}/quittances/searchNew?`+'&pageNumber='+pagination.pageIndex+'&pageSize='+pagination.pageSize+'&codePolice='+searchCriteria.codePolice+'&dateDebut='+searchCriteria.dateDebut+'&dateFin='+searchCriteria.dateFin+'&refQuittanceId='+searchCriteria.refNatureQuittance);
           
            const responseData = await response.json();  
            setResponseData(responseData.content); 
         console.log(responseData.content)


       
           
            setTableData(responseData.content);
            setTotalItems(responseData.totalElements );
        } catch (error) {
            console.error(error);
        }
        finally {
          setIsLoading(false);
      }
    };


    const handleSearchClick = () => {
      // Appeler votre fonction fetchTableData ici
      fetchTableData(pagination.pageIndex, pagination.pageSize);
    };

    useEffect(() => {

      const fetchData = async () => {
     
  
        const refQuittancesData = await fetchRefQuittances();
        setRefQuittances(refQuittancesData);
      };
      fetchData();

        fetchTableData(pagination.pageIndex,pagination.pageSize);
        
    }, [pagination.pageIndex,pagination.pageSize,searchCriteria]);



    

    

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
              accessorKey: 'exercice',
              header: '  exercice', 
              
          },
          {
            accessorKey: 'ordre',
            header: '  ordre', 
            
        },
        {
          accessorKey: 'police.codePolice',
          header: '  Numero  de police', 
          render: (rowData: Person) => rowData?.police?.codePolice || '',
          
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
    
    const [refQuittances, setRefQuittances] = useState<RefQuittancePayload[] | null>(null);


  function refQR(e: { target: { value: any; }; }): void{
    setSearchCriteria({ ...searchCriteria, refNatureQuittance: e.target.value })
  }

    /*  onChange={(e) =>
            setSearchCriteria({ ...searchCriteria, refNatureQuittance: e.target.value })
          } */
            

    return (
        <>
         <Box>
      <div className="form-card" style={{ background: 'white', padding: '30px' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              id="codePolice"
              name="codePolice"
              label="Numéro de police"
              variant="outlined"
              type="text"
              placeholder="Numéro de police"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => setSearchCriteria({ ...searchCriteria, codePolice: e.target.value })}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputLabel id="refQuittanceid-label">Quittance Nature</InputLabel>
            <Select
              id="refQuittanceid"
              name="refNatureQuittance"
              label="Quittance Nature"
              variant="outlined"
              fullWidth
              onChange={(e) =>
                setSearchCriteria({ ...searchCriteria, refNatureQuittance: e.target.value })
              }
              value={searchCriteria.refNatureQuittance}
              inputProps={{
                shrink: true,
              }}
            >
              <MenuItem value="">Sélectionner</MenuItem>
              {refQuittances?.map((refQuittance: any) => (
            <MenuItem key={refQuittance.id} value={refQuittance.id}>
              {refQuittance.etatQuittance}
            </MenuItem>
          ))}
            </Select>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="dateDebut"
              name="dateDebut"
              label="Date de début"
              variant="outlined"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) =>
                setSearchCriteria({ ...searchCriteria, dateDebut: e.target.value })
              }
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="dateFin"
              name="dateFin"
              label="Date de fin"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => setSearchCriteria({ ...searchCriteria, dateFin: e.target.value })}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Button onClick={handleSearchClick} variant="contained" color="primary">
              Rechercher  
            </Button>
          </Grid>
        </Grid>
      </div>
    </Box>
        <div className={"form-card"}>
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
                renderRowActions={({ row, table }) => (
                    <Box sx={{ display: 'flex', gap: '1rem' }}>
                        <Tooltip arrow placement="left" title="Edit">
                            <IconButton onClick={() =>   navigate('/quittance-update/'+row.original.id)  }>
                                <Edit />
                            </IconButton>
                        </Tooltip> 
                    </Box>
                )}
        
            />
            )}
            </div>
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
                    <Stack    >
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