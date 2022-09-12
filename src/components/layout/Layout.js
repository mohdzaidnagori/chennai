import React,{useContext} from 'react'
// import Router from '../Router';
import Sidebar from '../sidebar/Sidebar'
import '../../assets/boxicons/css/boxicons.min.css';
import '../../assets/css/grid.css';
import '../../assets/css/index.css';
import {BrowserRouter,Navigate,Route,Routes} from "react-router-dom";
import './Layout.css'
import Topnav from '../Topnav/Topnav';
import { AuthContext } from "../context/AuthContext";
import Login from '../login/Login';
import Customers from '../../pages/Customers';
import Dashboard from '../../pages/Dashboard';
import Video from '../../pages/Video';
import Form from '../form/Form';
import { userInputs } from "../../assets/formSource";
import RoundOne from '../../turnament/turnamentTable/RoundOne';
import TurnamentSidebar from '../../turnament/sidebar/TurnamentSidebar';
import Roundtwo from '../../turnament/turnamentTable/Roundtwo';
import Addplayer from '../../turnament/turnamentTable/Addplayer';
import Generators from '../../pages/Generators';
import Images from '../../pages/Images';
import User from '../../pages/User';
import Nft from '../../pages/Nft';
import ExcelNft from '../../pages/ExcelNft';
import View from '../../pages/View';





const Layout = () => {
  const {currentUser} = useContext(AuthContext)
  

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };

  return (
    <> 

         <BrowserRouter>
         <Routes>
          <Route path="login" element={<Login/>}/>
          <Route path='*' element={
          <>
                
                <div className='layout'>
                <Sidebar />
                <div className="layout__content">
                    <Topnav />
                  <div className="layout__content-main">
               
                 <Routes>
                 {/* <Route path='/' element={
                    <RequireAuth>
                     <Dashboard />
                    </RequireAuth>
                  } />
                  <Route  path="customers" element={
                    <RequireAuth>
                   <Customers />
                    </RequireAuth>
                  
                  }  /> */}
                 
                  <Route  path="/" element={
                    <RequireAuth>
                    <Video />
                    </RequireAuth>
                  } />
                  
                  <Route  path="/password" element={
                    <RequireAuth>
                    <Generators />
                    </RequireAuth>
                  } />
                   <Route  path="/image" element={
                    <RequireAuth>
                    <Images />
                    </RequireAuth>
                  } />
                    <Route  path="/user-login" element={
                    <RequireAuth>
                    <User />
                    </RequireAuth>
                  } />
                  <Route  path="/Nft" element={
                    <RequireAuth>
                    <Nft />
                    </RequireAuth>
                  } />
                    <Route  path='/view' element={
                    <RequireAuth>
                    <View />
                    </RequireAuth>
                  } />
                   <Route  path="/excelnft" element={
                    <RequireAuth>
                    <ExcelNft />
                    </RequireAuth>
                  } />
                  {/* <Route  path="/video/add" element={
                    <RequireAuth>
                    <Form inputs={userInputs} />
                    </RequireAuth>
                  } /> */}
                  <Route path="/turnament/*" element={ 
                  <div>
                    <RequireAuth>
                    <TurnamentSidebar />
                    <div className="turnament-table">
                     <div className="row">
                      <div className="col-10" style={{margin:'auto'}}>
                      <Routes>
                        <Route path="roundone" element={<RoundOne />} />
                         <Route path="roundtwo" element={<Roundtwo />} />
                         <Route path="add" element={<Addplayer />} />
                      </Routes>
                      </div>
                     </div>
                    </div>
                    </RequireAuth>
                  </div>
                  }>
                  </Route> 
                  
                
                    
                   
                
                 </Routes>
                  </div>
                </div>
             </div>
            
          
          </>
        }>
          </Route> 
           
         </Routes>
         </BrowserRouter>
    </>
  )
}

export default Layout
