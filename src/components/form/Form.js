import React, { useEffect, useState } from 'react'
import './Form.css'
import no_video from '../../assets/images/no-video.jpg'
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast'
import { userColumns } from '../../datasource';
import { Link } from 'react-router-dom'
import { DataGrid } from '@mui/x-data-grid'
import Box from '@mui/material/Box';
import http from '../../http';
import '../../turnament/turnamentTable/turnamentTable.css'
import Modal from '../modal/Modal';

const Form = (props) => {
     const [data, Setdata] = useState({});
     const [Data,getData] = useState([]);
    const [file, setFile] = useState("");
    const[displayVideo,setdisplayVideo] = useState(false)
    const [percentage,setPercentage] = useState(0)
    const [enable,setEnable] = useState(false)
    const [inputs,setInputs] = useState({})

const handleFile = () => {
  setdisplayVideo(false)
}



const Enablehandle = async (id,status) => {
 
  await http.get('/video/'+id+'/edit').then((res)=>{
    setInputs(res.data)
    console.log(status)
    console.log(enable)
  });
  const fData = new FormData();
      if(status === 'false'){
        fData.append('status','true');
      }
      else{
        fData.append('status','false');
      }
      const res  = await axios.post('https://www.skilliza.com/laravel-video/public/api/enable/'+id,fData)
      if(res.data.status === 200){
        console.log(res.data.message)
      }

      

      fetchAllUsers();

 
}

    const handleInput = (e) => {
      const id = e.target.id;
      const value = e.target.value;
      Setdata({ ...data, [id]: value })
      // props.type === 'file' ? e.target.files[0] :
  }
  const  handleAdd = async (e) =>{
      e.preventDefault();
      if(file === ''){
        toast.error("Please Select Video File")
        return;
      }
      if(file.size > 15597111){
        toast.error("Video Size less than 15mb")
        return; 
      }
      const fData = new FormData();
      fData.append('name', data.name);
      fData.append('file',file)
      const options = {
          onUploadProgress: (progressEvent) => {
              
           const {loaded, total} = progressEvent;
           let percent = Math.floor( (loaded * 100) / total )
           if( percent < 100 ){
              setPercentage(percent)
            }
         }
        
      }
     
     
      const res  = await axios.post('https://www.skilliza.com/laravel-video/public/api/add-student',fData,options)
      if(res.data.status === 200){
          setPercentage(100)
          setdisplayVideo(true)
          toast.success('Successfully Uploaded')
          console.log(res.data.message)
          setTimeout(() => {
              setPercentage(0)  
          }, 1000);
      }
      fetchAllUsers();
      setFile("")
  }

  

  



  const fetchAllUsers = () => {
    http.get('/video').then(res=>{
        getData(res.data);
    })
}
const deleteUser = (id) => {
  http.delete('/video/'+id).then(res=>{
      fetchAllUsers();
  })
  toast.success("Record successfully Deleted")
}

const actionColumn = [
  {
    field: "action",
    headerName: "Action",
    width:'200',
    renderCell: (params) => {
      return (
        <div className="cellAction">
          
          
          
          <div
            className="EnableButton"
            style={{backgroundColor:params.row.status === 'true' ? 'green': 'red'}}
              
         onClick={()=>{Enablehandle(params.row.id,params.row.status)}}
          >
             
             {
             params.row.status === 'true' ? 'Enabled' : 'Disabled'
             }
             
          </div>
        </div>
      );
    },
  },
  {
    field: "Delete",
    headerName: "Delete",
    width:'200',
    renderCell: (params) => {
      return (
        <div
        className="deleteButton"
        onClick={()=>{deleteUser(params.row.id)}}
      >
        Delete

      </div>
      )
    }
  }
];

useEffect(() =>{
  fetchAllUsers();
 },[])









  return (
    <div>
    <div className='new'>
      <Toaster/>
      </div>
      <div className='add-conatiner'>
        <h1>Video Update</h1>
      
           
            <form onSubmit={handleAdd} >
             <div className="form-flex-video">
            
           
                  <div className="button-wrapper">
                     <span className="label">
                      Upload Video
                     </span>
  
                     <input type="file" 
                     className="upload-box"
                     placeholder="Upload File"
                     id="file"
                     onChange={(e) => setFile(e.target.files[0])}
                     onClick={handleFile}
                     accept="video/mp4"
                    />
             
                  </div>
                 {/* <div className="selectBox selectHeight"> */}
                {/* <select */}
                 {/* name="name" */}
                 {/* onChange={handleInput} */}
                  {/* id="name"> */}
                    {/* <option value="Screen-1">Screen 1</option> */}
                    {/* <option value="Screen-2">Screen 2</option> */}
                    {/* <option value="Screen-3">Screen 3</option> */}
                    {/* <option value="Screen-4">Screen 4</option> */}
                   
                {/* </select> */}
            {/* </div>  */}
             
                   
               
                <button type='submit' disabled={percentage !== 0 && percentage < 100} className="button__table button-table-padding-1">
                {
                  percentage ? 
                    <div>
                        <i className='bx bx-loader-circle rotate-button'></i>
                        Loading
                    </div>
                
                  : 'Upload'
                 } 
               </button>
             

            </div>
            <div className="progress-flex">
                <p>{file.name ? file.name : ''}</p>
                 { 
                percentage ? 
                <div className='progress-bar'>
                 
                  <div className='progress-color' style={{width:percentage + '%'}}>{percentage + '%'}</div>
                 </div> 
               : ''
                } 
               
              
              </div>
              
               </form>
        
            
            
           
              
              

         <div className="card__body">
            <Box sx={{ height: 400, width: '100%' }}>
              <DataGrid
              className="datagrid"
              disableColumnMenu
               rows={Data}
               columns={userColumns.concat(actionColumn)}
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