import React, { useState, useEffect, useMemo } from 'react';
import MaterialReactTable, { MRT_PaginationState, type MRT_ColumnDef } from 'material-react-table';
import Pagination from '@mui/material/Pagination';


type QuittanceDTO = {
  id: number
  numeroquittance: string
  policeid: string
  datedebut: "2023-05-04"
  datefin: "2024-05-04"
  montantcommission: number
  dateemission: string
  etatquittance: string
  dateetat: string
  idoperationprelevement: number
  idutilisateurristourne: number
  idutilisateurvalidateur: number
  idproduit: number
  tauxcommission: number
  synchrone: number
  datesynchronisation: string
  montantcommision: number
  numeroquittanceOld: number
  datevalidation: string
  montanttaxeparafiscale: number
  tauxcommissioncatnat: number
  idquittanceorigine: number
  typequittanceprevoyance: string
  forcee: number
  exercice: string
  ordre: string
  villeclient: 2
  intermediaireid: 8
  refQuittanceid: 2
  qtcRemiseid: 1
  habUtilisateurid: 1
  dateEcheance: '2024-05-04'
  dateTerme: '2022-05-04'
  dateeffet: '2022-05-04'
};

const SearchQuittances = () => {
  const [searchCriteria, setSearchCriteria] = useState({
    refQuittanceid: '',
    dateDebut: '',
    dateFin: '',
    codePolice: '',
    pageNumber: '0',
    pageSize: '4',
  });

  

  const [data, setData] = useState<QuittanceDTO[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!searchCriteria) {
        return; // return early if searchCriteria is undefined or null
      }
       
      const queryParams = new URLSearchParams(searchCriteria);
      const response = await fetch(`http://localhost:8081/quittances/search?`+'dateDebut='+searchCriteria.dateDebut+'&dateFin='+searchCriteria.dateFin+'&pageNumber='+searchCriteria.pageNumber+'&codePolice='+searchCriteria.codePolice+'&pageSize='+searchCriteria.pageSize);


      const responseData = await response.json();
      console.log( responseData.content);
      setData(responseData.content);
    };
    fetchData();
  }, [searchCriteria]);

  const columns = useMemo<MRT_ColumnDef<QuittanceDTO>[]>(
    () => [
      {
        accessorKey: 'intermediaireid',
        header: 'intermediaireid',
      },
      {
        accessorKey: 'dateEcheance',
        header: 'dateEcheance',
      },
      {
        accessorKey: 'datedebut',
        header: 'dateDebut',
      },
      {
        accessorKey: 'datefin',
        header: 'dateFin',
      }, 
    ],
    []
  );

  const handleSearch = () => {
    setSearchCriteria({
      ...searchCriteria,
      pageNumber: '0', // Reset to first page


      
    });
     alert(searchCriteria.pageSize)
  };

  const [currentPage, setCurrentPage] = useState(1);
 
  
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5, //customize the default page size
  });

 

  return (
    <div>
       
      
      


       <div>
        <label>Ref Quittance ID:</label>
        <input
          type="number"
          value={searchCriteria.refQuittanceid || ''}
          onChange={(e) =>
            setSearchCriteria({ ...searchCriteria, refQuittanceid: e.target.value })
          }
        />
      </div>
      <div>
        <label>Date Debut:</label>
        <input
          type="date"
          value={searchCriteria.dateDebut || ''}
          onChange={(e) => setSearchCriteria({ ...searchCriteria, dateDebut: e.target.value })}
        />
      </div>
      <div>
        <label>Date Fin:</label>
        <input
          type="date"
          value={searchCriteria.dateFin || ''}
          onChange={(e) => setSearchCriteria({ ...searchCriteria, dateFin: e.target.value })}
        />
      </div>
      <div>
        <label>Code Police:</label>
        <input
          type="number"
          value={searchCriteria.codePolice || ''}
          onChange={(e) => setSearchCriteria({ ...searchCriteria, codePolice: e.target.value })}
        />
      </div>
      <button onClick={handleSearch}>Search</button>






      <MaterialReactTable columns={columns} data={data}     enableGlobalFilterModes

      
       onPaginationChange={setPagination} //hoist pagination state to your state when it changes internally
       state={{ pagination }} //pass the pagination state to the table
     
      enablePinning
      enableRowNumbers
      enableRowVirtualization/>

 
 


    </div>
  );
};

export default SearchQuittances;
