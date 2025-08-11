import React from 'react';
import { motion } from 'framer-motion';
import { 
  Star, 
  Users, 
  Trophy, 
  Zap, 
  BookOpen, 
  Code, 
  Brain,
  Target,
  Award,
  TrendingUp,
  CheckCircle,
  ArrowRight
} from 'lucide-react';

export const LandingPageContent: React.FC = () => {
  return (
    <div className="space-y-16">
      {/* Hero Section with SEO-rich content */}
      <section className="text-center px-4">
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-casino-gold-400 via-casino-gold-300 to-casino-gold-500 mb-4 sm:mb-6 leading-tight">
          Free Educational Gaming Platform
        </h1>
        <h2 className="text-xl sm:text-2xl md:text-3xl text-white mb-4 sm:mb-6 leading-relaxed">
          Learn Math, Physics, Chemistry & Programming Through Interactive Games
        </h2>
        <p className="text-lg sm:text-xl text-gray-300 max-w-4xl mx-auto mb-6 sm:mb-8 leading-relaxed px-2">
          Join over 10,000 students worldwide who are transforming their education through gamified learning. 
          Earn XP, compete in tournaments, and master academic subjects with our AI-powered tutoring system.
        </p>
        
        <div className="grid grid-cols-2 sm:flex sm:flex-wrap justify-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-400 max-w-2xl mx-auto">
          <span className="flex items-center space-x-1">
            <CheckCircle className="w-4 h-4 text-green-400" />
            <span>100% Free to Start</span>
          </span>
          <span className="flex items-center space-x-1">
            <CheckCircle className="w-4 h-4 text-green-400" />
            <span>No Credit Card Required</span>
          </span>
          <span className="flex items-center space-x-1">
            <CheckCircle className="w-4 h-4 text-green-400" />
            <span>Instant Access</span>
          </span>
          <span className="flex items-center space-x-1">
            <CheckCircle className="w-4 h-4 text-green-400" />
            <span>Mobile Friendly</span>
          </span>
        </div>
      </section>

      {/* Features Section */}
      <section>
        <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white text-center mb-8 sm:mb-12 px-4">
          Why Choose Scholars Casino for Online Learning?
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 px-4">
          {[
            {
              icon: Zap,
              title: "Interactive Math Games",
              description: "Master algebra, calculus, geometry, and statistics through engaging quiz games. From basic arithmetic to advanced mathematical concepts.",
              keywords: "math games, algebra quizzes, calculus practice"
            },
            {
              icon: Code,
              title: "Coding Challenges",
              description: "Learn programming with hands-on coding challenges. Master HTML, CSS, JavaScript, Python, React, Angular, Vue, and Node.js.",
              keywords: "coding challenges, programming tutorials, web development"
            },
            {
              icon: Brain,
              title: "AI-Powered Tutoring",
              description: "Get personalized learning recommendations from our AI tutor. Adaptive difficulty ensures optimal challenge levels for maximum learning efficiency.",
              keywords: "AI tutoring, personalized learning, adaptive education"
            },
            {
              icon: Trophy,
              title: "Competitive Tournaments",
              description: "Join live tournaments and compete with students worldwide. Win prizes, climb leaderboards, and showcase your academic knowledge.",
              keywords: "educational tournaments, student competitions, academic contests"
            },
            {
              icon: Target,
              title: "Physics Simulations",
              description: "Explore physics concepts through interactive simulations. Master mechanics, thermodynamics, quantum physics, and electromagnetism.",
              keywords: "physics games, physics simulations, interactive physics"
            },
            {
              icon: BookOpen,
              title: "Chemistry Lab Games",
              description: "Learn chemistry through virtual lab experiments. Master organic chemistry, periodic table, molecular structures, and chemical reactions.",
              keywords: "chemistry games, virtual chemistry lab, molecular structure"
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="bg-gray-800/50 rounded-xl p-4 sm:p-6 border border-gray-700/50 mobile-fade-in"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="bg-blue-600 rounded-lg p-2 sm:p-3 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center mb-3 sm:mb-4">
                <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-3">{feature.title}</h3>
              <p className="text-gray-300 mb-3 sm:mb-4 text-sm sm:text-base leading-relaxed">{feature.description}</p>
              <div className="text-xs text-gray-500 hidden sm:block">
                Keywords: {feature.keywords}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Statistics Section */}
      <section className="bg-gray-800/30 rounded-2xl p-4 sm:p-6 lg:p-8 mx-4">
        <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white text-center mb-8 sm:mb-12">
          Join Thousands of Successful Learners
        </h2>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {[
            { number: "10,000+", label: "Active Students", icon: Users },
            { number: "50,000+", label: "Quizzes Completed", icon: Target },
            { number: "500+", label: "Coding Challenges", icon: Code },
            { number: "95%", label: "Student Satisfaction", icon: Star }
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="bg-casino-gold-500 rounded-full p-3 sm:p-4 w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <stat.icon className="w-6 h-6 sm:w-8 sm:h-8 text-gray-900" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2">{stat.number}</div>
              <div className="text-gray-400 text-sm sm:text-base">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Subjects Section */}
      <section>
        <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white text-center mb-8 sm:mb-12 px-4">
          Master Every Subject Through Gamified Learning
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 px-4">
          {[
            {
              title: "Mathematics & Statistics",
              description: "From basic arithmetic to advanced calculus, master mathematical concepts through interactive quizzes and problem-solving games.",
              subjects: ["Algebra", "Geometry", "Calculus", "Statistics", "Trigonometry"],
              color: "from-green-500 to-emerald-600",
              emoji: "🧮"
            },
            {
              title: "Programming & Web Development",
              description: "Learn to code with hands-on challenges. Master frontend and backend development with modern frameworks and tools.",
              subjects: ["HTML/CSS", "JavaScript", "Python", "React", "Node.js"],
              color: "from-blue-500 to-cyan-600",
              emoji: "💻"
            },
            {
              title: "Physics & Engineering",
              description: "Explore the laws of nature through interactive simulations and challenging physics problems.",
              subjects: ["Mechanics", "Thermodynamics", "Electromagnetism", "Quantum Physics"],
              color: "from-purple-500 to-indigo-600",
              emoji: "⚡"
            },
            {
              title: "Chemistry & Molecular Science",
              description: "Understand chemical reactions, molecular structures, and laboratory techniques through virtual experiments.",
              subjects: ["Organic Chemistry", "Inorganic Chemistry", "Physical Chemistry", "Biochemistry"],
              color: "from-pink-500 to-rose-600",
              emoji: "🧪"
            }
          ].map((category, index) => (
            <motion.div
              key={index}
              className={`bg-gradient-to-br ${category.color} rounded-xl p-4 sm:p-6 text-white`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
                <div className="text-3xl sm:text-4xl">{category.emoji}</div>
                <h3 className="text-xl sm:text-2xl font-bold leading-tight">{category.title}</h3>
              </div>
              <p className="text-white/90 mb-4 sm:mb-6 text-sm sm:text-base leading-relaxed">{category.description}</p>
              <div className="flex flex-wrap gap-1 sm:gap-2">
                {category.subjects.map((subject) => (
                  <span
                    key={subject}
                    className="px-2 sm:px-3 py-1 bg-white/20 rounded-full text-xs sm:text-sm font-medium"
                  >
                    {subject}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-6 sm:p-8 lg:p-12 mx-4">
        <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white mb-3 sm:mb-4">
          Ready to Transform Your Learning Experience?
        </h2>
        <p className="text-lg sm:text-xl text-blue-100 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
          Join thousands of students who are already learning faster and having more fun with Scholars Casino. 
          Start your gamified education journey today - completely free!
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <motion.button
            className="bg-white text-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2 touch-manipulation"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Start Learning Free</span>
            <ArrowRight className="w-5 h-5" />
          </motion.button>
          
          <motion.button
            className="border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-white hover:text-blue-600 transition-colors touch-manipulation"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Watch Demo
          </motion.button>
        </div>
      </section>
    </div>
  );
};