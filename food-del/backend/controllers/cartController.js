import userModel from "../models/userModel.js";

// Add or increment items in user cart
const addToCart = async (req, res) => {
  try {
    const { userId, itemId } = req.body;
    let userData = await userModel.findOne({ _id: userId });
    
    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    let cartData = userData.cartData || {};
    if (!cartData[itemId]) {
      cartData[itemId] = 1;
    } else {
      cartData[itemId] += 1;
    }

    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ 
      success: true, 
      message: "Item quantity updated", 
      itemId: itemId, 
      itemCount: cartData[itemId], 
      cartData 
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error adding to cart" });
  }
};

// Decrement items or remove from user cart
const removeFromCart = async (req, res) => {
  try {
    const { userId, itemId } = req.body;
    let userData = await userModel.findOne({ _id: userId });

    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    let cartData = userData.cartData || {};
    let itemCount = 0;

    if (cartData[itemId]) {
      if (cartData[itemId] > 1) {
        cartData[itemId] -= 1;
        itemCount = cartData[itemId];
      } else {
        delete cartData[itemId];
      }

      await userModel.findByIdAndUpdate(userId, { cartData });
      res.json({ 
        success: true, 
        message: "Item quantity updated", 
        itemId: itemId, 
        itemCount: itemCount, 
        cartData 
      });
    } else {
      res.status(404).json({ success: false, message: "Item not found in cart" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error removing from cart" });
  }
};

// Fetch user cart data
const getCart = async (req, res) => {
  try {
    const { userId } = req.body;
    let userData = await userModel.findOne({ _id: userId });

    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({ success: true, cartData: userData.cartData || {} });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error fetching cart data" });
  }
};

export { addToCart, removeFromCart, getCart };

