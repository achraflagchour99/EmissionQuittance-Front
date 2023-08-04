import axios from 'axios';
import config from '../../config/config';
import Successful from '../../components/Forms/tools/successful';
import Error from '../../components/Forms/tools/error';

export const fetchIntermediaires = async () => {
  const url = `${config.apiUrl}/provider/intermediaires`;
  try {
    const response = await axios.get(url);
    const data = response.data;
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const fetchPolice = async () => {
  const url = `${config.apiUrl}/provider/polices`;
  try {
    const response = await axios.get(url);
    const data = response.data;
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const fetchVersionsCommerciales = async () => {
  const url = `${config.apiUrl}/provider/versions-commerciales`;
  try {
    const response = await axios.get(url);
    const data = response.data;
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const fetchRefQuittances = async () => {
  const url = `${config.apiUrl}/provider/ref-quittances`;
  try {
    const response = await axios.get(url);
    const data = response.data;
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};


export const fetchRemise = async (idRemise: any) => {
  const url = `${config.apiUrl}/remises/search?numRemise=${idRemise}`;
  try {
    const response = await axios.get(url);
    const data = response.data;
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}; 

export const saveQuittanceGarantie = async (garanties: any, quittance: any) => {
  const requestData = {
    Quittance: quittance,
    jsonData: garanties,
  };

  console.log("Accepte " + garanties);
  axios
    .post(`${config.apiUrl}/api/garantie-quittance/saveQuittanceGarantie2`, requestData, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log(error);
    });
};




export const ExtractSaveQuittance = async (quittance: any) => { 
  axios.post(`${config.apiUrl}/quittances/save`, quittance, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(response => {
    console.log(response); 
  })
  .catch(error => { 
    console.log(error);
  });
 
}; 

export const fetchQuittance = async (idQuittance: any) => {
  const url = `${config.apiUrl}/quittances/qtc/${idQuittance}`;
  try {
    const response = await axios.get(url);
    const data = response.data;
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}; 


export const fetchGarantieToEachQuittance = async (idQuittance: any) => {
  const url = `${config.apiUrl}/api/garantie-quittance/quittancegarantie/${idQuittance}`;
  try {
    const response = await axios.get(url);
    const data = response.data;
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};


export const UpdateQuittance = async (quittance: any) => { 
  axios.post(`${config.apiUrl}/quittances`, quittance, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(response => {
    console.log(response); 
  })
  .catch(error => { 
    console.log(error);
  });
 
};   

 

  

export const fetchmaxValues = async () => {
  const url = `${config.apiUrl}/quittances/maxValues`;
  try {
    const response = await axios.get(url);
    const data = response.data;
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}; 
   


  
export const ModificationQuittance = async ( quittance: any) => {
  axios
    .put(`${config.apiUrl}/quittances`, quittance, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log(error);
    });
};



  
export const ModificationGarantieQuittance = async ( garantie: any) => {
  axios
    .put(`${config.apiUrl}/api/garantie-quittance`, garantie, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log(error);
    });
};


   

    



 
