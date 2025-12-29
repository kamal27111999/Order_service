import Order from "../models/order.model.js";
import axios from "axios";

export const placeOrder = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { productId, quantity, price, sellerId, deliveryAddress } = req.body;

    if (!productId || !quantity || !price || !sellerId) {
      return res.status(400).json({ message: "Missing order fields" });
    }

    // 1️⃣ Reduce stock in Seller Service
    await axios.patch(
      `${process.env.SELLER_SERVICE_URL}/api/products/${productId}/quantity`,
      { quantityChange: -quantity },
      {
        headers: {
          Authorization: `Bearer ${process.env.INTERNAL_SELLER_TOKEN}`,
        },
      }
    );

    // 2️⃣ Create order in MongoDB
    const order = await Order.create({
      userId,
      sellerId,
      productId,
      quantity,
      priceAtPurchase: price,
      deliveryAddress,
    });

    return res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    console.error("Order Error:", error.message);
    return res.status(500).json({
      message: "Order placement failed",
      error: error.message,
    });
  }
};
