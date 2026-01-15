import React, { useState } from "react";

export default function Reviews({ serviceId, reviews = [], onNewReview }) {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API =
    import.meta.env.VITE_API_URL || "http://localhost:5001";

  const submitReview = async (e) => {
    e.preventDefault();
    setError("");

    if (!name || !comment) {
      setError("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        `${API}/api/reviews/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            service: serviceId,
            name,
            rating,
            comment,
          }),
        }
      );

      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.message || "Failed to submit review");
      }

      onNewReview?.(json.data);

      setName("");
      setRating(5);
      setComment("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginTop: "32px" }}>
      {/* REVIEW FORM */}
      <form
        onSubmit={submitReview}
        style={{
          border: "2px solid #2563eb",
          padding: "16px",
          borderRadius: "8px",
          marginBottom: "24px",
          background: "#eff6ff",
        }}
      >
        <h3 style={{ fontWeight: "bold", marginBottom: "12px" }}>
          Add a Review
        </h3>

        {error && (
          <p style={{ color: "red", marginBottom: "8px" }}>
            {error}
          </p>
        )}

        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ width: "100%", padding: "8px", marginBottom: "8px" }}
        />

        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          style={{ width: "100%", padding: "8px", marginBottom: "8px" }}
        >
          {[5, 4, 3, 2, 1].map((r) => (
            <option key={r} value={r}>
              {r} Stars
            </option>
          ))}
        </select>

        <textarea
          placeholder="Your review"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          style={{
            width: "100%",
            padding: "8px",
            marginBottom: "8px",
          }}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "8px 16px",
            background: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          {loading ? "Submitting..." : "Submit Review"}
        </button>
      </form>

      {/* REVIEW LIST */}
      <div>
        <h3 style={{ fontWeight: "bold", marginBottom: "12px" }}>
          Reviews ({reviews.length})
        </h3>

        {reviews.length === 0 && (
          <p>No reviews yet.</p>
        )}

        {reviews.map((r, i) => (
          <div
            key={i}
            style={{
              border: "1px solid #d1d5db",
              padding: "12px",
              borderRadius: "6px",
              marginBottom: "12px",
            }}
          >
            <p>⭐ {r.rating} / 5</p>
            <p>{r.comment}</p>
            <p style={{ fontSize: "12px", color: "#6b7280" }}>
              — {r.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
