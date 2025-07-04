import express from "express";
import { login, logout, refreshToken, register, verifyToken } from "../controllers/auth.controller.js";


const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.post("/logout", logout);

router.post("/refresh", refreshToken);

router.get("/verify", verifyToken);

export default router