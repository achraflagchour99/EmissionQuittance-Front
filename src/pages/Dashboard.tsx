import React from 'react'
import { useSelector } from 'react-redux';



interface MyState {
  value: string;
}

const Dashboard = () => {


 // dispatch({ type: 'SET_VALUE', payload: "response.data" });
 
  const value = useSelector((state: MyState) => state.value);
  console.log('redux '+ value); 
  console.log('local '+ localStorage.getItem('token')); 
  
  return (
    <div>Dashboadrd</div>
  )
}

export default Dashboard

function dispatch(arg0: { type: string; payload: string; }) {
  throw new Error('Function not implemented.');
}
