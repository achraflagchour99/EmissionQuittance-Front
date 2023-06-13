import React, { PureComponent } from 'react';
import rma from './RMA_WANATNIYA.jpg';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, LineChart, Line, CartesianGrid, XAxis, Label, YAxis, Tooltip } from 'recharts';
import { BsFileCheckFill, BsFillPersonCheckFill } from 'react-icons/bs';
import { FaMoneyCheckAlt } from 'react-icons/fa';
import { GiNotebook } from 'react-icons/gi';

const data = [
  { name: '2016', uv: 4000, pv: 2400, amt: 2400 },
  { name: '2017', uv: 3000, pv: 1398, amt: 2210 },
  { name: '2018', uv: 2000, pv: 9800, amt: 2290 },
  { name: '2019', uv: 2780, pv: 3908, amt: 2000 },
  { name: '2020', uv: 1890, pv: 4800, amt: 2181 },
  { name: '2021', uv: 2390, pv: 3800, amt: 2500 },
  { name: '2022', uv: 3490, pv: 4300, amt: 2100 },
];

const dataA = [
  { name: 'Group A', value: 400 },
];
const dataB = [
  { name: 'Group b', value: 200 },
];
const dataC = [
  { name: 'Group c', value: 300 },
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
        <div style={{ flex: '1', marginRight: '1rem', backgroundColor: '#fff', padding: '1rem', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
          <h1>Client   <BsFillPersonCheckFill /></h1>
          <PieChart width={200} height={200}>
            <Pie
              data={dataA}
              cx={100}
              cy={100}
              innerRadius={40}
              outerRadius={60}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
            >
              {dataA.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS1[index % COLORS1.length]} values='client' />
              ))}
            </Pie>
          </PieChart>
          <Typography variant="subtitle1" style={{ marginTop: '1rem' }}>
            Name: {dataA[0].name}
          </Typography>
          <Typography variant="subtitle1">
            Value: {dataA[0].value}
          </Typography>
        </div>

        <div style={{ flex: '1', marginRight: '1rem', backgroundColor: '#fff', padding: '1rem', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
          <h1>Checked <BsFileCheckFill/></h1>
          <PieChart width={200} height={200}>
            <Pie
              data={dataB}
              cx={100}
              cy={100}
              innerRadius={40}
              outerRadius={60}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
            >
              {dataB.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS2[index % COLORS2.length]} values='client' />
              ))}
            </Pie>
          </PieChart>
          <Typography variant="subtitle1" style={{ marginTop: '1rem' }}>
            Name: {dataB[0].name}
          </Typography>
          <Typography variant="subtitle1">
            Value: {dataB[0].value}
          </Typography>
        </div>

        <div style={{ flex: '1', marginRight: '1rem', backgroundColor: '#fff', padding: '1rem', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
          <h1>Quittance <FaMoneyCheckAlt />  </h1>
          <PieChart width={200} height={200}>
            <Pie
              data={dataC}
              cx={100}
              cy={100}
              innerRadius={40}
              outerRadius={60}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
            >
              {dataC.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS3[index % COLORS3.length]} values='client' />
              ))}
            </Pie>
          </PieChart>
          <Typography variant="subtitle1" style={{ marginTop: '1rem' }}>
            Name: {dataC[0].name}
          </Typography>
          <Typography variant="subtitle1">
            Value: {dataC[0].value}
          </Typography>
        </div>

        <div style={{ flex: '1', marginRight: '1rem', backgroundColor: '#fff', padding: '1rem', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
          <h1>Police <GiNotebook /></h1>
          <PieChart width={200} height={200}>
            <Pie
              data={dataD}
              cx={100}
              cy={100}
              innerRadius={40}
              outerRadius={60}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
            >
              {dataD.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS4[index % COLORS4.length]} values='client' />
              ))}
            </Pie>
          </PieChart>
          <Typography variant="subtitle1" style={{ marginTop: '1rem' }}>
            Name: {dataD[0].name}
          </Typography>
          <Typography variant="subtitle1">
            Value: {dataD[0].value}
          </Typography>
          
        </div>
      </div>

      <Box 
      
      display="flex"
      justifyContent="center"
      alignItems="center"
      paddingX="2rem"
      boxShadow="0 2px 4px rgba(0, 0, 0, 0.1)"
    >
      <ResponsiveContainer width="50%" height={500}  >
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name">
            <Label value="Years" offset={0} position="insideBottom" />
          </XAxis>
          <YAxis>
            <Label value="Cout" angle={-90} offset={10} position="insideLeft" />
          </YAxis>
          <Tooltip />
          <Line type="monotone" dataKey="pv" stroke="#8884d8" strokeWidth={2} name="Cout" />
          <Line type="monotone" dataKey="uv" stroke="#82ca9d" strokeWidth={2} name="Year" />
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
    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>  
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
