import mongoose from "mongoose";

const connectToMongoDB = async() => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI);
    console.log("connected to mongodb");
    
  } catch (error) {
    console.log("could not connected to mongodb",error.message);
    throw error
  }
}

export default connectToMongoDB