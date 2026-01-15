// backend/controllers/reviewsController.js
import Review from "../models/Review.js";
import Service from "../models/Service.js";

export const createReview = async (req, res) => {
  try {
    const { service: serviceId, name, rating, comment } = req.body;
    if (!serviceId || !rating || !name) return res.json({ success: false, error: "Missing fields" });

    const review = await Review.create({ service: serviceId, name, rating, comment });

    // Recalculate aggregated fields on service (only approved = true)
    const agg = await Review.aggregate([
      { $match: { service: review.service, approved: true } },
      { $group: { _id: "$service", avgRating: { $avg: "$rating" }, count: { $sum: 1 } } }
    ]);

    const update = agg[0]
      ? { averageRating: Number(agg[0].avgRating.toFixed(2)), reviewsCount: agg[0].count }
      : { averageRating: 0, reviewsCount: 0 };

    await Service.findByIdAndUpdate(review.service, update);

    res.json({ success: true, data: review });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
};

export const getReviewsForService = async (req, res) => {
  try {
    const reviews = await Review.find({ service: req.params.serviceId, approved: true }).sort({ createdAt: -1 });
    res.json({ success: true, data: reviews });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
};