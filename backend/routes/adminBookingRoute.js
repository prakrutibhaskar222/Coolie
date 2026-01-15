import express from "express";
import {
  assignWorker,
  markPayment,
  updateBookingStatus,
} from "../src/controllers/adminBookingController.js";
import { protect, allowRoles } from "../src/middleware/authMiddleware.js";

const router = express.Router();

/* 🔐 ADMIN ONLY */
router.use(protect);
router.use(allowRoles("admin"));

router.put(
  "/bookings/:id/assign",
  assignWorker
);
router.patch("/:id/payment", markPayment);
router.patch("/:id/status", updateBookingStatus);

export default router;
