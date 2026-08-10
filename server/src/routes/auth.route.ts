import express from "express";
import { me, signIn, signUp, submitKyc } from "../controllers/auth.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { kycUpload } from "../middleware/kycUpload";

const authRoute = express.Router();

authRoute.post("/signup", signUp);
authRoute.post("/signin", signIn);
authRoute.get("/me", authMiddleware, me);
authRoute.post(
  "/submitkyc",
  authMiddleware,
  kycUpload.fields([
    {
      name: "identity_document",
      maxCount: 1,
    },
    {
      name: "selfie",
      maxCount: 1,
    },
  ]),
  submitKyc,
);
export default authRoute;
