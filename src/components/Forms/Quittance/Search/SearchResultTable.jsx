import React, { useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
 

function SearchResultTable(props) {
    const { data } = props;
    console.log(props);
    return (
      <table  className="table mt-3">
        <thead>
          <tr>
            <th>RefQuittanceid</th>
            <th>Date Debut</th>
            <th>Date Fin</th>
            <th>Code Police</th> 
          </tr>
        </thead>
        <tbody>
          {data &&
            data.content.map((item) => (
              <tr key={item.id}>
                <td>{item.prenomclient}</td>
                <td>{item.datedebut}</td>
                <td>{item.datefin}</td>
                <td>{item.codepolice}</td> 
              </tr>
            ))}
        </tbody>
      </table>
    );
  }
  export default SearchResultTable;