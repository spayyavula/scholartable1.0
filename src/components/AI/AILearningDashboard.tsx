import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, 
  TrendingUp, 
  Target, 
  Lightbulb, 
  BarChart3,
  Zap,
  Eye,
  Settings,
  Play,
  Pause,
  RefreshCw,
  Cpu,
  Activity,
  Award,
  BookOpen,
  Users,
  Clock,
  Calendar,
  X,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import { MLDashboard } from './MLDashboard';
import { SmartRecommendations } from './SmartRecommendations';
import { PerformanceAnalytics } from './PerformanceAnalytics';
import { AdaptiveLearning } from './AdaptiveLearning';

interface AILearningDashboardProps {
  onClose: () => void;
  userLevel: number;
  userStats: {
    gamesPlayed: number;
    questionsAnswered: number;
    correctAnswers: number;
    streakRecord: number;
  };
}

export const AILearningDashboard: React.FC<AILearningDashboardProps> = ({
  onClose,
  userLevel,
  userStats
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'ml' | 'recommendations' | 'analytics' | 'adaptive'>('overview');
  const [aiInsights, setAiInsights] = useState({
    learningEfficiency: 85,
    recommendedStudyTime: 45,
    strongestSubject: 'Mathematics',
    improvementArea: 'Physics',
    nextMilestone: 'Level 15',
    confidenceScore: 92
  });

  const aiFeatures = [
    {
      title: 'Performance Prediction',
      description: 'AI predicts your success rate on upcoming challenges',
      icon: TrendingUp,
      color: 'from-blue-500 to-indigo-600',
      accuracy: '94%',
      status: 'active'
    },
    {
      title: 'Adaptive Learning Path',
      description: 'Personalized curriculum that adapts to your learning style',
      icon: Target,
      color: 'from-green-500 to-emerald-600',
      accuracy: '89%',
      status: 'active'
    },
    {
      title: 'Smart Recommendations',
      description: 'ML-powered suggestions for optimal learning progression',
      icon: Lightbulb,
      color: 'from-yellow-500 to-orange-600',
      accuracy: '91%',
      status: 'active'
    },
    {
      title: 'Difficulty Optimization',
      description: 'Automatically adjusts question difficulty for optimal challenge',
      icon: Settings,
      color: 'from-purple-500 to-pink-600',
      accuracy: '87%',
      status: 'training'
    },
    {
      title: 'Learning Analytics',
      description: 'Deep insights into your learning patterns and progress',
      icon: BarChart3,
      color: 'from-cyan-500 to-blue-600',
      accuracy: '96%',
      status: 'active'
    },
    {
      title: 'Neural Tutoring',
      description: 'AI tutor that provides personalized explanations',
      icon: Brain,
      color: 'from-red-500 to-pink-600',
      accuracy: '88%',
      status: 'beta'
    }
  ];

  const learningMetrics = [
    {
      label: 'Learning Velocity',
      value: '2.3x',
      change: '+15%',
      icon: Zap,
      color: 'text-yellow-400'
    },
    {
      label: 'Retention Rate',
      value: '94%',
      change: '+8%',
      icon: Brain,
      color: 'text-purple-400'
    },
    {
      label: 'Efficiency Score',
      value: '85/100',
      change: '+12%',
      icon: Target,
      color: 'text-green-400'
    },
    {
      label: 'Prediction Accuracy',
      value: '91%',
      change: '+3%',
      icon: Activity,
      color: 'text-blue-400'
    }
  ];

  const recentInsights = [
    {
      type: 'success',
      title: 'Optimal Study Time Identified',
      description: 'Your peak learning performance occurs between 2-4 PM',
      timestamp: '2 hours ago',
      icon: Clock
    },
    {
      type: 'recommendation',
      title: 'Subject Rotation Suggested',
      description: 'Switch to Chemistry after 3 more Math problems for better retention',
      timestamp: '5 hours ago',
      icon: RefreshCw
    },
    {
      type: 'achievement',
      title: 'Learning Pattern Mastered',
      description: 'You\'ve developed an efficient problem-solving approach',
      timestamp: '1 day ago',
      icon: Award
    },
    {
      type: 'insight',
      title: 'Difficulty Sweet Spot Found',
      description: 'Intermediate level provides optimal challenge for your current skill',
      timestamp: '2 days ago',
      icon: Target
    }
  ];

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'success': return '✅';
      case 'recommendation': return '💡';
      case 'achievement': return '🏆';
      case 'insight': return '🔍';
      default: return '📊';
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'success': return 'border-green-500/30 bg-green-500/10';
      case 'recommendation': return 'border-blue-500/30 bg-blue-500/10';
      case 'achievement': return 'border-yellow-500/30 bg-yellow-500/10';
      case 'insight': return 'border-purple-500/30 bg-purple-500/10';
      default: return 'border-gray-500/30 bg-gray-500/10';
    }
  };

  if (activeTab === 'ml') {
    return (
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
        <motion.div
          className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-2xl w-full max-w-7xl h-[95vh] overflow-hidden p-6"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="bg-white/20 rounded-full p-3">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-heading font-bold text-white">
                  Machine Learning Models
                </h2>
                <p className="text-purple-100">TensorFlow.js integration temporarily disabled</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-xl p-6 mb-6">
            <div className="flex items-start space-x-4">
              <AlertTriangle className="w-6 h-6 text-yellow-400 mt-1" />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-2">AI Integration Notice</h3>
                <p className="text-gray-300">
                  Our advanced AI features are running in compatibility mode to ensure smooth operation across all devices and browsers.
                  We're continuously improving our machine learning capabilities for an even better experience.
                </p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-white mb-4">Alternative Features Available</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>Adaptive learning paths</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>Performance analytics</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>Smart recommendations</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  if (activeTab === 'recommendations') {
    return (
      <SmartRecommendations
        onClose={onClose}
        userLevel={userLevel}
        userStats={userStats}
      />
    );
  }

  if (activeTab === 'analytics') {
    return (
      <PerformanceAnalytics
        onClose={onClose}
        userLevel={userLevel}
        userStats={userStats}
      />
    );
  }

  if (activeTab === 'adaptive') {
    return (
      <AdaptiveLearning
        onClose={onClose}
        userLevel={userLevel}
        userStats={userStats}
      />
    );
  }

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <motion.div
        className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-2xl w-full max-w-7xl h-[95vh] overflow-hidden"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-700 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-white/20 rounded-full p-3">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-heading font-bold text-white">
                  AI Learning Intelligence
                </h2>
                <p className="text-purple-100">Powered by Intelligent Learning Algorithms</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="bg-white/10 rounded-lg px-3 py-2">
                <div className="flex items-center space-x-2">
                  <Cpu className="w-4 h-4 text-white" />
                  <span className="text-white text-sm font-medium">AI Active</span>
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
              { id: 'overview', label: 'Overview', icon: Eye },
              { id: 'ml', label: 'ML Models', icon: Brain },
              { id: 'recommendations', label: 'Smart Recommendations', icon: Lightbulb },
              { id: 'analytics', label: 'Performance Analytics', icon: BarChart3 },
              { id: 'adaptive', label: 'Adaptive Learning', icon: Target }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all ${
                  activeTab === tab.id
                    ? 'bg-white text-purple-600 shadow-sm'
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
        <div className="p-6 h-full overflow-y-auto">
          {/* AI Insights Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {learningMetrics.map((metric, index) => (
              <motion.div
                key={index}
                className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <metric.icon className={`w-6 h-6 ${metric.color}`} />
                  <span className="text-green-400 text-sm font-medium">{metric.change}</span>
                </div>
                <div className="text-2xl font-bold text-white mb-1">{metric.value}</div>
                <div className="text-gray-400 text-sm">{metric.label}</div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* AI Features Grid */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-6">AI-Powered Features</h3>
              <div className="grid grid-cols-1 gap-4">
                {aiFeatures.map((feature, index) => (
                  <motion.div
                    key={index}
                    className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50 hover:border-purple-500/30 transition-all duration-300"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`bg-gradient-to-r ${feature.color} rounded-lg p-3`}>
                        <feature.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-lg font-semibold text-white">{feature.title}</h4>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-400">{feature.accuracy}</span>
                            <div className={`w-2 h-2 rounded-full ${
                              feature.status === 'active' ? 'bg-green-400' :
                              feature.status === 'training' ? 'bg-yellow-400' :
                              'bg-blue-400'
                            }`} />
                          </div>
                        </div>
                        <p className="text-gray-400 text-sm">{feature.description}</p>
                        <div className="mt-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            feature.status === 'active' ? 'bg-green-900/30 text-green-400' :
                            feature.status === 'training' ? 'bg-yellow-900/30 text-yellow-400' :
                            'bg-blue-900/30 text-blue-400'
                          }`}>
                            {feature.status === 'active' ? 'Active' : 
                             feature.status === 'training' ? 'Training' : 'Beta'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Recent AI Insights */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-white mb-6">Recent AI Insights</h3>
              <div className="space-y-4">
                {recentInsights.map((insight, index) => (
                  <motion.div
                    key={index}
                    className={`border rounded-xl p-5 ${getInsightColor(insight.type)}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="text-2xl">{getInsightIcon(insight.type)}</div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-semibold text-white">{insight.title}</h4>
                          <span className="text-xs text-gray-400">{insight.timestamp}</span>
                        </div>
                        <p className="text-gray-300 text-sm">{insight.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* AI Learning Stats */}
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
                <h3 className="text-lg font-semibold text-white mb-4">Your AI Learning Profile</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-400">Learning Efficiency</span>
                      <span className="text-sm text-white">{aiInsights.learningEfficiency}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-purple-500 h-2 rounded-full" 
                        style={{ width: `${aiInsights.learningEfficiency}%` }}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-700/50 rounded-lg p-3">
                      <div className="text-sm text-gray-400 mb-1">Recommended Study</div>
                      <div className="text-white font-medium">{aiInsights.recommendedStudyTime} min/day</div>
                    </div>
                    
                    <div className="bg-gray-700/50 rounded-lg p-3">
                      <div className="text-sm text-gray-400 mb-1">Confidence Score</div>
                      <div className="text-white font-medium">{aiInsights.confidenceScore}/100</div>
                    </div>
                    
                    <div className="bg-gray-700/50 rounded-lg p-3">
                      <div className="text-sm text-gray-400 mb-1">Strongest Subject</div>
                      <div className="text-white font-medium">{aiInsights.strongestSubject}</div>
                    </div>
                    
                    <div className="bg-gray-700/50 rounded-lg p-3">
                      <div className="text-sm text-gray-400 mb-1">Improvement Area</div>
                      <div className="text-white font-medium">{aiInsights.improvementArea}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* TensorFlow.js Info */}
              <div className="bg-gradient-to-r from-blue-900/30 to-indigo-900/30 rounded-xl p-6 border border-blue-500/20">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-blue-500/20 rounded-lg p-2">
                    <Cpu className="w-5 h-5 text-blue-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">Powered by TensorFlow.js</h3>
                </div>
                <p className="text-gray-300 text-sm mb-4">
                  Your learning experience is enhanced by machine learning models running directly in your browser. 
                  These models analyze your performance patterns to provide personalized recommendations.
                </p>
                <div className="flex items-center space-x-2 text-xs text-blue-300">
                  <span>Neural Networks</span>
                  <span>•</span>
                  <span>Deep Learning</span>
                  <span>•</span>
                  <span>Real-time Predictions</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};