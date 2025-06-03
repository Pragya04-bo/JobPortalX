import axios, { isAxiosError } from 'axios';
import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast';
import { ArrowRight } from 'lucide-react'
import { BASE_URL } from '../../header';
import { FaCriticalRole, FaEye, FaEyeSlash, FaLock, FaPencilAlt, FaPhoneAlt, FaRegUser, FaSignOutAlt } from 'react-icons/fa';
import { MdOutlineMailOutline } from "react-icons/md";
import { Link, Navigate } from 'react-router-dom';
import { Context } from '../..';
import logo1 from "../../assests/logo.jpg";
function Register() {

  const {isAuthorized,setIsAuthorized,user,setUser}=useContext(Context);
  const [showPassword,setShowPassword]=useState(false);
  const [passType,setpassType]=useState('password');
   
    const [name,setname]=useState("");
    const [email,setemail]=useState("");
    const [phone,setphone]=useState("");
    const [role,setrole]=useState("");
    const [password,setpassword]=useState("");

    const showpass=()=>{
      if(!showPassword){
          setpassType('text');
      }
      else{
        setpassType('password');
      }
      setShowPassword(!showPassword);

    }
    const handleRegister=async (e)=>{
      e.preventDefault();
try{
  console.log("mja");
   const {data}=await axios.post(`${BASE_URL}/user/register`,{name,email,password,phone,role},{withCredentials:true,
  headers:{
    "Content-Type":"application/json",
  },});

  console.log("ajs");
  if(data.message){
   toast.success(data.message);

   setUser(data.user);
   setname("");
   setemail("");
   setpassword("");
   setphone("");
   setrole("");
   setIsAuthorized(true);
  }else if(data.error){
   toast.error(data.error);
  }
   
}catch(error){
//  // Assuming 'error' is the error response from the backend
// if (error.response && error.response.data && error.response.data.mongooseError) {
//   const errorData = error.response.data.error;
//   Object.keys(errorData).forEach(field => {
//       console.log("mongooseerror",`${field}: ${errorData[field]}`);
//   });
// }

toast.error(error.response.data.mongooseError.name||error.response.data.mongooseError.email||error.response.data.mongooseError.password||error.response.data.mongooseError.phone||error.response.data.mongooseError.role||error.response.data.message);

}
    }
    if(isAuthorized){
        return <Navigate to={"/"} />
    }
  return (
    <section>
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">Sign up</h2>
          <p className="mt-2 text-base text-gray-600">
            Already have an account?{' '}
            <a
              href="/login"
              title=""
              className="font-medium text-black transition-all duration-200 hover:underline"
            >
              Sign In
            </a>
          </p>
          <form className="mt-8">
            <div className="space-y-5">
            <div>
                <label htmlFor="name" className="text-base font-medium text-gray-900">
                  {' '}
                  Role{' '}
                </label>
                <div className="mt-2">
                <select className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"value={role} onChange={(e)=>setrole(e.target.value)} >
         <option value="">Select Role</option>
         <option value="Job Seeker">Job Seeker</option>
         <option value="Employer">
         Employer
         </option>
         </select>
                </div>
              </div>
              <div>
                <label htmlFor="name" className="text-base font-medium text-gray-900">
                  {' '}
                  Full Name{' '}
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    placeholder="Full Name"
                    value={name} onChange={(e)=>setname(e.target.value)} 
                    id="name"
                  ></input>
                </div>
              </div>
              <div>
                <label htmlFor="email" className="text-base font-medium text-gray-900">
                  {' '}
                  Email address{' '}
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="email"
                    value={email} onChange={(e)=>setemail(e.target.value)}
                    placeholder="Email"
                    id="email"
                  ></input>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-base font-medium text-gray-900">
                    {' '}
                    Password{' '}
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="password"
                    placeholder="Password"
                    value={password} onChange={(e)=>setpassword(e.target.value)}
                    id="password"
                  ></input>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-base font-medium text-gray-900">
                    {' '}
                    Phone{' '}
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="password"
                    placeholder="Password"
                    value={phone} onChange={(e)=>setphone(e.target.value)}
                    id="password"
                  ></input>
                </div>
              </div>
              <div>
                <button
                onClick={handleRegister} 
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                >
                  Create Account <ArrowRight className="ml-2" size={16} />
                </button>
              </div>
            </div>
          </form>
        </div>    
      </div>
      <div className="h-full w-full">
          <img
            className="mx-auto h-full w-full rounded-md object-cover"
            src="https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80"
            alt=""
          />
        </div>
    </div>
  </section>
  )
}

export default Register
