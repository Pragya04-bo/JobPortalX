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

userSchema.pre("save",async function(next){
  if(!this.isModified("password")){
    next();
  }
  this.password=await bcrypt.hash(this.password,10);
});


userSchema.methods.getJWTToken = function() {
    const expiresIn = Math.floor(Date.now() / 1000) + (Number(process.env.JWT_EXPIRES) * 3600);
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, { expiresIn });
};

 const User = mongoose.model("User",userSchema);
export {User};
