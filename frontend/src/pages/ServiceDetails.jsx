import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  CheckCircle,
  ArrowLeft,
  Clock,
  Star,
  Shield,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Award,
  Zap,
} from "lucide-react";

import { Button, Card, Badge, Alert, LoadingSpinner } from "../components/ui";
import Reviews from "../pages/Reviews";

export default function ServiceDetails() {
  const { id } = useParams();

  const [service, setService] = useState(null);
  const [reviews, setReviews] = useState([]);
            console.log("REVIEWS:", reviews);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API =
    import.meta.env.VITE_API_URL || "http://localhost:5001";

  /* ---------------- FETCH SERVICE + REVIEWS ---------------- */
  useEffect(() => {
    const fetchService = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(`${API}/api/services/${id}/view`);

        if (!res.ok) {
          throw new Error(`HTTP error ${res.status}`);
        }

        const json = await res.json();

        if (!json.success || !json.data?.service) {
          setError("Service not found");
          return;
        }

        setService(json.data.service);
        setReviews(json.data.reviews || []);

        /* Recently Viewed (safe) */
        try {
          const prev = JSON.parse(
            localStorage.getItem("recentlyViewed") || "[]"
          );

          const updated = [
            json.data.service._id,
            ...prev.filter(
              (i) =>
                String(i) !== String(json.data.service._id)
            ),
          ].slice(0, 10);

          localStorage.setItem(
            "recentlyViewed",
            JSON.stringify(updated)
          );
        } catch (e) {
          console.error("Recently viewed error:", e);
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load service details");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchService();
  }, [id, API]);

  /* ---------------- LOADING / ERROR ---------------- */
  if (loading) {
    return (
      <LoadingSpinner
        type="page"
        message="Loading service details..."
      />
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Alert
          variant="error"
          className="max-w-md text-center"
        >
          <h3 className="font-semibold mb-2">Error</h3>
          <p className="mb-4">{error}</p>
          <Link to="/home">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </Alert>
      </div>
    );
  }

  if (!service) return null;

  /* ---------------- STATIC DATA ---------------- */
  const features = service.features || [
    "Professional Service",
    "Quality Guaranteed",
    "Insured Workers",
    "24/7 Support",
  ];

  const highlights = [
    {
      icon: <Shield className="w-5 h-5" />,
      title: "Verified Professional",
      desc: "Background checked & certified",
    },
    {
      icon: <Clock className="w-5 h-5" />,
      title: `${service.duration || "2–3"} Hours`,
      desc: "Estimated completion time",
    },
    {
      icon: <Award className="w-5 h-5" />,
      title: "Quality Guaranteed",
      desc: "100% satisfaction promise",
    },
    {
      icon: <Zap className="w-5 h-5" />,
      title: "Same Day Service",
      desc: "Available for urgent needs",
    },
  ];

  const categorySlug =
    service.category
      ?.toLowerCase()
      .replace(/\s+/g, "-") || "services";

  /* ---------------- UI ---------------- */
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* HEADER */}
      <div className="bg-white border-b">
        <div className="container-custom py-6">
          <Link
            to={`/${categorySlug}`}
            className="flex items-center gap-2 text-neutral-600 hover:text-primary-600 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to {service.category}
          </Link>

          <div className="flex flex-col lg:flex-row justify-between gap-6">
            <div>
              <div className="flex gap-3 mb-3">
                <Badge className="capitalize">
                  {service.category}
                </Badge>
                {service.isPopular && (
                  <Badge variant="warning">Popular</Badge>
                )}
              </div>

              <h1 className="text-3xl font-bold mb-2">
                {service.title}
              </h1>

              {service.rating !== undefined && (
                <div className="flex items-center gap-2 text-sm">
                  <Star className="w-4 h-4 text-warning-500 fill-current" />
                  <span>
                    {Number(service.rating).toFixed(1)}
                  </span>
                  <span>
                    ({reviews.length} reviews)
                  </span>
                </div>
              )}
            </div>

            <div className="text-right">
              <div className="text-3xl font-bold mb-3">
                ₹
                {Number(service.price).toLocaleString(
                  "en-IN"
                )}
              </div>
              <Link
                to={`/booking/service/${service._id}`}
              >
                <Button size="lg">
                  Book Now
                  <Calendar className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="container-custom py-12 grid lg:grid-cols-3 gap-12">
        {/* LEFT */}
        <div className="lg:col-span-2 space-y-8">
          {service.image && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Card className="overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-72 object-cover"
                  onError={(e) =>
                    (e.currentTarget.style.display =
                      "none")
                  }
                />
              </Card>
            </motion.div>
          )}

          <Card>
            <h2 className="text-xl font-bold mb-3">
              Description
            </h2>
            <p className="text-neutral-700">
              {service.description}
            </p>
          </Card>

          <Card>
            <h2 className="text-xl font-bold mb-4">
              What’s Included
            </h2>
            <div className="grid md:grid-cols-2 gap-3">
              {features.map((f, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2"
                >
                  <CheckCircle className="w-4 h-4 text-success-600" />
                  {f}
                </div>
              ))}
            </div>
          </Card>

          {/* REVIEWS */}


          <Reviews
            serviceId={service._id}
            reviews={reviews}
            onNewReview={(newReview) =>
              setReviews((prev) =>
                prev.some(
                  (r) => r._id === newReview._id
                )
                  ? prev
                  : [newReview, ...prev]
              )
            }
          />

        </div>

        {/* RIGHT */}
        <div className="space-y-6">
          <Card>
            <h3 className="font-bold mb-4">
              Service Highlights
            </h3>
            <div className="space-y-4">
              {highlights.map((h, i) => (
                <div key={i} className="flex gap-3">
                  <div className="p-2 bg-primary-100 rounded">
                    {h.icon}
                  </div>
                  <div>
                    <p className="font-medium">
                      {h.title}
                    </p>
                    <p className="text-sm text-neutral-600">
                      {h.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <h3 className="font-bold mb-3">
              Need Help?
            </h3>
            <div className="space-y-2 text-sm">
              <p className="flex gap-2">
                <Phone className="w-4 h-4" /> +91
                7619443280
              </p>
              <p className="flex gap-2">
                <Mail className="w-4 h-4" />{" "}
                coolie96913@gmail.com
              </p>
              <p className="flex gap-2">
                <MapPin className="w-4 h-4" /> Available
                across India
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
