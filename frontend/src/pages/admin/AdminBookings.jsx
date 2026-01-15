import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  User,
  Phone,
  Clock,
  DollarSign,
  CheckCircle,
  XCircle,
  AlertCircle,
  RefreshCw,
  Download,
} from "lucide-react";
import toast from "react-hot-toast";

import AdminLayout from "../../components/admin/AdminLayout";
import AdminBookingActions from "../../components/admin/AdminBookingActions";
import DataTable from "../../components/admin/DataTable";
import StatsCard from "../../components/admin/StatsCard";
import { Button, Card, Badge } from "../../components/ui";
import { useAutoRefresh } from "../../hooks/useAutoRefresh";

const API = "http://localhost:5001";

export default function AdminBookings() {
  /* ================= STATE ================= */
  const [bookings, setBookings] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showWorkerModal, setShowWorkerModal] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState("");

  /* ================= FETCH DATA ================= */
  const fetchBookings = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Not authenticated");
        setBookings([]);
        setWorkers([]);
        return;
      }

      const [bookingsRes, workersRes] = await Promise.all([
        fetch(`${API}/api/bookings`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${API}/api/admin/workers`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      const [bookingsData, workersData] = await Promise.all([
        bookingsRes.json(),
        workersRes.json(),
      ]);

      /* ---- SAFETY FIRST ---- */
      if (bookingsData?.success && Array.isArray(bookingsData.data)) {
        setBookings(bookingsData.data);
      } else {
        setBookings([]);
      }

      if (workersData?.success && Array.isArray(workersData.data)) {
        setWorkers(workersData.data);
      } else {
        setWorkers([]);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to load bookings");
      setBookings([]);
      setWorkers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  /* ================= AUTO REFRESH ================= */
  const { isRefreshing } = useAutoRefresh(fetchBookings, {
    enabled: true,
    debounceMs: 2000,
  });

  /* ================= STATS ================= */
  const stats = {
    total: bookings.length,
    pending: bookings.filter(b => b.status === "pending").length,
    completed: bookings.filter(b => b.status === "completed").length,
    revenue: bookings
      .filter(b => b.status === "completed" && b.paid)
      .reduce((s, b) => s + (b.price || 0), 0),
  };

  /* ================= TABLE ================= */
  const columns = [
    {
      key: "customer",
      title: "Customer",
      render: (_, r) => (
        <div>
          <div className="font-medium">{r.customerName}</div>
          <div className="text-sm text-neutral-500 flex items-center">
            <Phone className="w-3 h-3 mr-1" />
            {r.customerPhone}
          </div>
        </div>
      ),
    },
    { key: "serviceTitle", title: "Service" },
    {
      key: "status",
      title: "Status",
      render: v => (
        <Badge
          variant={
            v === "completed"
              ? "success"
              : v === "pending"
              ? "warning"
              : "secondary"
          }
        >
          {v}
        </Badge>
      ),
    },
    {
      key: "workerAssigned",
      title: "Worker",
      render: v => v || "Unassigned",
    },
    {
      key: "price",
      title: "Amount",
      render: v => `₹${v || 0}`,
    },
  ];

  /* ================= ASSIGN WORKER ================= */
  const confirmWorkerAssignment = async () => {
    if (!selectedBooking || !selectedWorker) return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `${API}/api/bookings/${selectedBooking._id}/assign`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ workerId: selectedWorker }),
        }
      );

      const data = await res.json();
      if (data.success) {
        toast.success("Worker assigned");
        fetchBookings();
        setShowWorkerModal(false);
        setSelectedWorker("");
      } else {
        toast.error("Assignment failed");
      }
    } catch {
      toast.error("Server error");
    }
  };

  /* ================= UI ================= */
  return (
    <AdminLayout>
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Bookings</h1>
        <div className="flex gap-3">
          <Button variant="outline" onClick={fetchBookings}>
            <RefreshCw
              className={`w-4 h-4 mr-2 ${
                isRefreshing ? "animate-spin" : ""
              }`}
            />
            Refresh
          </Button>
          <Button variant="outline" onClick={() => toast("Export coming soon")}>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatsCard title="Total" value={stats.total} icon={<Calendar />} />
        <StatsCard title="Pending" value={stats.pending} icon={<Clock />} />
        <StatsCard title="Completed" value={stats.completed} icon={<CheckCircle />} />
        <StatsCard title="Revenue" value={`₹${stats.revenue}`} icon={<DollarSign />} />
      </div>

      {/* TABLE */}
      <Card>
        <DataTable
          data={Array.isArray(bookings) ? bookings : []}
          columns={columns}
          loading={loading}
          onRowClick={(row) => {
            setSelectedBooking(row);
            setSelectedWorker("");
            setShowWorkerModal(true);
          }}
          actions={(row) => (
            <AdminBookingActions
            booking={row}
            workers={workers}   // ✅ REQUIRED
            onUpdate={fetchBookings}
          />

          )}
        />
      </Card>

      {/* ASSIGN WORKER MODAL */}
      <AnimatePresence>
        {showWorkerModal && selectedBooking && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-xl p-6 w-full max-w-md"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Assign Worker</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowWorkerModal(false)}
                >
                  <XCircle className="w-5 h-5" />
                </Button>
              </div>

              {Array.isArray(workers) && workers.length > 0 ? (
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {workers.map((w) => (
                    <label
                      key={w._id}
                      className={`flex items-center p-2 border rounded cursor-pointer ${
                        selectedWorker === w._id
                          ? "border-primary-500 bg-primary-50"
                          : ""
                      }`}
                    >
                      <input
                        type="radio"
                        name="worker"
                        value={w._id}
                        checked={selectedWorker === w._id}
                        onChange={() => setSelectedWorker(w._id)}
                        className="mr-3"
                      />
                      {w.name || w.email}
                    </label>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-neutral-500">
                  No workers available
                </div>
              )}

              <div className="flex gap-3 mt-6">
                <Button
                  onClick={confirmWorkerAssignment}
                  disabled={!selectedWorker}
                  className="flex-1"
                >
                  Assign
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowWorkerModal(false)}
                >
                  Cancel
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </AdminLayout>
  );
}
