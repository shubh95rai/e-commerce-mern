import jwt from "jsonwebtoken";
import User from "../models/User.js";

const verifyToken = (cookieName, requiredRole = null) => {
  return async (req, res, next) => {
    try {
      const token = req.cookies[cookieName];

      if (!token) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
      }

      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

      if (requiredRole && decodedToken.role !== requiredRole) {
        return res.status(403).json({
          success: false,
          message: "Forbidden",
        });
      }

      if (requiredRole === "user") {
        const user = await User.exists({
          _id: decodedToken.userId,
        });

        if (!user) {
          return res.status(401).json({
            success: false,
            message: "Unauthorized",
          });
        }
      }

      req.user = decodedToken;
      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }
  };
};

export const userAuth = verifyToken("userToken", "user");
export const adminAuth = verifyToken("adminToken", "admin");
