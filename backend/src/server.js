import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import "./jobs/bookingReminderJob.js";
dotenv.config();

// ROUTES
import authRoutes from "../routes/authRoute.js";
import adminRoutes from "../routes/admin.js";
import serviceRoute from "../routes/serviceRoute.js";
import bookingRoute from "../routes/bookingRoute.js";
import categoryRoute from "../routes/categoryRoute.js";
import reviewRoute from "../routes/reviewRoute.js";
import workerRoute from "../routes/workerRoutes.js";
import calendarRoute from "../routes/calendarRoute.js";
import profileRoute from "../routes/profileRoute.js";
import userRoutes from "../routes/userRoute.js";
import favoritesRoute from "../routes/favoritesRoute.js";
import notificationRoute from "../routes/notificationRoute.js";
import adminBookingRoute from "../routes/adminBookingRoute.js";


const app = express();

app.use(express.json());
app.use(cors({ origin: ["http://localhost:5173", "http://localhost:5174", "http://localhost:5175"], credentials: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/services", serviceRoute);
app.use("/api/bookings", bookingRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/reviews", reviewRoute);
app.use("/api/workers", workerRoute);
app.use("/api/calendar", calendarRoute);
app.use("/api/profile", profileRoute);
app.use("/api/users", userRoutes);
app.use("/api/user/favorites", favoritesRoute);
app.use("/api/notifications", notificationRoute);
app.use("/api", adminBookingRoute);


// Health check
app.get("/", (req, res) => res.send("API is running..."));

// Start server
connectDB().then(() => {
  const PORT = process.env.PORT || 5001;
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
});
