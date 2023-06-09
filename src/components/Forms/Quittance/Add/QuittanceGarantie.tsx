import React, { useState, useEffect } from 'react';
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import '../style.css'; // Import your custom styles

type Post = {
  id: number;
  title: string;
  PrimeNette: number;
  Taxe: number;
  Accessoire: number;
  Tauxcommission: number;
  Commission: number;
  TauxprimeEVE: number;
  PrimeGarEve: number;
  TauxParafiscale: number;
};

const fetchData = async (): Promise<Post[]> => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10');
  const data = await response.json();
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
};

const QuittanceGarantie = () => {
    


    
 
  const [posts, setPosts] = useState<Post[]>([]);
  const [sums, setSums] = useState<Post>({
    id: 0,
    title: 'Total',
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
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, index: number, columnName: keyof Post) => {
    const { value } = event.target;
    const updatedPosts = [...posts];
    updatedPosts[index][columnName] = Number(value) as never; // Use type assertion

    setPosts(updatedPosts);
    calculateSums(updatedPosts);
  };


  

  const calculateSums = (data: Post[]) => {
    const initialSums: Post = {
      id: 0,
      title: 'Total',
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
      console.log('Title:', post.title);
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
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
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
                <TableCell>{post.title}</TableCell>
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
            <TableRow>
              <TableCell>{sums.title}</TableCell>
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
      <button onClick={logValues}>Log Values</button>
    </div>
  );
};

export default QuittanceGarantie;
