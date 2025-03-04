import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()
const connectDB=async()=>{
    try{
        mongoose.connect(process.env.MONGO_URI)
        console.log("db connected")
    }
    catch(err)
    {
        console.log(err,"connection refused")
    }
}
export default connectDB