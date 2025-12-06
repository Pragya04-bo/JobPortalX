import { v2 as cloudinary } from "cloudinary";
import app from "./app.js";
import dotenv from "dotenv";

// ✅ Load environment variables early
dotenv.config({ path: "./backend/config/config.env" });

// ✅ Log to confirm environment variables are loaded
console.log("CLOUD_NAME:", process.env.CLOUDINARY_Cloud_name);
console.log("API_KEY:", process.env.CLOUDINARY_API_KEY);
console.log("API_SECRET:", process.env.CLOUDINARY_API_SECRET ? "Loaded" : "Missing");

// ✅ Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_Cloud_name,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ✅ Start the server
app.listen(process.env.PORT, () => {
  console.log(`server running on port http://localhost:${process.env.PORT}`);
});
