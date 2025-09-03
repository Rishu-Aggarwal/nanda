import express, { urlencoded } from "express";
import { config } from "dotenv";
import morgan from "morgan";
import cors from "cors";
import connection from "./database/dbConnection.js";
import { userRouter } from "./routes/userRouter.js";
import cloudinary from "cloudinary";
import { categoryRouter } from "./routes/categoryRouter.js";
import { productRouter } from "./routes/productRouter.js";
import { reviewRouter } from "./routes/reviewRouter.js";
import { addressRouter } from "./routes/addressRouter.js";
import { sliderRouter } from "./routes/sliderRoutes.js";
const app = express();
config({ path: "./config.env" });
app.use(cors({
  origin: process.env.FRONTEND_URL,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
  allowedHeaders: ["Content-Type"],
}));
connection();
app.use(express.json());
app.use(morgan("dev"));
app.use(urlencoded({ extended: true }));
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
  secure: true,
});
app.use(`${process.env.START_ROUTE}/user`, userRouter);
app.use(`${process.env.START_ROUTE}/category`, categoryRouter);
app.use(`${process.env.START_ROUTE}/product`, productRouter);
app.use(`${process.env.START_ROUTE}/product/review`, reviewRouter);
app.use(`${process.env.START_ROUTE}/user/address`, addressRouter);
app.use(`${process.env.START_ROUTE}/slider`,sliderRouter);
export default app;
