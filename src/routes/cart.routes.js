import express from "express";
import { addToCart, deleteCartItem, getCart } from "../controllers/cart.controller.js";
import { protectUser } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/add", protectUser, addToCart);

router.get("/", protectUser, getCart);

router.delete("/item/:productId", protectUser, deleteCartItem);

export default router;
