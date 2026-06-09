import jwt from "jsonwebtoken";

const verifyToken = (cookieName, requiredRole = null) => {
  return (req, res, next) => {
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
