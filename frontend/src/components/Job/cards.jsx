import React from 'react'
import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const arr=[
    {
        id:1,   
        url:"https://training-uploads.internshala.com/new-data-science-specialization/banner_hero.png.webp",
    },
    {
        id:2,   
        url:"https://training-uploads.internshala.com/full-stack-web-development-specialization-v2/banner_hero.png.webp",
    },
    {
        id:3,   
        url:"https://training-uploads.internshala.com/digital-marketing-specialization-v2/banner_hero.png.webp",
    },
    {
        id:4,
        url:"https://training-uploads.internshala.com/product-management-specialization/banner_hero.png.webp",
    },
    {
        id:5,
        url:"https://training-uploads.internshala.com/ui-ux-specialization/banner_hero.png.webp",
    }
]



export function CardThree({title,category,city,country,location,description,role,_id}) {
    const img_url=arr[Math.floor(Math.random()*arr.length)].url;
  return (
    <div className="w-[350px] rounded-md border">
      <img
        src={img_url}
        alt="Laptop"
        className="h-[200px] w-full rounded-t-md object-cover"
      />
      <div className="p-4">
        <h1 className="inline-flex items-center text-lg font-semibold">
          {title} &nbsp; <ArrowUpRight className="h-4 w-4" />
        </h1>
        <p className="mt-3 text-sm text-gray-600">
          {description}
        </p>
        <div className="mt-4">
          <span className="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[10px] font-semibold text-gray-900">
          #{category}
          </span>
        </div>
        {role==="Job Seeker"?<Link className="apply-link" to={`/application/${_id}`}> <button 
          type="button"
          className="mt-4 w-full rounded-sm bg-black px-2 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        >
          
          Apply Here 
           </button>
          </Link>
          :<></>
          }
      </div>
    </div>
  )
}
