import Order from "../models/Order.js";
import User from "../models/User.js";

// Place order with COD
const placeOrderCOD = async (req, res) => {
  try {
    const { userId } = req.user;
    const { items, amount, address } = req.body;

    if (!items || !amount || !address) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the fields",
      });
    }

    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "COD",
    };

    const newOrder = await Order.create(orderData);

    await User.findByIdAndUpdate(userId, { cartData: {} });

    res.status(200).json({
      success: true,
      message: "Order placed successfully",
    });
  } catch (error) {
    console.log("Error in placeOrderCOD controller:", error.message);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Place order with stripe
const placeOrderStripe = async (req, res) => {};

// Place order with razorpay
const placeOrderRazorpay = async (req, res) => {};

// Get all orders for admin panel
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.log("Error in getAllOrders controller:", error.message);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Get all orders of a user
const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.user;

    const orders = await Order.find({ userId });

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.log("Error in getUserOrders controller:", error.message);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Update order status from admin panel
const updateOrderStatus = async (req, res) => {};

export {
  placeOrderCOD,
  placeOrderStripe,
  placeOrderRazorpay,
  getAllOrders,
  getUserOrders,
  updateOrderStatus,
};
