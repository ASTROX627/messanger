import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
    maxLengrh: 100
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3, 
    maxLengrh: 30,
    match: /^[a-zA-Z0-9_]+$/
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  gender: {
    type: String,
    required: true,
    enum: ["male", "female"]
  },
  profilePicture: {
    type: String,
    default: ""
  },
  refreshToken: {
    type: String,
    default: ""
  },
  loginAttempts:{
    type: Number,
    default: 0
  },
  lockUntil:{
    type: Date
  },
  lastLogin:{
    type: Date
  }
}, {timestamps: true});

const User = mongoose.model("User", userSchema);

export default User;