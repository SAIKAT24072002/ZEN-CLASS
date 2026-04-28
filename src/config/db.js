import mongoose from "mongoose";


export const connectDB = async()=>{
    try {
        await mongoose.connect("mongodb://localhost:27017/zenClass");
        console.log("Database Connected");
    } catch (error) {
        console.log("Database connnection Error", error);; 
    }
}