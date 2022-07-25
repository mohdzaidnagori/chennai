import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import './TurnamentSidebar.css'

const TurnamentSidebar = () => {
  
  return (
    <div>
          <div className="flex-container">
          <Link to='/turnament/add'>
            <button className='button__table'>Add player</button>
         </Link>
         <Link to='/turnament/roundone'>
            <button className='button__table'>Round 32</button>
         </Link>
         <Link to='/turnament/roundtwo'>
            <button className='button__table'>Round 16</button>
         </Link>
         <Link to='/turnament/qauter-final'>
            <button className='button__table'>Qauter final</button>
         </Link>
         <Link to='/turnament/semi-final'>
            <button className='button__table'>Semi final</button>
         </Link>
         <Link to='/turnament/final'>
            <button className='button__table'>Final</button>
         </Link>
         <button  className='button__table'>Chart</button>
          </div>
         
    </div>
    
  )
}

export default TurnamentSidebar
