import express from "express";
import {
  addProduct,
  listProducts,
  singleProduct,
  removeProduct,
} from "../controllers/productController.js";
import upload from "../middleware/multer.js";
import { adminAuth } from "../middleware/authMiddleware.js";
import {
  adminLogin,
  adminLogout,
  isAdminAuth,
} from "../controllers/adminController.js";

const adminRouter = express.Router();

adminRouter.post(
  "/add",
  adminAuth,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addProduct,
);
adminRouter.post("/single", singleProduct);
adminRouter.post("/remove", adminAuth, removeProduct);
adminRouter.get("/list", listProducts);
adminRouter.post("/login", adminLogin);
adminRouter.post("/logout", adminLogout);
adminRouter.get("/is-auth", adminAuth, isAdminAuth);

export default adminRouter;
