import React from 'react'
import { Navigate } from 'react-router-dom'

const PrivateRoute=({children})=> {
  const[jwt,setJwt]=(localStorage.getItem('token'))
  return jwt?children:<Navigate to="SignIn"/>; 
  
}

export default PrivateRoute