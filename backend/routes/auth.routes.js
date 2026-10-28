import Router from "express";
import {
<<<<<<< HEAD
  changePassword,
=======
>>>>>>> e269103bb87213ce0b97f124348183aa22fb983e
  getMe,
  login,
  logout,
  register,
<<<<<<< HEAD
  updateProfile,
=======
>>>>>>> e269103bb87213ce0b97f124348183aa22fb983e
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
<<<<<<< HEAD
route.patch("/change-password", protect, changePassword);
route.get("/profile", protect, updateProfile);
=======
>>>>>>> e269103bb87213ce0b97f124348183aa22fb983e

route.post("/google-login", googleLoginLimiter, googleLogin);
export default route;
