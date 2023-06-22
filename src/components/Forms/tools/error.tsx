import { error } from 'console'
import React from 'react'
import image from './error.png';
import './Successful.css';
 
function Error() {
  return (
    <div  className="successful-container">
        <h3>Error</h3>
         <img src={image} alt="Error" />
    </div>
  )
}

export default Error