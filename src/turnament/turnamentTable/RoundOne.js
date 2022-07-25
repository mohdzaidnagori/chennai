import React, { useEffect } from 'react'
import { query, where,setDoc,doc, orderBy, collection, onSnapshot } from "firebase/firestore";
import { db } from '../../firebase';
import { useState } from 'react';

const RoundOne = () => {
  const [cardData,setCardData] = useState({})

 
  useEffect(()=>{
    const CollectionplayerRef = collection(db,'player');
    const q = query(CollectionplayerRef, where("group","==", "Group-A"),where("stage" ,"==","match-a"));
   onSnapshot(q,(snapshot)=>{
     return setCardData(snapshot.docs.map((doc)=>{
       return {
         id:doc.id,
         data:doc.data()
       }
     }))
   })
  
 },[])
 console.log(cardData)
  





  // const card = cardData.map((item) => item.playerName)
    
     
    
  

  return (
    <div>
       <div className="card-1">
      <div className="card-title">
        <h4>Tennis Match</h4>
        <h4>Round of 32</h4>
      </div>
      <div className="vs-Match">
      <div className='team-1'>
            {/* {list.playerName} */}
            </div>
        <div className='vs'>Vs</div>
            <div className='team-2'>
            {/* {list.playerName} */}
            </div>
      </div>
      <div className="modal-card">
        <button className='modal-button-color'>Update</button>
    </div>
    </div> 
    </div>
  )
}

export default RoundOne
