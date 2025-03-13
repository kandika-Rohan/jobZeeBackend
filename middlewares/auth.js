import { User } from "../models/userSchema.js";
import { catchAsyncErrors } from "./catchAsyncError.js";
import ErrorHandler from "./error.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  console.log("Cookies received in request:", req.cookies); // Log received cookies
  const token = req.cookies?.token;

  if (!token) {
    console.log("No token found in cookies!");
    return next(new ErrorHandler("User Not Authorized", 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    console.log("JWT Verification failed:", error.message);
    return next(new ErrorHandler("Invalid Token", 401));
  }
});

