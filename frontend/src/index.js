import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.js';
import './index.css';
export const Context = React.createContext({isAuthorized:false});

const AppWrapper=()=>{

  const [isAuthorized,setIsAuthorized]=useState(false);
  const [user,setUser]=useState({});

  return (
    <Context.Provider value={{isAuthorized,setIsAuthorized,user,setUser}}>
   <App />
    </Context.Provider>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>,
)
