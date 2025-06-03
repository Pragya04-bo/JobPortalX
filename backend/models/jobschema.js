import mongoose, { mongo } from "mongoose";

const jobSchema = mongoose.Schema({
    title:{
        type:String,
        requried:[true,"Please provide job title"],
        minLength:[3,"Job title must contain atleast 3 characters!"],
        maxLength:[50,"Job title can't contain exceed 50 characters!"],
    }
    ,description:{
        type:String,
        requried:[true,"Please provide job description"],
        minLength:[50,"Job title must contain atleast 50 characters!"],
        maxLength:[350,"Job title can't contain exceed 350 characters!"],
    },
    category:{
        type:String,
        required:[true,"Job category is required!"]
    },
    country:{
        type:String,
        required:[true,"Job country is required!"]
    },
    city:{
        type:String,
        required:[true,"Job city is required!"]
    },
    location:{
        type:String,
        required:[true,"Exact location is required!"]
    },
    fixedSalary:{
        type:Number,
        minLength:[4,"Fixed salary must contain atleast 4 digits!"],
        maxLength:[9,"Fixed salary can't exceed 9 digits!"]
    },
    salaryFrom:{
        type:Number,
        minLength:[4,"Salary from must contain atleast 4 digits!"],
        maxLength:[9,"Salary from can't exceed 9 digits!"]
    },
    salaryTo:{
        type:Number,
        minLength:[4,"Salary to must contain atleast 4 digits!"],
        maxLength:[9,"Salary to can't exceed 9 digits!"]
    },
    expired:{
        type:Boolean,
        default:false
    },
    jobPostedOn:{
        type:Date,
        default:Date.now,
    },
    postedBy:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true
    },
});

export const Job=mongoose.model("Job",jobSchema);