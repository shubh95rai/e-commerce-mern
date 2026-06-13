import express from "express";
import {
  addToCart,
  getUserCart,
  updateCart,
} from "../controllers/cartController.js";
import { userAuth } from "../middleware/authMiddleware.js";

const cartRouter = express.Router();

cartRouter.post("/add", userAuth, addToCart);
cartRouter.post("/update", userAuth, updateCart);
cartRouter.get("/get", userAuth, getUserCart);

export default cartRouter;
