import { ArrowUpRight } from 'lucide-react'
import React from 'react'
import toast from 'react-hot-toast';
import { BASE_URL } from '../../header';
export function CardFour({name,email,phone,url,role,id,coverletter}) {

  return (
    <div className="flex max-w-2xl flex-col items-center rounded-md border md:flex-row">
      <div className="h-full w-full md:h-[200px] md:w-[300px]">
       <a href={url} target='_blank'> <img
          src={url}
          alt="Laptop"
          className="h-full w-full rounded-md object-cover"
        />
        </a>
      </div>
      <div>
        <div className="p-4">
          <h1 className="inline-flex items-center text-lg font-semibold">
            {name} <ArrowUpRight className="ml-2 h-4 w-4" />
          </h1>
          <p className="mt-3 text-sm text-gray-600">
           {coverletter}
          </p>
          <div className="mt-4">
            <span className="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[10px] font-semibold text-gray-900">
              Email-id:{email}
            </span>
            <span className="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[10px] font-semibold text-gray-900">
              Phone:{phone}
            </span>
            {/* <span className="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[10px] font-semibold text-gray-900">
             
            </span> */}
          </div>
          
          {/* {role==="Job Seeker"?<button onClick={()=>deleteApplication(id)} className='delete'>DELETE</button>:<></>} */}
            {/* <img
              className="inline-block h-8 w-8 rounded-full"
              src="https://overreacted.io/static/profile-pic-c715447ce38098828758e525a1128b87.jpg"
              alt="Dan_Abromov"
            />
            <span className="flex flex-col">
              <span className="text-[10px] font-medium text-gray-900">Dan Abromov</span>
              <span className="text-[8px] font-medium text-gray-500">@dan_abromov</span>
            </span> */}
         
        </div>
      </div>
    </div>
  )
}
