import { motion } from "framer-motion";

import { Link } from "react-router";
import { Users, Target, Award, Heart, CheckCircle, Star, ArrowRight } from "lucide-react";
import { Button, Card, Badge } from "../components/ui";
import { useAutoRefresh } from "../hooks/useAutoRefresh";

export default function About() {
  // Auto-refresh functionality
  const refreshAboutData = async (source = 'manual') => {
    console.log(`About page refreshed from ${source}`);
  };

  const { isRefreshing, refreshCount } = useAutoRefresh(
    refreshAboutData,
    {
      enabled: true,
      onButtonClick: true,
      debounceMs: 1000,
    }
  );

  const stats = [
    { number: "10,000+", label: "Happy Customers", icon: "😊" },
    { number: "500+", label: "Skilled Professionals", icon: "👨‍🔧" },
    { number: "50+", label: "Service Categories", icon: "🛠️" },
    { number: "5", label: "Years Experience", icon: "📅" },
  ];

  const values = [
    {
      icon: <Target className="w-8 h-8" />,
      title: "Our Mission",
      description: "To connect homeowners with trusted professionals, making home services accessible, reliable, and affordable for everyone.",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Our Vision",
      description: "To become the most trusted platform for home services, transforming how people maintain and improve their homes.",
      color: "from-red-500 to-pink-600"
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Our Values",
      description: "Quality, trust, transparency, and customer satisfaction are at the core of everything we do.",
      color: "from-green-500 to-emerald-600"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Our Team",
      description: "A diverse group of passionate individuals dedicated to revolutionizing the home services industry.",
      color: "from-purple-500 to-indigo-600"
    }
  ];

  const team = [
    {
      name: "PRAKRUTI BHASKAR",
      role: "CEO & Founder",
      bio: "10+ years in home services industry",
      social: { linkedin: "#", twitter: "#" }
    },
    {
      name: "R VANDANAA",
      role: "CTO",
      bio: "Tech leader with expertise in platform development",
      social: { linkedin: "#", twitter: "#" }
    },
    {
      name: "PRANAV RAGHURAMAN",
      role: "Head of Operations",
      bio: "Operations expert ensuring service quality",
      social: { linkedin: "#", twitter: "#" }
    },
    {
      name: "PRIYA K C ",
      role: "Customer Success Manager",
      bio: "Dedicated to customer satisfaction and support",
      social: { linkedin: "#", twitter: "#" }
    }
  ];

  const milestones = [
    { year: "2019", title: "Company Founded", description: "Started with a vision to transform home services" },
    { year: "2020", title: "First 1,000 Customers", description: "Reached our first major milestone" },
    { year: "2021", title: "Expanded Services", description: "Added renovation and personal services" },
    { year: "2022", title: "10,000+ Happy Customers", description: "Achieved significant customer base" },
    { year: "2023", title: "500+ Professionals", description: "Built a network of skilled professionals" },
    { year: "2024", title: "AI Integration", description: "Launched smart matching technology" }
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 to-primary-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container-custom py-20 lg:py-32 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Badge variant="secondary" className="mb-6 bg-white/20 text-white border-white/30">
              About COOLIE
            </Badge>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-6 leading-tight">
              Transforming Home Services
              <span className="block text-accent-300">One Connection at a Time</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-primary-100 mb-8 leading-relaxed">
              We're on a mission to make professional home services accessible, reliable, and affordable for everyone. 
              Connecting homeowners with trusted professionals since 2025.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/home">
              <Button 
                size="lg" 
                variant="secondary" 
                className="w-full sm:w-auto"
                autoRefresh={true}
                refreshDelay={1200}
              >
                Our Services
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              </Link>
              <Link to="/contact">
              <Button 
                size="lg" 
                variant="outline" 
                className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-primary-600"
                autoRefresh={true}
                refreshDelay={1000}
              >
                Contact Us
              </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div className="text-4xl lg:text-5xl font-bold text-primary-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-neutral-600 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-neutral-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <Badge variant="primary" className="mb-4">
              Our Foundation
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-display font-bold text-neutral-900 mb-6">
              What Drives Us Forward
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Our core values and principles that guide every decision we make and every service we provide.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card hover className="h-full">
                  <div className={`w-16 h-16 bg-gradient-to-r ${value.color} rounded-2xl flex items-center justify-center text-white mb-6`}>
                    {value.icon}
                  </div>
                  
                  <h3 className="text-2xl font-bold text-neutral-900 mb-4">
                    {value.title}
                  </h3>
                  
                  <p className="text-neutral-600 leading-relaxed">
                    {value.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <Badge variant="primary" className="mb-4">
              Meet Our Team
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-display font-bold text-neutral-900 mb-6">
              The People Behind COOLIE
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Our diverse team of passionate professionals working together to revolutionize home services.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card hover className="text-center">
                  <div className="relative mb-6">
                   
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-neutral-900 mb-2">
                    {member.name}
                  </h3>
                  
                  <p className="text-primary-600 font-medium mb-3">
                    {member.role}
                  </p>
                  
                  <p className="text-neutral-600 text-sm mb-4">
                    {member.bio}
                  </p>
                  
                  <Button 
                    variant="ghost" 
                    size="sm"
                    autoRefresh={true}
                    refreshDelay={800}
                  >
                    Connect
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-neutral-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <Badge variant="primary" className="mb-4">
              Our Journey
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-display font-bold text-neutral-900 mb-6">
              Milestones & Achievements
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              From a small startup to a trusted platform serving thousands of customers across the country.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`flex items-center mb-12 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
              >
                <div className={`flex-1 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                  <Card className="inline-block">
                    <div className="text-primary-600 font-bold text-lg mb-2">
                      {milestone.year}
                    </div>
                    <h3 className="text-xl font-bold text-neutral-900 mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-neutral-600">
                      {milestone.description}
                    </p>
                  </Card>
                </div>
                
                <div className="w-4 h-4 bg-primary-600 rounded-full border-4 border-white shadow-lg z-10"></div>
                
                <div className="flex-1"></div>
              </motion.div>
            ))}
          </div>
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
              Ready to Experience the Difference?
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust COOLIE for their home service needs.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="secondary" 
                size="lg" 
                className="w-full sm:w-auto"
                autoRefresh={true}
                refreshDelay={1200}
              >
                Get Started Today
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-primary-600"
                autoRefresh={true}
                refreshDelay={1000}
              >
                Learn More
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Debug Info */}
      {process.env.NODE_ENV === 'development' && refreshCount > 0 && (
        <div className="fixed bottom-4 left-4 bg-neutral-800 text-white px-3 py-2 rounded-lg text-xs">
          About Refreshes: {refreshCount}
        </div>
      )}
    </div>
  );
}