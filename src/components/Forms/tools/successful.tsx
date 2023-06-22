import React from 'react'
import image from './successful.png';
import './Successful.css';

function Successful() {
  return (
    <div className="successful-container">
          <h3>successful</h3>
         <img src={image} alt="successful"  className="successful-image"/>
    </div>
  )
}

export default Successful