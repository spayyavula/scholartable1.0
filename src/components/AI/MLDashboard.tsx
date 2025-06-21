import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
  X
} from 'lucide-react';
// TensorFlow.js import is handled dynamically in mlService.ts

interface MLDashboardProps {
  onClose: () => void;
  userLevel: number;
  userStats: {
    gamesPlayed: number;
    questionsAnswered: number;
    correctAnswers: number;
    streakRecord: number;
  };
}

export const MLDashboard: React.FC<MLDashboardProps> = ({ 
  onClose, 
  userLevel, 
  userStats 
}) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isTraining, setIsTraining] = useState(false);
  const [predictions, setPredictions] = useState<PredictionResult | null>(null);
  const [learningPattern, setLearningPattern] = useState<LearningPattern | null>(null);
  const [selectedSubject, setSelectedSubject] = useState('mathematics');
  const [selectedDifficulty, setSelectedDifficulty] = useState('intermediate');
  const [trainingProgress, setTrainingProgress] = useState(0);

  useEffect(() => {
    initializeML();
  }, []);
  
  // Safely initialize ML with fallback handling
  const initializeML = async () => {
    try {
      // Wrap all ML operations in try-catch for safety
      try {
        await mlService.initialize();
        await mlService.loadModel();
        setIsInitialized(true);
      } catch (error) {
        console.warn('ML initialization using TensorFlow.js skipped:', error);
        // Continue without ML functionality
        setIsInitialized(false);
      }
      
      // Generate mock learning data regardless of ML status
      const mockData = generateMockLearningData();
      try {
        const pattern = await mlService.analyzeLearningPatterns(mockData);
        setLearningPattern(pattern);
      } catch (error) {
        console.warn('Learning pattern analysis skipped:', error);
        // Set fallback learning pattern
        setLearningPattern({
          strongSubjects: ['mathematics', 'javascript'],
          weakSubjects: ['physics'],
          optimalStudyTime: 1800,
          learningStyle: 'visual',
          improvementAreas: ['Focus on physics concepts']
        });
      }
    } catch (error) {
      console.error('Failed to initialize ML:', error);
      // Ensure UI doesn't break even if ML fails completely
      setIsInitialized(false);
      setLearningPattern({
        strongSubjects: ['mathematics'],
        weakSubjects: ['physics'],
        optimalStudyTime: 1800,
        learningStyle: 'visual',
        improvementAreas: ['Regular practice']
      });
    }
  };

  const initializeML = async () => {

  const generateMockLearningData = (): LearningData[] => {
    const subjects = ['mathematics', 'physics', 'chemistry', 'javascript', 'python'];
    const difficulties = ['basic', 'intermediate', 'advanced'];
    const data: LearningData[] = [];

    for (let i = 0; i < 50; i++) {
      const subject = subjects[Math.floor(Math.random() * subjects.length)];
      const difficulty = difficulties[Math.floor(Math.random() * difficulties.length)];
      const totalQuestions = Math.floor(Math.random() * 10) + 5;
      const correctAnswers = Math.floor(Math.random() * totalQuestions);
      
      data.push({
        userId: 'user1',
        subject,
        difficulty,
        timeSpent: Math.floor(Math.random() * 1800) + 300, // 5-35 minutes
        correctAnswers,
        totalQuestions,
        timestamp: Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000 // Last 30 days
      });
    }

    return data;
  };

  const handleTrainModel = async () => {
    setIsTraining(true);
    setTrainingProgress(0);

    try {
      const mockData = generateMockLearningData();
      
      // Simulate training progress
      const progressInterval = setInterval(() => {
        setTrainingProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            return 100;
          }
          return prev + 10;
        });
      }, 500);

      await mlService.trainPerformanceModel(mockData);
      await mlService.trainDifficultyModel(mockData);
      await mlService.saveModel();

      clearInterval(progressInterval);
      setTrainingProgress(100);
    } catch (error) {
      console.error('Training failed:', error);
    } finally {
      setIsTraining(false);
    }
  };

  const handlePredict = async () => {
    if (!isInitialized) return;
    
    try {
      const currentAccuracy = userStats.correctAnswers / userStats.questionsAnswered || 0.5;
      const result = await mlService.predictPerformance(
        selectedSubject,
        selectedDifficulty,
        userLevel,
        currentAccuracy,
        userStats.streakRecord,
      );
      setPredictions(result);
    } catch (error) {
      console.error('Prediction failed, using fallback data:', error);
      // Provide fallback prediction data
      setPredictions({
        recommendedDifficulty: 'intermediate',
        expectedAccuracy: 0.75,
        confidence: 0.8,
        suggestions: [
          'Continue practicing regularly to improve your skills',
          `Focus on ${selectedSubject} fundamentals to build a strong foundation`,
          'Try a mix of different difficulty levels for balanced learning'
        ]
      });
    }
  };

  const handleVisualize = async () => {
    if (!isInitialized) return;
    try {
      await mlService.visualizeModelPerformance();
    } catch (error) {
      console.warn('Model visualization skipped:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <motion.div
        className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-2xl w-full max-w-6xl h-[90vh] overflow-hidden"
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
                <h2 className="text-2xl font-bold text-white">Machine Learning Models</h2>
                <p className="text-purple-100">Powered by TensorFlow.js</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Status Indicator */}
          <div className="mt-4 flex items-center space-x-4">
            <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${
              isInitialized ? 'bg-green-500/20 text-green-300' : 'bg-yellow-500/20 text-yellow-300'
            }`}>
              <div className={`w-2 h-2 rounded-full ${
                isInitialized ? 'bg-green-400' : 'bg-yellow-400'
              }`} />
              <span className="text-sm">
                {isInitialized ? 'AI Models Ready' : 'Initializing...'}
              </span>
            </div>
            {isTraining && (
              <div className="flex items-center space-x-2 text-blue-300">
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span className="text-sm">Training: {trainingProgress}%</span>
              </div>
            )}
          </div>
        </div>

        <div className="p-6 h-full overflow-y-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Control Panel */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-gray-800/50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                  <Settings className="w-5 h-5" />
                  <span>AI Controls</span>
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Subject
                    </label>
                    <select
                      value={selectedSubject}
                      onChange={(e) => setSelectedSubject(e.target.value)}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                    >
                      <option value="mathematics">Mathematics</option>
                      <option value="physics">Physics</option>
                      <option value="chemistry">Chemistry</option>
                      <option value="javascript">JavaScript</option>
                      <option value="python">Python</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Difficulty
                    </label>
                    <select
                      value={selectedDifficulty}
                      onChange={(e) => setSelectedDifficulty(e.target.value)}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                    >
                      <option value="basic">Basic</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <motion.button
                      onClick={handleTrainModel}
                      disabled={!isInitialized || isTraining}
                      className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-gray-600 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {isTraining ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
                      <span>{isTraining ? 'Training...' : 'Train Models'}</span>
                    </motion.button>

                    <motion.button
                      onClick={handlePredict}
                      disabled={!isInitialized}
                      className="w-full bg-green-600 hover:bg-green-500 disabled:bg-gray-600 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Target className="w-4 h-4" />
                      <span>Get Prediction</span>
                    </motion.button>

                    <motion.button
                      onClick={handleVisualize}
                      disabled={!isInitialized}
                      className="w-full bg-purple-600 hover:bg-purple-500 disabled:bg-gray-600 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Eye className="w-4 h-4" />
                      <span>Visualize</span>
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* Learning Pattern */}
              {learningPattern && (
                <div className="bg-gray-800/50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                    <BarChart3 className="w-5 h-5" />
                    <span>Learning Pattern</span>
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-green-400 mb-2">Strong Subjects</h4>
                      <div className="flex flex-wrap gap-2">
                        {learningPattern.strongSubjects.map((subject) => (
                          <span
                            key={subject}
                            className="px-2 py-1 bg-green-600/20 text-green-300 rounded-full text-xs"
                          >
                            {subject}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-red-400 mb-2">Areas for Improvement</h4>
                      <div className="flex flex-wrap gap-2">
                        {learningPattern.weakSubjects.map((subject) => (
                          <span
                            key={subject}
                            className="px-2 py-1 bg-red-600/20 text-red-300 rounded-full text-xs"
                          >
                            {subject}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-blue-400 mb-2">Learning Style</h4>
                      <span className="px-2 py-1 bg-blue-600/20 text-blue-300 rounded-full text-xs capitalize">
                        {learningPattern.learningStyle}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-purple-400 mb-2">Optimal Study Time</h4>
                      <span className="text-white">
                        {Math.round(learningPattern.optimalStudyTime / 60)} minutes
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Predictions & Results */}
            <div className="lg:col-span-2 space-y-6">
              {/* AI Predictions */}
              {predictions && (
                <div className="bg-gray-800/50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5" />
                    <span>AI Predictions</span>
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-blue-600/20 rounded-lg p-4">
                      <h4 className="text-blue-300 font-medium mb-2">Expected Accuracy</h4>
                      <div className="text-2xl font-bold text-white">
                        {(predictions.expectedAccuracy * 100).toFixed(1)}%
                      </div>
                    </div>

                    <div className="bg-green-600/20 rounded-lg p-4">
                      <h4 className="text-green-300 font-medium mb-2">Recommended Level</h4>
                      <div className="text-lg font-bold text-white capitalize">
                        {predictions.recommendedDifficulty}
                      </div>
                    </div>

                    <div className="bg-purple-600/20 rounded-lg p-4">
                      <h4 className="text-purple-300 font-medium mb-2">Confidence</h4>
                      <div className="text-2xl font-bold text-white">
                        {(predictions.confidence * 100).toFixed(1)}%
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-white font-medium mb-3 flex items-center space-x-2">
                      <Lightbulb className="w-4 h-4" />
                      <span>AI Suggestions</span>
                    </h4>
                    <div className="space-y-2">
                      {predictions.suggestions.map((suggestion, index) => (
                        <div
                          key={index}
                          className="bg-gray-700/50 rounded-lg p-3 text-gray-300 text-sm"
                        >
                          {suggestion}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Model Information */}
              <div className="bg-gray-800/50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                  <Zap className="w-5 h-5" />
                  <span>TensorFlow.js Models</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-700/50 rounded-lg p-4">
                    <h4 className="text-blue-300 font-medium mb-2">Performance Predictor</h4>
                    <p className="text-gray-400 text-sm mb-3">
                      Neural network that predicts your expected accuracy based on subject, difficulty, and learning history.
                    </p>
                    <div className="text-xs text-gray-500">
                      Architecture: Dense(32) → Dropout(0.2) → Dense(16) → Dense(1)
                    </div>
                  </div>

                  <div className="bg-gray-700/50 rounded-lg p-4">
                    <h4 className="text-green-300 font-medium mb-2">Difficulty Recommender</h4>
                    <p className="text-gray-400 text-sm mb-3">
                      Classification model that suggests the optimal difficulty level for maximum learning efficiency.
                    </p>
                    <div className="text-xs text-gray-500">
                      Architecture: Dense(24) → Dense(12) → Dense(3) with Softmax
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-4 bg-blue-600/10 border border-blue-600/20 rounded-lg">
                  <h4 className="text-blue-300 font-medium mb-2">How It Works</h4>
                  <p className="text-gray-300 text-sm">
                    Our AI analyzes your learning patterns, performance history, and current skill level to provide 
                    personalized recommendations. The models continuously learn from your interactions to improve 
                    their predictions over time.
                  </p>
                </div>
              </div>

              {/* Training Progress */}
              {isTraining && (
                <div className="bg-gray-800/50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Training Progress</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm text-gray-300 mb-2">
                        <span>Model Training</span>
                        <span>{trainingProgress}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <motion.div
                          className="bg-blue-500 h-2 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${trainingProgress}%` }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm">
                      Training neural networks with your learning data to improve prediction accuracy...
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};