import axios from 'axios';

const fetchData = async (refQuittanceid, dateDebut, dateFin, codePolice, pageNumber,pageSize) => {
    console.log(refQuittanceid+ dateDebut+ dateFin+ codePolice+ pageSize)
  const url = `http://localhost:8081/quittances/search?refQuittanceid=${refQuittanceid}&dateDebut=${dateDebut}&dateFin=${dateFin}&codePolice=${codePolice}&pageNumber=${pageNumber}&pageSize=${pageSize}`;
  try {
    const response = await axios.get(url);
    const data = response.data;
  
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default fetchData;