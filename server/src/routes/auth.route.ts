import express from "express";
import { me, signIn, signUp } from "../controllers/auth.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const authRoute = express.Router();

authRoute.post("/signup", signUp);
authRoute.post("/signin", signIn);
authRoute.get("/me", authMiddleware, me);
export default authRoute;
