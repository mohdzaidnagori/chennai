import React, { useState ,useEffect} from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { playerStage,playerColumns } from '../../datasource'
import playerServices from '../../services/player.services'
import './turnamentTable.css'
import { DataGrid } from '@mui/x-data-grid'
import {collection, onSnapshot,runTransaction,orderBy,doc, query, where, updateDoc } from "firebase/firestore";
import {db} from '../../firebase'
import Box from '@mui/material/Box';

const Addplayer = () => {
    const [playerName,setPlayerName] = useState("")
    const [group,setGroup] = useState("")
    const [dis,setDis]  = useState('')
    const [stage,setStage] = useState("")
    const [player,setPlayer] = useState([])
    const [loading,setLoading] = useState(false)
    const round16 = true;
    const round8 = false;
    const round4 = false;
    const round2 = false;
    const round1 = false;

      
      useEffect(() => {
        const playerRef = collection(db,'player')
        const q = query(playerRef,where("group", "==", "Group-A"),orderBy("stage"));
        const unsub = onSnapshot(
        q,
          (snapShot) => {
            let list = [];
            snapShot.docs.forEach((doc) => {
              list.push({ id: doc.id, ...doc.data() });
            });
            setPlayer(list);
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
     

      

   const plstage = playerStage.map((plStage) => {
    return (
        <option key={plStage.id} value={plStage.id}>{plStage.stage}</option>
    )
   })
   const handleUpdate = async  (id) => {
    const playerRound = doc(db, "player",id.row.id);
    const s =player.filter((item) => item.stage === id.row.stage)
    s.map((item) => item.disabled = true)
    
    await updateDoc(playerRound, {
        round8:true
    }); 
    
   }
   
   

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(playerName === "" || group === "" || stage === ""){
              toast.error("All field are Required")
              return;
        }
        const newPlayer = {
            playerName,
            group,
            stage,
            round16,
            round8,
            round4,
            round2,
            round1
        }
        try {
            setLoading(true)
         await playerServices.addPlayer(newPlayer)
        toast.success("Player succesfully add")
        setLoading(false)

        } catch (error) {
            
            toast.error("Unexpected error")
        }
        setPlayerName("")
        setStage("")
        setGroup("")
        
    }
    
 
    

    const actionColumn = [
        {
          field: "action",
          headerName: "Action",
          width: 200,
          renderCell: (params) => {

            return (
              <div className="cellAction">
               <button className='button__table'
               disabled={params.row.disabled ? true : false}
                onClick={() => handleUpdate(params)}
               >Win</button>
              </div>
              
            );
          },
        },
      ];
  return (
    <div>
     <div><Toaster/></div>
    <div className='add-conatiner'>
     <h1>Add Player</h1>
          <form onSubmit={handleSubmit} className='form-container'>
            
            <div className="inputBox">
                <input
                 type="text"
                 name="playerName"
                 id="playerName"
                 required="required"
                 value={playerName}
                 onChange={(e) => setPlayerName(e.target.value)}
                    />
                <span>Player Name</span>
            </div>
            <div className="selectBox">
                <select
                value={group}
                 name="group"
                 onChange={(e) => setGroup(e.target.value)}
                  id="group">
                    <option value="">Select Group</option>
                    <option value="Group-A">Group A</option>
                    <option value="Group-B">Group B</option>
                </select>
            </div>
            <div className="selectBox">
                <select 
                value={stage}
                name="stage"
                onChange={(e) => setStage(e.target.value)}
                 id="stage">
                    <option value="">Select Match</option>
                    {plstage}
                </select>
            </div>
           <div className="buttonBox">
           <button disabled={loading} className='button__table'>
           {
                loading ? 
                    <div>
                        <i className='bx bx-loader-circle rotate-button'></i>
                        Loading
                    </div>
                
                : 'Add Player'
               }
           </button>
           </div>
          </form>
  
    </div>
     <div className="add-table">
        <h3>Group A</h3>
        <Box sx={{ height: 400, width: '100%' }}>
     <DataGrid
     key={player.id}
        className="datagrid"
        rows={player}
        columns={playerColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
       
      />
      </Box>
     </div>
    </div>
  )
}

export default Addplayer
