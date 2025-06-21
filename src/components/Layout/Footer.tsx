import React from 'react';
import { motion } from 'framer-motion';
import { 
  Github, 
  Twitter, 
  Mail, 
  Heart, 
  BookOpen, 
  Shield, 
  HelpCircle,
  ExternalLink
} from 'lucide-react';
import { useAccessibility } from '../A11y/AccessibilityProvider';

export const Footer: React.FC = () => {
  const { reduceMotion } = useAccessibility();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 border-t border-gray-800 pt-12 pb-8 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-casino-gold-400 to-casino-gold-600 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-xl">📚</span>
              </div>
              <div>
                <h2 className="text-xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-casino-gold-400 to-casino-gold-200">
                  Scholars Casino
                </h2>
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Where education meets gaming. Learn through play and compete with students worldwide.
            </p>
            <div className="flex space-x-4">
              <motion.a 
                href="https://github.com/scholarscasino" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                whileHover={reduceMotion ? {} : { scale: 1.1 }}
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </motion.a>
              <motion.a 
                href="https://twitter.com/scholarscasino" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                whileHover={reduceMotion ? {} : { scale: 1.1 }}
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </motion.a>
              <motion.a 
                href="mailto:info@scholarscasino.com" 
                className="text-gray-400 hover:text-white transition-colors"
                whileHover={reduceMotion ? {} : { scale: 1.1 }}
                aria-label="Email us"
              >
                <Mail className="w-5 h-5" />
              </motion.a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/about" className="text-gray-400 hover:text-white transition-colors text-sm flex items-center">
                  <span className="mr-2">•</span> About Us
                </a>
              </li>
              <li>
                <a href="/courses" className="text-gray-400 hover:text-white transition-colors text-sm flex items-center">
                  <span className="mr-2">•</span> Courses
                </a>
              </li>
              <li>
                <a href="/tournaments" className="text-gray-400 hover:text-white transition-colors text-sm flex items-center">
                  <span className="mr-2">•</span> Tournaments
                </a>
              </li>
              <li>
                <a href="/pricing" className="text-gray-400 hover:text-white transition-colors text-sm flex items-center">
                  <span className="mr-2">•</span> Pricing
                </a>
              </li>
              <li>
                <a href="/blog" className="text-gray-400 hover:text-white transition-colors text-sm flex items-center">
                  <span className="mr-2">•</span> Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="/help" className="text-gray-400 hover:text-white transition-colors text-sm flex items-center">
                  <HelpCircle className="w-4 h-4 mr-2" /> Help Center
                </a>
              </li>
              <li>
                <a href="/documentation" className="text-gray-400 hover:text-white transition-colors text-sm flex items-center">
                  <BookOpen className="w-4 h-4 mr-2" /> Documentation
                </a>
              </li>
              <li>
                <a href="/privacy" className="text-gray-400 hover:text-white transition-colors text-sm flex items-center">
                  <Shield className="w-4 h-4 mr-2" /> Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="text-gray-400 hover:text-white transition-colors text-sm flex items-center">
                  <ExternalLink className="w-4 h-4 mr-2" /> Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-semibold mb-4">Stay Updated</h3>
            <p className="text-gray-400 text-sm mb-4">
              Subscribe to our newsletter for the latest updates and educational resources.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email"
                aria-label="Email for newsletter"
                className="bg-gray-800 text-white px-4 py-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-casino-gold-500 w-full"
              />
              <button
                type="submit"
                className="bg-casino-gold-500 hover:bg-casino-gold-400 text-gray-900 font-medium px-4 py-2 rounded-r-lg transition-colors"
                aria-label="Subscribe to newsletter"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 mt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © {currentYear} Scholars Casino. All rights reserved.
          </p>
          <div className="flex items-center text-gray-500 text-sm">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-500 mx-1" />
            <span>for education</span>
          </div>
        </div>
      </div>
    </footer>
  );
};