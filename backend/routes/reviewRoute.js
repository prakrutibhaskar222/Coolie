// backend/routes/reviewRoute.js
import express from "express";
import {
  createReview,
  getReviewsForService
} from "../src/controllers/reviewsController.js";
import { protect } from "../src/middleware/authMiddleware.js";

const router = express.Router();

/* 🔐 Logged-in users only */
router.post("/create", createReview);

/* 🌍 Public */
router.get("/service/:serviceId", getReviewsForService);

export default router;