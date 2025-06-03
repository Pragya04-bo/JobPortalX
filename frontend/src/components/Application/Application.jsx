import axios from 'axios';
import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

import { Context } from '../../index';
import { BASE_URL } from '../../header';

function Application() {
  const navigateTo = useNavigate();
  const { isAuthorized, setIsAuthorized, user } = useContext(Context);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [coverletter, setcoverletter] = useState("");
  const [phone, setPhone] = useState("");
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false); 
    const { id } = useParams();

  const handleResumeChange = (e) => {
    setResume(e.target.files[0]);
  };

  const postApp = async () => {
    setLoading(true); 
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("coverletter", coverletter);
    formData.append("phone", phone);
    formData.append("resume", resume);
    formData.append("jobId", id);
    
    try {
      const {data} = await axios.post(`${BASE_URL}/applications/post`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data"
        },
      });
console.log("daadada",data);
      setLoading(false);
      if (data === null) {
        return <div>Loading.....</div>;
      }
      
      if(data.message){
        toast.success(data.message);
        navigateTo("/applications/me");
       }
       else if(data.error){
         toast.error(data.error);
       }
      // toast.success(response.data.message);
     
    } catch (error) {
      setLoading(false); 
      toast.error(error.response.data.mongooseError);
   
    }
  }

  if (!isAuthorized) {
    navigateTo("/login");
  }

  return (
    <div className='my-10'>
    <div className="mx-auto max-w-7xl px-4">
    <div className="mx-auto max-w-7xl py-12 md:py-24">
    <div className="grid items-center justify-items-center gap-x-4 gap-y-10 lg:grid-cols-2">
      <div className="flex items-center justify-center">
              <div className="px-2 md:px-12">
                {/* <p >Apply for the Job</p> */}
                <h3 className="text-2xl font-bold text-gray-900 md:text-4xl mb-4">Application Form</h3>
      <form className="application-form" onSubmit={(e) => {
        e.preventDefault();
        postApp();
      }}>
        <div className="grid w-full  items-center gap-1.5">
          <label for="name" className="text-sm font-medium leading-none text-gray-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Name:</label>
          <input id='name'  className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-black-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900" placeholder='Name' type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="grid w-full  items-center gap-1.5">
          <label for="email" className="text-sm font-medium leading-none text-gray-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Email:</label>
          <input id='email' className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-black-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900" placeholder='example@gmail.com' type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="grid w-full  items-center gap-1.5">
          <label for="coverletter" className="text-sm font-medium leading-none text-gray-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Cover Letter:</label>
          <textarea id='coverletter' className= "flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900" placeholder='Cover Letter' value={coverletter} onChange={(e) => setcoverletter(e.target.value)}></textarea>

        </div>
        <div className="grid w-full  items-center gap-1.5">
          <label for="Phone" className="text-sm font-medium leading-none text-gray-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Phone:</label>
          <input  id="Phone"  className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-black-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900" placeholder='1234567890' type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
        <div className="grid w-full  items-center gap-1.5">
          <label for='resume' className="text-sm font-medium leading-none text-gray-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Resume:</label>
          <input  id='resume' className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-black-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900" type="file" accept=".png,.jpg,.webp" onChange={handleResumeChange} />
        </div>
      <button type="submit" className='submitApp' >{loading ? 'Submitting...' : 'Submit Application'}</button>
      </form>
      
      </div>
     
      </div>
      <img
              alt="Contact us"
              className="hidden max-h-full w-full rounded-lg object-cover lg:block"
              src="https://images.unsplash.com/photo-1543269664-56d93c1b41a6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzZ8fGhhcHB5JTIwcGVvcGxlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60"
            />
    </div>
    </div>
    </div>
    </div>
  );
}

export default Application;
