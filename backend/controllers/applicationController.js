import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrHandler from "../middlewares/error.js";
import { Application } from "../models/applicationSchema.js";
import cloudinary from "cloudinary";
import { Job } from "../models/jobschema.js";

export const employerGetAllApplication=catchAsyncError(async(req,res,next)=>{
  const {role}=req.user;

  if(role==="Job Seeker"){
    res.status(404).json({
          success:false,
          error:"munna, you are not a employer to see that"
    });
  }

  const {_id}=req.user;

  const allApplication = await Application.find({'employerID.user':_id});

res.json({
    success:true,
    "message":"ALL Application",
    "allApplication":allApplication
})
});

export const JobSeekerGetAllApplication=catchAsyncError(async(req,res,next)=>{
    const {role}=req.user;
  
    if(role==="Employer"){
      res.status(404).json({
        success:false,
        error:"Munna,you are not a Job Seeker to access that!"
  });
    }
  
    const {_id}=req.user;
  
    const allApplication = await Application.find({'applicantID.user':_id});
  
  res.json({
      success:true,
      "message":"ALL Application",
      allApplication
  })
  });

  export const JobSeekerDeleteApplication=catchAsyncError(async(req,res,next)=>{
    const {role}=req.user;
  
    if(role==="Employer"){
      return next(new ErrHandler("Munna,you are not a Job Seeker to access that!"),404);
    }
  
    const {id}=req.params;
  
    const application = await Application.findById(id);
   
if(!application){
    return next (new ErrHandler("Application not found"),404);
}
await application.deleteOne();
  res.json({
      success:true,
      "message":"Application deleted successfully",
      application
  });
  });

  export const postApplication = catchAsyncError(async(req,res,next)=>{
    try{
    const {role}=req.user;

    if(role==="Employer"){

      res.json({
        success:false,
        error:"Munna,you are not a Job Seeker to   apply in that!"
  });
        // return next(new ErrHandler(),404);
      }
   
if(!(req.files)||Object.keys(req.files).length===0){
  res.json({
    success:false,
    error:"Resume File Required"
});
    // return next(new ErrHandler());
}
        const {resume}=req.files;
const allowFormat=["image/png","image/jpeg","image/webp"];

if(!allowFormat.includes(resume.mimetype)){
  res.json({
    success:false,
    error:"Invalid file type.Please upload your resume in png,jpg or webp"
});
    // return next(new ErrHandler(,404));
}

 const cloudinaryResponse =await cloudinary.uploader.upload(resume.tempFilePath);

 if(!cloudinaryResponse||cloudinaryResponse.error){
    console.error("cloudinary error:",cloudinaryResponse.error||"unknown error");
    if(!allowFormat.includes(resume.mimetype)){
      res.json({
        success:false,
        error:"Failed to upload resume."
    });
    // return next(new ErrHandler(,500));
 }
}

 const {name,email,coverletter,phone,jobId} = req.body;

 const applicantID={
    user:req.user._id,
    role:"Job Seeker"
 }

 if(!jobId){
  res.json({
    success:false,
    error:"Job Not Found!"
});
    // return next(new ErrHandler,404));
 }
 const jobdetails=await Job.findById(jobId);



 if(!jobdetails){
  res.json({
    success:false,
    error:"Job Not Found!"
})
    // return next(new ErrHandler("Job not found!",404));
 }

 const employerID={
    user:jobdetails.postedBy,
    role:"Employer"
 };

 console.log(employerID);
 if(!name || !email || !coverletter ||!phone || !applicantID || !employerID){
  res.json({
    success:false,
    error:"Please fill all field!"
})
    // return next (new ErrHandler(,404))
 }

 const application=await Application.create({
    name,email,coverletter,phone,applicantID,employerID,jobId,resume:{
        public_id:cloudinaryResponse.public_id,
        url:cloudinaryResponse.secure_url,
    },
 });

 res.json({
    success:true,
    message:"Applied Successfully",
    application
 })
  }
  catch(error){
    let errorResponse = {};

    if (error.errors) {
        const firstKey = Object.keys(error.errors)[0]; 
        errorResponse[firstKey] = error.errors[firstKey].message; 
    } else {
        errorResponse['message'] = error.message;
    }
    const errorString = JSON.stringify(errorResponse);
    res.status(400).json({ mongooseError:  errorString });
  }
});
