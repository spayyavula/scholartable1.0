import * as tf from '@tensorflow/tfjs';
import * as tfvis from '@tensorflow/tfjs-vis';

export interface LearningData {
  userId: string;
  subject: string;
  difficulty: string;
  timeSpent: number;
  correctAnswers: number;
  totalQuestions: number;
  timestamp: number;
}

export interface PredictionResult {
  recommendedDifficulty: string;
  expectedAccuracy: number;
  confidence: number;
  suggestions: string[];
}

export interface LearningPattern {
  strongSubjects: string[];
  weakSubjects: string[];
  optimalStudyTime: number;
  learningStyle: 'visual' | 'analytical' | 'practical';
  improvementAreas: string[];
}

class MLService {
  private performanceModel: tf.LayersModel | null = null;
  private difficultyModel: tf.LayersModel | null = null;
  private isInitialized = false;

  async initialize(): Promise<void> {
    if (this.isInitialized) return;

    try {
      // Set TensorFlow.js backend
      await tf.ready();
      console.log('TensorFlow.js initialized with backend:', tf.getBackend());

      // Initialize models
      await this.initializePerformanceModel();
      await this.initializeDifficultyModel();

      this.isInitialized = true;
      console.log('ML Service initialized successfully');
    } catch (error) {
      console.error('Failed to initialize ML Service:', error);
      throw error;
    }
  }

  private async initializePerformanceModel(): Promise<void> {
    // Create a model to predict user performance
    this.performanceModel = tf.sequential({
      layers: [
        tf.layers.dense({
          inputShape: [6], // [subject_encoded, difficulty_encoded, time_spent, prev_accuracy, streak, level]
          units: 32,
          activation: 'relu'
        }),
        tf.layers.dropout({ rate: 0.2 }),
        tf.layers.dense({
          units: 16,
          activation: 'relu'
        }),
        tf.layers.dense({
          units: 1,
          activation: 'sigmoid' // Output: predicted accuracy (0-1)
        })
      ]
    });

    this.performanceModel.compile({
      optimizer: tf.train.adam(0.001),
      loss: 'meanSquaredError',
      metrics: ['mae']
    });
  }

  private async initializeDifficultyModel(): Promise<void> {
    // Create a model to recommend optimal difficulty
    this.difficultyModel = tf.sequential({
      layers: [
        tf.layers.dense({
          inputShape: [5], // [current_accuracy, avg_time, streak, level, subject_encoded]
          units: 24,
          activation: 'relu'
        }),
        tf.layers.dense({
          units: 12,
          activation: 'relu'
        }),
        tf.layers.dense({
          units: 3,
          activation: 'softmax' // Output: [basic, intermediate, advanced] probabilities
        })
      ]
    });

    this.difficultyModel.compile({
      optimizer: tf.train.adam(0.001),
      loss: 'categoricalCrossentropy',
      metrics: ['accuracy']
    });
  }

  async trainPerformanceModel(learningData: LearningData[]): Promise<void> {
    if (!this.performanceModel || learningData.length < 10) {
      console.warn('Insufficient data for training performance model');
      return;
    }

    try {
      const { inputs, outputs } = this.preparePerformanceData(learningData);
      
      const history = await this.performanceModel.fit(inputs, outputs, {
        epochs: 50,
        batchSize: 32,
        validationSplit: 0.2,
        shuffle: true,
        callbacks: {
          onEpochEnd: (epoch, logs) => {
            if (epoch % 10 === 0) {
              console.log(`Epoch ${epoch}: loss = ${logs?.loss?.toFixed(4)}`);
            }
          }
        }
      });

      console.log('Performance model training completed');
      
      // Clean up tensors
      inputs.dispose();
      outputs.dispose();
    } catch (error) {
      console.error('Error training performance model:', error);
    }
  }

  async trainDifficultyModel(learningData: LearningData[]): Promise<void> {
    if (!this.difficultyModel || learningData.length < 10) {
      console.warn('Insufficient data for training difficulty model');
      return;
    }

    try {
      const { inputs, outputs } = this.prepareDifficultyData(learningData);
      
      await this.difficultyModel.fit(inputs, outputs, {
        epochs: 30,
        batchSize: 16,
        validationSplit: 0.2,
        shuffle: true
      });

      console.log('Difficulty model training completed');
      
      // Clean up tensors
      inputs.dispose();
      outputs.dispose();
    } catch (error) {
      console.error('Error training difficulty model:', error);
    }
  }

  private preparePerformanceData(data: LearningData[]): { inputs: tf.Tensor, outputs: tf.Tensor } {
    const inputData: number[][] = [];
    const outputData: number[] = [];

    data.forEach(item => {
      const accuracy = item.correctAnswers / item.totalQuestions;
      const subjectEncoded = this.encodeSubject(item.subject);
      const difficultyEncoded = this.encodeDifficulty(item.difficulty);
      
      inputData.push([
        subjectEncoded,
        difficultyEncoded,
        item.timeSpent / 1000, // Convert to seconds
        accuracy,
        Math.random() * 10, // Mock streak data
        Math.random() * 20 + 1 // Mock level data
      ]);
      
      outputData.push(accuracy);
    });

    return {
      inputs: tf.tensor2d(inputData),
      outputs: tf.tensor1d(outputData)
    };
  }

  private prepareDifficultyData(data: LearningData[]): { inputs: tf.Tensor, outputs: tf.Tensor } {
    const inputData: number[][] = [];
    const outputData: number[][] = [];

    data.forEach(item => {
      const accuracy = item.correctAnswers / item.totalQuestions;
      const subjectEncoded = this.encodeSubject(item.subject);
      
      inputData.push([
        accuracy,
        item.timeSpent / 1000,
        Math.random() * 10, // Mock streak
        Math.random() * 20 + 1, // Mock level
        subjectEncoded
      ]);
      
      // One-hot encode difficulty
      const difficultyOneHot = [0, 0, 0];
      if (item.difficulty === 'basic') difficultyOneHot[0] = 1;
      else if (item.difficulty === 'intermediate') difficultyOneHot[1] = 1;
      else difficultyOneHot[2] = 1;
      
      outputData.push(difficultyOneHot);
    });

    return {
      inputs: tf.tensor2d(inputData),
      outputs: tf.tensor2d(outputData)
    };
  }

  private encodeSubject(subject: string): number {
    const subjects = ['mathematics', 'physics', 'chemistry', 'html', 'css', 'javascript', 'python'];
    return subjects.indexOf(subject) / subjects.length;
  }

  private encodeDifficulty(difficulty: string): number {
    const difficulties = ['basic', 'intermediate', 'advanced'];
    return difficulties.indexOf(difficulty) / difficulties.length;
  }

  async predictPerformance(
    subject: string,
    difficulty: string,
    userLevel: number,
    currentAccuracy: number,
    streak: number
  ): Promise<PredictionResult> {
    if (!this.performanceModel || !this.difficultyModel) {
      throw new Error('Models not initialized');
    }

    try {
      const subjectEncoded = this.encodeSubject(subject);
      const difficultyEncoded = this.encodeDifficulty(difficulty);
      
      // Predict performance
      const performanceInput = tf.tensor2d([[
        subjectEncoded,
        difficultyEncoded,
        300, // Average time spent
        currentAccuracy,
        streak,
        userLevel
      ]]);

      const performancePrediction = this.performanceModel.predict(performanceInput) as tf.Tensor;
      const expectedAccuracy = await performancePrediction.data();

      // Predict optimal difficulty
      const difficultyInput = tf.tensor2d([[
        currentAccuracy,
        300,
        streak,
        userLevel,
        subjectEncoded
      ]]);

      const difficultyPrediction = this.difficultyModel.predict(difficultyInput) as tf.Tensor;
      const difficultyProbs = await difficultyPrediction.data();

      const difficulties = ['basic', 'intermediate', 'advanced'];
      const maxProbIndex = difficultyProbs.indexOf(Math.max(...Array.from(difficultyProbs)));
      const recommendedDifficulty = difficulties[maxProbIndex];

      // Generate suggestions based on predictions
      const suggestions = this.generateSuggestions(
        expectedAccuracy[0],
        recommendedDifficulty,
        currentAccuracy,
        subject
      );

      // Clean up tensors
      performanceInput.dispose();
      performancePrediction.dispose();
      difficultyInput.dispose();
      difficultyPrediction.dispose();

      return {
        recommendedDifficulty,
        expectedAccuracy: expectedAccuracy[0],
        confidence: Math.max(...Array.from(difficultyProbs)),
        suggestions
      };
    } catch (error) {
      console.error('Error predicting performance:', error);
      throw error;
    }
  }

  private generateSuggestions(
    expectedAccuracy: number,
    recommendedDifficulty: string,
    currentAccuracy: number,
    subject: string
  ): string[] {
    const suggestions: string[] = [];

    if (expectedAccuracy < 0.6) {
      suggestions.push('Consider reviewing fundamental concepts before proceeding');
      suggestions.push('Try easier questions to build confidence');
    } else if (expectedAccuracy > 0.8) {
      suggestions.push('You\'re ready for more challenging content!');
      suggestions.push('Consider exploring advanced topics in this subject');
    }

    if (recommendedDifficulty !== 'basic' && currentAccuracy < 0.7) {
      suggestions.push('Focus on accuracy before increasing difficulty');
    }

    if (subject === 'mathematics') {
      suggestions.push('Practice step-by-step problem solving');
    } else if (subject === 'programming') {
      suggestions.push('Try coding the concepts you\'re learning');
    }

    return suggestions;
  }

  async analyzeLearningPatterns(learningData: LearningData[]): Promise<LearningPattern> {
    if (learningData.length === 0) {
      return {
        strongSubjects: [],
        weakSubjects: [],
        optimalStudyTime: 1800, // 30 minutes default
        learningStyle: 'analytical',
        improvementAreas: ['More practice needed']
      };
    }

    // Analyze subject performance
    const subjectPerformance = new Map<string, { total: number, correct: number, time: number }>();
    
    learningData.forEach(item => {
      if (!subjectPerformance.has(item.subject)) {
        subjectPerformance.set(item.subject, { total: 0, correct: 0, time: 0 });
      }
      const stats = subjectPerformance.get(item.subject)!;
      stats.total += item.totalQuestions;
      stats.correct += item.correctAnswers;
      stats.time += item.timeSpent;
    });

    const subjectAccuracies = Array.from(subjectPerformance.entries()).map(([subject, stats]) => ({
      subject,
      accuracy: stats.correct / stats.total,
      avgTime: stats.time / stats.total
    }));

    subjectAccuracies.sort((a, b) => b.accuracy - a.accuracy);

    const strongSubjects = subjectAccuracies.slice(0, 2).map(s => s.subject);
    const weakSubjects = subjectAccuracies.slice(-2).map(s => s.subject);

    // Calculate optimal study time
    const avgTime = learningData.reduce((sum, item) => sum + item.timeSpent, 0) / learningData.length;
    const optimalStudyTime = Math.max(900, Math.min(3600, avgTime * 1.2)); // Between 15-60 minutes

    // Determine learning style based on performance patterns
    const avgAccuracy = learningData.reduce((sum, item) => sum + (item.correctAnswers / item.totalQuestions), 0) / learningData.length;
    const learningStyle: 'visual' | 'analytical' | 'practical' = 
      avgAccuracy > 0.8 ? 'analytical' : 
      avgTime < 1800 ? 'visual' : 'practical';

    // Generate improvement areas
    const improvementAreas: string[] = [];
    if (avgAccuracy < 0.7) {
      improvementAreas.push('Focus on understanding concepts before speed');
    }
    if (weakSubjects.length > 0) {
      improvementAreas.push(`Spend more time on ${weakSubjects.join(' and ')}`);
    }
    if (avgTime > 3000) {
      improvementAreas.push('Work on time management and efficiency');
    }

    return {
      strongSubjects,
      weakSubjects,
      optimalStudyTime,
      learningStyle,
      improvementAreas
    };
  }

  async visualizeModelPerformance(): Promise<void> {
    if (!this.performanceModel) return;

    try {
      // Create a surface for visualization
      const surface = tfvis.visor().surface({
        name: 'Model Performance',
        tab: 'Training'
      });

      // Generate sample data for visualization
      const sampleData = Array.from({ length: 100 }, (_, i) => ({
        x: i / 100,
        y: Math.sin(i / 10) * 0.5 + 0.5 + Math.random() * 0.1
      }));

      await tfvis.render.scatterplot(surface, {
        values: sampleData,
        series: ['Performance Prediction']
      }, {
        xLabel: 'Training Progress',
        yLabel: 'Accuracy',
        height: 300
      });
    } catch (error) {
      console.error('Error visualizing model performance:', error);
    }
  }

  async saveModel(): Promise<void> {
    if (!this.performanceModel || !this.difficultyModel) return;

    try {
      await this.performanceModel.save('localstorage://performance-model');
      await this.difficultyModel.save('localstorage://difficulty-model');
      console.log('Models saved successfully');
    } catch (error) {
      console.error('Error saving models:', error);
    }
  }

  async loadModel(): Promise<void> {
    try {
      this.performanceModel = await tf.loadLayersModel('localstorage://performance-model');
      this.difficultyModel = await tf.loadLayersModel('localstorage://difficulty-model');
      console.log('Models loaded successfully');
    } catch (error) {
      console.log('No saved models found, using fresh models');
    }
  }

  dispose(): void {
    if (this.performanceModel) {
      this.performanceModel.dispose();
    }
    if (this.difficultyModel) {
      this.difficultyModel.dispose();
    }
  }
}

export const mlService = new MLService();