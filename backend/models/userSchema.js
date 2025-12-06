import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please provide your name"],
        minlength:[3,"Name must contain at least 3 char"],
        maxlength:[30,"Name must contain at most 30 char"]
    },
    email:{
        type:String,
        required:[true,"Please provide your email"],
        validate:[validator.isEmail,"Please provide a valid email"]
    },
    phone:{
        type:Number,
        required:[true,"Please provide your phone no."],
    },
    password:{
        type:String,
        required:[true,"Please provide your password"],
        minlength:[8,"Password must contain at least 8 char"],
        maxlength:[32,"Password must contain at most 32 char"]
    },
    role:{
   type:String,
   required:[true,"please provide your role"],
   enum:["Job Seeker","Employer"],
},
});

userSchema.methods.comparePassword = async function (enteredPasswod){
    return await bcrypt.compare(enteredPasswod,this.password);
}
// bcrypt internally hashes enteredPassword using the same algorithm and salt used originally.

// Then it compares the result with this.password.

// Returns true if match, false otherwise.


userSchema.pre("save",async function(next){
  if(!this.isModified("password")){
    next();
  }
  this.password=await bcrypt.hash(this.password,10);
});

// Let’s say you're creating a user:
// The .pre("save", ...) middleware runs.

// It checks if the password is modified using:

// js
// Copy
// Edit
// if (!this.isModified("password"))
// This is true if you're just updating the name/email and NOT the password.

// If so, it skips hashing and directly calls next() → save to DB.

// If password is modified (for new user or password update):

// It hashes the password with bcrypt:

// js
// Copy
// Edit
// this.password = await bcrypt.hash(this.password, 10);
// Then calls next() → save to DB.







// "Before saving the user to the database, check if password was changed. If yes, hash it. If not, just continue saving."




userSchema.methods.getJWTToken = function() {
    const expiresIn = Math.floor(Date.now() / 1000) + (Number(process.env.JWT_EXPIRES) * 3600);
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, { expiresIn });
};

 const User = mongoose.model("User",userSchema);
export {User};
