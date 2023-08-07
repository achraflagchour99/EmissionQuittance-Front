import React, { PureComponent } from 'react';
import rma from './RMA_WANATNIYA.jpg';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';
import { Pie, Cell, ResponsiveContainer, BarChart, Bar, LineChart, Line, CartesianGrid, XAxis, Label, YAxis, Tooltip } from 'recharts';
import { BsFileCheckFill, BsFillPersonCheckFill } from 'react-icons/bs';
import { FaMoneyCheckAlt } from 'react-icons/fa';
import { GiNotebook } from 'react-icons/gi';
import ArticleIcon from '@mui/icons-material/Article';
import { PieChart } from '@mui/x-charts/PieChart';
import { Margin, Padding, Style, WidthFull, WidthNormal } from '@mui/icons-material';

const data = [
  { name: '2016', uv: 152036, pv: 245053, amt: 2400 },
  { name: '2017', uv: 162450, pv: 265008, amt: 2210 },
  { name: '2018', uv: 175056, pv: 282002, amt: 2290 },
  { name: '2019', uv: 196065, pv: 302006, amt: 2000 },
  { name: '2020', uv: 210536, pv: 323650, amt: 2181 },
  { name: '2021', uv: 228306, pv: 356911, amt: 2500 },
  { name: '2022', uv: 236065, pv: 384054, amt: 2100 },
];

const dataA = [
  {name: 'Polices', value: 52},
];
const dataB = [
  { name: 'Quittances', value: 1414145 },
];
const dataC = [
  { name: 'Produits', value: 33 },
];
const dataD = [
  { name: 'Group d', value: 1000 },
];
const COLORS1 = ['#0088FE'];
const COLORS2 = ['#00C49F'];
const COLORS3 = ['#FFBB28'];
const COLORS4 = ['#FF8042'];

export default class Dashboard extends PureComponent {
  static demoUrl = 'https://codesandbox.io/s/pie-chart-with-padding-angle-7ux0o';

  render() {
    return (
      <div style={{  }}>
      <div style={{ display: 'flex', margin: '2rem' }}>
        <div style={{ flex: '1', marginRight: '1rem', backgroundColor: '#fff', padding: '1rem',   boxShadow:
            '0px 2px 1px -1px rgba(0, 0, 0, 0.2), 1px 1px 3px 1px rgba(0, 0, 0, 0.2), 0px 1px 3px 0px rgba(0, 0, 0, 0.2)', borderRadius: '5px', border: '2' }}>
          <h1>Polices</h1>
          <PieChart
  series={[
    {
      data: [
        { id: 0, value: 22, label: 'En cours' },
        { id: 1, value: 15, label: 'Suspendue' },
        { id: 2, value: 5, label: 'Echue' },
        { id: 3, value: 9, label: 'Résiliée' },
      ],
    },
  ]}
  width={400}
  height={200}
/>
<Typography variant="subtitle1" style={{ marginTop: '1rem' }}>
            Catégorie: {dataA[0].name}
          </Typography>
          <Typography variant="subtitle1">
            Total: {dataA[0].value}
          </Typography>
        </div>

        <div style={{ flex: '1', marginRight: '1rem', backgroundColor: '#fff', padding: '1rem',   boxShadow:
            '0px 2px 1px -1px rgba(0, 0, 0, 0.2), 1px 1px 3px 1px rgba(0, 0, 0, 0.2), 0px 1px 3px 0px rgba(0, 0, 0, 0.2)',  borderRadius: '5px', border: '2' }}>
          <h1>Quittances </h1>
          <PieChart
  series={[
    {
      data: [
        { id: 0, value: 386252, label: 'En attente' },
        { id: 1, value: 250045, label: 'Valide' },
        { id: 2, value: 350046, label: 'transférée' },
        { id: 3, value: 200365, label: 'Encaissée' },
        { id: 4, value: 55002, label: 'Annulée' },
      ],
    },
  ]}
  width={400}
  height={200}
/>
          <Typography variant="subtitle1" style={{ marginTop: '1rem' }}>
            Catégorie: {dataB[0].name}
          </Typography>
          <Typography variant="subtitle1">
            Total: {dataB[0].value}
          </Typography>
        </div>

        <div style={{ flex: '1', marginRight: '1rem', backgroundColor: '#fff', padding: '1rem',   boxShadow:
            '0px 2px 1px -1px rgba(0, 0, 0, 0.2), 1px 1px 3px 1px rgba(0, 0, 0, 0.2), 0px 1px 3px 0px rgba(0, 0, 0, 0.2)',  borderRadius: '5px', border: '2' }}>
          <h1>Produits</h1>
          <PieChart
  series={[
    {
      data: [
        { id: 0, value: 7, label: 'ArabBank' },
        { id: 1, value: 5, label: 'BMCE' },
        { id: 2, value: 4, label: 'BMCI' },
        { id: 3, value: 9, label: 'Maghrebail' },
        { id: 4, value: 8, label: 'SALAFIN' },
      ],
    },
  ]}
  width={400}
  height={200}
/>
          <Typography variant="subtitle1" style={{ marginTop: '1rem' }}>
            Catégorie: {dataC[0].name}
          </Typography>
          <Typography variant="subtitle1">
            Total: {dataC[0].value}
          </Typography>
          
        </div>
      </div>

      <Box
        sx={{
          padding: '2rem',
          width: '80rem',
          marginTop: '0.5rem',
          marginBottom:'3rem',
          height: 'auto', // Utilisation de 'auto' pour la hauteur
          backgroundColor: 'white',
          alignContent: 'center',
          border: 2,
          marginLeft: '25rem',
          borderColor: '#a7bcb9',
          justifyContent: 'center',
          borderRadius: '5px',
          boxShadow:
            '0px 2px 1px -1px rgba(0, 0, 0, 0.2), 1px 1px 3px 1px rgba(0, 0, 0, 0.2), 0px 1px 3px 0px rgba(0, 0, 0, 0.2)',
        }}
        >
      <ResponsiveContainer width="100%" height={400}  >
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name">
          </XAxis>
          <YAxis>
          </YAxis>
          <Tooltip />
          <Line type="monotone" dataKey="pv" stroke="#8884d8" strokeWidth={2} name="Quittances en attente" />
          <Line type="monotone" dataKey="uv" stroke="#82ca9d" strokeWidth={2} name="Quittances validées" />
        </LineChart>
        
      </ResponsiveContainer>
      
    </Box>
    
    <Box 
      
      display="flex"
      justifyContent="center"
      alignItems="center"
      paddingX="2rem"
      boxShadow="0 2px 4px rgba(0, 0, 0, 0.1)"
    >
    </Box>     

         
      
      </div>
    );
  }
}



// const Dashboard = () => {
 
//    var demoUrl = 'https://codesandbox.io/s/simple-line-chart-kec3v';

  
  
//   return (
//     <>


//        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//       {/* <img src={rma} alt="My Image" style={{ width: '70%' }} /> */}


      
//     </div>
  

 
// </>
    
//   )
// }

// export default Dashboard

function dispatch(arg0: { type: string; payload: string; }) {
  throw new Error('Function not implemented.');
}
