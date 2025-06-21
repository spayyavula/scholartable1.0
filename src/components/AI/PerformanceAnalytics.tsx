import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  Clock, 
  Calendar, 
  Target,
  Brain,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  X,
  Award,
  Zap,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

interface PerformanceAnalyticsProps {
  onClose: () => void;
  userLevel: number;
  userStats: {
    gamesPlayed: number;
    questionsAnswered: number;
    correctAnswers: number;
    streakRecord: number;
  };
}

export const PerformanceAnalytics: React.FC<PerformanceAnalyticsProps> = ({
  onClose,
  userLevel,
  userStats
}) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState<'week' | 'month' | 'year'>('week');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(false);

  // Mock performance data
  const performanceData = {
    accuracy: {
      week: [65, 70, 68, 75, 80, 78, 85],
      month: [60, 65, 70, 72, 75, 78, 80, 82, 80, 78, 82, 85],
      year: [50, 55, 60, 65, 70, 75, 78, 80, 82, 85, 87, 90]
    },
    speed: {
      week: [45, 42, 40, 38, 35, 32, 30],
      month: [50, 48, 45, 43, 40, 38, 35, 33, 32, 30, 28, 25],
      year: [60, 55, 50, 48, 45, 40, 38, 35, 32, 30, 28, 25]
    },
    retention: {
      week: [70, 72, 75, 78, 80, 82, 85],
      month: [65, 68, 70, 72, 75, 78, 80, 82, 85, 87, 88, 90],
      year: [60, 65, 68, 70, 72, 75, 78, 80, 82, 85, 88, 90]
    },
    subjects: {
      mathematics: { accuracy: 85, speed: 75, retention: 80 },
      physics: { accuracy: 70, speed: 65, retention: 75 },
      chemistry: { accuracy: 75, speed: 70, retention: 78 },
      programming: { accuracy: 90, speed: 85, retention: 88 }
    }
  };

  const learningPatterns = [
    {
      pattern: 'Spaced Repetition',
      effectiveness: 92,
      description: 'You perform best when reviewing material at increasing intervals',
      recommendation: 'Continue using spaced repetition for maximum retention'
    },
    {
      pattern: 'Morning Study',
      effectiveness: 87,
      description: 'Your performance peaks during morning study sessions',
      recommendation: 'Schedule challenging topics before noon'
    },
    {
      pattern: 'Visual Learning',
      effectiveness: 85,
      description: 'You retain information better with visual aids and diagrams',
      recommendation: 'Use more diagrams and visual representations'
    },
    {
      pattern: 'Active Recall',
      effectiveness: 90,
      description: 'Testing yourself improves your retention significantly',
      recommendation: 'Incorporate more practice tests and quizzes'
    }
  ];

  const performanceInsights = [
    {
      title: 'Accuracy Improvement',
      description: 'Your accuracy has improved by 15% in the last month',
      type: 'positive',
      icon: CheckCircle
    },
    {
      title: 'Speed Plateau',
      description: 'Your response time has plateaued in the last week',
      type: 'neutral',
      icon: Clock
    },
    {
      title: 'Physics Weakness',
      description: 'Physics scores are 20% lower than your other subjects',
      type: 'negative',
      icon: AlertTriangle
    },
    {
      title: 'Consistent Practice',
      description: 'Regular daily practice is improving your retention',
      type: 'positive',
      icon: Calendar
    }
  ];

  const getTimeframeLabels = () => {
    switch (selectedTimeframe) {
      case 'week':
        return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
      case 'month':
        return ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8', 'Week 9', 'Week 10', 'Week 11', 'Week 12'];
      case 'year':
        return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      default:
        return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'positive': return 'border-green-500/30 bg-green-500/10';
      case 'negative': return 'border-red-500/30 bg-red-500/10';
      case 'neutral': return 'border-blue-500/30 bg-blue-500/10';
      default: return 'border-gray-500/30 bg-gray-500/10';
    }
  };

  const getInsightIconColor = (type: string) => {
    switch (type) {
      case 'positive': return 'text-green-400';
      case 'negative': return 'text-red-400';
      case 'neutral': return 'text-blue-400';
      default: return 'text-gray-400';
    }
  };

  const handleTimeframeChange = (timeframe: 'week' | 'month' | 'year') => {
    setIsLoading(true);
    setSelectedTimeframe(timeframe);
    
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  };

  const handleSubjectChange = (subject: string) => {
    setIsLoading(true);
    setSelectedSubject(subject);
    
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <motion.div
        className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-2xl w-full max-w-7xl h-[95vh] overflow-hidden"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-white/20 rounded-full p-3">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-heading font-bold text-white">
                  Performance Analytics
                </h2>
                <p className="text-blue-100">AI-powered insights into your learning journey</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex space-x-1 bg-white/10 rounded-lg p-1">
                {['week', 'month', 'year'].map((timeframe) => (
                  <button
                    key={timeframe}
                    onClick={() => handleTimeframeChange(timeframe as any)}
                    className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
                      selectedTimeframe === timeframe
                        ? 'bg-white text-indigo-600'
                        : 'text-white/70 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {timeframe.charAt(0).toUpperCase() + timeframe.slice(1)}
                  </button>
                ))}
              </div>
              
              <button
                onClick={onClose}
                className="text-white hover:text-gray-200 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 h-[calc(95vh-88px)] overflow-y-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Charts */}
            <div className="lg:col-span-2 space-y-8">
              {/* Performance Metrics */}
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 text-blue-400" />
                    <span>Performance Metrics</span>
                  </h3>
                  
                  <div className="relative">
                    <select
                      value={selectedSubject}
                      onChange={(e) => handleSubjectChange(e.target.value)}
                      className="bg-gray-700 border border-gray-600 text-white rounded-lg px-3 py-2 pr-8 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="all">All Subjects</option>
                      <option value="mathematics">Mathematics</option>
                      <option value="physics">Physics</option>
                      <option value="chemistry">Chemistry</option>
                      <option value="programming">Programming</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
                
                {isLoading ? (
                  <div className="flex items-center justify-center h-64">
                    <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                  </div>
                ) : (
                  <div className="space-y-8">
                    {/* Accuracy Chart */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-medium text-gray-300">Accuracy</h4>
                        <div className="flex items-center space-x-1 text-green-400 text-xs">
                          <TrendingUp className="w-3 h-3" />
                          <span>+15%</span>
                        </div>
                      </div>
                      <div className="h-12 flex items-end space-x-1">
                        {performanceData.accuracy[selectedTimeframe].map((value, index) => (
                          <div
                            key={index}
                            className="flex-1 bg-gradient-to-t from-blue-600 to-blue-400 rounded-t"
                            style={{ height: `${value}%` }}
                          />
                        ))}
                      </div>
                      <div className="flex justify-between mt-2 text-xs text-gray-500">
                        {getTimeframeLabels().slice(0, performanceData.accuracy[selectedTimeframe].length).map((label, index) => (
                          <div key={index} className="text-center">
                            {label}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Speed Chart */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-medium text-gray-300">Response Time (seconds)</h4>
                        <div className="flex items-center space-x-1 text-green-400 text-xs">
                          <TrendingUp className="w-3 h-3" />
                          <span>-33%</span>
                        </div>
                      </div>
                      <div className="h-12 flex items-end space-x-1">
                        {performanceData.speed[selectedTimeframe].map((value, index) => (
                          <div
                            key={index}
                            className="flex-1 bg-gradient-to-t from-green-600 to-green-400 rounded-t"
                            style={{ height: `${(value / 60) * 100}%` }}
                          />
                        ))}
                      </div>
                      <div className="flex justify-between mt-2 text-xs text-gray-500">
                        {getTimeframeLabels().slice(0, performanceData.speed[selectedTimeframe].length).map((label, index) => (
                          <div key={index} className="text-center">
                            {label}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Retention Chart */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-medium text-gray-300">Retention Rate</h4>
                        <div className="flex items-center space-x-1 text-green-400 text-xs">
                          <TrendingUp className="w-3 h-3" />
                          <span>+10%</span>
                        </div>
                      </div>
                      <div className="h-12 flex items-end space-x-1">
                        {performanceData.retention[selectedTimeframe].map((value, index) => (
                          <div
                            key={index}
                            className="flex-1 bg-gradient-to-t from-purple-600 to-purple-400 rounded-t"
                            style={{ height: `${value}%` }}
                          />
                        ))}
                      </div>
                      <div className="flex justify-between mt-2 text-xs text-gray-500">
                        {getTimeframeLabels().slice(0, performanceData.retention[selectedTimeframe].length).map((label, index) => (
                          <div key={index} className="text-center">
                            {label}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Learning Patterns */}
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
                <h3 className="text-lg font-semibold text-white flex items-center space-x-2 mb-6">
                  <Brain className="w-5 h-5 text-purple-400" />
                  <span>AI-Detected Learning Patterns</span>
                </h3>
                
                <div className="space-y-4">
                  {learningPatterns.map((pattern, index) => (
                    <motion.div
                      key={index}
                      className="bg-gray-700/50 rounded-lg p-4 border border-gray-600/50 hover:border-purple-500/30 transition-all duration-300"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-start space-x-4">
                        <div className="bg-purple-500/20 rounded-lg p-2 mt-1">
                          <Brain className="w-5 h-5 text-purple-400" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-white">{pattern.pattern}</h4>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm text-gray-300">Effectiveness</span>
                              <span className="text-sm font-semibold text-purple-400">{pattern.effectiveness}%</span>
                            </div>
                          </div>
                          <p className="text-gray-300 text-sm mb-2">{pattern.description}</p>
                          <div className="flex items-center space-x-2 text-sm text-blue-300">
                            <Lightbulb className="w-4 h-4" />
                            <span>{pattern.recommendation}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Performance Insights */}
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
                <h3 className="text-lg font-semibold text-white flex items-center space-x-2 mb-6">
                  <Lightbulb className="w-5 h-5 text-yellow-400" />
                  <span>AI Insights</span>
                </h3>
                
                <div className="space-y-4">
                  {performanceInsights.map((insight, index) => (
                    <motion.div
                      key={index}
                      className={`border rounded-lg p-4 ${getInsightColor(insight.type)}`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex items-start space-x-3">
                        <insight.icon className={`w-5 h-5 mt-0.5 ${getInsightIconColor(insight.type)}`} />
                        <div>
                          <h4 className="font-medium text-white mb-1">{insight.title}</h4>
                          <p className="text-gray-300 text-sm">{insight.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Subject Comparison */}
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
                <h3 className="text-lg font-semibold text-white flex items-center space-x-2 mb-6">
                  <BarChart3 className="w-5 h-5 text-blue-400" />
                  <span>Subject Performance</span>
                </h3>
                
                <div className="space-y-6">
                  {Object.entries(performanceData.subjects).map(([subject, metrics], index) => (
                    <div key={subject} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="text-white font-medium capitalize">{subject}</h4>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-gray-400">Avg</span>
                          <span className="text-xs font-semibold text-white">
                            {Math.round((metrics.accuracy + metrics.speed + metrics.retention) / 3)}%
                          </span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-2">
                        <div>
                          <div className="text-xs text-gray-400 mb-1">Accuracy</div>
                          <div className="h-1.5 bg-gray-700 rounded-full">
                            <div 
                              className="h-full bg-blue-500 rounded-full" 
                              style={{ width: `${metrics.accuracy}%` }}
                            />
                          </div>
                        </div>
                        
                        <div>
                          <div className="text-xs text-gray-400 mb-1">Speed</div>
                          <div className="h-1.5 bg-gray-700 rounded-full">
                            <div 
                              className="h-full bg-green-500 rounded-full" 
                              style={{ width: `${metrics.speed}%` }}
                            />
                          </div>
                        </div>
                        
                        <div>
                          <div className="text-xs text-gray-400 mb-1">Retention</div>
                          <div className="h-1.5 bg-gray-700 rounded-full">
                            <div 
                              className="h-full bg-purple-500 rounded-full" 
                              style={{ width: `${metrics.retention}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Next Steps */}
              <div className="bg-gradient-to-br from-indigo-900/30 to-purple-900/30 rounded-xl p-6 border border-indigo-500/20">
                <h3 className="text-lg font-semibold text-white flex items-center space-x-2 mb-4">
                  <Target className="w-5 h-5 text-indigo-400" />
                  <span>AI Recommendations</span>
                </h3>
                
                <div className="space-y-4">
                  <div className="bg-indigo-500/10 rounded-lg p-4 border border-indigo-500/20">
                    <div className="flex items-center space-x-2 mb-2">
                      <Award className="w-4 h-4 text-indigo-400" />
                      <h4 className="font-medium text-white">Focus Area</h4>
                    </div>
                    <p className="text-gray-300 text-sm mb-3">
                      Spend 30 minutes on Physics concepts to improve your weakest subject.
                    </p>
                    <button className="text-xs bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded-lg transition-colors flex items-center space-x-1">
                      <span>Start Physics Session</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                  
                  <div className="bg-purple-500/10 rounded-lg p-4 border border-purple-500/20">
                    <div className="flex items-center space-x-2 mb-2">
                      <Zap className="w-4 h-4 text-purple-400" />
                      <h4 className="font-medium text-white">Learning Technique</h4>
                    </div>
                    <p className="text-gray-300 text-sm mb-3">
                      Try active recall techniques to improve your retention rate by up to 25%.
                    </p>
                    <button className="text-xs bg-purple-600 hover:bg-purple-500 text-white px-3 py-1.5 rounded-lg transition-colors flex items-center space-x-1">
                      <span>Learn Technique</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};