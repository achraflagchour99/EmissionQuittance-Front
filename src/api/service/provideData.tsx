import axios from 'axios';

export const fetchIntermediaires = async () => {
  const url = `http://localhost:8081/provider/intermediaires`;
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
  const url = `http://localhost:8081/provider/polices`;
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
  const url = `http://localhost:8081/provider/versions-commerciales`;
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
  const url = `http://localhost:8081/provider/ref-quittances`;
  try {
    const response = await axios.get(url);
    const data = response.data;
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
