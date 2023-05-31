import axios from 'axios';
import config from '../../config/config';

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
