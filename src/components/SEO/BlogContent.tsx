import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, Clock, Tag, ArrowRight, BookOpen, TrendingUp } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishDate: string;
  readTime: number;
  tags: string[];
  category: string;
  featured?: boolean;
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'How Gamification Transforms Learning: The Science Behind Educational Games',
    excerpt: 'Discover why gamified learning is 90% more effective than traditional methods and how Scholars Casino leverages game mechanics to boost retention.',
    content: 'Full blog post content would go here...',
    author: 'Dr. Sarah Chen',
    publishDate: '2024-01-15',
    readTime: 8,
    tags: ['gamification', 'education', 'learning science'],
    category: 'Education',
    featured: true
  },
  {
    id: '2',
    title: '10 Essential Math Concepts Every Student Should Master',
    excerpt: 'From algebra to calculus, explore the fundamental mathematical concepts that form the foundation of advanced learning.',
    content: 'Full blog post content would go here...',
    author: 'Prof. Michael Rodriguez',
    publishDate: '2024-01-12',
    readTime: 12,
    tags: ['mathematics', 'algebra', 'calculus', 'study tips'],
    category: 'Mathematics'
  },
  {
    id: '3',
    title: 'Coding for Beginners: Your First Steps into Programming',
    excerpt: 'A comprehensive guide to starting your programming journey with HTML, CSS, and JavaScript through interactive challenges.',
    content: 'Full blog post content would go here...',
    author: 'Alex Thompson',
    publishDate: '2024-01-10',
    readTime: 15,
    tags: ['programming', 'html', 'css', 'javascript', 'beginners'],
    category: 'Programming'
  },
  {
    id: '4',
    title: 'Physics Made Fun: Understanding Quantum Mechanics Through Games',
    excerpt: 'Break down complex physics concepts into digestible, interactive experiences that make quantum mechanics accessible to everyone.',
    content: 'Full blog post content would go here...',
    author: 'Dr. Emily Watson',
    publishDate: '2024-01-08',
    readTime: 10,
    tags: ['physics', 'quantum mechanics', 'interactive learning'],
    category: 'Physics'
  },
  {
    id: '5',
    title: 'The Future of AI in Education: Personalized Learning Paths',
    excerpt: 'Explore how artificial intelligence is revolutionizing education through personalized learning experiences and adaptive difficulty.',
    content: 'Full blog post content would go here...',
    author: 'Dr. James Liu',
    publishDate: '2024-01-05',
    readTime: 7,
    tags: ['AI', 'machine learning', 'personalized learning', 'education technology'],
    category: 'Technology'
  },
  {
    id: '6',
    title: 'Chemistry Lab Safety: Virtual Experiments vs Real-World Practice',
    excerpt: 'Learn essential chemistry concepts safely through virtual experiments before moving to hands-on laboratory work.',
    content: 'Full blog post content would go here...',
    author: 'Dr. Maria Gonzalez',
    publishDate: '2024-01-03',
    readTime: 9,
    tags: ['chemistry', 'lab safety', 'virtual experiments', 'education'],
    category: 'Chemistry'
  }
];

interface BlogContentProps {
  onClose: () => void;
}

export const BlogContent: React.FC<BlogContentProps> = ({ onClose }) => {
  const [selectedPost, setSelectedPost] = React.useState<BlogPost | null>(null);
  const [selectedCategory, setSelectedCategory] = React.useState<string>('all');

  const categories = ['all', ...Array.from(new Set(blogPosts.map(post => post.category)))];
  const filteredPosts = selectedCategory === 'all' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  const featuredPost = blogPosts.find(post => post.featured);

  if (selectedPost) {
    return (
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
        <motion.div
          className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl h-[90vh] overflow-hidden"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setSelectedPost(null)}
                className="text-gray-600 hover:text-gray-800 transition-colors"
              >
                ← Back to Blog
              </button>
              <button
                onClick={onClose}
                className="text-gray-600 hover:text-gray-800 transition-colors"
              >
                ✕
              </button>
            </div>
          </div>
          
          <div className="p-6 overflow-y-auto h-full">
            <article>
              <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">{selectedPost.title}</h1>
                <div className="flex items-center space-x-6 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span>{selectedPost.author}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(selectedPost.publishDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>{selectedPost.readTime} min read</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                  {selectedPost.tags.map(tag => (
                    <span key={tag} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </header>
              
              <div className="prose prose-lg max-w-none">
                <p className="text-lg text-gray-700 leading-relaxed">
                  {selectedPost.content || selectedPost.excerpt}
                </p>
                
                <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
                  <h3 className="text-lg font-semibold text-blue-800 mb-2">Ready to put this into practice?</h3>
                  <p className="text-blue-700 mb-4">
                    Try our interactive {selectedPost.category.toLowerCase()} challenges and see how gamified learning can transform your education!
                  </p>
                  <button
                    onClick={onClose}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Start Learning Now
                  </button>
                </div>
              </div>
            </article>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <motion.div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl h-[90vh] overflow-hidden"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-white/20 rounded-full p-3">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Learning Blog</h2>
                <p className="text-blue-100">Educational insights and study tips</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto h-full">
          {/* Featured Post */}
          {featuredPost && (
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                <span>Featured Article</span>
              </h3>
              
              <motion.div
                className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200 cursor-pointer"
                onClick={() => setSelectedPost(featuredPost)}
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-gray-800 mb-2">{featuredPost.title}</h4>
                    <p className="text-gray-600 mb-4">{featuredPost.excerpt}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>{featuredPost.author}</span>
                      <span>•</span>
                      <span>{featuredPost.readTime} min read</span>
                      <span>•</span>
                      <span>{new Date(featuredPost.publishDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-blue-600 ml-4" />
                </div>
              </motion.div>
            </div>
          )}

          {/* Category Filter */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors capitalize ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.filter(post => !post.featured).map((post, index) => (
              <motion.article
                key={post.id}
                className="bg-white border border-gray-200 rounded-xl p-6 cursor-pointer hover:shadow-lg transition-all duration-300"
                onClick={() => setSelectedPost(post)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -2 }}
              >
                <div className="mb-4">
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                    {post.category}
                  </span>
                </div>
                
                <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
                  {post.title}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center space-x-2">
                    <User className="w-3 h-3" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-3 h-3" />
                    <span>{post.readTime} min</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1 mt-3">
                  {post.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>

          {/* SEO Content Section */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Why Choose Scholars Casino for Learning?</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-green-50 rounded-lg p-6">
                <h4 className="font-semibold text-green-800 mb-2">🎮 Gamified Learning</h4>
                <p className="text-green-700 text-sm">
                  Transform boring study sessions into exciting gaming experiences. Earn XP, collect coins, and unlock achievements while mastering academic subjects.
                </p>
              </div>
              
              <div className="bg-blue-50 rounded-lg p-6">
                <h4 className="font-semibold text-blue-800 mb-2">🤖 AI-Powered Tutoring</h4>
                <p className="text-blue-700 text-sm">
                  Get personalized learning recommendations from our AI tutor Bob. Adaptive difficulty ensures optimal challenge levels for maximum learning efficiency.
                </p>
              </div>
              
              <div className="bg-purple-50 rounded-lg p-6">
                <h4 className="font-semibold text-purple-800 mb-2">💻 Interactive Coding</h4>
                <p className="text-purple-700 text-sm">
                  Learn programming with hands-on coding challenges. Master HTML, CSS, JavaScript, Python, React, and more through real-world projects.
                </p>
              </div>
              
              <div className="bg-orange-50 rounded-lg p-6">
                <h4 className="font-semibold text-orange-800 mb-2">🏆 Competitive Tournaments</h4>
                <p className="text-orange-700 text-sm">
                  Join live tournaments and compete with students worldwide. Win prizes, climb leaderboards, and showcase your knowledge.
                </p>
              </div>
              
              <div className="bg-pink-50 rounded-lg p-6">
                <h4 className="font-semibold text-pink-800 mb-2">📊 Progress Tracking</h4>
                <p className="text-pink-700 text-sm">
                  Monitor your learning journey with detailed analytics. Track accuracy, speed, retention rates, and identify areas for improvement.
                </p>
              </div>
              
              <div className="bg-indigo-50 rounded-lg p-6">
                <h4 className="font-semibold text-indigo-800 mb-2">🎓 Comprehensive Subjects</h4>
                <p className="text-indigo-700 text-sm">
                  From basic arithmetic to advanced calculus, quantum physics to organic chemistry, and HTML to full-stack development - we cover it all.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};