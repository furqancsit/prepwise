import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.routes.js"
import cookieParser from "cookie-parser";
import { globalLimiter } from "./middlewares/rateLimit.middleware.js";
import interviewRoutes from "./routes/interview.routes.js";
import interviewRoomRoutes from "./routes/session.route.js";

dotenv.config();




const app = express();
const PORT = process.env.PORT || 5000;
app.use(globalLimiter); 

app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/interview", interviewRoutes)
app.use("/api/v1/interview/room", interviewRoomRoutes)

connectDB();
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Server is running",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

