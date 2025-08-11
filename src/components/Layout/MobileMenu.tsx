import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  X, 
  Home, 
  Trophy, 
  BookOpen, 
  User, 
  Settings, 
  Database,
  Brain,
  Crown,
  Mail,
  HelpCircle,
  LogOut
} from 'lucide-react';
import { useAccessibility } from '../A11y/AccessibilityProvider';
import { hapticImpact } from '../../capacitorApp';

interface MobileMenuProps {
  onNavigate: (view: string) => void;
  userName: string;
  userAvatar: string;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ 
  onNavigate, 
  userName, 
  userAvatar 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { reduceMotion } = useAccessibility();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    hapticImpact();
  };

  const handleNavigation = (view: string) => {
    onNavigate(view);
    setIsOpen(false);
    hapticImpact();
  };

  const menuItems = [
    { icon: Home, label: 'Home', view: 'lobby' },
    { icon: Trophy, label: 'Tournaments', view: 'tournaments' },
    { icon: BookOpen, label: 'SAT Resources', view: 'sat-resources' },
    { icon: Database, label: 'Schema Designer', view: 'schema-designer' },
    { icon: Brain, label: 'AI Dashboard', view: 'ai-dashboard' },
    { icon: Crown, label: 'Upgrade', view: 'subscription' },
    { icon: Mail, label: 'Newsletter', view: 'newsletter' },
    { icon: HelpCircle, label: 'Help', view: 'help' }
  ];

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={toggleMenu}
        className="lg:hidden text-white p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-casino-gold-500 touch-manipulation min-h-[44px] min-w-[44px] flex items-center justify-center"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
      >
        <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduceMotion ? 0.1 : 0.2 }}
              className="fixed inset-0 bg-black/70 z-40 lg:hidden"
              onClick={toggleMenu}
              aria-hidden="true"
            />

            {/* Menu Panel */}
            <motion.div
              id="mobile-menu"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: reduceMotion ? 0.1 : 0.3, ease: 'easeOut' }}
              className="fixed top-0 left-0 bottom-0 w-[280px] sm:w-[320px] bg-gray-900 z-50 lg:hidden overflow-y-auto safe-area-top safe-area-bottom"
              role="dialog"
              aria-modal="true"
              aria-label="Main navigation"
            >
              {/* Menu Header */}
              <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-800">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-casino-gold-400 to-casino-gold-600 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-lg sm:text-xl">📚</span>
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-casino-gold-400 to-casino-gold-200">
                      Scholars Casino
                    </h2>
                  </div>
                </div>
                <button
                  onClick={toggleMenu}
                  className="text-gray-400 hover:text-white touch-manipulation p-2"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>

              {/* User Profile */}
              <div className="p-4 sm:p-6 border-b border-gray-800">
                <div className="flex items-center space-x-3">
                  <img
                    src={userAvatar}
                    alt=""
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-casino-gold-400"
                  />
                  <div>
                    <p className="text-white font-medium text-sm sm:text-base">{userName}</p>
                    <button 
                      className="text-xs sm:text-sm text-gray-400 hover:text-white flex items-center space-x-1 touch-manipulation"
                      onClick={() => handleNavigation('profile')}
                    >
                      <User className="w-3 h-3" />
                      <span>View Profile</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Navigation Items */}
              <nav className="p-4 sm:p-6">
                <ul className="space-y-2">
                  {menuItems.map((item) => (
                    <li key={item.view}>
                      <button
                        onClick={() => handleNavigation(item.view)}
                        className="w-full flex items-center space-x-3 p-3 sm:p-4 rounded-lg hover:bg-gray-800 text-left transition-colors touch-manipulation min-h-[48px]"
                      >
                        <item.icon className="w-5 h-5 text-casino-gold-400 flex-shrink-0" />
                        <span className="text-white text-sm sm:text-base">{item.label}</span>
                      </button>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 pt-6 border-t border-gray-800">
                  <button
                    onClick={() => handleNavigation('settings')}
                    className="w-full flex items-center space-x-3 p-3 sm:p-4 rounded-lg hover:bg-gray-800 text-left transition-colors touch-manipulation min-h-[48px]"
                  >
                    <Settings className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    <span className="text-white text-sm sm:text-base">Settings</span>
                  </button>
                  
                  <button
                    onClick={() => handleNavigation('logout')}
                    className="w-full flex items-center space-x-3 p-3 sm:p-4 rounded-lg hover:bg-gray-800 text-left transition-colors touch-manipulation min-h-[48px]"
                  >
                    <LogOut className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    <span className="text-white text-sm sm:text-base">Logout</span>
                  </button>
                </div>
              </nav>

              {/* Version Info */}
              <div className="p-4 sm:p-6 mt-auto">
                <p className="text-xs text-gray-500 text-center">
                  Version 1.0.0
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};