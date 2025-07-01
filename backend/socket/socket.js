import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();


const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST"]
  }
});

const userSocketMap = {}

const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);
  const userId = socket.handshake.query.userId;

  if (userId && userId !== "undefind") {
    userSocketMap[userId] = socket.id;
    console.log(`User ${userId} mapped to socket ${socket.id}`);
    
  }

  io.emit("getOnlineUsers", Object.keys(userSocketMap));
  socket.on("disconnected", () => {
    console.log("user disconnected", socket.id);
    for(const [id, socketId] of Object.entries(userSocketMap)){
      if(socketId === socket.id){
        delete userSocketMap[id];
        break
      }
    }
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  })
})

export { app, server, io, getReceiverSocketId };