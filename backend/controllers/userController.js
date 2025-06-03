import {catchAsyncError} from "../middlewares/catchAsyncError.js";
import ErrHandler from "../middlewares/error.js";
import { User } from "../models/userSchema.js";
import { sendToken } from "../utils/jwtToken.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
export const register =catchAsyncError(async (req,res,next)=>{
    try{
    const {name,email,phone,role,password}=req.body;
    if(!name||!email||!phone||!role||!password){
        return res.json({
            success:false,
            error:"Please fill full registration form!"
        });
    }

    User.findOne({ email })
    .then(user => {
        if (user) {
            return res.json({
                success:false,
                error:"Email Already Exists!"
            })
        } 
    });
    const user =await User.create({
     name,email,phone,role,password,
    });

    sendToken(user,200,res,"User registered successfully!");
    // res.status(200).json({
    //     success:true,
    //     message:"user registered!",
    //     user,
    // });
}

catch(error){
    let errorResponse = {};

        if (error.errors) {
            Object.keys(error.errors).forEach(field => {
                errorResponse[field] = error.errors[field].message;
            });
        } else {
            errorResponse['message'] = error.message;
        }

        // Send the error response to the client
        res.status(400).json({ mongooseError:  errorResponse });
}
});

export const login = catchAsyncError(async (req,res,next)=>{
    console.log("sdf");
    const {email,password,role}=req.body;
  console.log(email,password);
    if(!email||!password||!role){
        return res.json({
            success:false,
            error:"Please fill full registration form!"
        });
     }

    const user =await User.findOne({email});
    if(!user){
        return res.json({
            success:false,
            error:"Invalid email or password!"});
    }

    if(role!==user.role){
        return res.json({
            success:false,
            error:"user with this role not found!"});
    }
   
    const ispassord_correct =await user.comparePassword(String(password));
        if (!ispassord_correct) {
            return res.json({
                success:false,
                error:"Invalid email or password!"})
        }
   
    sendToken(user,200,res,"User login successfully!");
});

export const logout = catchAsyncError(async(req, res, next) => {
    // Set token cookie to 'none' and set its expiration to a past date
    res.cookie("token", "none", {
        expires: new Date(0), // Set expiration to a past date
        httpOnly: true,
        // domain: "job-portal-x.vercel.app", // Set domain if needed
        secure: true, // Set secure flag if needed
        sameSite: 'none', // Set sameSite attribute if needed
    });

      res.json({
        status: true,
        message: "Logout Successfully"
    });
});


export const getuser=catchAsyncError(async(req,res,next)=>{
    const us=req.user;
    console.log(req.user);
    res.json({
        success:true,
        message:"See your profile",
        us
    })
})