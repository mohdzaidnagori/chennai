import React, { useState ,useEffect} from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { passwordColumns } from '../../datasource'
import playerServices from '../../services/player.services'
import '../../turnament/turnamentTable/turnamentTable.css'
import { DataGrid } from '@mui/x-data-grid'
import {collection, onSnapshot,runTransaction,orderBy,doc, query, where, updateDoc, Timestamp } from "firebase/firestore";
import {db} from '../../firebase'
import Box from '@mui/material/Box';
import './Form.css'
import '../table/Table.css'

const Form = () => {
    const [PassValue,setpassValue] = useState("")
    const [data,setData] = useState([])
    const [loading,setLoading] = useState(false)

      
      useEffect(() => {
        const meetingRef = collection(db,'meeting')
       
        const unsub = onSnapshot(
            meetingRef,
          (snapShot) => {
            let list = [];
            snapShot.docs.forEach((doc) => {
              list.push({ 
                id: doc.id,
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
     

      


   
   
   

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(PassValue === ""){
              toast.error("All field are Required")
              return;
        }
        if(PassValue.length > 6){
            toast.error("Password Should 6 character and less than")
            return;
      }
        let date = Timestamp.now().toDate().toString()
        const newMeeting = {
            PassValue,
            date
        }
        try {
            setLoading(true)
            const docRef = doc(db, 'meeting', 'qD09Wxmbo67iOjLkhYi8');
             await updateDoc(docRef, newMeeting);

        setLoading(false)

        } catch (error) {
            
            toast.error("Unexpected error")
        }
        setpassValue("")
       
        
    }
    const handledelete = async (id) => {
        await playerServices.deleteMeeting(id)
    }
    
 
    

   
  return (
    <div>
     <div><Toaster/></div>
    <div className='add-conatiner'>
     <h1>Update Password</h1>
          <form onSubmit={handleSubmit} className='password-container'>
            
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
                
                : 'Update'
               }
           </button>
           </div>
          </form>
  
    </div>
    <div className='table-wrapper'>
        <table>
            <thead>
                <tr>
                <th>Password</th>
                <th>Update Time</th>
                </tr>
            </thead>
            <tbody>
                    {
                        data.map((item) => (
                            <tr>
                            <td>{item.PassValue}</td>
                            <td>{item.date}</td>
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
