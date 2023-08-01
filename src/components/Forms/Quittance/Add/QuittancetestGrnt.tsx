import React, { useState, useEffect } from 'react';
import '../style.css'; // Import the CSS file
type Post = {
  id: number;
  title: string;
  PrimeNette: number;
  Taxe: number;
  Accessoire: number;
  Tauxcommission: number;
  Montantcommision: number;
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
    Montantcommision: 0,
    TauxprimeEVE: 0,
    PrimeGarEve: 0,
    TauxParafiscale: 0,
  }));
  return posts;
};

const TableExample = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [sums, setSums] = useState<Post>({
    id: 0,
    title: 'Total',
    PrimeNette: 0,
    Taxe: 0,
    Accessoire: 0,
    Tauxcommission: 0,
    Montantcommision: 0,
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
      Montantcommision: 0,
      TauxprimeEVE: 0,
      PrimeGarEve: 0,
      TauxParafiscale: 0,
    };

    const sums = data.reduce((acc, post) => {
      acc.PrimeNette += post.PrimeNette;
      acc.Taxe += post.Taxe;
      acc.Accessoire += post.Accessoire;
      acc.Tauxcommission += post.Tauxcommission;
      acc.Montantcommision += post.Montantcommision;
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
      console.log('Commission:', post.Montantcommision);
      console.log('TauxprimeEVE:', post.TauxprimeEVE);
      console.log('PrimeGarEve:', post.PrimeGarEve);
      console.log('TauxParafiscale:', post.TauxParafiscale);
      console.log('---------------------');
    });
    console.log('Total PrimeNette:', sums.PrimeNette);
    console.log('Total Taxe:', sums.Taxe);
    console.log('Total Accessoire:', sums.Accessoire);
    console.log('Total Tauxcommission:', sums.Tauxcommission);
    console.log('Total Commission:', sums.Montantcommision);
    console.log('Total TauxprimeEVE:', sums.TauxprimeEVE);
    console.log('Total PrimeGarEve:', sums.PrimeGarEve);
    console.log('Total TauxParafiscale:', sums.TauxParafiscale);
  };

  return (
    <div>
      <table border={1}>
        <thead>
          <tr>
            <th>Title</th>
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
          {posts.map((post, index) => (
            <tr key={post.id}>
              <td>{post.title}</td>
              <td>
                <input className="borderless" type="text" value={post.PrimeNette} onChange={(event) => handleChange(event, index, 'PrimeNette')} />
              </td>
              <td>
                <input className="borderless" type="text" value={post.Taxe} onChange={(event) => handleChange(event, index, 'Taxe')} />
              </td>
              <td>
                <input className="borderless" type="text" value={post.Accessoire} onChange={(event) => handleChange(event, index, 'Accessoire')} />
              </td>
              <td>
                <input className="borderless" type="text" value={post.Tauxcommission} onChange={(event) => handleChange(event, index, 'Tauxcommission')} />
              </td>
              <td>
                <input className="borderless" type="text" value={post.Montantcommision} onChange={(event) => handleChange(event, index, 'Montantcommision')} />
              </td>
              <td>
                <input className="borderless" type="text" value={post.TauxprimeEVE} onChange={(event) => handleChange(event, index, 'TauxprimeEVE')} />
              </td>
              <td>
                <input className="borderless" type="text" value={post.PrimeGarEve} onChange={(event) => handleChange(event, index, 'PrimeGarEve')} />
              </td>
              <td>
                <input className="borderless" type="text" value={post.TauxParafiscale} onChange={(event) => handleChange(event, index, 'TauxParafiscale')} />
              </td>
            </tr>
          ))}
          <tr>
            <td>{sums.title}</td>
            <td>{sums.PrimeNette}</td>
            <td>{sums.Taxe}</td>
            <td>{sums.Accessoire}</td>
            <td>{sums.Tauxcommission}</td>
            <td>{sums.Montantcommision}</td>
            <td>{sums.TauxprimeEVE}</td>
            <td>{sums.PrimeGarEve}</td>
            <td>{sums.TauxParafiscale}</td>
          </tr>
        </tbody>
      </table>
      <button onClick={logValues}>Log Values</button>
    </div>
  );
};

export default TableExample;
