import { clearTokenCookie, generateAdminToken } from "../utils/token.js";

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    generateAdminToken(res);

    res.status(200).json({
      success: true,
      message: "Admin login successful",
    });
  } catch (error) {
    console.log("Error in adminLogin controller:", error.message);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const adminLogout = async (req, res) => {
  try {
    clearTokenCookie(res, "adminToken");

    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.log("Error in adminLogout controller:", error.message);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const isAdminAuth = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.log("Error in isAdminAuth controller:", error.message);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export { adminLogin, isAdminAuth, adminLogout };
