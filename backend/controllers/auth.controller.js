import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";
import jwt from "jsonwebtoken"

export const register = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;

    if (!fullName || !username || !password || !confirmPassword || !gender) {
      return res.status(400).json({ error: "All fields are required" })
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "password and confirm password dont match" });
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
      _id: newUser._id,
      fullName: newUser.fullName,
      username: newUser.username,
      profilePicture: newUser.profilePicture,
    })

  } catch (error) {
    console.log("error in register controller", error.message);
    res.status(500).json({ error: "internal server error" })
  }
}

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(400).json({ error: "Username and password are required" });
    }

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

    if (!isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    const { accessToken, refreshToken } = generateTokenAndSetCookie(user._id, res);

    user.refreshToken = refreshToken;

    await user.save();

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      profilePicture: user.profilePicture,
      accessToken
    })

  } catch (error) {
    console.log("error in login controller", error.message);
    res.status(500).json({ error: "internal server error" });
  }
}

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

    res.status(200).json({ accessToken, refreshToken: newRefreshToken })
  } catch (error) {
    console.log("error in refresh token controller", error.message);
    res.status(500).json({ error: "internal server error" });
  }
}

export const verifyToken = async (req, res) => {
  try {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
      return res.status(401).json({ isAuthenticated: false });
    }

    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(401).json({ isAuthenticated: false });
    }
    return res.status(200).json({ isAuthenticated: true, user:{
      _id: user._id,
      username: user.username,
      fullName: user.fullName,
      profilePicture: user.profilePicture,
    } });
  } catch (error) {
    res.status(401).json({ isAuthenticated: false });
  }
}


export const logout = async (req, res) => {
  try {
    const user = await User.findById(req.user?._id);
    if (user) {
      user.refreshToken = "";
      await user.save();
    }
    res.cookie("refreshToken", "", { maxAge: 0 });
    res.cookie("accessToken", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" })
  } catch (error) {
    console.log("Error in logout controller:", error.message);
    res.status(500).json({ error: "Internal server error" })
  }
}