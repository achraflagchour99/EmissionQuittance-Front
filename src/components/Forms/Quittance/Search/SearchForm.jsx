import React, { useState } from "react";
import axios from "axios";

const SearchForm = () => {
  const [refQuittanceid, setRefQuittanceid] = useState(null);
  const [dateDebut, setDateDebut] = useState(null);
  const [dateFin, setDateFin] = useState(null);
  const [codePolice, setCodePolice] = useState(null);
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [quittanceDTOs, setQuittanceDTOs] = useState(null);

  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get("http://localhost:8081/quittances/search", {
        params: {
          refQuittanceid,
          dateDebut,
          dateFin,
          codePolice,
          pageNumber,
          pageSize,
        },
      });
      setQuittanceDTOs(response.data);
      console.log("data "+response.data);
      console.log("datadata "+response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSearch}>
      <label>
        Ref Quittance ID:
        <input
          type="number"
          value={refQuittanceid}
          onChange={(e) => setRefQuittanceid(e.target.value)}
        />
      </label>
      <label>
        Date Debut:
        <input
          type="date"
          value={dateDebut}
          onChange={(e) => setDateDebut(e.target.value)}
        />
      </label>
      <label>
        Date Fin:
        <input
          type="date"
          value={dateFin}
          onChange={(e) => setDateFin(e.target.value)}
        />
      </label>
      <label>
        Code Police:
        <input
          type="number"
          value={codePolice}
          onChange={(e) => setCodePolice(e.target.value)}
        />
      </label>
      <label>
        Page Number:
        <input
          type="number"
          value={pageNumber}
          onChange={(e) => setPageNumber(e.target.value)}
        />
      </label>
      <label>
        Page Size:
        <input
          type="number"
          value={pageSize}
          onChange={(e) => setPageSize(e.target.value)}
        />
      </label>
      <button type="submit">Search</button>

      {quittanceDTOs && (
        <div>
          {quittanceDTOs.content.map((quittance) => (
            <div key={quittance.id}>
              <p>ID: {quittance.id}</p>
              <p>Amount: {quittance.amount}</p>
              <p>Date debut: {quittance.dateDebut}</p>
              <p>Date fin: {quittance.dateFin}</p>
            </div>
          ))}
          <p>Total pages: {quittanceDTOs.totalPages}</p>
        </div>
      )}
    </form>
  );
};

export default SearchForm;
