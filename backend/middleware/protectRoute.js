import jwt from "jsonwebtoken"
import User from "../models/user.model.js";

const protectedRoute = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "Unauthorized - No token provided" })
    }

    let decoded;

    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({ error: "Unauthorized - Token expired" });
      }
      return res.status(401).json({ error: "Unauthorized - Invalid token" });
    }

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" })
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Error in protect route middleware:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
}

export default protectedRoute;