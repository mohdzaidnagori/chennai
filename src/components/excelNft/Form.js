import { Box } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import axios from 'axios'
import { addDoc, collection, deleteDoc, doc, onSnapshot,  updateDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import * as XLSX from 'xlsx'
import { nftColumn } from '../../datasource'
import { db } from '../../firebase'

const Form = () => {
    const [loading,setLoading] = useState(false)
    const [items, setItems] = useState([]);
    const [id,setId] = useState("")
    const [title,setTitle] = useState("")
    const [creator,setCreator] = useState("")
    const [address,setAddress] = useState("")
    const [link,setLink] = useState("")
    const [details,setDetails] = useState("")
    const [type,setType] = useState("")
    const [Collection,setCollection] = useState("")
    const [data,setData] = useState([])
    const [files,setFiles] = useState("")
    const [excelFile,setExcelFile] = useState("")
    const [loadindId,setLoadingId] = useState("")
  

   

    useEffect(() => {
      const nftRef = collection(db,'nft')
     
      const unsub = onSnapshot(
          nftRef,
        (snapShot) => {
          let list = [];
          snapShot.docs.forEach((doc) => {
            list.push({ 
                listID:doc.id,
               ...doc.data() 

              });
          });
          setData(list);
        },
        (error) => {
          console.log(error);
        }
      );
  
      return () => {
        unsub();
      };
    },[]) 
   

    const readExcel = (file) => {
        const promise = new Promise((resolve, reject) => {
          const fileReader = new FileReader();
          fileReader.readAsArrayBuffer(file);
    
          fileReader.onload = (e) => {
            const bufferArray = e.target.result;
    
            const wb = XLSX.read(bufferArray, { type: "buffer" });
            const wsname = wb.SheetNames[0];
            // console.log(wsname)
    
            const ws = wb.Sheets[wsname];
               setId(ws.A1.w)
               setType(ws.B1.w)
               setTitle(ws.C1.w)
               setDetails(ws.D1.w)
               setCreator(ws.E1.w)
               setCollection(ws.F1.w)
               setLink(ws.G1.w)
               setAddress(ws.H1.w)
                const data = XLSX.utils.sheet_to_json(ws);
             
            
    
            
    
            resolve(data);
          };
    
          fileReader.onerror = (error) => {
            reject(error);
          };
        });
    
        promise.then((d) => {
          setItems(d);
        });
      };
      const handlesubmit =  async (e) => {
         e.preventDefault()
         if(!id){
          toast.error("missing excel header id")
            return;
         }

         if(!title){
          toast.error("missing excel header title")
          return;
         }
        if(!type){
          toast.error("missing excel header type")
          return;
        }
        if(!details){
          toast.error("missing excel header details")
          return;
        }
        if(!Collection){
          toast.error("missing excel header collection")
          return;
        }
         if(!link){
          toast.error("missing excel header link")
          return;
         }
         if(!address){
          toast.error("missing excel header address")
          return;
         }
        if(!creator){
          toast.error("missing excel header creator")
          return;
        }
        if(items.length === 0){
          toast.error('please not upload empty excel')
          setExcelFile("")
          return;
        }
        
          var result = items.filter(function (o1) {
          return data.some(function (o2) {
              return o1.id === o2.id; // return the ones with equal id
         });
        });
      if(result.length === 0){
        items.forEach((ele) => {    
          addDoc(collection(db, "nft"), {
            id: ele.id,
           title: ele.title,
           type: ele.type,
           address:ele.address,
           link:ele.directlink,
           details:ele.details,
           creator:ele.creator,
           collection:ele.collection,
           path:'',
           sold:false
          }).then(() => { 
          })
          .catch(error => {
            toast.error("Unexpected error");
          })
            
          
        
        
           
       
      });
        toast.success(`${items.length} Document upload Sucessfully`) 
      
      }
      else{
        toast.error("documnet already exists")
      }
         setExcelFile("") 
      }

      const handleImage = async (id) => {
        setLoadingId(id)
        if(files === ""){
          toast.error("please upload image")
          return;
        }

        var reader = new FileReader();
        reader.onload = function (e) {
            var img = new Image();      
            img.src = e.target.result;

            img.onload = async function () {
                var w = this.width;
                var h = this.height;
                console.log(w)
                if(w !== 1024 && h !== 1024){
                toast.error("Image size should be 1024 x 1024")
                return;
                }
                else{
                    const fData = new FormData();
                     fData.append('file',files)
                     setLoading(true)
                     const nftRef = doc(db, "nft", id);
                     const filePath = `https://www.skilliza.com/laravel-video/storage/app/public/${files.name}`
                     await updateDoc(nftRef, {
                        path:filePath, 
                      });
                     const res  = await axios.post('https://www.skilliza.com/laravel-video/public/api/nft/'+id,fData)
                     if(res.data.status === 200){
                         toast.success('Successfully Uploaded')
                         console.log(res.data.message)
                         setLoading(false)
                         setFiles("")
                        
                           
                     }

                }
            }
        }
        reader.readAsDataURL(files);
        
     }
     const handlecheckboxChange = async (e,id) => {
           try {
            const docRef = doc(db, 'nft', id);
             await updateDoc(docRef, {
              sold:e.target.checked
             });



            } catch (error) {
            
            toast.error("Unexpected error")
           }
             
            
          }
          const deleteUser = async (id) => {
                 try {
                  await deleteDoc(doc(db, "nft", id));
                  toast.success('Document Delete Successfully')
                 } catch (error) {
                  toast.error(error)
                 }
          }
        
           
           
          
    
     
      const actionColumn = [
        {
          field: "action",
          headerName: "Image Upload",
          width:'450',
          renderCell: (params) => {
            return (
              <div className="cellAction">
                
                
                
                <div className="button-wrapper">
                     <span className="label">
                      Upload Image
                     </span>
  
                     <input type="file" 
                     className="upload-box"
                     placeholder="Upload image"
                     id="file"
                     accept ='image/*'
                     onChange={(e) => setFiles(e.target.files[0])}                  
                    />
             
                  </div>
                  <div className="buttonBox">
                   <button disabled={loadindId === params.row.listID ? loading : false}
                     onClick={()=>{handleImage(params.row.listID)}}
                    className='password-button'>
                  {
                loadindId === params.row.listID ? loading ? 
                    <div>
                        <i className='bx bx-loader-circle rotate-button'></i>
                        Loading
                    </div>
                
                : 'image submit'
                : 'image submit'
                }
           </button>
           </div>
           <div 
           className={params.row.sold ? 'soldNft unsoldNft' :'soldNft'}
          //  onClick={() => {soldHandle(params.row.listID)}}
           >
            
            
              <p>{params.row.sold ? 'Sold' : 'unsold'}</p>
              
            
            
            <input type='checkbox' defaultChecked={params.row.sold} className='checkboxNft' onChange={e => handlecheckboxChange(e,params.row.listID)} />
           </div>
              </div>
            );
          },
        },
        {
          field: "Delete",
          headerName: "Delete",
          width:'150',
          renderCell: (params) => {
            return (
              <div
              className="deleteButton"
              onClick={()=>{deleteUser(params.row.listID)}}
            >
              Delete
      
            </div>
            )
          }
        }
       
       
      ];
     

      const downloadFile = () => {
        window.location.href = "https://www.skilliza.com/laravel-video/storage/app/public/nftDetailsdemo.xlsx"
      }



  return (
    <div>
        <div><Toaster/></div>
    <div className='add-conatiner'>
     <h1>Upload NFT</h1>
          <div className="nftheader">
          <form onSubmit={handlesubmit} className='password-container'>
            
            <div className="button-wrapper">
                       <span className="label">
                        Upload Excel
                       </span>
    
                       <input type="file" 
                       className="upload-box"
                       placeholder="Upload excel"
                       id="file"
                       onChange={(e) => {
                          const file = e.target.files[0];
                          setExcelFile(e.target.files[0])
                          readExcel(file);
                        }}
                      //  onClick={handleFile}
                       accept=".xlsx,.xls,.csv"
                      />
               
                    </div>   
             
             <div className="buttonBox">
             <button  className='password-button'>
             
                 Upload
 
             </button>
             </div>
            </form>
            <button onClick={downloadFile} className='password-button'>Download Demo Excel</button>
          </div>
          
          <p style={{margin:'20px 0px'}}>{excelFile.name ? excelFile.name : ''}</p>
          <p style={{margin:'20px 0px'}}>{files.name ? files.name : ''}</p>
          <div className="card__body">
            <Box sx={{ height: 500, width: '100%' }}>
              <DataGrid
              className="datagrid"
              disableColumnMenu
               rows={data}
               columns={nftColumn.concat(actionColumn)}
               getRowId={(row) => row.listID}
               initialState={{
                sorting: {
                  sortModel: [{ field: 'id', sort: 'desc' }],
                },
              }}
               pageSize={9}
               rowsPerPageOptions={[9]}
               />
           </Box>
          </div>
         
  
    </div>
    </div>
  )
}

export default Form




