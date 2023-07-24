import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { jsonDataQuittance, jsonDataState } from '../recoil/atoms';
import { saveQuittanceGarantie } from '../../../../api/service/provideData';
import axios from 'axios';
import Successful from '../../tools/successful';
import Error from '../../tools/error';
import { Grid } from 'rsuite';
import { Button } from '@mui/material';
import './style.css'; // Import the CSS file
 

function SuccessMessage() {
    const [jsonDataP, setJsonDataP] = useRecoilState(jsonDataState);
    const [jsonQuittances, setJsonQuittance] = useRecoilState(jsonDataQuittance);

    const [saveStatus, setSaveStatus] = useState('');
    
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
   
  
  </>
  );
}

export default SuccessMessage;
