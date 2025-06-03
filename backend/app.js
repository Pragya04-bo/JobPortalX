import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import jobrouter from "./routes/jobrouter.js";
import applicationrouter from "./routes/applicationrouter.js";
import userrouter from "./routes/userrouter.js";
import { dbConnect } from "./database/dbconnection.js";
import { middleware as errorMiddleware } from "./middlewares/error.js";

const  app = express();
app.use(express.json());
dotenv.config({path:"./config/config.env"});

app.use(
    cors({
        origin:["https://job-seeking-three.vercel.app","https://job-seeking-7.onrender.com","http://localhost:3000","https://job-portal-x.vercel.app"],
        methods:["GET","POST","DELETE","PUT"],
        credentials:true,
    })
);

app.use(cookieParser());
app.use(express.urlencoded({extended:true}));

app.use(
fileUpload({
    useTempFiles:true,
    tempFileDir:"/tmp/",
})
    );


    app.use("/user",userrouter);
    app.use("/job",jobrouter);
    app.use("/applications",applicationrouter);
app.get("/", (req, res) => {
  res.send("API is working ✅");
});

    dbConnect();

  app.use(errorMiddleware); // 👈 correct error handler middleware
export default app;