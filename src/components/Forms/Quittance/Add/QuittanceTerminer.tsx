import React, { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { jsonDataQuittance, jsonDataState, jsonDatalibelle } from '../recoil/atoms';
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
    const [jsonDataLibelle, setJsonDataLibelle] = useRecoilState(jsonDatalibelle);
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
     
      const data = useRecoilValue(jsonDatalibelle);
      const versionCommercialElement = data.size > 0 ? data.toArray()[0] : undefined; // Check if the list is not empty before accessing the element
      const IntermmediaireElement = data.size > 0 ? data.toArray()[1] : undefined; 

      console.log("viewer json Libelle")
      console.log(versionCommercialElement)
      console.log(IntermmediaireElement)
 
      

  return (
    <>


 
 
 
<div className="centered-content">
  <h2>Quittance # {jsonQuittancesObj.numeroquittance}</h2>
  
  <Grid className="grid-container">      
    <div className="label-row">
      <label htmlFor=""><span className="span-size">Exercice:</span> {jsonQuittancesObj.exercice}</label>
      <label htmlFor=""><span className="span-size">Ordre: </span>{jsonQuittancesObj.ordre}</label>
    </div>
<br />
    <div className="label-row">
      <label htmlFor=""><span className="span-size">Intermediaire:</span> {IntermmediaireElement}</label>
      <label htmlFor=""><span className="span-size">Version commerciale:</span> {versionCommercialElement}</label>
    </div>
    <br />
    <div className="label-row">
      <label htmlFor=""><span className="span-size">Date debut:</span> {jsonQuittancesObj.datedebut}</label>
      <label htmlFor=""><span className="span-size">Date fin:</span> {jsonQuittancesObj.datefin}</label>
    </div>
    <br />
    <div className="label-row">
      <label htmlFor=""><span className="span-size">Date etat:</span> {jsonQuittancesObj.dateetat}</label>
      <label htmlFor=""><span className="span-size">Date emission:</span> {jsonQuittancesObj.dateemission}</label>
    </div>
    <br />
    <div className="label-row">
      <label htmlFor=""><span className="span-size">Montant remise: </span>{jsonQuittancesObj.montontremise}</label>
      <label htmlFor=""><span className="span-size">Taux taxe: </span>{jsonQuittancesObj.tauxtaxe}</label>
    </div>
    <br />
    <div className="label-row">
      <label htmlFor=""><span className="span-size">Montantaccessoire: </span>{jsonQuittancesObj.montantaccessoire}</label>
      <label htmlFor=""><span className="span-size">Taux commission: </span>{jsonQuittancesObj.tauxcommission}</label>
    </div>
    <br />
    <div className="label-row">
      <label htmlFor=""><span className="span-size">Prime nette:</span> {jsonQuittancesObj.tauxprimenette}</label>
      <label htmlFor=""><span className="span-size">Montant taxe parafiscale:</span> {jsonQuittancesObj.montanttaxeparafiscale}</label>
    </div>
    <br />
  </Grid>
</div>

 
      <table className="styled-table">
        <thead>
          <tr>
            <th>libelle</th> 
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
  </>
  );
}

export default SuccessMessage;
