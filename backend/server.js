import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import userRouter from "./routes/userRoutes.js";
import adminRouter from "./routes/adminRoutes.js";
import cartRouter from "./routes/cartRoutes.js";
import orderRouter from "./routes/orderRoutes.js";

// App Config
const app = express();

// DB Connection
await connectDB();

// Middlewares
const corsOptions = {
  // origin: process.env.CLIENT_URL,
  origin: [process.env.USER_CLIENT_URL, process.env.ADMIN_CLIENT_URL],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Routes
app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
