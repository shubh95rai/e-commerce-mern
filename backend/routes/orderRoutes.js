import express from "express";

import {
  placeOrderCOD,
  placeOrderStripe,
  placeOrderRazorpay,
  getAllOrders,
  getUserOrders,
  updateOrderStatus,
} from "../controllers/orderController.js";
import { adminAuth, userAuth } from "../middleware/authMiddleware.js";

const orderRouter = express.Router();

// Admin features
orderRouter.get("/list", adminAuth, getAllOrders);
orderRouter.post("/status", adminAuth, updateOrderStatus);

// Payment features
orderRouter.post("/place", userAuth, placeOrderCOD);
orderRouter.post("/stripe", userAuth, placeOrderStripe);
orderRouter.post("/razorpay", userAuth, placeOrderRazorpay);

// User feature
orderRouter.get("/user-orders", userAuth, getUserOrders);

export default orderRouter;
