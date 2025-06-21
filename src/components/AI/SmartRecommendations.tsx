import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Lightbulb, 
  BookOpen, 
  Clock, 
  Target, 
  Brain,
  ArrowRight,
  X,
  Award,
  Zap,
  BarChart3,
  CheckCircle,
  Star,
  Sparkles,
  Flame,
  Trophy
} from 'lucide-react';

interface SmartRecommendationsProps {
  onClose: () => void;
  userLevel: number;
  userStats: {
    gamesPlayed: number;
    questionsAnswered: number;
    correctAnswers: number;
    streakRecord: number;
  };
}

interface RecommendedResource {
  id: string;
  title: string;
  type: 'quiz' | 'challenge' | 'tutorial' | 'practice';
  subject: string;
  difficulty: 'basic' | 'intermediate' | 'advanced';
  estimatedTime: number;
  matchScore: number;
  description: string;
  icon: string;
  benefits: string[];
  aiReasoning: string;
}

interface LearningPath {
  id: string;
  title: string;
  description: string;
  steps: {
    title: string;
    type: string;
    subject: string;
    completed?: boolean;
  }[];
  estimatedCompletion: string;
  progress: number;
}

export const SmartRecommendations: React.FC<SmartRecommendationsProps> = ({
  onClose,
  userLevel,
  userStats
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState<'resources' | 'paths' | 'schedule'>('resources');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  
  // Mock recommended resources
  const [recommendedResources, setRecommendedResources] = useState<RecommendedResource[]>([
    {
      id: '1',
      title: 'Advanced Calculus Challenge',
      type: 'challenge',
      subject: 'mathematics',
      difficulty: 'advanced',
      estimatedTime: 25,
      matchScore: 98,
      description: 'Test your calculus skills with integration by parts and differential equations',
      icon: '🧮',
      benefits: ['Strengthen calculus fundamentals', 'Improve problem-solving speed', 'Prepare for higher-level math'],
      aiReasoning: 'Based on your strong performance in basic calculus (92% accuracy) and recent interest in advanced math topics'
    },
    {
      id: '2',
      title: 'Physics Mechanics Refresher',
      type: 'tutorial',
      subject: 'physics',
      difficulty: 'intermediate',
      estimatedTime: 15,
      matchScore: 95,
      description: 'Review key concepts in Newtonian mechanics with interactive simulations',
      icon: '⚡',
      benefits: ['Strengthen your weakest subject', 'Visual learning approach', 'Interactive examples'],
      aiReasoning: 'Recommended because physics is your lowest-scoring subject (68% accuracy) with recent improvement potential'
    },
    {
      id: '3',
      title: 'JavaScript Closures & Scope',
      type: 'practice',
      subject: 'javascript',
      difficulty: 'intermediate',
      estimatedTime: 20,
      matchScore: 92,
      description: 'Master JavaScript closures, scope, and the execution context',
      icon: '💻',
      benefits: ['Deepen JavaScript understanding', 'Prepare for advanced concepts', 'Practical coding exercises'],
      aiReasoning: 'Your coding quiz performance shows strong fundamentals but confusion with scope concepts'
    },
    {
      id: '4',
      title: 'Organic Chemistry Functional Groups',
      type: 'quiz',
      subject: 'chemistry',
      difficulty: 'intermediate',
      estimatedTime: 15,
      matchScore: 90,
      description: 'Test your knowledge of organic chemistry functional groups and reactions',
      icon: '🧪',
      benefits: ['Reinforce organic chemistry basics', 'Prepare for advanced topics', 'Visual molecular recognition'],
      aiReasoning: 'Recommended based on your recent improvement in chemistry and consistent study pattern'
    },
    {
      id: '5',
      title: 'Python Data Structures',
      type: 'challenge',
      subject: 'python',
      difficulty: 'intermediate',
      estimatedTime: 30,
      matchScore: 88,
      description: 'Implement and optimize Python data structures like lists, dictionaries, and sets',
      icon: '🐍',
      benefits: ['Practical coding experience', 'Algorithm optimization', 'Problem-solving skills'],
      aiReasoning: 'Your Python quiz scores show strong syntax knowledge but room for improvement in data structure optimization'
    },
    {
      id: '6',
      title: 'HTML & CSS Responsive Design',
      type: 'tutorial',
      subject: 'html',
      difficulty: 'basic',
      estimatedTime: 20,
      matchScore: 85,
      description: 'Learn responsive web design principles with HTML and CSS',
      icon: '🌐',
      benefits: ['Mobile-first design approach', 'Flexbox and Grid mastery', 'Real-world examples'],
      aiReasoning: 'Recommended to complement your strong JavaScript skills with better frontend fundamentals'
    }
  ]);

  // Mock learning paths
  const [learningPaths, setLearningPaths] = useState<LearningPath[]>([
    {
      id: '1',
      title: 'Full-Stack Web Development',
      description: 'Master front-end and back-end web development technologies',
      steps: [
        { title: 'HTML & CSS Fundamentals', type: 'tutorial', subject: 'html', completed: true },
        { title: 'JavaScript Essentials', type: 'challenge', subject: 'javascript', completed: true },
        { title: 'React Components & Hooks', type: 'practice', subject: 'react', completed: false },
        { title: 'Node.js & Express API', type: 'challenge', subject: 'nodejs', completed: false },
        { title: 'Database Integration', type: 'tutorial', subject: 'database', completed: false },
        { title: 'Full-Stack Project', type: 'project', subject: 'fullstack', completed: false }
      ],
      estimatedCompletion: '4 weeks',
      progress: 33
    },
    {
      id: '2',
      title: 'Advanced Mathematics',
      description: 'Deep dive into calculus, linear algebra, and statistics',
      steps: [
        { title: 'Calculus Fundamentals', type: 'tutorial', subject: 'mathematics', completed: true },
        { title: 'Linear Algebra Basics', type: 'challenge', subject: 'mathematics', completed: false },
        { title: 'Differential Equations', type: 'practice', subject: 'mathematics', completed: false },
        { title: 'Probability & Statistics', type: 'tutorial', subject: 'mathematics', completed: false },
        { title: 'Mathematical Modeling', type: 'project', subject: 'mathematics', completed: false }
      ],
      estimatedCompletion: '6 weeks',
      progress: 20
    },
    {
      id: '3',
      title: 'Data Science Fundamentals',
      description: 'Learn the essentials of data analysis and machine learning',
      steps: [
        { title: 'Python for Data Science', type: 'tutorial', subject: 'python', completed: false },
        { title: 'Data Visualization', type: 'practice', subject: 'python', completed: false },
        { title: 'Statistical Analysis', type: 'challenge', subject: 'mathematics', completed: false },
        { title: 'Machine Learning Basics', type: 'tutorial', subject: 'ml', completed: false },
        { title: 'Predictive Modeling Project', type: 'project', subject: 'ml', completed: false }
      ],
      estimatedCompletion: '8 weeks',
      progress: 0
    }
  ]);

  // Weekly schedule recommendation
  const weeklySchedule = [
    {
      day: 'Monday',
      focus: 'Mathematics',
      activities: [
        { time: '9:00 AM', title: 'Calculus Practice', duration: 30, type: 'challenge' },
        { time: '5:00 PM', title: 'Algebra Review', duration: 20, type: 'quiz' }
      ]
    },
    {
      day: 'Tuesday',
      focus: 'Physics',
      activities: [
        { time: '10:00 AM', title: 'Mechanics Tutorial', duration: 25, type: 'tutorial' },
        { time: '6:00 PM', title: 'Problem Solving', duration: 20, type: 'practice' }
      ]
    },
    {
      day: 'Wednesday',
      focus: 'Programming',
      activities: [
        { time: '9:00 AM', title: 'JavaScript Challenge', duration: 30, type: 'challenge' },
        { time: '5:00 PM', title: 'Python Basics', duration: 25, type: 'tutorial' }
      ]
    },
    {
      day: 'Thursday',
      focus: 'Chemistry',
      activities: [
        { time: '11:00 AM', title: 'Organic Chemistry', duration: 25, type: 'quiz' },
        { time: '7:00 PM', title: 'Chemical Reactions', duration: 20, type: 'practice' }
      ]
    },
    {
      day: 'Friday',
      focus: 'Mixed Review',
      activities: [
        { time: '10:00 AM', title: 'Weekly Challenge', duration: 30, type: 'challenge' },
        { time: '4:00 PM', title: 'Weak Areas Focus', duration: 25, type: 'practice' }
      ]
    },
    {
      day: 'Saturday',
      focus: 'Project Work',
      activities: [
        { time: '11:00 AM', title: 'Coding Project', duration: 45, type: 'project' }
      ]
    },
    {
      day: 'Sunday',
      focus: 'Rest & Review',
      activities: [
        { time: '3:00 PM', title: 'Weekly Review', duration: 30, type: 'review' }
      ]
    }
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    
    return () => clearTimeout(timer);
  }, []);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'quiz': return <Target className="w-4 h-4 text-blue-400" />;
      case 'challenge': return <Flame className="w-4 h-4 text-orange-400" />;
      case 'tutorial': return <BookOpen className="w-4 h-4 text-green-400" />;
      case 'practice': return <Zap className="w-4 h-4 text-yellow-400" />;
      case 'project': return <Trophy className="w-4 h-4 text-purple-400" />;
      case 'review': return <CheckCircle className="w-4 h-4 text-indigo-400" />;
      default: return <Lightbulb className="w-4 h-4 text-gray-400" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'basic': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'intermediate': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'advanced': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const filteredResources = selectedSubject === 'all' 
    ? recommendedResources 
    : recommendedResources.filter(resource => resource.subject === selectedSubject);

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <motion.div
        className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-2xl w-full max-w-7xl h-[95vh] overflow-hidden"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-yellow-600 to-orange-700 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-white/20 rounded-full p-3">
                <Lightbulb className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-heading font-bold text-white">
                  Smart Recommendations
                </h2>
                <p className="text-yellow-100">AI-powered learning suggestions tailored for you</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="bg-white/10 rounded-lg px-3 py-2">
                <div className="flex items-center space-x-2">
                  <Brain className="w-4 h-4 text-white" />
                  <span className="text-white text-sm font-medium">ML-Powered</span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-white hover:text-gray-200 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex space-x-1 mt-6 bg-white/10 rounded-lg p-1">
            {[
              { id: 'resources', label: 'Recommended Resources', icon: BookOpen },
              { id: 'paths', label: 'Learning Paths', icon: Target },
              { id: 'schedule', label: 'Optimal Schedule', icon: Clock }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id as any)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all ${
                  selectedTab === tab.id
                    ? 'bg-white text-orange-600 shadow-sm'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span className="text-sm font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 h-[calc(95vh-144px)] overflow-y-auto">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="w-16 h-16 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mb-4" />
              <p className="text-white text-lg">Analyzing your learning patterns...</p>
              <p className="text-gray-400 text-sm mt-2">Our AI is generating personalized recommendations</p>
            </div>
          ) : (
            <>
              {selectedTab === 'resources' && (
                <div className="space-y-8">
                  {/* AI Explanation */}
                  <div className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 rounded-xl p-6 border border-yellow-500/20">
                    <div className="flex items-start space-x-4">
                      <div className="bg-yellow-500/20 rounded-lg p-3 mt-1">
                        <Brain className="w-6 h-6 text-yellow-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-2">How AI Generated These Recommendations</h3>
                        <p className="text-gray-300">
                          Our TensorFlow.js model analyzed your learning patterns, performance history, and study habits to identify optimal resources. 
                          The model considers your strengths (Mathematics, 92% accuracy), areas for improvement (Physics, 68% accuracy), 
                          and your learning style (visual-spatial with preference for interactive content).
                        </p>
                        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div className="bg-gray-800/50 rounded-lg p-3">
                            <div className="text-yellow-400 font-medium mb-1">Learning Style</div>
                            <div className="text-white">Visual-Spatial</div>
                          </div>
                          <div className="bg-gray-800/50 rounded-lg p-3">
                            <div className="text-yellow-400 font-medium mb-1">Optimal Session</div>
                            <div className="text-white">20-30 minutes</div>
                          </div>
                          <div className="bg-gray-800/50 rounded-lg p-3">
                            <div className="text-yellow-400 font-medium mb-1">Peak Performance</div>
                            <div className="text-white">Morning (9-11 AM)</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Subject Filter */}
                  <div className="flex items-center space-x-2 mb-6">
                    <span className="text-gray-400 text-sm">Filter by subject:</span>
                    <div className="flex flex-wrap gap-2">
                      {['all', 'mathematics', 'physics', 'chemistry', 'javascript', 'python', 'html'].map((subject) => (
                        <button
                          key={subject}
                          onClick={() => setSelectedSubject(subject)}
                          className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors capitalize ${
                            selectedSubject === subject
                              ? 'bg-yellow-600 text-white'
                              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                          }`}
                        >
                          {subject === 'all' ? 'All Subjects' : subject}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Resources Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredResources.map((resource, index) => (
                      <motion.div
                        key={resource.id}
                        className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50 hover:border-yellow-500/30 transition-all duration-300"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <div className="text-3xl">{resource.icon}</div>
                            <div>
                              <div className="flex items-center space-x-2">
                                <span className="text-xs px-2 py-0.5 rounded-full border capitalize flex items-center space-x-1 bg-gray-700/50 text-gray-300 border-gray-600/50">
                                  {getTypeIcon(resource.type)}
                                  <span>{resource.type}</span>
                                </span>
                                <span className={`text-xs px-2 py-0.5 rounded-full border capitalize ${getDifficultyColor(resource.difficulty)}`}>
                                  {resource.difficulty}
                                </span>
                              </div>
                              <h4 className="font-semibold text-white mt-1">{resource.title}</h4>
                            </div>
                          </div>
                          <div className="bg-yellow-500/20 rounded-full h-10 w-10 flex items-center justify-center">
                            <div className="text-xs font-bold text-yellow-400">{resource.matchScore}%</div>
                          </div>
                        </div>
                        
                        <p className="text-gray-300 text-sm mb-4">{resource.description}</p>
                        
                        <div className="space-y-2 mb-4">
                          {resource.benefits.map((benefit, idx) => (
                            <div key={idx} className="flex items-center space-x-2 text-sm">
                              <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                              <span className="text-gray-300">{benefit}</span>
                            </div>
                          ))}
                        </div>
                        
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center space-x-1 text-gray-400">
                            <Clock className="w-4 h-4" />
                            <span>{resource.estimatedTime} min</span>
                          </div>
                          
                          <button className="flex items-center space-x-1 text-yellow-400 hover:text-yellow-300 transition-colors">
                            <span>Start Now</span>
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                        
                        <div className="mt-4 pt-4 border-t border-gray-700/50">
                          <div className="flex items-start space-x-2">
                            <Lightbulb className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                            <p className="text-xs text-gray-400">{resource.aiReasoning}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {selectedTab === 'paths' && (
                <div className="space-y-8">
                  {/* AI Explanation */}
                  <div className="bg-gradient-to-r from-blue-900/30 to-indigo-900/30 rounded-xl p-6 border border-blue-500/20">
                    <div className="flex items-start space-x-4">
                      <div className="bg-blue-500/20 rounded-lg p-3 mt-1">
                        <Target className="w-6 h-6 text-blue-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-2">AI-Generated Learning Paths</h3>
                        <p className="text-gray-300">
                          Our machine learning algorithm has created personalized learning paths based on your goals and current skill level.
                          Each path provides a structured sequence of resources to help you master a specific area.
                        </p>
                        <div className="mt-4 flex items-center space-x-2 text-sm text-blue-300">
                          <Sparkles className="w-4 h-4" />
                          <span>Complete paths to earn special achievements and bonus XP!</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Learning Paths */}
                  <div className="space-y-6">
                    {learningPaths.map((path, index) => (
                      <motion.div
                        key={path.id}
                        className="bg-gray-800/50 rounded-xl overflow-hidden border border-gray-700/50 hover:border-blue-500/30 transition-all duration-300"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.01 }}
                      >
                        <div className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="text-xl font-semibold text-white mb-1">{path.title}</h3>
                              <p className="text-gray-400 text-sm">{path.description}</p>
                            </div>
                            <div className="bg-blue-500/20 rounded-lg px-3 py-1 flex items-center space-x-2">
                              <Clock className="w-4 h-4 text-blue-400" />
                              <span className="text-sm text-blue-300">{path.estimatedCompletion}</span>
                            </div>
                          </div>
                          
                          {/* Progress Bar */}
                          <div className="mb-6">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm text-gray-400">Progress</span>
                              <span className="text-sm text-white font-medium">{path.progress}%</span>
                            </div>
                            <div className="h-2 bg-gray-700 rounded-full">
                              <div 
                                className="h-full bg-blue-500 rounded-full" 
                                style={{ width: `${path.progress}%` }}
                              />
                            </div>
                          </div>
                          
                          {/* Path Steps */}
                          <div className="space-y-3">
                            {path.steps.map((step, stepIndex) => (
                              <div 
                                key={stepIndex}
                                className={`flex items-center space-x-3 p-3 rounded-lg ${
                                  step.completed 
                                    ? 'bg-green-900/20 border border-green-500/30' 
                                    : stepIndex === path.steps.findIndex(s => !s.completed)
                                    ? 'bg-blue-900/20 border border-blue-500/30'
                                    : 'bg-gray-700/30 border border-gray-600/30'
                                }`}
                              >
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                                  step.completed 
                                    ? 'bg-green-500 text-white' 
                                    : stepIndex === path.steps.findIndex(s => !s.completed)
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-600 text-gray-300'
                                }`}>
                                  {step.completed ? (
                                    <CheckCircle className="w-4 h-4" />
                                  ) : (
                                    stepIndex + 1
                                  )}
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center justify-between">
                                    <span className={`font-medium ${
                                      step.completed 
                                        ? 'text-green-300' 
                                        : stepIndex === path.steps.findIndex(s => !s.completed)
                                        ? 'text-blue-300'
                                        : 'text-gray-300'
                                    }`}>
                                      {step.title}
                                    </span>
                                    <span className="text-xs text-gray-400 capitalize">{step.type}</span>
                                  </div>
                                  <div className="text-xs text-gray-400 capitalize">{step.subject}</div>
                                </div>
                                {stepIndex === path.steps.findIndex(s => !s.completed) && (
                                  <button className="bg-blue-600 hover:bg-blue-500 text-white text-xs px-3 py-1 rounded-lg transition-colors">
                                    Start
                                  </button>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        {/* Path Footer */}
                        <div className="bg-gray-800 p-4 border-t border-gray-700/50 flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Award className="w-4 h-4 text-yellow-400" />
                            <span className="text-sm text-gray-300">Earn <span className="text-yellow-400 font-medium">500 XP</span> upon completion</span>
                          </div>
                          <button className="flex items-center space-x-1 text-sm text-blue-400 hover:text-blue-300 transition-colors">
                            <span>View Details</span>
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {selectedTab === 'schedule' && (
                <div className="space-y-8">
                  {/* AI Explanation */}
                  <div className="bg-gradient-to-r from-green-900/30 to-teal-900/30 rounded-xl p-6 border border-green-500/20">
                    <div className="flex items-start space-x-4">
                      <div className="bg-green-500/20 rounded-lg p-3 mt-1">
                        <Clock className="w-6 h-6 text-green-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-2">Your Optimal Study Schedule</h3>
                        <p className="text-gray-300">
                          Based on your learning patterns, performance data, and cognitive rhythms, our AI has created an optimal study schedule.
                          This schedule maximizes your learning efficiency by aligning with your peak performance times and balancing subjects.
                        </p>
                        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div className="bg-gray-800/50 rounded-lg p-3">
                            <div className="text-green-400 font-medium mb-1">Peak Performance</div>
                            <div className="text-white">9:00 AM - 11:00 AM</div>
                          </div>
                          <div className="bg-gray-800/50 rounded-lg p-3">
                            <div className="text-green-400 font-medium mb-1">Optimal Session Length</div>
                            <div className="text-white">25-30 minutes</div>
                          </div>
                          <div className="bg-gray-800/50 rounded-lg p-3">
                            <div className="text-green-400 font-medium mb-1">Recommended Breaks</div>
                            <div className="text-white">5 min after each session</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Weekly Schedule */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {weeklySchedule.map((day, index) => (
                      <motion.div
                        key={day.day}
                        className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50 hover:border-green-500/30 transition-all duration-300"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold text-white">{day.day}</h3>
                          <div className="bg-green-500/20 rounded-lg px-2 py-1">
                            <span className="text-xs text-green-400 font-medium">{day.focus}</span>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          {day.activities.map((activity, actIndex) => (
                            <div 
                              key={actIndex}
                              className="bg-gray-700/50 rounded-lg p-3 border border-gray-600/50"
                            >
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-sm font-medium text-white">{activity.title}</span>
                                <span className="text-xs text-gray-400">{activity.duration} min</span>
                              </div>
                              <div className="flex items-center justify-between text-xs">
                                <span className="text-gray-400">{activity.time}</span>
                                <div className="flex items-center space-x-1">
                                  {getTypeIcon(activity.type)}
                                  <span className="text-gray-400 capitalize">{activity.type}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        {day.activities.length < 2 && (
                          <div className="mt-3 flex justify-center">
                            <button className="text-xs text-green-400 hover:text-green-300 transition-colors flex items-center space-x-1">
                              <span>Add Activity</span>
                              <span>+</span>
                            </button>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>

                  {/* Schedule Insights */}
                  <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                      <Lightbulb className="w-5 h-5 text-yellow-400" />
                      <span>Schedule Insights</span>
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600/50">
                          <div className="flex items-center space-x-2 mb-2">
                            <Brain className="w-5 h-5 text-purple-400" />
                            <h4 className="font-medium text-white">Cognitive Rhythm</h4>
                          </div>
                          <p className="text-gray-300 text-sm">
                            Your performance data shows you learn most effectively in the morning, with a secondary peak in the late afternoon.
                            We've scheduled challenging topics during these optimal times.
                          </p>
                        </div>
                        
                        <div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600/50">
                          <div className="flex items-center space-x-2 mb-2">
                            <BarChart3 className="w-5 h-5 text-blue-400" />
                            <h4 className="font-medium text-white">Subject Balance</h4>
                          </div>
                          <p className="text-gray-300 text-sm">
                            Your schedule balances your strongest subjects (Mathematics, Programming) with areas needing improvement (Physics).
                            This approach maximizes progress while building confidence.
                          </p>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600/50">
                          <div className="flex items-center space-x-2 mb-2">
                            <Zap className="w-5 h-5 text-yellow-400" />
                            <h4 className="font-medium text-white">Spaced Repetition</h4>
                          </div>
                          <p className="text-gray-300 text-sm">
                            Your schedule implements optimal spaced repetition intervals, with topics revisited at 1, 3, and 7-day intervals
                            to maximize long-term retention based on the forgetting curve.
                          </p>
                        </div>
                        
                        <div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600/50">
                          <div className="flex items-center space-x-2 mb-2">
                            <Users className="w-5 h-5 text-green-400" />
                            <h4 className="font-medium text-white">Personalization</h4>
                          </div>
                          <p className="text-gray-300 text-sm">
                            This schedule is 87% more effective than generic plans, as it's tailored to your specific learning patterns,
                            strengths, weaknesses, and cognitive profile.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 flex justify-center">
                      <button className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-500 hover:to-teal-500 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>Add to Calendar</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};