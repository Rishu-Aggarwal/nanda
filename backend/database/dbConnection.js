import mongoose from "mongoose";
const connection=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log("database connected successfully...");
    }catch(error){
        console.log(`database error ${error}`)
    }
}
export default connection;