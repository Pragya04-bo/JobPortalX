import axios, { isAxiosError } from 'axios';
import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast';
import { ArrowRight } from 'lucide-react'
import { Link, Navigate } from 'react-router-dom';
import { Context } from '../..';
import { BASE_URL } from '../../header';
function Login() {
  const showpass=()=>{
    if(!showPassword){
        setpassType('text');
    }
    else{
      setpassType('password');
    }
    setShowPassword(!showPassword);
  }
  const {isAuthorized,setIsAuthorized,user,setUser}=useContext(Context);
    const [email,setemail]=useState("");
    const [passType,setpassType]=useState('password');
    const [showPassword,setShowPassword]=useState(false);
    const [role,setrole]=useState("");
    const [password,setpassword]=useState("");

    const handleRegister=async (e)=>{
      e.preventDefault();
try{
  console.log("mja");
   const {data}=await axios.post(`${BASE_URL}/user/login`,{email,password,role},{withCredentials:true,
  headers:{
    "Content-Type":"application/json",
  },});

  console.log("ajs",data);
  console.log("user",data);
  if(data.message){
   toast.success(data.message);

   setUser(data.user);
   
  setemail("");
   setpassword("");
   setrole("");
   setIsAuthorized(true);
  }
  else if(data.error){
    toast.error(data.error);
  }
   
}catch(error){
  console.log(error);
  
toast.error(error.response);
// console.log(error.response)

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
          <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">Sign in</h2>
          <p className="mt-2 text-sm text-gray-600">
            Don&apos;t have an account?{' '}
            <a
              href="/register"
              title=""
              className="font-semibold text-black transition-all duration-200 hover:underline"
            >
              Create a free account
            </a>
          </p>
          <form className="mt-8">
            <div className="space-y-5">
            
            <div>
                <label htmlFor="" className="text-base font-medium text-gray-900">
                  {' '}
                  Role{' '}
                </label>
                <div className="mt-2">
                <select className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="email"
                    placeholder="Role" value={role} onChange={(e)=>setrole(e.target.value)} >
         <option value="">Select Role</option>
         <option value="Job Seeker">Job Seeker</option>
         <option value="Employer">
         Employer
         </option>
         </select>
                </div>
              </div>
              <div>
                <label htmlFor="" className="text-base font-medium text-gray-900">
                  {' '}
                  Email address{' '}
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="email"
                    placeholder="Email"
                    value={email} onChange={(e)=>setemail(e.target.value)}
                  ></input>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="" className="text-base font-medium text-gray-900">
                    {' '}
                    Password{' '}
                  </label>
                  <a
                    href="#"
                    title=""
                    className="text-sm font-semibold text-black hover:underline"
                  >
                    {' '}
                    Forgot password?{' '}
                  </a>
                </div>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="password"
                    placeholder="Password"
                    value={password} onChange={(e)=>setpassword(e.target.value)}
                  ></input>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                  onClick={handleRegister}  >
                  Get started <ArrowRight className="ml-2" size={16} />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="h-full w-full">
        <img
          className="mx-auto h-full w-full rounded-md object-cover"
          src="https://images.unsplash.com/photo-1630673245362-f69d2b93880e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
          alt=""
        />
      </div>
    </div>

      {/* <button className='google_btn' onClick={signUpToGoogle}>
      <img src={googlelogo} />
      <span>Sign Up With Google</span></button>   </div>
    <div className='banner'>
    <img src={photo1} alt='munna'/> */}
    </section>
  )
}

export default Login
