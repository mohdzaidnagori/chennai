import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import axios from 'axios';
import { logindata } from '../../datasource';
import { DataGrid } from '@mui/x-data-grid'
import Box from '@mui/material/Box';
const Form = () => {
    const [PassValue,setpassValue] = useState("")
    const [username,setUsername] = useState("")
    const [data,setData] = useState([])
    const [loading,setLoading] = useState(false)

    const showlogin = async () => {
      const res = await axios.get('https://www.skilliza.com/laravel-video/public/api/show-login')
      setData(res.data)
      console.log(res.data)
    }
    
    useEffect(()=>{
        showlogin()
    },[])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const loginData = {
            username:username,
            PassValue:PassValue
        }
        console.log(loginData)
        setLoading(true)
        await axios.post('https://www.skilliza.com/laravel-video/public/api/user-login',loginData)
        setLoading(false)
        toast.success("login Credential succefully added")
        showlogin()
        setpassValue("")
        setUsername("")
        
    }
    const deleteUser = async (id) => {
        await axios.delete('https://www.skilliza.com/laravel-video/public/api/delete-login/'+id).then(res=>{
            showlogin()
        })
        toast.success("Record successfully Deleted")
      }


      const Enablehandle = async (id,status) => {
 
       
        const fData = new FormData();
            if(status === 'false'){
              fData.append('status','true');
            }
            else{
              fData.append('status','false');
            }
            const res  = await axios.post('https://www.skilliza.com/laravel-video/public/api/update-login/'+id,fData)
            if(res.data.status === 200){
              console.log(res.data.message)
            }
      
            
      
            showlogin()
      
       
      }


    const actionColumn = [
        {
          field: "action",
          headerName: "Action",
          width:'150',
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




  return (
    <div>
       <div><Toaster/></div>
      <div className='add-conatiner'>
      <h1>ADD Login</h1>
          <form onSubmit={handleSubmit}  className='password-container'>
          <div className="inputBox">
                <input
                 type="text"
                 name="username"
                 id="username"
                 required="required"
                 value={username}
                 onChange={(e) => setUsername(e.target.value)}
                    />
                <span>Username</span>
            </div> 
            <div className="inputBox">
                <input
                 type="text"
                 name="PassValue"
                 id="PassValue"
                 required="required"
                 value={PassValue}
                 onChange={(e) => setpassValue(e.target.value)}
                    />
                <span>Password</span>
            </div>   
           
           <div className="buttonBox">
           <button disabled={loading} className='password-button'>
           {
                loading ? 
                    <div>
                        <i className='bx bx-loader-circle rotate-button'></i>
                        Loading
                    </div>
                
                : 'ADD'
               }
           </button>
           </div>
          </form>
       </div>
       <div className="card__body">
            <Box sx={{ height: 400, width: '100%' }}>
              <DataGrid
               className="datagrid"
               disableColumnMenu
               rows={data}
               columns={logindata.concat(actionColumn)}
               pageSize={9}
               rowsPerPageOptions={[9]}
               />
           </Box>
          </div>
    </div>
  )
}

export default Form
