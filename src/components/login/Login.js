import React, { useEffect, useState ,useContext} from 'react'
import './Login.css'
import {signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase';
import {useNavigate} from 'react-router-dom'
import {AuthContext} from "../context/AuthContext"
import Logo from '../../assets/images/logo.jpg';

const Login = () => {
    const {dispatch} = useContext(AuthContext)
    const [error,setError] = useState(false)
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        let isAuth = JSON.parse(localStorage.getItem('user'))
        if(isAuth && isAuth !== null) {
         navigate("/") 
       }
        const interval = setInterval(() => {
          setError(false)
        }, 5000);
        return () => clearInterval(interval)
      }, []);
     
     

    const handleLogin = (e) => {
        e.preventDefault()
         signInWithEmailAndPassword(auth, email, password)
         .then((userCredential) => {
          // Signed in 
         const user = userCredential.user;
          
         dispatch({type:"LOGIN", payload:user})
         setError(false);
         console.log(user)
         navigate("/")
        
         })
        .catch((error) => {
           setError(true)
        setPassword("")

       });
    }
  
    

  return (
    <div className="modal">
        <div className="modal-container">
             {error && <span>Your password and email are incorrect</span>}
            <div className="modal-left">
                <h1 className="modal-title">Welcome! Admin</h1>
                <p className="modal-desc">Chennai Open Admin Dashboard</p>
                <form onSubmit={handleLogin}>
                <div className="input-block">
                    <label htmlFor="email" className="input-label">Email</label>
                    <input type="email" name="email" onChange={e => setEmail(e.target.value)}  placeholder="Email"/>
                </div>
                <div className="input-block">
                    <label htmlFor="password" className="input-label">Password</label>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)}  placeholder="Password"/>
                </div>
                <div className="modal-buttons">
                    <button type="submit" className="input-button">Login</button>
                </div>
                </form>
               
                
            </div>
            <div className="modal-right">
                <img src={Logo}
                    alt="" />
            </div>


        </div>

    </div>
  )
}

export default Login
