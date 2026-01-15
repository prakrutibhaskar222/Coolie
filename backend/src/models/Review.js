// backend/models/Review.js
import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema(
  {
    service: { type: mongoose.Schema.Types.ObjectId, ref: "Service", required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false }, // optional if you use auth
    name: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, default: "" },
    approved: { type: Boolean, default: true } // admin moderation
  },
  { timestamps: true }
);

ReviewSchema.index({ service: 1, rating: -1 });

export default mongoose.model("Review", ReviewSchema);