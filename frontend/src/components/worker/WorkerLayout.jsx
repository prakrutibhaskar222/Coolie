import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LogOut,
  Menu,
  X,
  Bell,
  User,
  Settings,
  ChevronDown,
  Home,
  Calendar,
  Briefcase,
  Clock,
  Star,
  DollarSign,
  HelpCircle,
} from "lucide-react";
import { useState, useEffect } from "react";

const WorkerLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [worker, setWorker] = useState(null);
  const [checkedRole, setCheckedRole] = useState(false);

  /* ================= ROLE GUARD ================= */
  useEffect(() => {
    const userStr = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (!userStr || !token) {
      navigate("/login", { replace: true });
      return;
    }

    try {
      const parsed = JSON.parse(userStr);

      if (parsed.role !== "worker") {
        navigate("/", { replace: true });
        return;
      }

      setWorker(parsed);
      setCheckedRole(true);
    } catch {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  if (!checkedRole) return null;
  /* ============================================= */

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const sidebarItems = [
    { icon: Home, label: "Dashboard", path: "/worker/dashboard" },
    { icon: Briefcase, label: "My Jobs", path: "/worker/jobs" },
    { icon: Calendar, label: "Schedule", path: "/worker/schedule" },
    { icon: Clock, label: "Availability", path: "/worker/availability" },
    { icon: Star, label: "Reviews", path: "/worker/reviews" },
    { icon: DollarSign, label: "Earnings", path: "/worker/earnings" },
    { icon: Bell, label: "Notifications", path: "/worker/notifications" },
    { icon: Settings, label: "Profile", path: "/worker/profile" },
    { icon: HelpCircle, label: "Help", path: "/worker/help" },
  ];

  const profileMenuItems = [
    { icon: User, label: "Profile", path: "/worker/profile" },
    { icon: Settings, label: "Settings", path: "/worker/settings" },
  ];

  return (
    <div className="flex h-screen bg-neutral-50 overflow-hidden">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <motion.aside
        initial={false}
        animate={{
          x: sidebarOpen || window.innerWidth >= 1024 ? 0 : -320,
        }}
        transition={{ duration: 0.3 }}
        className="fixed lg:static inset-y-0 left-0 z-50 w-80 bg-white border-r border-neutral-200"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-xl font-bold">COOLIE</h2>
            <button
              className="lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X />
            </button>
          </div>

          {/* Worker Info */}
          <div className="p-6 border-b bg-blue-50">
            <p className="font-semibold">{worker?.name}</p>
            <p className="text-sm text-neutral-600">
              {worker?.email}
            </p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {sidebarItems.map((item) => {
              const active = location.pathname.startsWith(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                    active
                      ? "bg-blue-100 text-blue-700"
                      : "hover:bg-neutral-100"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </motion.aside>

      {/* MAIN */}
      <div className="flex-1 flex flex-col">
        {/* TOP BAR */}
        <header className="flex items-center justify-between bg-white border-b px-6 py-4">
          <button
            className="lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu />
          </button>

          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2 px-3 py-2 border rounded-lg"
            >
              <User />
              <ChevronDown />
            </button>

            <AnimatePresence>
              {showProfileMenu && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow z-50"
                >
                  {profileMenuItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setShowProfileMenu(false)}
                      className="flex items-center gap-2 px-4 py-2 hover:bg-neutral-100"
                    >
                      <item.icon className="w-4 h-4" />
                      {item.label}
                    </Link>
                  ))}

                  <button
                    onClick={logout}
                    className="flex items-center gap-2 px-4 py-2 w-full text-left hover:bg-red-50 text-red-600"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </header>

        {/* CONTENT */}
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default WorkerLayout;
