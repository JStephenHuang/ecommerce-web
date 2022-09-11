import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import { router as userRouter } from "./routes/user";
import { router as authRouter } from "./routes/auth";
import { router as articleRouter } from "./routes/article";
import { router as cartRouter } from "./routes/cart";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());

const uri = process.env.MONGO_URI as string;
mongoose.connect(uri);

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/article", articleRouter);
app.use("/cart", cartRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
