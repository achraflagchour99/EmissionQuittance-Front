import React from 'react'  
import rma from './RMA_WANATNIYA.jpg';

interface MyState {
  value: string;
}

const Dashboard = () => {

 
  
 
  
  return (
    
       <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <img src={rma} alt="My Image" style={{ width: '70%' }} />
    </div>
 

    
  )
}

export default Dashboard

function dispatch(arg0: { type: string; payload: string; }) {
  throw new Error('Function not implemented.');
}
