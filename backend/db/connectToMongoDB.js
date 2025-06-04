import mongoose from "mongoose";

const connetToMongoDB = async() => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI)
    console.log("connected to mongodb");
    
  } catch (error) {
    console.log("could not connected to mongodb",error.message);
    
  }
}

export default connetToMongoDB