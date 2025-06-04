import express from "express";
import dotenv from "dotenv"
import authRoutes from "./routes/auth.route.js"
import connetToMongoDB from "./db/connectToMongoDB.js";
import messageRoutes from "./routes/message.route.js";
import cookieParser from "cookie-parser";
import userRoute from "./routes/user.route.js"

const app = express();
const PORT = process.env.PORT || 5000

dotenv.config();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoute);


// app.get("/", (req, res) => {
//   res.send("main route");

// })


app.listen(PORT, () => {
  connetToMongoDB();
  console.log(`server is running on port ${PORT}`)
}
)