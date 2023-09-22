import jwt from "jsonwebtoken";
import User from "../model/user.js";
import asyncHandler from "express-async-handler";
import dotenv from "dotenv";
dotenv.config();

export const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Getting the token from the headers
      token = req.headers.authorization.split(" ")[1];

      // verifying the token and secret key
      let decode = jwt.verify(token, process.env.SECRET_KEY);

      // Get user from the Token
      req.user = await User.findById(decode.id).select("-password");
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not authorized");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized");
  }
});
