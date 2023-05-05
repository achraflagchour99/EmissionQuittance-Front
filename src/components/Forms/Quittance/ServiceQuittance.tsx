import axios from 'axios';

export const submitForm = async (formData: any) => {
  try {
    const response = await axios.post('http://localhost:8081/quittances/', formData);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
