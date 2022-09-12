import React from 'react'
import { useSearchParams } from 'react-router-dom';
import './View.css'
import coming from '../assets/images/coming1.png'

const View = () => {
   const [searchparams] = useSearchParams()
   const title = searchparams.get("title")
   const enable = searchparams.get("enable")
   const sold = searchparams.get("sold")
   const desc = searchparams.get("desc")
   const link = searchparams.get("link")
   const path = searchparams.get("path")
  return (
    <div className='nft-card-view'>
        
           {
             enable === 'true' 
             ?
             sold === 'true'
             ?
             <div className="img-path-nft">
                <img className='nft-img' src={path} alt="nft img"/>
                <div className="img-nft-sold"></div>
             </div>
             :
             <div className="img-path-nft">
                <img className='nft-img' src={path} alt="nft img"/>
             </div>
             :
             <div className="img-path-nft">
                 <img className='nft-img-coming' src={coming} alt="nft img"/>
             </div>
           }
             
            
          
       
        <div className='nft-view-text'>
            <h2>Title : {title}</h2>
            <p>description : {desc}</p>
            <p>link : {link}</p>
            <p>isSold : {sold === 'true' ? 'sold' : 'unsold'}</p>
            <p>isEnable : {enable === 'true' ? 'Visible' : 'Hide'}</p>
        </div>
    </div>
  )
}

export default View
