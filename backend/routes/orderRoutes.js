import express from "express";

import {
  placeOrderCOD,
  placeOrderStripe,
  getAllOrders,
  getUserOrders,
  updateOrderStatus,
  verifyStripe,
} from "../controllers/orderController.js";
import { adminAuth, userAuth } from "../middleware/authMiddleware.js";

const orderRouter = express.Router();

// Admin features
orderRouter.get("/list", adminAuth, getAllOrders);
orderRouter.post("/status", adminAuth, updateOrderStatus);

// Payment features
orderRouter.post("/place", userAuth, placeOrderCOD);
orderRouter.post("/stripe", userAuth, placeOrderStripe);

// User feature
orderRouter.get("/user-orders", userAuth, getUserOrders);

// Verify stripe
orderRouter.post("/verify-stripe", userAuth, verifyStripe);

export default orderRouter;
