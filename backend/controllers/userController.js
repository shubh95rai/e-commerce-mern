import validator from "validator";
import User from "../models/User.js";
import bcryptjs from "bcryptjs";
import { generateToken } from "../utils/token.js";

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const isPasswordCorrect = await bcryptjs.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    generateToken(user._id, res);

    res.status(200).json({
      success: true,
      message: "Login successful",
    });
  } catch (error) {
    console.log("Error in loginUser controller:", error.message);

    res.status(500).json({ success: false, message: "Server error" });
  }
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (name.length < 3) {
      return res.status(400).json({
        success: false,
        message: "Name must be at least 3 characters long",
      });
    }

    // validate email
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Please enter a valid email" });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters long",
      });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    generateToken(user._id, res);

    res
      .status(201)
      .json({ success: true, message: "User created successfully" });
  } catch (error) {
    console.log("Error in registerUser controller:", error.message);

    res.status(500).json({ success: false, message: "Server error" });
  }
};

const adminLogin = async (req, res) => {};

export { loginUser, registerUser, adminLogin };
