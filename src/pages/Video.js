import React from 'react'


import Form from '../components/form/Form';
import { userInputs } from '../assets/formSource';



const Video = () => {
  
    
  return (
        <div className="row">
        <div className="col-12">
          <div className="card">
          <Form  inputs={userInputs} />
         </div>
        </div>
       </div>
      )
  
}

export default Video
