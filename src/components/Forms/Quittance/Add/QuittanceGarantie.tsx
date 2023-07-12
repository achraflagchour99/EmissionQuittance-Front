import React, { useState, useEffect } from 'react';
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import '../style.css'; // Import your custom styles
import { idCodePoliceState, jsonDataState } from '../recoil/atoms';
import { useRecoilState, useRecoilValue } from 'recoil';
import config from '../../../../config/config';

type Post = {
  id: number;
  idGarantie:number;
  libelle: string;
  PrimeNette: number;
  Taxe: number;
  Accessoire: number;
  Tauxcommission: number;
  Commission: number;
  TauxprimeEVE: number;
  PrimeGarEve: number;
  TauxParafiscale: number;
};



const QuittanceGarantie = (props: any) => {

  const [jsonData, setJsonData] = useState<string[]>([]);   
  const [jsonDataP, setJsonDataP] = useRecoilState(jsonDataState);

  const saveJsonData = () => {
    const json = JSON.stringify(jsonData);
    setJsonDataP(json); // Update the state with the new JSON string
    // Perform any desired action with the JSON data (e.g., send it to the backend)
    
  };
 
  const idCodePolice = useRecoilValue(idCodePoliceState);
 
    
  const attributFille = props.attributFille;
  const codPlc =props.CodePolice;
 
  
  const fetchData = async (): Promise<Post[]> => {
    try {
      const response = await fetch(`${config.apiUrl}/versioncom/garanties/` + idCodePolice);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
  
      if (!Array.isArray(data)) {
        throw new Error('Invalid data format');
      }
  
      // Assign a default value of 0 to each column
      const posts = data.map((post: Post) => ({
        ...post,
        
        PrimeNette: 0,
        Taxe: 0,
        Accessoire: 0,
        Tauxcommission: 0,
        Commission: 0,
        TauxprimeEVE: 0,
        PrimeGarEve: 0,
        TauxParafiscale: 0,
      }));
  
      return posts;
    } catch (error) {
      console.error(error);
      return []; // or return an appropriate default value
    }
  };
  

    
 
  const [posts, setPosts] = useState<Post[]>([]);
  const [sums, setSums] = useState<Post>({
    id: 0,
    idGarantie:0,
    libelle: 'Total',
    PrimeNette: 0,
    Taxe: 0,
    Accessoire: 0,
    Tauxcommission: 0,
    Commission: 0,
    TauxprimeEVE: 0,
    PrimeGarEve: 0,
    TauxParafiscale: 0,
  });

  useEffect(() => {
    const fetchTableData = async () => {
      const data = await fetchData();
      setPosts(data);
    };
  
    fetchTableData();
  }, [codPlc]);
  
  useEffect(() => {
    saveJsonData();
  }, [jsonData]);
  
  

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, index: number, columnName: keyof Post) => {
    const { value } = event.target;
    const updatedPosts = [...posts];
    updatedPosts[index][columnName] = Number(value) as never; // Use type assertion
  
    setPosts(updatedPosts);
    calculateSums(updatedPosts);
  
    const jsonLine = JSON.stringify(updatedPosts[index]); // Convert the line to JSON
    const updatedJsonData = [...jsonData];
    updatedJsonData[index] = jsonLine; // Update the JSON data array
    setJsonData(updatedJsonData);
  };
  
  
  const calculateSums = (data: Post[]) => {
    const initialSums: Post = {
      id: 0,
      idGarantie:0,
      libelle: 'Total',
      PrimeNette: 0,
      Taxe: 0,
      Accessoire: 0,
      Tauxcommission: 0,
      Commission: 0,
      TauxprimeEVE: 0,
      PrimeGarEve: 0,
      TauxParafiscale: 0,
    };

    const sums = data.reduce((acc, post) => {
      acc.PrimeNette += post.PrimeNette;
      acc.Taxe += post.Taxe;
      acc.Accessoire += post.Accessoire;
      acc.Tauxcommission += post.Tauxcommission;
      acc.Commission += post.Commission;
      acc.TauxprimeEVE += post.TauxprimeEVE;
      acc.PrimeGarEve += post.PrimeGarEve;
      acc.TauxParafiscale += post.TauxParafiscale;
      return acc;
    }, initialSums);

    setSums(sums);
  };

  const logValues = () => {
    console.log('Values entered:');
    posts.forEach((post) => {
      console.log('Garantie:', post.libelle);
      console.log('PrimeNette:', post.PrimeNette);
      console.log('Taxe:', post.Taxe);
      console.log('Accessoire:', post.Accessoire);
      console.log('Tauxcommission:', post.Tauxcommission);
      console.log('Commission:', post.Commission);
      console.log('TauxprimeEVE:', post.TauxprimeEVE);
      console.log('PrimeGarEve:', post.PrimeGarEve);
      console.log('TauxParafiscale:', post.TauxParafiscale);
      console.log('---------------------');
    });
    console.log('Total PrimeNette:', sums.PrimeNette);
    console.log('Total Taxe:', sums.Taxe);
    console.log('Total Accessoire:', sums.Accessoire);
    console.log('Total Tauxcommission:', sums.Tauxcommission);
    console.log('Total Commission:', sums.Commission);
    console.log('Total TauxprimeEVE:', sums.TauxprimeEVE);
    console.log('Total PrimeGarEve:', sums.PrimeGarEve);
    console.log('Total TauxParafiscale:', sums.TauxParafiscale);
  };

  return (
    <div>
          <div>
      <p>  Code Police: {idCodePolice}</p>
    </div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
            <TableCell>Id</TableCell>
              <TableCell>Garantie</TableCell>
              <TableCell>PrimeNette</TableCell>
              <TableCell>Taxe</TableCell>
              <TableCell>Accessoire</TableCell>
              <TableCell>Tauxcommission</TableCell>
              <TableCell>Commission</TableCell>
              <TableCell>TauxprimeEVE</TableCell>
              <TableCell>PrimeGarEve</TableCell>
              <TableCell>TauxParafiscale</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {posts.map((post, index) => (
              <TableRow key={post.id}>
                  <TableCell >{post.id}</TableCell>
                <TableCell>{post.libelle}</TableCell>
                <TableCell>
                  <input className="borderless" type="text" value={post.PrimeNette} onChange={(event) => handleChange(event, index, 'PrimeNette')} />
                </TableCell>
                <TableCell>
                  <input className="borderless" type="text" value={post.Taxe} onChange={(event) => handleChange(event, index, 'Taxe')} />
                </TableCell>
                <TableCell>
                  <input className="borderless" type="text" value={post.Accessoire} onChange={(event) => handleChange(event, index, 'Accessoire')} />
                </TableCell>
                <TableCell>
                  <input className="borderless" type="text" value={post.Tauxcommission} onChange={(event) => handleChange(event, index, 'Tauxcommission')} />
                </TableCell>
                <TableCell>
                  <input className="borderless" type="text" value={post.Commission} onChange={(event) => handleChange(event, index, 'Commission')} />
                </TableCell>
                <TableCell>
                  <input className="borderless" type="text" value={post.TauxprimeEVE} onChange={(event) => handleChange(event, index, 'TauxprimeEVE')} />
                </TableCell>
                <TableCell>
                  <input className="borderless" type="text" value={post.PrimeGarEve} onChange={(event) => handleChange(event, index, 'PrimeGarEve')} />
                </TableCell>
                <TableCell>
                  <input className="borderless" type="text" value={post.TauxParafiscale} onChange={(event) => handleChange(event, index, 'TauxParafiscale')} />
                </TableCell>
              </TableRow>
            ))}
            <TableRow style={{ backgroundColor: '#6868b2' }}>
            <TableCell  ></TableCell>
              <TableCell  >{sums.libelle}</TableCell>
              <TableCell>{sums.PrimeNette}</TableCell>
              <TableCell>{sums.Taxe}</TableCell>
              <TableCell>{sums.Accessoire}</TableCell>
              <TableCell>{sums.Tauxcommission}</TableCell>
              <TableCell>{sums.Commission}</TableCell>
              <TableCell>{sums.TauxprimeEVE}</TableCell>
              <TableCell>{sums.PrimeGarEve}</TableCell>
              <TableCell>{sums.TauxParafiscale}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer> 
    </div>
  );
};

export default QuittanceGarantie;
