import { Route, Routes, useLocation } from "react-router";
import { Toaster } from "react-hot-toast";

import { ThemeProvider } from "./contexts/ThemeContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ErrorBoundary from "./components/ErrorBoundary";
import RefreshNotification from "./components/RefreshNotification";
import LiveChat from "./components/LiveChat";

import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Installation from "./pages/Installation";
import Personal from "./pages/Personal";
import HomeServices from "./pages/HomeServices";
import Renovation from "./pages/Renovation";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Stats from "./components/Stats";
import Booking from "./pages/Booking";
import Legacy from "./pages/Legacy";
import Support from "./pages/Support";
import Shop from "./pages/Shop";

import AdminBookings from "./pages/admin/AdminBookings";
import AdminServices from "./pages/admin/AdminServices";
import Dashboard from "./pages/admin/Dashboard";

import WorkerDashboard from "./pages/workers/WorkerDashboard";
import WorkerJobs from "./pages/workers/WorkerJobs";
import JobDetail from "./pages/workers/JobDetail";
import WorkerSchedule from "./pages/workers/WorkerSchedule";
import WorkerAvailability from "./pages/workers/WorkerAvailability";
import WorkerServices from "./pages/workers/WorkerServices";
import WorkerEarnings from "./pages/workers/WorkerEarnings";
import WorkerReviews from "./pages/workers/WorkerReviews";
import WorkerNotifications from "./pages/workers/WorkerNotifications";
import WorkerProfile from "./pages/workers/WorkerProfile";
import WorkerHelp from "./pages/workers/WorkerHelp";
import ServiceDetails from "./pages/ServiceDetails.jsx";
import ElectricalPage from "./pages/ElectricalPage";

import ProtectedRoute from "./routes/ProtectedRoute";
import AdminRoute from "./routes/AdminRoute";
import WorkerRoute from "./routes/WorkerRoute";
import Unauthorized from "./pages/Unauthorised.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import AdminWorkers from "./pages/admin/AdminWorkers.jsx";
import AddWorker from "./pages/admin/AddWorker.jsx";
import Profile from "./pages/profile/Profile.jsx";
import Favorites from "./pages/profile/Favorites.jsx";
import ServiceHistory from "./pages/profile/ServiceHistory.jsx";
import Invoices from "./pages/profile/Invoices.jsx";
import AdminWorkerVerification from "./pages/admin/AdminWorkerVerfication.jsx";

// Footer Pages
import About from "./pages/About.jsx";
import Careers from "./pages/Careers.jsx";
import Contact from "./pages/Contact.jsx";
import FAQ from "./pages/FAQ.jsx";
import Terms from "./pages/Terms.jsx";
import Privacy from "./pages/Privacy.jsx";
import Press from "./pages/Press.jsx";
import Blog from "./pages/Blog.jsx";

// Additional Admin Pages
import Analytics from "./pages/admin/Analytics.jsx";
import Settings from "./pages/admin/Settings.jsx";

const App = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isWorkerRoute = location.pathname.startsWith('/worker');
  
  // Don't show navbar and footer for admin and worker routes
  const showNavbarAndFooter = !isAdminRoute && !isWorkerRoute;
  return (
    <ThemeProvider>
      <ErrorBoundary>
        <div className="min-h-screen flex flex-col bg-neutral-50 dark:bg-neutral-900 transition-colors duration-300">
          {showNavbarAndFooter && <Navbar />}
          
          {/* Global Refresh Notifications */}
          <RefreshNotification />
          
          {/* Live Chat */}
          {showNavbarAndFooter && <LiveChat />}
          
          {/* Toast Notifications */}
          <Toaster 
            position="top-center"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#ffffff',
                color: '#1f2937',
                border: '1px solid #e5e7eb',
                borderRadius: '12px',
                boxShadow: '0 10px 40px -10px rgba(0, 0, 0, 0.15)',
              },
              success: {
                iconTheme: {
                  primary: '#22c55e',
                  secondary: '#ffffff',
                },
              },
              error: {
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#ffffff',
                },
              },
            }}
          />

        <main className={showNavbarAndFooter ? "flex-1" : "min-h-screen"}>
          <Routes>
            {/* PUBLIC */}
            <Route path="/" element={<Landing />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/legacy" element={<Legacy />} />
            <Route path="/support" element={<Support />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/unauthorized" element={<Unauthorized />} />

            {/* FOOTER PAGES */}
            <Route path="/about" element={<About />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/press" element={<Press />} />
            <Route path="/blog" element={<Blog />} />

            {/* USER */}
            <Route path="/home" element={<Home />} />
            <Route path="/electrical" element={<ElectricalPage />} />
            <Route path="/installation/*" element={<Installation />} />
            <Route path="/personal/*" element={<Personal />} />
            <Route path="/homeservices/*" element={<HomeServices />} />
            <Route path="/renovation/*" element={<Renovation />} />
            <Route path="/stats" element={<Stats />} />
            <Route path="/service/:id" element={<ServiceDetails />} />
            <Route path="/booking/service/:id" element={<ProtectedRoute> <Booking /> </ProtectedRoute>}/>
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/favorites" element={<Favorites />} />
            <Route path="/profile/history" element={<ServiceHistory />} />
            <Route path="/profile/invoices" element={<Invoices />} /> 

            {/* ADMIN */}
            <Route path="/admin/" element={<AdminRoute> <Dashboard /> </AdminRoute>}/>
            <Route path="/admin/workers" element={<AdminRoute> <AdminWorkers /> </AdminRoute>}/>
            <Route path="/admin/workers/add" element={<AdminRoute> <AddWorker /> </AdminRoute>}/>
            <Route path="/bookings" element={<AdminRoute> <AdminBookings /> </AdminRoute>}/>
            <Route path="/admin/services" element={<AdminRoute> <AdminServices /> </AdminRoute>}/>
            <Route path="/admin/workers/verify" element={<AdminWorkerVerification />}/>
            <Route path="/admin/analytics" element={<AdminRoute> <Analytics /> </AdminRoute>}/>
            <Route path="/admin/settings" element={<AdminRoute> <Settings /> </AdminRoute>}/>
          
            {/* WORKER */}
            <Route path="/worker/dashboard" element={<WorkerRoute> <WorkerDashboard /> </WorkerRoute>}/>
            <Route path="/worker/jobs" element={<WorkerRoute> <WorkerJobs /> </WorkerRoute>}/>
            <Route path="/worker/jobs/:jobId" element={<WorkerRoute> <JobDetail /> </WorkerRoute>}/>
            <Route path="/worker/schedule" element={<WorkerRoute> <WorkerSchedule /> </WorkerRoute>}/>
            <Route path="/worker/availability" element={<WorkerRoute> <WorkerAvailability /> </WorkerRoute>}/>
            <Route path="/worker/services" element={<WorkerRoute> <WorkerServices /> </WorkerRoute>}/>
            <Route path="/worker/earnings" element={<WorkerRoute> <WorkerEarnings /> </WorkerRoute>}/>
            <Route path="/worker/reviews" element={<WorkerRoute> <WorkerReviews /> </WorkerRoute>}/>
            <Route path="/worker/notifications" element={<WorkerRoute> <WorkerNotifications /> </WorkerRoute>}/>
            <Route path="/worker/profile" element={<WorkerRoute> <WorkerProfile /> </WorkerRoute>}/>
            <Route path="/worker/help" element={<WorkerRoute> <WorkerHelp /> </WorkerRoute>}/>
          </Routes>
        </main>

        {showNavbarAndFooter && <Footer />}
      </div>
    </ErrorBoundary>
  </ThemeProvider>
  );
};

export default App;