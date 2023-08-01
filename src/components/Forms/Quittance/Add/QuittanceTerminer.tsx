import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { jsonDataQuittance, jsonDataState } from '../recoil/atoms';
import { saveQuittanceGarantie } from '../../../../api/service/provideData';
import axios from 'axios';
import Successful from '../../tools/successful';
import Error from '../../tools/error';
import { Grid,Table } from 'rsuite';
import { Button } from '@mui/material';
import './style.css'; // Import the CSS file 

function SuccessMessage() {
    const [jsonDataP, setJsonDataP] = useRecoilState(jsonDataState);
    const [jsonQuittances, setJsonQuittance] = useRecoilState(jsonDataQuittance);

    const [saveStatus, setSaveStatus] = useState('');
    
    console.log("viewer jsonDataP")
    console.log(jsonDataP)
    console.log("viewer jsonQuittances")
    console.log(jsonQuittances)

    const jsonQuittancesObj = JSON.parse(jsonQuittances);
    



    const handleClick = () => {
        // Function to handle the click event

        saveQuittanceGarantie(jsonDataP,jsonQuittances)
        .then(() => {
            setSaveStatus('successful');
          })
          .catch(() => {
            setSaveStatus('error');
          });
       
      

      };

      const { Column, HeaderCell, Cell } = Table; 
      const jsonQuittancesArray = JSON.parse(jsonQuittances);
      const jsonDataPArray = JSON.parse(jsonDataP).map((item: string) => JSON.parse(item));

  return (
    <>

    
    {saveStatus === 'successful' ? (
      <div>
      <Successful />
    
        <Button onClick={handleClick} variant="contained" color="primary">
              Enregistrer Quittance  
            </Button>
      
      </div>
    ) : saveStatus === 'error' ? (
      <Error />
    ) : (
      <div  className="centered-content">
        <Grid>
        Valider  l'enregistrement   pour  ajouter quittance
        </Grid>
        <Button onClick={handleClick} variant="contained" color="primary">
              Enregistrer Quittance  
            </Button>
      </div>
    )}
 
 
 
<div className="centered-content">
        <h2>jsonQuittances</h2>
        <Grid   >
        <div className="label-row" >
        <Grid   >     <label htmlFor="">numeroquittance: {jsonQuittancesObj.numeroquittance}</label>  </Grid>
            <label htmlFor="">Exercice: {jsonQuittancesObj.exercice}</label>
            <label htmlFor="">ordre: {jsonQuittancesObj.ordre}</label>
          </div>
        
          <div className="label-row">
            <label htmlFor="">intermediaire: {jsonQuittancesObj.intermediaireid}</label>
            <label htmlFor="">versioncommerciale: {jsonQuittancesObj.versioncommerciale}</label>
          </div>
          <div className="label-row">
            <label htmlFor="">datedebut: {jsonQuittancesObj.datedebut}</label>
            <label htmlFor="">datefin: {jsonQuittancesObj.datefin}</label>
            <label htmlFor="">dateetat: {jsonQuittancesObj.dateetat}</label>
          </div>
          <div className="label-row">
            <label htmlFor="">dateemission: {jsonQuittancesObj.dateemission}</label>
            <label htmlFor="">montontremise: {jsonQuittancesObj.montontremise}</label>
          </div>
          <div className="label-row">
            <label htmlFor="">Tauxtaxe: {jsonQuittancesObj.tauxtaxe}</label>
            <label htmlFor="">Montantaccessoire: {jsonQuittancesObj.montantaccessoire}</label>
            <label htmlFor="">Tauxcommission: {jsonQuittancesObj.tauxcommission}</label>
          </div>
          <div className="label-row">
            <label htmlFor="">Tauxprimenette: {jsonQuittancesObj.tauxprimenette}</label>
            <label htmlFor="">Montanttaxeparafiscale: {jsonQuittancesObj.montanttaxeparafiscale}</label>
          </div>
        </Grid>
      </div>

 
      <table className="styled-table">
        <thead>
          <tr>
            <th>libelle</th>
            <th>taux</th>
            <th>datedebut</th>
            <th>datefin</th>
            <th>PrimeNette</th>
            <th>Taxe</th>
            <th>Accessoire</th>
            <th>Tauxcommission</th>
            <th>Commission</th>
            <th>TauxprimeEVE</th>
            <th>PrimeGarEve</th>
            <th>TauxParafiscale</th>
          </tr>
        </thead>
        <tbody>
          {jsonDataPArray.map((each_datarecord: any) => (
            <tr key={each_datarecord.id}>
              <td>{each_datarecord.libelle}</td>
              <td>{each_datarecord.taux}</td>
              <td>{each_datarecord.datedebut}</td>
              <td>{each_datarecord.datefin}</td>
              <td>{each_datarecord.PrimeNette}</td>
              <td>{each_datarecord.Taxe}</td>
              <td>{each_datarecord.Accessoire}</td>
              <td>{each_datarecord.Tauxcommission}</td>
              <td>{each_datarecord.Commission}</td>
              <td>{each_datarecord.TauxprimeEVE}</td>
              <td>{each_datarecord.PrimeGarEve}</td>
              <td>{each_datarecord.TauxParafiscale}</td>
            </tr>
          ))}
        </tbody>
      </table>


  </>
  );
}

export default SuccessMessage;
