import React from 'react';
import { User, Coins, Trophy, Settings, BookOpen, Menu, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import { User as UserType } from '../../types';
import { AccessibilityMenu } from '../A11y/AccessibilityMenu';
import { MobileMenu } from './MobileMenu';
import { useAccessibility } from '../A11y/AccessibilityProvider';
import { hapticImpact } from '../../capacitorApp';

interface HeaderProps {
  user: UserType;
  onOpenSATResources?: () => void;
  onNavigate?: (view: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ user, onOpenSATResources, onNavigate }) => {
  const { reduceMotion } = useAccessibility();
  
  const handleNavigate = (view: string) => {
    if (onNavigate) {
      onNavigate(view);
      hapticImpact();
    }
  };

  return (
    <motion.header 
      className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-2xl border-b border-casino-gold-600/30 safe-area-top"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3 sm:py-4">
          {/* Logo */}
          <div className="flex items-center">
            {/* Mobile Menu */}
            {onNavigate && (
              <div className="mr-2 sm:mr-3">
                <MobileMenu 
                  onNavigate={handleNavigate} 
                  userName={user.name}
                  userAvatar={user.avatar}
                />
              </div>
            )}
            
            <motion.div 
              className="flex items-center space-x-2 sm:space-x-3"
              whileHover={reduceMotion ? {} : { scale: 1.05 }}
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-casino-gold-400 to-casino-gold-600 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-xl sm:text-2xl">📚</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-2xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-casino-gold-400 to-casino-gold-200">
                  Scholars Casino
                </h1>
                <p className="text-xs text-gray-400 font-body">Where Education Meets Gaming</p>
              </div>
            </motion.div>
          </div>

          {/* User Info */}
          <div className="flex items-center space-x-2 sm:space-x-4 lg:space-x-6">
            {/* SAT Resources Button */}
            {onOpenSATResources && (
              <div className="hidden lg:flex items-center space-x-2">
                <motion.button
                  onClick={() => handleNavigate('blog')}
                  className="flex items-center space-x-2 bg-orange-600/20 px-4 py-2 rounded-full border border-orange-600/30 hover:bg-orange-600/30 transition-colors"
                  whileHover={reduceMotion ? {} : { scale: 1.05 }}
                  whileTap={reduceMotion ? {} : { scale: 0.95 }}
                  aria-label="Read educational blog"
                >
                  <FileText className="w-4 h-4 text-orange-400" />
                  <span className="text-orange-200 font-medium text-sm">Blog</span>
                </motion.button>
                
                <motion.button
                  onClick={onOpenSATResources}
                  className="flex items-center space-x-2 bg-indigo-600/20 px-4 py-2 rounded-full border border-indigo-600/30 hover:bg-indigo-600/30 transition-colors"
                  whileHover={reduceMotion ? {} : { scale: 1.05 }}
                  whileTap={reduceMotion ? {} : { scale: 0.95 }}
                  aria-label="Open SAT preparation resources"
                >
                  <BookOpen className="w-4 h-4 text-indigo-400" />
                  <span className="text-indigo-200 font-medium text-sm">SAT Prep</span>
                </motion.button>
                
                <AccessibilityMenu />
              </div>
            )}
            
            {/* Coins */}
            <motion.div 
              className="flex items-center space-x-1 sm:space-x-2 bg-casino-gold-600/20 px-2 sm:px-4 py-2 rounded-full border border-casino-gold-600/30" 
              aria-label={`${user.coins.toLocaleString()} coins`}
              whileHover={reduceMotion ? {} : { scale: 1.05, backgroundColor: 'rgba(251, 191, 36, 0.3)' }}
            >
              <Coins className="w-4 h-4 sm:w-5 sm:h-5 text-casino-gold-400" />
              <span className="text-casino-gold-200 font-semibold font-body text-sm sm:text-base">
                {user.coins.toLocaleString()}
              </span>
            </motion.div>

            {/* XP Level */}
            <motion.div 
              className="flex items-center space-x-1 sm:space-x-2 bg-casino-green-600/20 px-2 sm:px-4 py-2 rounded-full border border-casino-green-600/30"
              aria-label={`Level ${user.level}`}
              whileHover={reduceMotion ? {} : { scale: 1.05, backgroundColor: 'rgba(34, 197, 94, 0.3)' }}
            >
              <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-casino-green-400" />
              <span className="text-casino-green-200 font-semibold font-body text-sm sm:text-base">
                Level {user.level}
              </span>
            </motion.div>

            {/* User Profile */}
            <motion.div 
              className="hidden sm:flex items-center space-x-2 sm:space-x-3 bg-gray-800/50 px-3 sm:px-4 py-2 rounded-full border border-gray-700/50"
              aria-label={`User profile: ${user.name}`}
              whileHover={reduceMotion ? {} : { scale: 1.05, backgroundColor: 'rgba(31, 41, 55, 0.7)' }}
            >
              <img
                src={user.avatar}
                alt={user.name}
                role="presentation"
                className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-casino-gold-400"
              />
              <span className="text-white font-medium font-body text-sm sm:text-base hidden md:inline">{user.name}</span>
              <Settings 
                className="w-4 h-4 text-gray-400 hover:text-white transition-colors cursor-pointer" 
                aria-label="Open settings"
                role="button"
                tabIndex={0}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.header>
  );
};