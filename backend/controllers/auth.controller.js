import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";
import jwt from "jsonwebtoken";


// REGISTER_ROUTE
export const register = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;

    if (!fullName || !username || !password || !confirmPassword || !gender) {
      return res.status(400).json({ error: "All fields are required" })
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "password and confirm password dont match" });
    }

    if(password.length < 6){
      return res.status(400).json({error: "Password must be at least 6 characters"});
    }

    const user = await User.findOne({ username })

    if (user) {
      return res.status(400).json({ error: "username already exists" })
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const boyProfilePicture = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePicture = `https://avatar.iran.liara.run/public/girl/?username=${username}`;

    const newUser = new User({
      fullName,
      username,
      password: hashedPassword,
      gender,
      profilePicture: gender === "male" ? boyProfilePicture : girlProfilePicture,
    })

    await newUser.save();

    res.status(201).json({
      message: "Registeration successfull",
      user:{
        _id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.username,
        profilePicture: newUser.profilePicture,
      }
    })

  } catch (error) {
    console.log("error in register controller", error.message);
    res.status(500).json({ error: "internal server error" })
  }
}

// LOGIN_ROUTE
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: "Username and password are required" });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters" })
    }

    const user = await User.findOne({
      username: { $regex: new RegExp(`^${username}$`, 'i') }
    });

    if (!user) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    if(user.lockUntil && user.lockUntil > Date.now()){
      const remainingTime = Math.ceil((user.lockUntil - Date.now()) / 1000 / 60);
      return res.status(423).json({
        error: `Account temporarily locked. Try again in ${remainingTime} minutes.`
      })
    }

    const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

    if (!isPasswordCorrect) {
      user.loginAttempts = (user.loginAttempts || 0) + 1;

      if(user.loginAttempts >= 5){
        user.lockUntil = new Date(Date.now() + 15 * 60 * 1000);
      }
      await user.save();
      return res.status(400).json({ error: "Invalid username or password" });
    }

    user.loginAttempts = 0;
    user.lockUntil = undefined;
    user.lastLogin = new Date();

    const { accessToken, refreshToken } = generateTokenAndSetCookie(user._id, res);

    user.refreshToken = refreshToken;

    await user.save();

    res.status(200).json({
      message: "Login succssful",
      user: {
        _id: user._id,
        fullName: user.fullName,
        username: user.username,
        profilePicture: user.profilePicture,
      },
      accessToken
    })

  } catch (error) {
    console.log("error in login controller", error.message);
    res.status(500).json({ error: "internal server error" });
  }
}

// REFREH_TOKEN_ROUTE
export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({ error: "unauthorized - no refresh token" })
    }

    let decoded;
    try {
      decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({ error: "Unauthorized - Refresh token expired" });
      }
      return res.status(401).json({ error: "Unauthorized - Invalid refresh token" });
    }

    const user = await User.findById(decoded.userId);
    if (!user || user.refreshToken !== refreshToken) {
      return res.status(401).json({ error: "Unauthorized - Invalid refresh token" });
    }

    const { accessToken, refreshToken: newRefreshToken } = generateTokenAndSetCookie(user._id, res);
    user.refreshToken = newRefreshToken;
    await user.save();

    res.status(200).json({ message: "Token refreshed successful", accessToken, refreshToken: newRefreshToken })
  } catch (error) {
    console.log("error in refresh token controller", error.message);
    res.status(500).json({ error: "internal server error" });
  }
}

// VERIFY_TOKEN_ROUTE
export const verifyToken = async (req, res) => {
  try {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
      return res.status(401).json({ isAuthenticated: false, message: "No access token provided" });
    }

    let decoded;

    try {
      decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
    } catch (error) {
      return res.status(401).json({
        isAuthenticated: false,
        message: "Invalid or expired token"
      })
    }

    const user = await User.findById(decoded.userId).select("-password -refreshToken");
    if (!user) {
      return res.status(401).json({ isAuthenticated: false, message: "User not found" });
    }
    return res.status(200).json({
      isAuthenticated: true, user: {
        _id: user._id,
        username: user.username,
        fullName: user.fullName,
        profilePicture: user.profilePicture,
      }
    });
  } catch (error) {
    res.status(401).json({ isAuthenticated: false, message: "Internal server error" });
  }
}


// LOGOUT_ROUTE
export const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (refreshToken) {
      await User.updateOne(
        { refreshToken },
        { $unset: { refreshToken: 1 } }
      )
    }

    res.clearCookie("accessToken", {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production"
    })

    res.status(200).json({
      message: "Logged out successful"
    })
  } catch (error) {
    console.log("Error in logout controller:", error.message);
    res.status(500).json({ error: "Internal server error" })
  }
}