import * as React from 'react';
import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { garantie } from '../Types/types';
import { format } from 'date-fns';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#1563a3',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 15,
  },
  '&.garantie-cell': {
    width: '70%',
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 2,
  },
}));

export default function CustomizedTables({ versionId }: { versionId: number | null }) {
  const [tableData, setTableData] = useState<garantie[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (versionId) {
          const response = await fetch(`http://localhost:8081/versioncom/garanties/version/${versionId}`);
          const data = await response.json();
          setTableData(data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [versionId]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ border: 2, borderColor: '#a7bcb9', minWidth: 300 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="left">Garantie</StyledTableCell>
            <StyledTableCell align="left">Taux</StyledTableCell>
            <StyledTableCell align="left">Date Debut</StyledTableCell>
            <StyledTableCell align="left">Date Fin</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell className="garantie-cell" component="th" scope="row">
                {row.libelle}
              </StyledTableCell>
              <StyledTableCell align="left">{row.taux}</StyledTableCell>
              <StyledTableCell align="left">{row.datedebut}</StyledTableCell>
              <StyledTableCell align="left">{row.datefin}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
