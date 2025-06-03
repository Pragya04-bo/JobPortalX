import React ,{useEffect,useContext, useState} from 'react';
import "./App.css";
import { BrowserRouter as Router , Route, Routes, useSearchParams} from 'react-router-dom';
import { Context } from './index.js';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Home from './components/Home/Home.jsx';
import Jobs from './components/Job/Jobs';
import JobDetails from './components/Job/JobDetails';
import MyJobs from './components/Job/MyJobs';
import PostJob from './components/Job/PostJob';
import Application from './components/Application/Application';
import MyApplication from './components/Application/MyApplication';
import Error from './components/NotFound/Error.jsx';
import axios from 'axios';
// import JobDetails from './components/Job/JobDetails.jsx';
import toast, { Toaster } from 'react-hot-toast';
import { BASE_URL } from './header.jsx';
const App =()=>{

const {isAuthorized,setIsAuthorized,setUser}=useContext(Context);

useEffect(()=>{
  const fetchuser =async()=>{
   try{ const response=await axios.get(`${BASE_URL}/user/getuser`,{withCredentials:true});
   console.log("asdfg",response)
   if(response.data.us){

    setUser(response.data.us);
    setIsAuthorized(true);
    // toast.success("Welcome back "+response.data.us.name);
   }
   else{
    setUser(null);
    setIsAuthorized(false);
   }

  }
catch(error){
    setIsAuthorized(false);
  }
  
}
fetchuser();
},[isAuthorized]);

  return (
    <>
      <Router>
         <Navbar />
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/job/getall" element={<Jobs />}/>
          <Route path="/job/:id" element={<JobDetails />}/>
          <Route path="/job/post" element={<PostJob />}/>
          <Route path="/job/me" element={<MyJobs />}/>
          <Route path="/job/:id" element={<JobDetails />}/>
          <Route path="/application/:id" element={<Application />}/>
          <Route path="/applications/me" element={<MyApplication />}/>
          <Route path="*" element={<Error />}/>
        </Routes>
        <Footer />
        <Toaster />
      </Router>
      </>
  )
}

export default App
