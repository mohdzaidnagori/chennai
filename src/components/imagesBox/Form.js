import React, { useEffect, useState } from 'react'
import '../generators/Form.css'
import toast, { Toaster } from 'react-hot-toast'
import axios from 'axios';


const Form = () => {
    const [file, setFile] = useState("");
    const[displayVideo,setdisplayVideo] = useState(false)
    const [percentage,setPercentage] = useState(0)
    const [Data,getData] = useState([]);



    const handleFile = () => {
        setdisplayVideo(false)
      }
      const updatedImages = async () => {
        const res = await axios.get('https://www.skilliza.com/laravel-video/public/api/getImage')
        getData(res.data)
     }
     useEffect(()=>{
       updatedImages()
     },[])

      const  handleAdd =  (e) =>{
        e.preventDefault();
        if(file === ''){
          toast.error("Please Select Image File")
          return; 
        }
        if(file.size > 1159711){
            toast.error("Video Size less than 1 MB")
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
                if(w < 2047 && h < 2047){
                toast.error("Image size should be 2048 x 2048")
                return;
                }
                else{
                    const fData = new FormData();
                     fData.append('name', file.name);
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
                     const res  = await axios.post('https://www.skilliza.com/laravel-video/public/api/image',fData,options)
                     if(res.data.status === 200){
                         setPercentage(100)
                         setdisplayVideo(true)
                         toast.success('Successfully Uploaded')
                         console.log(res.data.message)
                         updatedImages()
                         setTimeout(() => {
                             setPercentage(0)  
                         }, 1000);
                     }

                }
            }
        }
        console.log(percentage)
        reader.readAsDataURL(file);
        setFile("");
      }
      
      
    
      
      
  return (
    <div>
    <div><Toaster/></div>
   <div className='add-conatiner'>
    <h1>Update Image</h1>
         <form onSubmit={handleAdd} className='password-container'>
           
         <div className="button-wrapper">
                     <span className="label">
                      Upload Image
                     </span>
  
                     <input type="file" 
                     className="upload-box"
                     placeholder="Upload Image"
                     id="file"
                     onChange={(e) => setFile(e.target.files[0])}
                     onClick={handleFile}
                     accept="image/*"
                    />
             
                  </div> 
          
          <div className="buttonBox">
          <button type='submit' disabled={percentage !== 0 && percentage < 100} className="button__table button-table-padding-1">
                {
                  percentage ? 
                    <div>
                        <i className='bx bx-loader-circle rotate-button'></i>
                        Loading
                    </div>
                
                  : 'Update'
                 } 
               </button>
          </div>
         </form>
 
   </div>
   <div className='table-wrapper'>
   <p>{file.name ? file.name : ''}</p>
       <table>
           <thead>
               <tr>
               <th>Id</th>
               <th>Image Name</th>
               </tr>
           </thead>
           <tbody>
                   {
                        Data.map((item) => ( 
                           <tr key={item.id}>
                           <td>{item.id}</td>
                           <td>{item.Imagename}</td>
                           </tr>
                        )) 
                    } 
           </tbody>
       </table>
   </div>
   </div>
  )
}

export default Form
