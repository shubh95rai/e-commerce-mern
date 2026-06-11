import express from "express";
import {
  isUserAuth,
  loginUser,
  registerUser,
} from "../controllers/userController.js";
import { userAuth } from "../middleware/authMiddleware.js";

const userRouter = express.Router();

userRouter.post("/login", loginUser);
userRouter.post("/register", registerUser);
userRouter.post("/is-auth", userAuth, isUserAuth);

export default userRouter;
