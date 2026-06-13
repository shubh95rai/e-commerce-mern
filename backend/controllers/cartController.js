import User from "../models/User.js";

const addToCart = async (req, res) => {
  try {
    const { userId } = req.user;
    const { itemId, size } = req.body;

    if (!size) {
      return res.status(400).json({
        success: false,
        message: "Please select size",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid user",
      });
    }

    let cartData = user.cartData;

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    await User.findByIdAndUpdate(userId, { cartData });

    res.status(200).json({
      success: true,
      message: "Product added to cart",
    });
  } catch (error) {
    console.log("Error in addToCart controller:", error.message);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const updateCart = async (req, res) => {
  try {
    const { userId } = req.user;
    const { itemId, size, quantity } = req.body;

    const user = await User.findById(userId);

    let cartData = user.cartData;

    cartData[itemId][size] = quantity;

    await User.findByIdAndUpdate(userId, { cartData });

    res.status(200).json({
      success: true,
      message: "Cart updated",
    });
  } catch (error) {
    console.log("Error in updateCart controller:", error.message);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const getUserCart = async (req, res) => {
  try {
    const { userId } = req.user;

    const user = await User.findById(userId);

    res.status(200).json({
      success: true,
      cartData: user.cartData,
    });
  } catch (error) {
    console.log("Error in getUserCart controller:", error.message);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export { addToCart, updateCart, getUserCart };
