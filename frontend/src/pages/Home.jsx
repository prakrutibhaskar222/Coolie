import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { ArrowRight, Star, Clock, Shield, TrendingUp, RefreshCw } from "lucide-react";
import { Card, Button, Badge, LoadingSpinner } from "../components/ui";
import Stats from "../components/Stats";
import RecentlyViewed from "../components/RecentlyViewed";
import { useAutoRefresh } from "../hooks/useAutoRefresh";

const API = "http://localhost:5001";

// STATIC BACKGROUND IMAGES (NO DATABASE NEEDED)
const categoryBackgrounds = {
  electrical:
    "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=1000",
  installation:
    "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1000",
  personal:
    "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=1000",
  homeservices:
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1000",
  renovation:
    "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1000",
  // fallback image
  default:
    "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1000"
};

const categoryIcons = {
  electrical: "⚡",
  installation: "🔧",
  personal: "👤",
  homeservices: "🏠",
  renovation: "🎨",
  default: "🔧"
};

export default function HomePage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch categories function
  const fetchCategories = async (source = 'initial') => {
    try {
      const res = await fetch(`${API}/api/categories`);
      const json = await res.json();
      if (json.success) {
        // Sort categories alphabetically by name
        const sorted = json.data.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        setCategories(sorted);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  // Auto-refresh hook
  const { isRefreshing, refreshCount, triggerRefresh } = useAutoRefresh(
    fetchCategories,
    {
      enabled: true,
      onButtonClick: true,
      onCustomEvent: true,
      debounceMs: 1000,
    }
  );

  useEffect(() => {
    fetchCategories('initial');
  }, []);

  const features = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Verified Professionals",
      description: "All service providers are background-checked and certified"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Quick Booking",
      description: "Book services in minutes with flexible scheduling"
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: "Quality Guaranteed",
      description: "100% satisfaction guarantee on all services"
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Transparent Pricing",
      description: "No hidden fees, upfront pricing for all services"
    }
  ];

  if (loading && !isRefreshing) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 transition-colors duration-300">
      {/* Refresh Indicator */}
      {isRefreshing && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-20 right-4 z-50 bg-primary-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2"
        >
          <RefreshCw className="w-4 h-4 animate-spin" />
          <span className="text-sm font-medium">Refreshing data...</span>
        </motion.div>
      )}

      {/* Debug Info (Development only) */}
      {process.env.NODE_ENV === 'development' && refreshCount > 0 && (
        <div className="fixed bottom-4 left-4 bg-neutral-800 text-white px-3 py-2 rounded-lg text-xs">
          Refreshes: {refreshCount}
        </div>
      )}
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 to-primary-800 dark:from-primary-700 dark:to-primary-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container-custom py-20 lg:py-32 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-6 leading-tight">
                Home Services at Your
                <span className="block text-accent-300">Doorstep</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-primary-100 mb-8 leading-relaxed max-w-3xl mx-auto">
                Connect with trusted professionals for all your home needs. From electrical work to renovations, 
                we make it simple, reliable, and affordable.
              </p>
              
            </motion.div>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-accent-400/20 rounded-full"></div>
        <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-white/5 rounded-full"></div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white dark:bg-neutral-800 transition-colors duration-300">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-primary-100 dark:bg-primary-800 rounded-2xl flex items-center justify-center text-primary-600 dark:text-primary-400 mx-auto mb-4 transition-colors duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-2 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed transition-colors duration-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-neutral-50 dark:bg-neutral-900 transition-colors duration-300">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <Badge variant="primary" className="mb-4">
              Our Services
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-display font-bold text-neutral-900 dark:text-neutral-100 mb-6 transition-colors duration-300">
              Choose Your Service Category
            </h2>
            <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto transition-colors duration-300">
              From routine maintenance to major renovations, find the perfect professional for your needs.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => {
              const bgImage = categoryBackgrounds[category.name.toLowerCase()] || categoryBackgrounds.default;
              const icon = categoryIcons[category.name.toLowerCase()] || categoryIcons.default;
              
              return (
                <motion.div
                  key={category._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link to={`/${category.name.toLowerCase()}`}>
                    <Card hover className="group overflow-hidden h-80 relative">
                      {/* Background Image */}
                      <div 
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                        style={{ backgroundImage: `url(${bgImage})` }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                      </div>
                      
                      {/* Content */}
                      <div className="relative z-10 h-full flex flex-col justify-end p-6 text-white">
                        <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                          {icon}
                        </div>
                        
                        <h3 className="text-2xl font-bold mb-2 capitalize">
                          {category.name}
                        </h3>
                        
                        <p className="text-neutral-200 mb-4 text-sm leading-relaxed">
                          Professional {category.name.toLowerCase()} services with verified experts
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <Badge variant="secondary" size="sm" className="bg-white/20 text-white border-white/30">
                            {category.serviceCount || 0} Services
                          </Badge>
                          
                          <div className="flex items-center text-sm text-neutral-300 group-hover:text-white transition-colors">
                            Explore
                            <ArrowRight className="ml-1 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Recently Viewed Section */}
      <section className="py-16 bg-white dark:bg-neutral-800 transition-colors duration-300">
        <div className="container-custom">
          <RecentlyViewed />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-neutral-50 dark:bg-neutral-900 transition-colors duration-300">
        <div className="container-custom">
          <Stats />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-accent-600 text-white">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl lg:text-5xl font-display font-bold mb-6">
              Need Help Choosing?
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Our customer support team is here to help you find the perfect service for your needs.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
              <Button 

                variant="secondary" 
                size="lg" 
                className="w-full sm:w-auto"
                autoRefresh={true}
                refreshDelay={1000}
              >
                Contact Support
              </Button>
              </Link>
              
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
