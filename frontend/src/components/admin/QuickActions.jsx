import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Home, 
  UserPlus, 
  Calendar, 
  Briefcase, 
  DollarSign, 
  FileText,
  MessageSquare,
  Settings,
  BarChart3,
  Zap,
  CalendarCheck
} from "lucide-react";

export default function QuickActions({ onActionClick }) {
  const quickActions = [
    {
      title: "Dashboard",
      subtitle: "home",
      path: "/admin",
      icon: <Home className="w-5 h-5" />,
      color: "bg-blue-500 hover:bg-blue-600",
      description: "Dashboard"
    },
    {
      title: "Add Worker",
      subtitle: "Register",
      path: "/admin/workers/add",
      icon: <UserPlus className="w-4 h-4" />,
      color: "bg-green-500 hover:bg-green-600",
      description: "Register a new service worker"
    },
    {
      title: "Add Service",
      subtitle: "Create",
      path: "/admin/services",
      icon: <Briefcase className="w-4 h-4" />,
      color: "bg-purple-500 hover:bg-purple-600",
      description: "Add a new service offering"
    }
  ];

  const secondaryActions = [
    {
      title: "View Analytics",
      path: "/admin/analytics",
      icon: <BarChart3 className="w-4 h-4" />,
      color: "bg-orange-500 hover:bg-orange-600"
    },
     {
    title: "View Bookings",
    path: "/admin/bookings",
    icon: <CalendarCheck className="w-4 h-4" />,
    color: "bg-yellow-500 hover:bg-yellow-600",
  },
    {
      title: "System Settings",
      path: "/admin/settings",
      icon: <Settings className="w-4 h-4" />,
      color: "bg-gray-500 hover:bg-gray-600"
    }
  ];

  const handleActionClick = (action) => {
    if (onActionClick) {
      onActionClick(action);
    }
  };

  return (
    <div className="space-y-4">
      {/* Primary Quick Actions */}
      <div>
        <h3 className="text-sm font-semibold text-neutral-700 mb-3 uppercase tracking-wide">
          Quick Actions
        </h3>
        <div className="grid grid-cols-3 gap-2">
          {quickActions.map((action, index) => (
            <motion.div
              key={action.path}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: index * 0.1 }}
            >
              <Link
                to={action.path}
                onClick={() => handleActionClick(action)}
                className={`${action.color} text-white p-3 rounded-lg text-center transition-all duration-200 group hover:shadow-lg transform hover:scale-105 block`}
                title={action.description}
              >
                <div className="flex flex-col items-center space-y-1">
                  {action.icon}
                  <span className="text-xs font-medium">{action.subtitle}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Secondary Actions */}
      <div>
        <h3 className="text-sm font-semibold text-neutral-700 mb-3 uppercase tracking-wide">
          Quick Access
        </h3>
        <div className="space-y-2">
          {secondaryActions.map((action, index) => (
            <motion.div
              key={action.path}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2, delay: index * 0.1 }}
            >
              <Link
                to={action.path}
                onClick={() => handleActionClick(action)}
                className="flex items-center justify-between px-3 py-2 rounded-lg text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 transition-colors duration-200 group"
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 ${action.color} rounded-lg flex items-center justify-center text-white transition-colors duration-200`}>
                    {action.icon}
                  </div>
                  <span className="text-sm font-medium">{action.title}</span>
                </div>
                {action.badge && (
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    {action.badge}
                  </span>
                )}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* System Status */}
      <div className="pt-4 border-t border-neutral-200">
        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-green-800">System Online</span>
          </div>
          <p className="text-xs text-green-600 mt-1">All services operational</p>
          <div className="mt-2 flex items-center justify-between text-xs text-green-600">
            <span>Uptime: 99.9%</span>
            <span>24 active workers</span>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h3 className="text-sm font-semibold text-neutral-700 mb-3 uppercase tracking-wide">
          Recent Activity
        </h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-3 px-3 py-2 rounded-lg bg-neutral-50">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <div className="flex-1">
              <p className="text-xs text-neutral-600">New booking created</p>
              <p className="text-xs text-neutral-400">2 minutes ago</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 px-3 py-2 rounded-lg bg-neutral-50">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <div className="flex-1">
              <p className="text-xs text-neutral-600">Worker verified</p>
              <p className="text-xs text-neutral-400">5 minutes ago</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 px-3 py-2 rounded-lg bg-neutral-50">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            <div className="flex-1">
              <p className="text-xs text-neutral-600">Payment pending</p>
              <p className="text-xs text-neutral-400">10 minutes ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}