import { catchAsyncError } from "../middlewares/catchAsyncError.js";
// import ErrHandler from "../middlewares/error.js";
import ErrHandler from "../middlewares/error.js";
import { Job } from "../models/jobschema.js";

export const getalljobs =catchAsyncError(async(req,res,next)=>{
    const jobs=await Job.find({expired:false});
    res.json({
        status:true,
        jobs,
    });
});

export const  postjob=catchAsyncError(async(req,res,next)=>{
    try{
    const {role}=req.user;
    if(role==="Job Seeker"){
        res.json({
            success:false,
            error:"Munna, your role is to view jobs, not to post them!",
        })
    }

    const {title,description,category,country,city,location,fixedSalary,salaryFrom,salaryTo,expried,jobPostedOn}=req.body;

    if(!title||!description||!category||!country||!city||!location){
       res.json({
        success:false,
        error:"Fill all required fields",
       })    
    }

    if((!salaryFrom||!salaryTo)&&!fixedSalary){
       res.json({
        success:false,
        error:"Can't post without salary",
       })    
    }

    if(salaryFrom&&salaryTo&&fixedSalary){
        res.json({
            success:false,
            error:"Can't post with both salary and fixed salary",
        })    
    }

    const postedBy=req.user._id;

   const job= await Job.create({title,description,category,country,city,location,fixedSalary,salaryFrom,salaryTo,expried,jobPostedOn,postedBy});

   res.status(200).json({
    success:true,
    message:"job posted",
    job
   });
}
catch(error){
    let errorResponse = {};

    if (error.errors) {
        const firstKey = Object.keys(error.errors)[0]; // Get the first key
        errorResponse[firstKey] = error.errors[firstKey].message; // Save only the message corresponding to the first key
    } else {
        errorResponse['message'] = error.message;
    }
    
    // Convert the errorResponse object to a string
    const errorString = JSON.stringify(errorResponse);
    
    // Send the error string as the response to the client


    // Send the error response to the client
    res.status(400).json({ mongooseError:  errorString });
}
});

export const getmyjob=catchAsyncError(async(req,res,next)=>{
    const {role}=req.user;
    if(role==="Job Seeker"){
       res.json({
           success:false,
           error:"Munna, your role is to view jobs, not to post them!",
       })   
    }

    
    const myjobs=await Job.find({postedBy:req.user._id});
    res.status(200).json({
        success:true,
        message:"your created jobs are:",
        myjobs
    });
});


export const updateJob=catchAsyncError(async (req,res,next)=>{
    const {role}=req.user;
    if(role==="Job Seeker"){
        return next (new ErrHandler("Munna, your role is to view jobs, not to update them!"),400);
    }

    const {id}=req.params;
    let job = await Job.findById(id);
    if(!job){ 
      return next(new ErrHandler("Job not found",404));
    }
    job=await Job.findByIdAndUpdate(id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    });
    res.status(200).json({
        success:true,
        message:"successfully updated",
        job,
    });
});
export const deletethejob=catchAsyncError(async(req,res,next)=>{
    const {role}=req.user;
    if(role==="Job Seeker"){
        
        return next (new ErrHandler("Munna, your role is to view jobs, not to delete them!"),400);
    }

    const {id}=req.params;
    let job = await Job.findById(id);
    if(!job){ 
      return next(new ErrHandler("Job not found",404));
    }
    await job.deleteOne();
    res.status(200).json({
        success:true,
        message:"successfully deleted",
        job,
    });

});

export const getSingleJob = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    try {
      const job = await Job.findById(id);
      if (!job) {
        return next(new ErrHandler("Job not found.", 404));
      }
      res.status(200).json({
        success: true,
        job,
      });
    } catch (error) {
      return next(new ErrHandler(`Invalid ID / CastError`, 404));
    }
  });