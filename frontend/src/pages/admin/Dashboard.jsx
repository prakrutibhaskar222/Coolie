import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Users,
  Briefcase,
  DollarSign,
  TrendingUp,
  CheckCircle,
  RefreshCw,
  Download,
  MoreVertical,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import api from "../../api";
import AdminLayout from "../../components/admin/AdminLayout";
import StatsCard from "../../components/admin/StatsCard";
import DataTable from "../../components/admin/DataTable";
import { Button, Card, Badge } from "../../components/ui";
import { useAutoRefresh } from "../../hooks/useAutoRefresh";

const API = "http://localhost:5001";

export default function Dashboard() {
  const navigate = useNavigate();

  const [services, setServices] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState("7d");

  /* ================= FETCH DASHBOARD DATA ================= */
  const fetchAllData = async () => {
  try {
    setLoading(true);

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Not authenticated");
      return;
    }

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    const [servicesRes, bookingsRes, workersRes] = await Promise.all([
      fetch(`${API}/api/services`),
      fetch(`${API}/api/bookings`),
      fetch(`${API}/api/admin/workers`, { headers }), // ✅ JWT FIX
    ]);

    const [servicesData, bookingsData, workersData] = await Promise.all([
      servicesRes.json(),
      bookingsRes.json(),
      workersRes.json(),
    ]);

    if (servicesData.success) setServices(servicesData.data || []);
    if (bookingsData.success) setBookings(bookingsData.data || []);
    if (workersData.success) setWorkers(workersData.data || []); // ✅ FIXED
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    toast.error("Failed to load dashboard data");
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    fetchAllData();
  }, []);

  /* ================= AUTO REFRESH ================= */
  const { isRefreshing } = useAutoRefresh(fetchAllData, {
    enabled: true,
    debounceMs: 2000,
  });

  /* ================= DATE RANGE ================= */
  const rangeDays = { "7d": 7, "30d": 30, "90d": 90 }[dateRange];
  const rangeDate = new Date(Date.now() - rangeDays * 86400000);

  const filteredBookings = useMemo(
    () =>
      bookings.filter(
        (b) => new Date(b.createdAt) >= rangeDate
      ),
    [bookings, rangeDate]
  );

  /* ================= METRICS ================= */
  const metrics = useMemo(() => {
  const totalBookings = filteredBookings.length;

  const completedBookings = filteredBookings.filter(
    (b) => b.status === "completed"
  ).length;

  const pendingBookings = filteredBookings.filter(
    (b) => b.status === "pending"
  ).length;

  const totalRevenue = filteredBookings
    .filter((b) => b.status === "completed" && b.paid)
    .reduce((sum, b) => sum + (b.price || 0), 0);

  return {
    totalBookings,
    completedBookings,
    pendingBookings,
    totalRevenue,
    totalWorkers: workers.length,
    completionRate:
      totalBookings > 0
        ? ((completedBookings / totalBookings) * 100).toFixed(1)
        : "0",
  };
}, [filteredBookings, workers]);


  /* ================= RECENT BOOKINGS ================= */
  const recentBookings = useMemo(() => {
    return [...bookings]
      .sort(
        (a, b) =>
          new Date(b.createdAt) - new Date(a.createdAt)
      )
      .slice(0, 10)
      .map((b) => ({
        id: b._id,
        customer: b.customerName,
        phone: b.customerPhone,
        service: b.serviceTitle || "Unknown",
        date: new Date(b.createdAt).toLocaleDateString(),
        status: b.status,
        amount: b.price || 0,
        paid: b.paid,
      }));
  }, [bookings]);

  /* ================= TABLE COLUMNS ================= */
  const bookingColumns = [
    {
      key: "customer",
      title: "Customer",
      render: (v, r) => (
        <div>
          <div className="font-medium">{v}</div>
          <div className="text-sm text-neutral-500">
            {r.phone}
          </div>
        </div>
      ),
    },
    { key: "service", title: "Service" },
    { key: "date", title: "Date" },
    {
      key: "status",
      title: "Status",
      render: (v) => (
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
      key: "amount",
      title: "Amount",
      render: (v) => `₹${v}`,
    },
    {
      key: "paid",
      title: "Payment",
      render: (v) => (
        <Badge variant={v ? "success" : "warning"}>
          {v ? "Paid" : "Pending"}
        </Badge>
      ),
    },
  ];

  /* ================= EXPORT ================= */
  const exportDashboardData = () => {
    const rows = [
      ["Metric", "Value"],
      ["Total Bookings", metrics.totalBookings],
      ["Completed Bookings", metrics.completedBookings],
      ["Pending Bookings", metrics.pendingBookings],
      ["Total Revenue", metrics.totalRevenue],
      ["Total Workers", metrics.totalWorkers],
    ];

    const csv = rows.map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "dashboard.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  /* ================= UI ================= */
  return (
    <AdminLayout>
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">
          Admin Dashboard
        </h1>

        <div className="flex gap-3">
          <select
            value={dateRange}
            onChange={(e) =>
              setDateRange(e.target.value)
            }
            className="border px-3 py-2 rounded"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>

          <Button variant="outline" onClick={exportDashboardData}>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>

          <Button onClick={fetchAllData} disabled={isRefreshing}>
            <RefreshCw
              className={`w-4 h-4 mr-2 ${
                isRefreshing ? "animate-spin" : ""
              }`}
            />
            Refresh
          </Button>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatsCard title="Bookings" value={metrics.totalBookings} icon={<Calendar />} loading={loading} />
        <StatsCard title="Revenue" value={`₹${metrics.totalRevenue}`} icon={<DollarSign />} loading={loading} />
        <StatsCard title="Workers" value={metrics.totalWorkers} icon={<Users />} loading={loading} />
        <StatsCard title="Completion" value={`${metrics.completionRate}%`} icon={<CheckCircle />} loading={loading} />
      </div>

      {/* RECENT BOOKINGS */}
      <Card>
        <div className="flex justify-between p-6 border-b">
          <h2 className="text-xl font-semibold">
            Recent Bookings
          </h2>
          <Button size="sm" onClick={() => navigate("/admin/bookings")}>
            View All
          </Button>
        </div>

        <div className="p-6">
          <DataTable
            data={recentBookings}
            columns={bookingColumns}
            loading={loading}
            pagination={false}
            onRowClick={(row) => navigate(`/admin/bookings/${row.id}`)}
            actions={(row) => (
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation(); // ✅ FIXED ACTION BUTTON
                  navigate(`/admin/bookings/${row.id}`);
                }}
              >
                <MoreVertical className="w-4 h-4" />
              </Button>
            )}
          />
        </div>
      </Card>
    </AdminLayout>
  );
}
