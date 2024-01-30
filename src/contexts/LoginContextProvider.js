import {  createContext,useEffect,useState } from "react";

import axios from "axios";

// create context
export let loginContext=createContext();

// create context provider


function LoginContextProvider ({children}){
// state

let [userState,setUserState]=useState(null)


const logoutFunction=()=>{
  localStorage.clear();
  setUserState(null)
 
  }

const loginFunction=(userCredentialsObj)=>{
  axios.post("http://localhost:3500/user-api/login-user", userCredentialsObj)
    .then((response)=>{
      if(response.data.message==='logged in')
      {
        // save token to local storage
        localStorage.setItem("token",response.data.token)
         console.log('logged in')
        console.log(response.data.user)
        
      
        setUserState(response.data.user)
        
        
       
        
        //  wont reflect value here --> console.log(loginStatus)
         
      }
      else{
        console.log(response.data.message)
    } 
}
     )
     .catch((err)=>{
        console.log("err in user login: ",err)
     })
}




  return (
    <loginContext.Provider value={{loginFunction,logoutFunction,userState,setUserState}}>
            {children}
    </loginContext.Provider>
  )
}

export default LoginContextProvider