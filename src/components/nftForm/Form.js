import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import axios from 'axios';
import { nftdata } from '../../datasource';
import { DataGrid } from '@mui/x-data-grid'
import Box from '@mui/material/Box';
import './Form.css'
import { db } from '../../firebase';
import { collection, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { createSearchParams, useNavigate } from 'react-router-dom';
const Form = () => {
    const [title,setTitle] = useState("")
    const [file, setFile] = useState("");
    const [data,setData] = useState([])
    const [loading,setLoading] = useState(false) 
    const [link,setLink] = useState("")
    const [Id,setId] = useState("")
    const [desc,setDesc] = useState("")

    // 29 32 27 33


    useEffect(() => {
        const nftRef = collection(db,'nft')
       
        const unsub = onSnapshot(
            nftRef,
          (snapShot) => {
            let list = [];
            snapShot.docs.forEach((doc) => {
              list.push({ 
                  listid:doc.id,
                 ...doc.data() 
  
                });
            });
            setData(list);
            console.log(list)
          },
          (error) => {
            console.log(error);
          }
        );
    
        return () => {
          unsub();
        };
      },[]) 
     
      const navigate = useNavigate();

      const handlecheckboxChange = async (e,id) => {
        try {
             const docRef = doc(db, 'nft', id);
               await updateDoc(docRef, {
               sold:e.target.checked,
              });
             } catch (error) {
             
             toast.error("Unexpected error")
             console.log(error)
            }
              
           }
           const handlecheckboxEnableChange = async (e,id) => {
            try {
                const docRef = doc(db, 'nft', id);
                  await updateDoc(docRef, {
                  enable:e.target.checked
                 });
                } catch (error) {
                
                toast.error("Unexpected error")
                console.log(error)
               }
           }
    
  

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
        if(title.length > 30){
            toast.error("title length should be less than 30 character")
            return;  
        }
        if(Id === ''){
            toast.error("please choose update nft input")
            return;   
        }
        if(desc === ''){
          toast.error("please choose update description input")
            return;   
        }
        if(desc.length > 130){
          toast.error("description length should be less than 30 character")
            return;   
        }
        if(link === ''){
            toast.error("please choose link input")
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
                if(w !== 1024 && h !== 1024){
                toast.error("Image size should be 1024 x 1024")
                return;
                }
                else{
                    const fData = new FormData();
                     fData.append('file',file)
                     setLoading(true)
                     const nftRef = doc(db, "nft", Id);
                     const filePath = `https://www.skilliza.com/laravel-video/storage/app/public/${file.name}`
                    
                     const res  = await axios.post('https://www.skilliza.com/laravel-video/public/api/nft',fData)
                     if(res.data.status === 200){
                        await updateDoc(nftRef, {
                            title,
                            link,
                            filePath,
                            desc,
                            sold:false,
                            enable:true
                          });
                         toast.success('Successfully Uploaded')
                         console.log(res.data.message)
                         setLoading(false)
                           setTitle("")
                           setFile("")
                           setLink("")
                           setDesc("")
                     }

                }
            }
        }
        reader.readAsDataURL(file);
       
        
    }
    
    const viewHandle = (id,enable,link,sold,title,desc,path) => {
      navigate({
        pathname:'/view',
        search:createSearchParams({
          id,
          enable,
          link,
          sold,
          title,
          desc,
          path
        }).toString()
      })
      
    }

   
  
     

    const actionColumn = [
        {
         field:'sold',
         headerName:'Sold',
         width:'90',
         renderCell:(params) => {
             return (
                <div className="cellAction">
                  <div 
                     className={params.row.sold ? 'soldNft unsoldNft' :'soldNft'}>
                    <p>{params.row.sold ? 'Sold' : 'unsold'}</p>
                    <input type='checkbox'
                     defaultChecked={params.row.sold} 
                     className='checkboxNft'
                      onChange={e => handlecheckboxChange(e,params.row.listid)}
                       />
           </div>
                </div>
             )
         }
        },
        {
            field:'enable',
            headerName:'Enable',
            width:'90',
            renderCell:(params) => {
                return (
                   <div className="cellAction">
                     <div 
                        className={params.row.enable ? 'soldNft unsoldNft' :'soldNft'}>
                       <p>{params.row.enable ? 'Enable' : 'Disable'}</p>
                       <input type='checkbox'
                        defaultChecked={params.row.enable} 
                        className='checkboxNft'
                         onChange={e => handlecheckboxEnableChange(e,params.row.listid)}
                          />
              </div>
                   </div>
                )
            }
           },
           {
            field:'view',
            headerName:'view',
            width:'120',
            renderCell:(params) => {
                return (
                   <div className="cellAction">
                      <div className="buttonBox">
                       <button 
                        onClick={() => viewHandle(
                        params.row.listid,
                        params.row.enable,
                        params.row.link,
                        params.row.sold,
                        params.row.title,
                        params.row.desc,
                        params.row.filePath
                        )}  className='password-button'>
                         View
                       </button>
                       </div>
                   </div>
                )
            }
           }
      
      
        

    ]
    

     


  




  return (
    <div>
       <div><Toaster/></div>
      <div className='add-conatiner'>
      <h1>Update NFT</h1>
          <form onSubmit={handleSubmit}  className='nft-container'>
          <div className="inputBox">
          <select
           name="Id"
            id="Id"
            onChange={(e) => setId(e.target.value)}
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
                 name="desc"
                 id="desc"
                 required="required"
                 value={desc}
                 onChange={(e) => setDesc(e.target.value)}
                    />
                <span>Description</span>
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
               columns={nftdata.concat(actionColumn)}
               getRowId={(row) => row.listid}
               pageSize={9}
               rowsPerPageOptions={[9]}
               />
           </Box>
          </div>
    </div>
  )
}

export default Form



