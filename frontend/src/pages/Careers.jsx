import { motion } from "framer-motion";
import { MapPin, Clock, Users, Briefcase, Heart, Star, ArrowRight, Send } from "lucide-react";
import { Button, Card, Badge, Input } from "../components/ui";
import { useAutoRefresh } from "../hooks/useAutoRefresh";
import { useState } from "react";

export default function Careers() {
  const [selectedJob, setSelectedJob] = useState(null);

  // Auto-refresh functionality
  const refreshCareersData = async (source = 'manual') => {
    console.log(`Careers page refreshed from ${source}`);
  };

  const { isRefreshing, refreshCount } = useAutoRefresh(
    refreshCareersData,
    {
      enabled: true,
      onButtonClick: true,
      debounceMs: 1000,
    }
  );

  const benefits = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Health & Wellness",
      description: "Comprehensive health insurance, mental health support, and wellness programs",
      color: "from-red-500 to-pink-600"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Work-Life Balance",
      description: "Flexible working hours, remote work options, and generous vacation policy",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: "Growth & Learning",
      description: "Professional development budget, mentorship programs, and skill enhancement",
      color: "from-yellow-500 to-orange-600"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Team Culture",
      description: "Inclusive environment, team events, and collaborative workspace",
      color: "from-green-500 to-emerald-600"
    }
  ];

  const openPositions = [
    {
      id: 1,
      title: "Senior Full Stack Developer",
      department: "Engineering",
      location: "Mumbai, India",
      type: "Full-time",
      experience: "3-5 years",
      description: "Join our engineering team to build scalable web applications and improve our platform.",
      requirements: [
        "3+ years of experience with React and Node.js",
        "Experience with databases (MongoDB, PostgreSQL)",
        "Knowledge of cloud platforms (AWS, Azure)",
        "Strong problem-solving skills"
      ],
      responsibilities: [
        "Develop and maintain web applications",
        "Collaborate with cross-functional teams",
        "Write clean, maintainable code",
        "Participate in code reviews"
      ]
    },
    {
      id: 2,
      title: "Product Manager",
      department: "Product",
      location: "Bangalore, India",
      type: "Full-time",
      experience: "4-6 years",
      description: "Lead product strategy and work with engineering teams to deliver exceptional user experiences.",
      requirements: [
        "4+ years of product management experience",
        "Experience with agile methodologies",
        "Strong analytical and communication skills",
        "Background in tech or marketplace products"
      ],
      responsibilities: [
        "Define product roadmap and strategy",
        "Work with engineering and design teams",
        "Analyze user feedback and metrics",
        "Manage product launches"
      ]
    },
    {
      id: 3,
      title: "UX/UI Designer",
      department: "Design",
      location: "Delhi, India",
      type: "Full-time",
      experience: "2-4 years",
      description: "Create beautiful and intuitive user experiences for our platform and mobile applications.",
      requirements: [
        "2+ years of UX/UI design experience",
        "Proficiency in Figma, Sketch, or similar tools",
        "Understanding of user-centered design principles",
        "Portfolio showcasing design work"
      ],
      responsibilities: [
        "Design user interfaces and experiences",
        "Create wireframes and prototypes",
        "Conduct user research and testing",
        "Collaborate with product and engineering teams"
      ]
    },
    {
      id: 4,
      title: "Customer Success Manager",
      department: "Customer Success",
      location: "Pune, India",
      type: "Full-time",
      experience: "2-3 years",
      description: "Help our customers succeed by providing exceptional support and building strong relationships.",
      requirements: [
        "2+ years in customer success or support",
        "Excellent communication skills",
        "Problem-solving mindset",
        "Experience with CRM tools"
      ],
      responsibilities: [
        "Manage customer relationships",
        "Provide product support and training",
        "Identify upselling opportunities",
        "Gather customer feedback"
      ]
    },
    {
      id: 5,
      title: "DevOps Engineer",
      department: "Engineering",
      location: "Hyderabad, India",
      type: "Full-time",
      experience: "3-5 years",
      description: "Build and maintain our infrastructure, ensuring scalability and reliability of our services.",
      requirements: [
        "3+ years of DevOps experience",
        "Experience with AWS, Docker, Kubernetes",
        "Knowledge of CI/CD pipelines",
        "Scripting skills (Python, Bash)"
      ],
      responsibilities: [
        "Manage cloud infrastructure",
        "Implement CI/CD pipelines",
        "Monitor system performance",
        "Ensure security best practices"
      ]
    },
    {
      id: 6,
      title: "Marketing Specialist",
      department: "Marketing",
      location: "Mumbai, India",
      type: "Full-time",
      experience: "1-3 years",
      description: "Drive growth through digital marketing campaigns and brand building initiatives.",
      requirements: [
        "1+ years of digital marketing experience",
        "Knowledge of SEO, SEM, social media",
        "Experience with analytics tools",
        "Creative thinking and data-driven approach"
      ],
      responsibilities: [
        "Plan and execute marketing campaigns",
        "Manage social media presence",
        "Analyze campaign performance",
        "Create marketing content"
      ]
    }
  ];

  const stats = [
    { number: "50+", label: "Team Members" },
    { number: "15+", label: "Open Positions" },
    { number: "4.8/5", label: "Employee Rating" },
    { number: "95%", label: "Retention Rate" }
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
              Join Our Team
            </Badge>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-6 leading-tight">
              Build the Future of
              <span className="block text-accent-300">Home Services</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-primary-100 mb-8 leading-relaxed">
              Join a passionate team that's revolutionizing how people connect with home service professionals. 
              Make an impact while growing your career.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="secondary" 
                className="w-full sm:w-auto"
                autoRefresh={true}
                refreshDelay={1200}
                onClick={() => document.getElementById('open-positions').scrollIntoView({ behavior: 'smooth' })}
              >
                View Open Positions
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-primary-600"
                autoRefresh={true}
                refreshDelay={1000}
              >
                Learn About Culture
              </Button>
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

      {/* Benefits Section */}
      <section className="py-20 bg-neutral-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <Badge variant="primary" className="mb-4">
              Why Join Us
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-display font-bold text-neutral-900 mb-6">
              Benefits & Perks
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              We believe in taking care of our team members with comprehensive benefits and a supportive work environment.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card hover className="h-full">
                  <div className={`w-16 h-16 bg-gradient-to-r ${benefit.color} rounded-2xl flex items-center justify-center text-white mb-6`}>
                    {benefit.icon}
                  </div>
                  
                  <h3 className="text-2xl font-bold text-neutral-900 mb-4">
                    {benefit.title}
                  </h3>
                  
                  <p className="text-neutral-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions Section */}
      <section id="open-positions" className="py-20 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <Badge variant="primary" className="mb-4">
              Open Positions
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-display font-bold text-neutral-900 mb-6">
              Join Our Growing Team
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              We're always looking for talented individuals who share our passion for innovation and excellence.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {openPositions.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card hover className="h-full cursor-pointer" onClick={() => setSelectedJob(job)}>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-neutral-900 mb-2">
                        {job.title}
                      </h3>
                      <Badge variant="primary" size="sm" className="mb-2">
                        {job.department}
                      </Badge>
                    </div>
                    <Briefcase className="w-6 h-6 text-primary-600" />
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-neutral-600 mb-4">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{job.type}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{job.experience}</span>
                    </div>
                  </div>
                  
                  <p className="text-neutral-600 mb-6 leading-relaxed">
                    {job.description}
                  </p>
                  
                  
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Section */}
      <section className="py-20 bg-neutral-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <Badge variant="primary" className="mb-4">
              Apply Now
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-display font-bold text-neutral-900 mb-6">
              Don't See Your Role?
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              We're always interested in hearing from talented individuals. Send us your resume and we'll keep you in mind for future opportunities.
            </p>
          </motion.div>

          <div className="max-w-2xl mx-auto">
            <Card>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Input
                    label="Full Name"
                    placeholder="Enter your full name"
                    required
                  />
                  <Input
                    label="Email Address"
                    type="email"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <Input
                    label="Phone Number"
                    placeholder="Enter your phone number"
                  />
                  <Input
                    label="Position of Interest"
                    placeholder="e.g., Software Engineer"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Cover Letter
                  </label>
                  <textarea
                    className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:ring-4 focus:ring-primary-200 focus:border-primary-500 focus:outline-none transition-all duration-300 bg-white resize-none"
                    rows="6"
                    placeholder="Tell us about yourself and why you'd like to join COOLIE..."
                  ></textarea>
                </div>
                
                
                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full"
                  autoRefresh={true}
                  refreshDelay={1500}
                >
                  Submit Application
                  <Send className="ml-2 w-5 h-5" />
                </Button>
              </form>
            </Card>
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
              Ready to Make an Impact?
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Join our mission to transform the home services industry and build something amazing together.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="secondary" 
                size="lg" 
                className="w-full sm:w-auto"
                autoRefresh={true}
                refreshDelay={1200}
              >
                View All Positions
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-primary-600"
                autoRefresh={true}
                refreshDelay={1000}
              >
                Contact HR
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Debug Info */}
      {process.env.NODE_ENV === 'development' && refreshCount > 0 && (
        <div className="fixed bottom-4 left-4 bg-neutral-800 text-white px-3 py-2 rounded-lg text-xs">
          Careers Refreshes: {refreshCount}
        </div>
      )}
    </div>
  );
}