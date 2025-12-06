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
// Flow:

// User.findOne starts (async).

// JS continues to User.create(...) immediately.

// Outer function may already create and send response.

// Later, when Mongo replies, .then() executes → tries to return res.json(...).

// But by this point, response may already be sent, so Express throws Error: Can't set headers after they are sent.

// So the return inside .then() has no power to stop step 2, because the function didn’t wait.

// ✅ Why await solves it
// const existingUser = await User.findOne({ email: req.body.email });

// if (existingUser) {
//   return res.json({ error: "Email exists" }); // exits whole signup function
// }

// const user = await User.create({...});
// res.json({ success: true, user });


// Here, await pauses execution.
// If a user exists → return exits the entire signup function → nothing after runs.

// ⚡ Key rule:

// return inside .then() → exits only that callback.

// Outer function has already continued; you can’t go back and cancel.



















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
   
}
// User.findOne({ email })

// User is your Mongoose model for the users collection in MongoDB.

// .findOne(...) sends a query to MongoDB.

// .findOne(...) returns a Promise that eventually resolves with:

// A document object if a match is found

// null if no match is found

// .then(user => { ... })

// When the promise resolves, the returned document (or null) is passed as the first argument to the callback — here, you named it user.

// The name is arbitrary; you could call it result, doc, or even potato.

// Example:

// js
// Copy
// Edit
// User.findOne({ email }).then(potato => {
//     console.log(potato); // The user document or null
// });
// So — the name user has nothing magical. The value is automatically passed by .then() when the database query finishes.
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
console.log("Comparing roles -> From Frontend:", role, "| From DB:", user.role);

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

