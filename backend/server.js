import express from "express";
import dotenv from "dotenv"
import authRoutes from "./routes/auth.route.js"
import connetToMongoDB from "./db/connectToMongoDB.js";
import messageRoutes from "./routes/message.route.js";
import cookieParser from "cookie-parser";
import userRoute from "./routes/user.route.js";
import cors from "cors";
import helmet from "helmet";


const app = express();
const PORT = process.env.PORT || 5000

dotenv.config();

app.use(helmet());

app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:3000",
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"]
}))

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoute);

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" })
})

app.listen(PORT, async () => {
  try {
    await connetToMongoDB();
    console.log(`server is running on port ${PORT}`);
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
}
)