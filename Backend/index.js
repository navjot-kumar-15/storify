import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDb } from "./config/db.js";
import authRouter from "./routes/auth.js";
import personRouter from "./routes/person.js";
dotenv.config();
const app = express();
connectDb();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});
app.use("/auth", authRouter);
app.use("/person", personRouter);

app.listen(PORT, () => {
  console.log(`server is connected on ${PORT}`);
});
