import Router from "express";
import {
  changePassword,
  getMe,
  login,
  logout,
  register,
  updateProfile,
} from "../controllers/auth.controller.js";
import { protect } from "../middlewares/auth.midlleware.js";
import googleLogin from "../controllers/googleLogin.js";
import {
  registerLimiter,
  loginLimiter,
  googleLoginLimiter,
} from "../middlewares/rateLimit.middleware.js";
const route = Router();

route.post("/register", registerLimiter, register);
route.post("/login", loginLimiter, login);
route.get("/me", protect, getMe);
route.post("/logout", logout);
route.patch("/change-password", protect, changePassword);
route.get("/profile", protect, updateProfile);

route.post("/google-login", googleLoginLimiter, googleLogin);
export default route;
