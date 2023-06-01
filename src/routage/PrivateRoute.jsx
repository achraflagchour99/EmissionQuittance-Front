import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getTokenFromStorage } from './storageUtils';

const PrivateRoute = ({children}) => {

 


  const isAuthenticated = useSelector((state) => state.auth.token !== null); 
  const storedToken = getTokenFromStorage();

   if (isAuthenticated || storedToken!=='') {
    return  children;  
    
  }
 else {
  return <Navigate to="/SignIn" />; }
};

export default PrivateRoute;

// const PrivateRoute = ({ children }) => {
//   const[jwt,setJwt]=useSelector((state) => state.auth.token !== null); 
//   return jwt?children:<Navigate to="SignIn"/>; 

  
// };
