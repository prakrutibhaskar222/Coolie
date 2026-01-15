import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Calendar,
  Clock,
  User,
  Phone,
  MapPin,
  CheckCircle,
  AlertCircle,
  Eye,
  Play,
  Flag,
  Search,
  Download,
  RefreshCw
} from "lucide-react";
import WorkerLayout from "../../components/worker/WorkerLayout";
import { Card, Badge, Button, Input } from "../../components/ui";
import toast from "react-hot-toast";

export default function WorkerJobs() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [serviceFilter, setServiceFilter] = useState("all");
  const [dateRange, setDateRange] = useState("all");

  /* ================= DATE HELPERS (MUST BE FIRST) ================= */
  const isToday = (dateString) => {
    const today = new Date().toDateString();
    return new Date(dateString).toDateString() === today;
  };

  const isUpcoming = (dateString) => {
    const jobDate = new Date(dateString);
    return jobDate > new Date();
  };
  /* ================================================================ */

  /* ================= TABS ================= */
  const tabs = [
    { id: "all", label: "All Jobs", count: jobs.length },
    { id: "today", label: "Today", count: jobs.filter(j => isToday(j.date)).length },
    { id: "upcoming", label: "Upcoming", count: jobs.filter(j => isUpcoming(j.date)).length },
    { id: "completed", label: "Completed", count: jobs.filter(j => j.status === "completed").length }
  ];
  /* ================================================================ */

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    filterJobs();
  }, [jobs, activeTab, searchTerm, statusFilter, serviceFilter, dateRange]);

  /* ================= FETCH JOBS ================= */
  const fetchJobs = async () => {
    try {
      setLoading(true);

      // MOCK DATA (replace with API later)
      const mockJobs = [
        {
          _id: "1",
          bookingId: "BK001",
          serviceTitle: "Electrical Repair",
          customerName: "John Doe",
          customerPhone: "+91 9876543210",
          date: new Date().toISOString(),
          slot: "10:00 AM - 12:00 PM",
          status: "pending",
          address: "Delhi",
          price: 1500,
          serviceType: "electrical"
        },
        {
          _id: "2",
          bookingId: "BK002",
          serviceTitle: "Plumbing Service",
          customerName: "Jane Smith",
          customerPhone: "+91 9876543211",
          date: new Date(Date.now() + 86400000).toISOString(),
          slot: "2:00 PM - 4:00 PM",
          status: "in-progress",
          address: "Mumbai",
          price: 2000,
          serviceType: "plumbing"
        }
      ];

      setJobs(mockJobs);
    } catch {
      toast.error("Failed to load jobs");
    } finally {
      setLoading(false);
    }
  };
  /* ================================================================ */

  /* ================= FILTER JOBS ================= */
  const filterJobs = () => {
    let filtered = [...jobs];

    if (activeTab === "today") filtered = filtered.filter(j => isToday(j.date));
    if (activeTab === "upcoming") filtered = filtered.filter(j => isUpcoming(j.date));
    if (activeTab === "completed") filtered = filtered.filter(j => j.status === "completed");

    if (searchTerm) {
      filtered = filtered.filter(j =>
        j.serviceTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        j.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        j.bookingId.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== "all") filtered = filtered.filter(j => j.status === statusFilter);
    if (serviceFilter !== "all") filtered = filtered.filter(j => j.serviceType === serviceFilter);

    setFilteredJobs(filtered);
  };
  /* ================================================================ */

  if (loading) {
    return (
      <WorkerLayout>
        <p>Loading jobs...</p>
      </WorkerLayout>
    );
  }

  return (
    <WorkerLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">My Jobs</h1>

        {/* Tabs */}
        <div className="flex gap-6 border-b">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-2 ${
                activeTab === tab.id ? "border-b-2 border-blue-500 text-blue-600" : "text-neutral-500"
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        {/* Jobs */}
        {filteredJobs.length === 0 ? (
          <Card className="p-12 text-center">
            <AlertCircle className="w-12 h-12 mx-auto mb-3 text-neutral-400" />
            <p>No jobs found</p>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map(job => (
              <Card key={job._id} className="p-6">
                <h3 className="font-semibold">{job.serviceTitle}</h3>
                <p>{job.customerName}</p>
                <p>₹{job.price}</p>
                <Badge>{job.status}</Badge>
              </Card>
            ))}
          </div>
        )}
      </div>
    </WorkerLayout>
  );
}
