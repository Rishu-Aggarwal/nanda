import express from "express";
import isAuth from "../middlewares/auth.js";
import {
  create,
  deleteAll,
  getAll,
  update,
} from "../controllers/reviewController.js";
import isAdmin from "../middlewares/admin.js";
export const reviewRouter = express.Router();
reviewRouter.post("/create/:product_id", isAuth, create);
reviewRouter.put("/update/:product_id", isAuth, update);
reviewRouter.delete("/delete-all/:product_id", isAuth, isAdmin, deleteAll);
reviewRouter.get("/get-all/:product_id", getAll);
