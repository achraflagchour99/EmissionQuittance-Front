import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { jsonDataQuittance, jsonDataState } from '../recoil/atoms';
import { saveQuittanceGarantie } from '../../../../api/service/provideData';
import axios from 'axios';
import Successful from '../../tools/successful';
import Error from '../../tools/error';
import { Grid } from 'rsuite';
 

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
      <Successful />
    ) : saveStatus === 'error' ? (
      <Error />
    ) : (
      <div >
        <Grid>
        Valider  l'enregistrement   pour  ajouter quittance
        </Grid>
      </div>
    )}
    <input type="submit" value="Enregistrer Quittance" onClick={handleClick} />
  </>
  );
}

export default SuccessMessage;
