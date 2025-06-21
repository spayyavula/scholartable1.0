import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Target, 
  Brain, 
  Zap, 
  BarChart3, 
  ArrowRight,
  X,
  Lightbulb,
  Clock,
  Award,
  TrendingUp,
  CheckCircle,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  BookOpen,
  RefreshCw
} from 'lucide-react';

interface AdaptiveLearningProps {
  onClose: () => void;
  userLevel: number;
  userStats: {
    gamesPlayed: number;
    questionsAnswered: number;
    correctAnswers: number;
    streakRecord: number;
  };
}

interface AdaptiveQuestion {
  id: string;
  question: string;
  options: string[];
  difficulty: 'basic' | 'intermediate' | 'advanced';
  subject: string;
  difficultyScore: number;
  conceptId: string;
  conceptName: string;
}

interface AdaptiveConcept {
  id: string;
  name: string;
  subject: string;
  proficiency: number;
  questions: number;
  lastPracticed: string;
  recommendedReview: boolean;
}

export const AdaptiveLearning: React.FC<AdaptiveLearningProps> = ({
  onClose,
  userLevel,
  userStats
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'concepts' | 'session'>('overview');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<string>('mathematics');
  const [currentQuestion, setCurrentQuestion] = useState<AdaptiveQuestion | null>(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [sessionActive, setSessionActive] = useState(false);
  const [sessionStats, setSessionStats] = useState({
    questionsAnswered: 0,
    correctAnswers: 0,
    averageDifficulty: 0,
    timeSpent: 0,
    conceptsImproved: 0
  });

  // Mock adaptive learning data
  const adaptiveStats = {
    sessionsCompleted: 28,
    questionsAnswered: 342,
    averageDifficulty: 0.68,
    conceptsMastered: 15,
    adaptiveAccuracy: 82,
    difficultyProgression: [0.45, 0.48, 0.52, 0.55, 0.60, 0.63, 0.68]
  };

  const adaptiveConcepts: AdaptiveConcept[] = [
    {
      id: 'c1',
      name: 'Linear Equations',
      subject: 'mathematics',
      proficiency: 92,
      questions: 45,
      lastPracticed: '2 days ago',
      recommendedReview: false
    },
    {
      id: 'c2',
      name: 'Quadratic Equations',
      subject: 'mathematics',
      proficiency: 85,
      questions: 38,
      lastPracticed: '5 days ago',
      recommendedReview: true
    },
    {
      id: 'c3',
      name: 'Derivatives',
      subject: 'mathematics',
      proficiency: 78,
      questions: 32,
      lastPracticed: '1 week ago',
      recommendedReview: true
    },
    {
      id: 'c4',
      name: 'Integrals',
      subject: 'mathematics',
      proficiency: 65,
      questions: 28,
      lastPracticed: '2 weeks ago',
      recommendedReview: true
    },
    {
      id: 'c5',
      name: 'Newton\'s Laws',
      subject: 'physics',
      proficiency: 72,
      questions: 35,
      lastPracticed: '3 days ago',
      recommendedReview: true
    },
    {
      id: 'c6',
      name: 'Thermodynamics',
      subject: 'physics',
      proficiency: 68,
      questions: 30,
      lastPracticed: '1 week ago',
      recommendedReview: true
    },
    {
      id: 'c7',
      name: 'Organic Chemistry',
      subject: 'chemistry',
      proficiency: 75,
      questions: 40,
      lastPracticed: '4 days ago',
      recommendedReview: true
    },
    {
      id: 'c8',
      name: 'JavaScript Closures',
      subject: 'javascript',
      proficiency: 88,
      questions: 25,
      lastPracticed: '2 days ago',
      recommendedReview: false
    }
  ];

  const adaptiveQuestions: AdaptiveQuestion[] = [
    {
      id: 'q1',
      question: 'Solve for x: 3x + 7 = 22',
      options: ['x = 3', 'x = 5', 'x = 7', 'x = 15'],
      difficulty: 'basic',
      difficultyScore: 0.3,
      subject: 'mathematics',
      conceptId: 'c1',
      conceptName: 'Linear Equations'
    },
    {
      id: 'q2',
      question: 'Solve the quadratic equation: x² - 5x + 6 = 0',
      options: ['x = 2, x = 3', 'x = -2, x = -3', 'x = 2, x = -3', 'x = -2, x = 3'],
      difficulty: 'intermediate',
      difficultyScore: 0.6,
      subject: 'mathematics',
      conceptId: 'c2',
      conceptName: 'Quadratic Equations'
    },
    {
      id: 'q3',
      question: 'Find the derivative of f(x) = x³ - 4x² + 2x - 7',
      options: ['f\'(x) = 3x² - 8x + 2', 'f\'(x) = 3x² - 4x + 2', 'f\'(x) = 3x² - 8x - 7', 'f\'(x) = x² - 4x + 2'],
      difficulty: 'advanced',
      difficultyScore: 0.8,
      subject: 'mathematics',
      conceptId: 'c3',
      conceptName: 'Derivatives'
    },
    {
      id: 'q4',
      question: 'Evaluate the indefinite integral: ∫(2x + 3) dx',
      options: ['x² + 3x + C', 'x² + 3x', '2x² + 3x + C', 'x² + 3'],
      difficulty: 'intermediate',
      difficultyScore: 0.65,
      subject: 'mathematics',
      conceptId: 'c4',
      conceptName: 'Integrals'
    },
    {
      id: 'q5',
      question: 'According to Newton\'s Second Law, force equals:',
      options: ['mass × velocity', 'mass × acceleration', 'mass × distance', 'mass × time'],
      difficulty: 'basic',
      difficultyScore: 0.4,
      subject: 'physics',
      conceptId: 'c5',
      conceptName: 'Newton\'s Laws'
    }
  ];

  const filteredConcepts = adaptiveConcepts.filter(concept => 
    selectedSubject === 'all' || concept.subject === selectedSubject
  );

  const startAdaptiveSession = () => {
    setIsLoading(true);
    setSessionActive(true);
    setQuestionIndex(0);
    
    // Simulate loading
    setTimeout(() => {
      setCurrentQuestion(adaptiveQuestions[0]);
      setIsLoading(false);
      setActiveTab('session');
    }, 1500);
  };

  const handleNextQuestion = () => {
    if (questionIndex < adaptiveQuestions.length - 1) {
      setIsLoading(true);
      
      // Simulate loading next question
      setTimeout(() => {
        setQuestionIndex(prev => prev + 1);
        setCurrentQuestion(adaptiveQuestions[questionIndex + 1]);
        setIsLoading(false);
      }, 800);
    } else {
      // End session
      setSessionActive(false);
      setActiveTab('overview');
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

  const getProficiencyColor = (proficiency: number) => {
    if (proficiency >= 90) return 'text-green-400';
    if (proficiency >= 75) return 'text-blue-400';
    if (proficiency >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getProficiencyBg = (proficiency: number) => {
    if (proficiency >= 90) return 'bg-green-500';
    if (proficiency >= 75) return 'bg-blue-500';
    if (proficiency >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
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
        <div className="bg-gradient-to-r from-green-600 to-teal-700 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-white/20 rounded-full p-3">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-heading font-bold text-white">
                  Adaptive Learning System
                </h2>
                <p className="text-green-100">AI-powered personalized difficulty adjustment</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {!sessionActive && (
                <motion.button
                  onClick={startAdaptiveSession}
                  className="bg-white text-green-700 px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Zap className="w-4 h-4" />
                  <span>Start Adaptive Session</span>
                </motion.button>
              )}
              <button
                onClick={onClose}
                className="text-white hover:text-gray-200 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {!sessionActive && (
            <div className="flex space-x-1 mt-6 bg-white/10 rounded-lg p-1">
              {[
                { id: 'overview', label: 'Overview', icon: BarChart3 },
                { id: 'concepts', label: 'Knowledge Map', icon: Brain }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all ${
                    activeTab === tab.id
                      ? 'bg-white text-green-700 shadow-sm'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{tab.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 h-[calc(95vh-88px)] overflow-y-auto">
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* AI Explanation */}
              <div className="bg-gradient-to-r from-green-900/30 to-teal-900/30 rounded-xl p-6 border border-green-500/20">
                <div className="flex items-start space-x-4">
                  <div className="bg-green-500/20 rounded-lg p-3 mt-1">
                    <Brain className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">How Adaptive Learning Works</h3>
                    <p className="text-gray-300">
                      Our TensorFlow.js-powered adaptive learning system dynamically adjusts question difficulty based on your performance.
                      The AI model tracks your proficiency across different concepts and subjects, presenting questions that provide the optimal
                      level of challenge - not too easy, not too hard - to maximize your learning efficiency.
                    </p>
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div className="bg-gray-800/50 rounded-lg p-3">
                        <div className="text-green-400 font-medium mb-1">Difficulty Adaptation</div>
                        <div className="text-white">Questions adjust to your skill level in real-time</div>
                      </div>
                      <div className="bg-gray-800/50 rounded-lg p-3">
                        <div className="text-green-400 font-medium mb-1">Concept Mapping</div>
                        <div className="text-white">Identifies knowledge gaps and strengths</div>
                      </div>
                      <div className="bg-gray-800/50 rounded-lg p-3">
                        <div className="text-green-400 font-medium mb-1">Learning Efficiency</div>
                        <div className="text-white">Optimizes your learning rate by 35%</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Adaptive Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <motion.div
                  className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <Target className="w-6 h-6 text-green-400" />
                    <span className="text-green-400 text-sm font-medium">+12%</span>
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">{adaptiveStats.sessionsCompleted}</div>
                  <div className="text-gray-400 text-sm">Adaptive Sessions</div>
                </motion.div>
                
                <motion.div
                  className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <Brain className="w-6 h-6 text-blue-400" />
                    <span className="text-green-400 text-sm font-medium">+3</span>
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">{adaptiveStats.conceptsMastered}</div>
                  <div className="text-gray-400 text-sm">Concepts Mastered</div>
                </motion.div>
                
                <motion.div
                  className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <TrendingUp className="w-6 h-6 text-purple-400" />
                    <span className="text-green-400 text-sm font-medium">+0.05</span>
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">{adaptiveStats.averageDifficulty.toFixed(2)}</div>
                  <div className="text-gray-400 text-sm">Avg. Difficulty Level</div>
                </motion.div>
                
                <motion.div
                  className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <Award className="w-6 h-6 text-yellow-400" />
                    <span className="text-green-400 text-sm font-medium">+5%</span>
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">{adaptiveStats.adaptiveAccuracy}%</div>
                  <div className="text-gray-400 text-sm">Adaptive Accuracy</div>
                </motion.div>
              </div>

              {/* Difficulty Progression */}
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
                <h3 className="text-lg font-semibold text-white mb-6 flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-green-400" />
                  <span>Your Difficulty Progression</span>
                </h3>
                
                <div className="h-64 flex items-end space-x-2">
                  {adaptiveStats.difficultyProgression.map((difficulty, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center">
                      <div 
                        className="w-full bg-gradient-to-t from-green-600 to-green-400 rounded-t"
                        style={{ height: `${difficulty * 100}%` }}
                      />
                      <div className="text-xs text-gray-500 mt-2">
                        Session {index + 1}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 bg-gray-700/50 rounded-lg p-4 border border-gray-600/50">
                  <div className="flex items-center space-x-2 mb-2">
                    <Lightbulb className="w-5 h-5 text-yellow-400" />
                    <h4 className="font-medium text-white">AI Insight</h4>
                  </div>
                  <p className="text-gray-300 text-sm">
                    Your difficulty level has increased by 51% since you started, showing excellent progress.
                    The AI is now presenting you with more challenging questions as your proficiency grows.
                    Your optimal challenge zone appears to be around 0.65-0.70 difficulty.
                  </p>
                </div>
              </div>

              {/* Recent Adaptive Sessions */}
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
                <h3 className="text-lg font-semibold text-white mb-6 flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-blue-400" />
                  <span>Recent Adaptive Sessions</span>
                </h3>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left border-b border-gray-700">
                        <th className="pb-3 text-gray-400 font-medium">Date</th>
                        <th className="pb-3 text-gray-400 font-medium">Subject</th>
                        <th className="pb-3 text-gray-400 font-medium">Questions</th>
                        <th className="pb-3 text-gray-400 font-medium">Accuracy</th>
                        <th className="pb-3 text-gray-400 font-medium">Avg. Difficulty</th>
                        <th className="pb-3 text-gray-400 font-medium">Time</th>
                        <th className="pb-3 text-gray-400 font-medium">XP Earned</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { date: 'Today', subject: 'Mathematics', questions: 15, accuracy: 87, difficulty: 0.68, time: '18 min', xp: 240 },
                        { date: 'Yesterday', subject: 'Physics', questions: 12, accuracy: 75, difficulty: 0.62, time: '15 min', xp: 180 },
                        { date: '3 days ago', subject: 'Chemistry', questions: 10, accuracy: 80, difficulty: 0.65, time: '12 min', xp: 160 },
                        { date: '1 week ago', subject: 'JavaScript', questions: 18, accuracy: 92, difficulty: 0.72, time: '22 min', xp: 280 }
                      ].map((session, index) => (
                        <tr key={index} className="border-b border-gray-700/50">
                          <td className="py-4 text-white">{session.date}</td>
                          <td className="py-4 text-white">{session.subject}</td>
                          <td className="py-4 text-white">{session.questions}</td>
                          <td className="py-4">
                            <span className={`${
                              session.accuracy >= 90 ? 'text-green-400' :
                              session.accuracy >= 75 ? 'text-blue-400' :
                              session.accuracy >= 60 ? 'text-yellow-400' :
                              'text-red-400'
                            }`}>
                              {session.accuracy}%
                            </span>
                          </td>
                          <td className="py-4 text-white">{session.difficulty.toFixed(2)}</td>
                          <td className="py-4 text-white">{session.time}</td>
                          <td className="py-4 text-yellow-400">+{session.xp}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'concepts' && (
            <div className="space-y-8">
              {/* Subject Filter */}
              <div className="flex items-center space-x-2 mb-6">
                <span className="text-gray-400 text-sm">Filter by subject:</span>
                <div className="flex flex-wrap gap-2">
                  {['all', 'mathematics', 'physics', 'chemistry', 'javascript'].map((subject) => (
                    <button
                      key={subject}
                      onClick={() => setSelectedSubject(subject)}
                      className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors capitalize ${
                        selectedSubject === subject
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      {subject === 'all' ? 'All Subjects' : subject}
                    </button>
                  ))}
                </div>
              </div>

              {/* Knowledge Map */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredConcepts.map((concept, index) => (
                  <motion.div
                    key={concept.id}
                    className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50 hover:border-green-500/30 transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold text-white">{concept.name}</h4>
                      {concept.recommendedReview && (
                        <div className="bg-blue-500/20 rounded-full px-2 py-1">
                          <span className="text-xs text-blue-400">Review Recommended</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-400">Proficiency</span>
                        <span className={`text-sm font-medium ${getProficiencyColor(concept.proficiency)}`}>
                          {concept.proficiency}%
                        </span>
                      </div>
                      <div className="h-2 bg-gray-700 rounded-full">
                        <div 
                          className={`h-full rounded-full ${getProficiencyBg(concept.proficiency)}`}
                          style={{ width: `${concept.proficiency}%` }}
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="bg-gray-700/50 rounded-lg p-3">
                        <div className="text-xs text-gray-400 mb-1">Questions</div>
                        <div className="text-sm text-white">{concept.questions}</div>
                      </div>
                      <div className="bg-gray-700/50 rounded-lg p-3">
                        <div className="text-xs text-gray-400 mb-1">Last Practiced</div>
                        <div className="text-sm text-white">{concept.lastPracticed}</div>
                      </div>
                    </div>
                    
                    <button className="w-full bg-green-600 hover:bg-green-500 text-white text-sm py-2 rounded-lg transition-colors flex items-center justify-center space-x-2">
                      <Target className="w-4 h-4" />
                      <span>Practice Now</span>
                    </button>
                  </motion.div>
                ))}
              </div>

              {/* Knowledge Graph Visualization */}
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
                <h3 className="text-lg font-semibold text-white mb-6 flex items-center space-x-2">
                  <Brain className="w-5 h-5 text-purple-400" />
                  <span>Knowledge Graph</span>
                </h3>
                
                <div className="bg-gray-900 rounded-xl p-6 h-80 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4">🧠</div>
                    <h4 className="text-lg font-semibold text-white mb-2">Interactive Knowledge Graph</h4>
                    <p className="text-gray-400 text-sm max-w-md mx-auto">
                      Visualize connections between concepts and track your learning progress across different subjects.
                    </p>
                    <button className="mt-4 bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-lg transition-colors text-sm">
                      Explore Knowledge Graph
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'session' && (
            <div className="h-full flex flex-col">
              {isLoading ? (
                <div className="flex-1 flex flex-col items-center justify-center">
                  <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mb-4" />
                  <p className="text-white text-lg">Adapting difficulty...</p>
                  <p className="text-gray-400 text-sm mt-2">Our AI is analyzing your performance</p>
                </div>
              ) : currentQuestion ? (
                <div className="flex-1 flex flex-col">
                  {/* Question Header */}
                  <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50 mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className={`px-3 py-1 rounded-full border text-sm font-medium ${getDifficultyColor(currentQuestion.difficulty)}`}>
                          {currentQuestion.difficulty.charAt(0).toUpperCase() + currentQuestion.difficulty.slice(1)}
                        </div>
                        <div className="text-gray-400 text-sm">
                          Concept: <span className="text-white">{currentQuestion.conceptName}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-gray-400 text-sm">
                          Question <span className="text-white">{questionIndex + 1}</span> of <span className="text-white">5</span>
                        </div>
                        <div className="bg-green-500/20 rounded-lg px-3 py-1">
                          <div className="flex items-center space-x-2">
                            <Target className="w-4 h-4 text-green-400" />
                            <span className="text-sm text-green-400">Difficulty: {(currentQuestion.difficultyScore * 100).toFixed(0)}%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-white mb-2">{currentQuestion.question}</h3>
                    
                    <div className="bg-gray-700/30 rounded-lg p-3 border border-gray-600/30">
                      <div className="flex items-center space-x-2 text-sm">
                        <Lightbulb className="w-4 h-4 text-yellow-400" />
                        <span className="text-gray-300">
                          This question was selected based on your current proficiency level in {currentQuestion.conceptName}.
                          The AI has determined this is the optimal challenge level for your learning.
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Answer Options */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {currentQuestion.options.map((option, index) => (
                      <motion.button
                        key={index}
                        className="bg-gray-800/50 hover:bg-gray-700/50 rounded-xl p-6 border border-gray-700/50 hover:border-green-500/30 text-left transition-all duration-300"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleNextQuestion}
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-white font-medium">
                            {String.fromCharCode(65 + index)}
                          </div>
                          <span className="text-white">{option}</span>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                  
                  {/* Navigation */}
                  <div className="flex justify-between mt-auto">
                    <button
                      onClick={() => setActiveTab('overview')}
                      className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5" />
                      <span>Exit Session</span>
                    </button>
                    
                    <button
                      onClick={handleNextQuestion}
                      className="flex items-center space-x-2 text-green-400 hover:text-green-300 transition-colors"
                    >
                      <span>Skip Question</span>
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center">
                  <div className="text-6xl mb-6">🎯</div>
                  <h3 className="text-2xl font-bold text-white mb-4">Ready for an Adaptive Session?</h3>
                  <p className="text-gray-400 text-center max-w-md mb-8">
                    Our AI will dynamically adjust question difficulty based on your performance,
                    optimizing your learning experience in real-time.
                  </p>
                  <motion.button
                    onClick={startAdaptiveSession}
                    className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-500 hover:to-teal-500 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Zap className="w-5 h-5" />
                    <span>Start Adaptive Session</span>
                  </motion.button>
                </div>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};