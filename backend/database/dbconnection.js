import dotenv from "dotenv";
dotenv.config({ path: "./config/config.env" });
import mongoose from "mongoose";

export const dbConnect = () => {
  mongoose.connect(process.env.MONGO_URL, {
    dbName: "test", // 👈 VERY IMPORTANT: This matches your Atlas database
  }).then(() => {
    console.log("db Connected");
  }).catch((err) => {
    console.log(`munna err aa gya ${err}`);
  });
};
