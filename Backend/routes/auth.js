import express from "express";
import { createUser, loginUser } from "../controllers/auth.js";
import User from "../model/user.js";
import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
const router = express.Router();

router.post("/forgot", (req, res) => {
  const { email } = req.body;
  User.findOne({ email }).then((user) => {
    if (!user) {
      return res.send({ Status: "User not existed" });
    }
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });
    var transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      secure: true,
      requireTLS: true,
      service: "gmail",
      port: 8080,
      auth: {
        user: process.env.MY_EMAIL,
        pass: process.env.MY_PASSWORD,
      },
    });

    var mailOptions = {
      from: process.env.MY_EMAIL,
      to: email,
      subject: "Reset Password Link",
      text: `http://localhost:8080/reset_password/${user._id}/${token}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        return res.send({ Status: "Success" });
      }
    });
  });
});

router.post("/register", createUser);
router.post("/login", loginUser);
// router.get("/forgot", (req, res) => {
//   console.log(process.env.MY_PASSWORD);
// });

export default router;
