import express from "express";
import { placeOrder } from "../controllers/order.controller.js";
import { protectUser } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", protectUser, placeOrder);

export default router;
