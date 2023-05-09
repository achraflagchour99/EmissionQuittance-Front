import { useState } from "react";
import * as React from 'react';
import axios from "axios";
import fetchData from './SearchService';
import SearchResultTable from './SearchResultTable';
import { Form, Button } from "react-bootstrap";
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import TextField  from "@mui/material/TextField";
import { makeStyles } from '@mui/material/styles';
import "../../SearchPolice.css"  
import Pagination from '@mui/material/Pagination';

function SearchForm() {
    const [refQuittanceid, setRefQuittanceid] = useState("");
    const [dateDebut, setDateDebut] = useState("");
    const [dateFin, setDateFin] = useState("");
    const [codePolice, setCodePolice] = useState("");
    const [pageNumber, setPageNumber] = useState(0);
    const [pageSize, setPageSize] = useState(3);
    const [data, setData] = useState(null);
    const [page, setPage] = useState(1); // define `page` state
    const handlePageChange = (event, value) => { // define `handlePageChange` function
        setPageSize(value);
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      const result = await fetchData(refQuittanceid, dateDebut, dateFin, codePolice, pageSize);
      setData(result);
    };
  
    return (
        <Form onSubmit={handleSubmit} className="d-flex flex-wrap justify-content-center">
        <TextField 
          id="refQuittanceid"
          label="RefQuittanceid"
          type="text"
          value={refQuittanceid}
          onChange={(e) => setRefQuittanceid(e.target.value)}
        />

        <TextField 
          id="dateDebut"
          label="Date Debut"
          type="text"
          variant="outlined"
          value={dateDebut}
          onChange={(e) => setDateDebut(e.target.value)}
        />

        <TextField 
          id="dateFin"
          label="Date Fin"
          type="text"
          value={dateFin}
          onChange={(e) => setDateFin(e.target.value)}
        />

        <TextField 
          id="codePolice"
          label="Code Police"
          type="text"
          value={codePolice}
          onChange={(e) => setCodePolice(e.target.value)}
        />

        <Button id={"search-button"} type="submit" variant="contained" startIcon={<ContentPasteSearchIcon />}>
          Rechercher
        </Button>

        {data && <SearchResultTable data={data} />}

        <Pagination count={3} page={page} defaultValue={3} onChange={handlePageChange} /> 
      </Form>
    );
  }
  
  export default SearchForm;
