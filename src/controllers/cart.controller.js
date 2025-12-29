import Cart from "../models/cart.mongoose.js";

export const addToCart = async (req, res) => {
  try {
    const userId = req.user.userId;

    const { productId, quantity = 1 } = req.body;

    if (!productId) {
      return res.status(400).json({ message: "productId is required" });
    }

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({
        user: userId,
        items: []
      });
    }

    cart.items = cart.items.filter(
      item => item.product || item.productId
    );

    const existingItem = cart.items.find(item => {
      const id = item.product || item.productId;
      return id.toString() === productId;
    });

    if (existingItem) {
      existingItem.quantity += Number(quantity);
      existingItem.product = existingItem.product || existingItem.productId;
      delete existingItem.productId;
    } else {
      cart.items.push({
        product: productId,   
        quantity: Number(quantity)
      });
    }

    await cart.save();

    res.status(200).json({
      message: "Added to cart successfully",
      cart
    });
  } catch (error) {
    console.error("Add to Cart Error:", error);
    res.status(500).json({ message: "Failed to add to cart" });
  }
};



export const getCart = async (req, res) => {
  try {
    const userId = req.user.userId;

    const cart = await Cart.findOne({ user: userId });

    res.status(200).json({
      items: cart ? cart.items : []
    });
  } catch (err) {
    console.error("Get Cart Error:", err);
    res.status(500).json({ message: "Failed to fetch cart" });
  }
};

export const deleteCartItem = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { productId } = req.params;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const originalLength = cart.items.length;

    cart.items = cart.items.filter(item => {
      const id =
        item.product ||
        item.productId ||   
        null;

      if (!id) return false; 

      return id.toString() !== productId;
    });

    if (cart.items.length === originalLength) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    await cart.save();

    res.status(200).json({
      message: "Item removed from cart",
      cart
    });
  } catch (error) {
    console.error("Delete Cart Item Error:", error);
    res.status(500).json({ message: "Failed to delete item" });
  }
};







