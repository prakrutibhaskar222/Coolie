import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Plus, 
  UserPlus, 
  Calendar, 
  Briefcase, 
  X,
  Zap,
  Settings,
  BarChart3
} from "lucide-react";

export default function AdminFAB() {
  const [isOpen, setIsOpen] = useState(false);

  const fabActions = [
    {
      title: "Add Worker",
      path: "/admin/workers/",
      icon: <UserPlus className="w-5 h-5" />,
      color: "bg-green-500 hover:bg-green-600",
      description: "Register new worker"
    },
    {
      title: "Add Service",
      path: "/admin/services/",
      icon: <Briefcase className="w-5 h-5" />,
      color: "bg-purple-500 hover:bg-purple-600",
      description: "Create new service"
    },
    {
      title: "Analytics",
      path: "/admin/analytics",
      icon: <BarChart3 className="w-5 h-5" />,
      color: "bg-orange-500 hover:bg-orange-600",
      description: "View analytics"
    },
    {
      title: "Settings",
      path: "/admin/settings",
      icon: <Settings className="w-5 h-5" />,
      color: "bg-gray-500 hover:bg-gray-600",
      description: "System settings"
    }
  ];

  const toggleFAB = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Action Items */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-16 right-0 space-y-3"
          >
            {fabActions.map((action, index) => (
              <motion.div
                key={action.path}
                initial={{ opacity: 0, x: 20, y: 10 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                exit={{ opacity: 0, x: 20, y: 10 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                className="flex items-center space-x-3"
              >
                <div className="bg-white px-3 py-2 rounded-lg shadow-lg border border-neutral-200">
                  <span className="text-sm font-medium text-neutral-700 whitespace-nowrap">
                    {action.title}
                  </span>
                </div>
                <Link
                  to={action.path}
                  onClick={() => setIsOpen(false)}
                  className={`${action.color} text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-110`}
                  title={action.description}
                >
                  {action.icon}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main FAB Button */}
      <motion.button
        onClick={toggleFAB}
        className={`w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-110 flex items-center justify-center text-white ${
          isOpen 
            ? 'bg-red-500 hover:bg-red-600 rotate-45' 
            : 'bg-primary-600 hover:bg-primary-700'
        }`}
        whileTap={{ scale: 0.95 }}
        animate={{ rotate: isOpen ? 45 : 0 }}
        transition={{ duration: 0.2 }}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
      </motion.button>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 -z-10"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}