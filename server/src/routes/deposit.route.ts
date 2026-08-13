import express from "express";
import { deposit, paymentMethod } from "../controllers/deposit.controller";

const depositRoute = express.Router();

depositRoute.get("/", paymentMethod);
depositRoute.post("/", deposit);

export default depositRoute;
