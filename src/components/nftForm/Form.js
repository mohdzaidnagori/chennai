import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import axios from 'axios';
import { nftdata } from '../../datasource';
import { DataGrid } from '@mui/x-data-grid'
import Box from '@mui/material/Box';
import './Form.css'
import { db } from '../../firebase';
import { doc, updateDoc } from 'firebase/firestore';
const Form = () => {
    const [title,setTitle] = useState("")
    const [details,setDetails] = useState("")
    const [nftType,setNftType] = useState("")
    const [creator,setCreator] = useState("")
    const [file, setFile] = useState("");
    // const [percentage,setPercentage] = useState(0)
    const [collection, setCollection] = useState("")
    const [address,setAddress] = useState("")
    const [data,setData] = useState([])
    const [loading,setLoading] = useState(false) 
    const [link,setLink] = useState("")
    const [nftId,setNftId] = useState("")

   
    
  

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(file === '' ){
            toast.error("image field required")
            return;
        }
        if(file.size > 1159711){
            toast.error("Image Size less than 1 MB")
            return; 
        }
        if(nftType.length > 15){
            toast.error("nft type length should be less than 15 character")
            return;  
        }
        if(title.length > 30){
            toast.error("title length should be less than 30 character")
            return;  
        }
        if(details.length > 130){
            toast.error("details length should be less than 130 character")
            return;  
        }
        if(creator.length > 25){
            toast.error("creator length should be less than 25 character")
            return;  
        }
        if(collection.length > 20){
            toast.error("collection length should be less than 20 character")
            return;  
        }
        if(nftId === ''){
            toast.error("please choose update nft input")
            return;   
        }
        var reader = new FileReader();
        reader.onload = function (e) {
            var img = new Image();      
            img.src = e.target.result;

            img.onload = async function () {
                var w = this.width;
                var h = this.height;
                console.log(w+' '+h)
                if(w < 24 && h < 24){
                toast.error("Image size should be 1024 x 1024")
                return;
                }
                else{
                    const fData = new FormData();
                     fData.append('title', title);
                     fData.append('details', details);
                     fData.append('nftType', nftType);
                     fData.append('creator', creator);
                     fData.append('collection', collection);
                     fData.append('address', address);
                     fData.append('link', link);
                     fData.append('file',file)
                     setLoading(true)
                     const nftRef = doc(db, "nft", nftId);
                     const filePath = `https://www.skilliza.com/laravel-video/storage/app/public/${file.name}`
                     await updateDoc(nftRef, {
                        title,
                        details,
                        nftType,
                        creator,
                        collection,
                        address,
                        link,
                        nftId,
                        filePath
                      });
                     const res  = await axios.post('https://www.skilliza.com/laravel-video/public/api/nft/'+nftId,fData)
                     if(res.data.status === 200){
                         toast.success('Successfully Uploaded')
                         showNft()
                         console.log(res.data.message)
                         setLoading(false)
                           setNftType("")
                           setTitle("")
                           setDetails("")
                           setCreator("")
                           setCollection("")
                           setAddress("")
                           setFile("")
                     }

                }
            }
        }
        reader.readAsDataURL(file);
       
        
    }
    const showNft = async () => {
        const res = await axios.get('https://www.skilliza.com/laravel-video/public/api/show-nft')
        setData(res.data)
        console.log(res.data)
    }



      useEffect(()=>{
        showNft()
    },[])

     


  




  return (
    <div>
       <div><Toaster/></div>
      <div className='add-conatiner'>
      <h1>Update NFT</h1>
          <form onSubmit={handleSubmit}  className='nft-container'>
          <div className="inputBox">
          <select
           name="nftId"
            id="nftId"
            onChange={(e) => setNftId(e.target.value)}
            >
            <option value="">Choose NFT Area</option>
            <option value="1">NFT 1</option>
            <option value="2">NFT 2</option>
            <option value="3">NFT 3</option>
            <option value="4">NFT 4</option>
            <option value="5">NFT 5</option>
            <option value="6">NFT 6</option>
          </select>
            </div>  
         
          <div className="inputBox">
                <input
                 type="text"
                 name="nftType"
                 id="nftType"
                 required="required"
                 value={nftType}
                 onChange={(e) => setNftType(e.target.value)}
                    />
                <span>NFT type</span>
            </div> 
            <div className="inputBox">
                <input
                 type="text"
                 name="title"
                 id="title"
                 required="required"
                 value={title}
                 onChange={(e) => setTitle(e.target.value)}
                    />
                <span>Title</span>
            </div>   
            <div className="inputBox">
                <input
                 type="text"
                 name="details"
                 id="details"
                 required="required"
                 value={details}
                 onChange={(e) => setDetails(e.target.value)}
                    />
                <span>NFT Details</span>
            </div>   
             <div className="inputBox">
                <input
                 type="text"
                 name="creator"
                 id="creator"
                 required="required"
                 value={creator}
                 onChange={(e) => setCreator(e.target.value)}
                    />
                <span>Creator</span>
            </div>  
            <div className="inputBox">
                <input
                 type="text"
                 name="collection"
                 id="collection"
                 required="required"
                 value={collection}
                 onChange={(e) => setCollection(e.target.value)}
                    />
                <span>Collection</span>
            </div>  
            <div className="inputBox">
                <input
                 type="text"
                 name="link"
                 id="link"
                 required="required"
                 value={link}
                 onChange={(e) => setLink(e.target.value)}
                    />
                <span>Link</span>
            </div>  
           
            <div className="inputBox">
                <input
                 type="text"
                 name="address"
                 id="address"
                 required="required"
                 value={address}
                 onChange={(e) => setAddress(e.target.value)}
                    />
                <span>Address</span>
            </div>  
           
            <div className="button-wrapper">
                     <span className="label">
                      Upload Image
                     </span>
  
                     <input type="file" 
                     className="upload-box"
                     placeholder="Upload Image"
                     id="file"
                     onChange={(e) => setFile(e.target.files[0])}
                    //  onClick={handleFile}
                     accept="image/*"
                    />
             
                  </div> 
           
           <div className="buttonBox">
           <button disabled={loading} className='password-button'>
           {
                loading ? 
                    <div>
                        <i className='bx bx-loader-circle rotate-button'></i>
                        Loading
                    </div>
                
                : 'NFT Update'
               }
           </button>
           </div>
          </form>
          <p style={{margin:'20px 0px'}}>{file.name ? file.name : ''}</p>
       </div>
       <div className="card__body">
            <Box sx={{ height: 450, width: '100%' }}>
              <DataGrid
               className="datagrid"
               disableColumnMenu
               rows={data}
               columns={nftdata}
               pageSize={9}
               rowsPerPageOptions={[9]}
               />
           </Box>
          </div>
    </div>
  )
}

export default Form
