import { useState } from "react";
import { CheckCircle, UserPlus, CreditCard } from "lucide-react";
import api from "../../api";
import toast from "react-hot-toast";

const STATUS_OPTIONS = [
  "pending",
  "assigned",
  "in-progress",
  "completed",
  "cancelled",
];

const AdminBookingActions = ({
  booking,
  workers = [],          // ✅ SAFE DEFAULT
  onUpdate = () => {},   // ✅ SAFE CALLBACK
}) => {
  const [loading, setLoading] = useState(false);

  if (!booking) return null;

  /* ================= ASSIGN WORKER ================= */
  const assignWorker = async (workerId) => {
    if (!workerId || loading) return;

    try {
      setLoading(true);

      // ⚠️ IMPORTANT: this MUST match your backend route
      const res = await api.put(
        `/api/bookings/${booking._id}/assign`,
        { worker: workerId }
      );

      toast.success("Worker assigned");
      onUpdate(res.data?.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to assign worker");
    } finally {
      setLoading(false);
    }
  };

  /* ================= MARK PAYMENT ================= */
  const markPayment = async () => {
    if (loading || booking.paid) return;

    try {
      setLoading(true);

      const res = await api.put(
        `/api/bookings/${booking._id}/mark-paid`
      );

      toast.success("Payment marked as paid");
      onUpdate(res.data?.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update payment");
    } finally {
      setLoading(false);
    }
  };

  /* ================= CHANGE STATUS ================= */
  const changeStatus = async (status) => {
    if (loading || status === booking.status) return;

    try {
      setLoading(true);

      const res = await api.put(
        `/api/bookings/${booking._id}/status`,
        { status }
      );

      toast.success("Status updated");
      onUpdate(res.data?.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update status");
    } finally {
      setLoading(false);
    }
  };

  const isCompleted = booking.status === "completed";

  return (
    // ✅ THIS LINE FIXES THE POPUP OPENING ON EVERY CLICK
    <div
      className="flex flex-wrap gap-3"
      onClick={(e) => e.stopPropagation()}
    >
      {/* ================= STATUS ================= */}
      <div className="flex items-center gap-2">
        <CheckCircle className="w-4 h-4 text-neutral-500" />
        <select
          value={booking.status}
          disabled={loading || isCompleted}
          onChange={(e) => changeStatus(e.target.value)}
          className="border rounded-lg px-2 py-1 text-sm disabled:opacity-50"
        >
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>
              {s.replace("-", " ").toUpperCase()}
            </option>
          ))}
        </select>
      </div>

      {/* ================= PAYMENT ================= */}
      <button
        onClick={markPayment}
        disabled={loading || booking.paid}
        className={`flex items-center gap-2 px-3 py-1 rounded-lg text-sm border transition ${
          booking.paid
            ? "bg-green-50 text-green-700 border-green-300"
            : "bg-yellow-50 text-yellow-700 border-yellow-300"
        }`}
      >
        <CreditCard className="w-4 h-4" />
        {booking.paid ? "Paid" : "Mark Paid"}
      </button>

      {/* ================= WORKER ================= */}
      <div className="flex items-center gap-2">
        <UserPlus className="w-4 h-4 text-neutral-500" />
        <select
          disabled={loading}
          value={booking.workerAssigned || ""}
          onChange={(e) => assignWorker(e.target.value)}
          className="border rounded-lg px-2 py-1 text-sm"
        >
          <option value="">Assign Worker</option>

          {Array.isArray(workers) &&
            workers.map((w) => (
              <option key={w._id} value={w._id}>
                {w.name || w.email}
              </option>
            ))}
        </select>
      </div>

      {/* ================= AMOUNT (DISPLAY SAFE) ================= */}
      <div className="flex items-center text-sm font-medium text-neutral-700">
        ₹{booking.price || 0}
      </div>
    </div>
  );
};

export default AdminBookingActions;
