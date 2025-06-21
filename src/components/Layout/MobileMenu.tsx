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
        className="lg:hidden text-white p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-casino-gold-500"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
      >
        <Menu className="w-6 h-6" />
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
              className="fixed top-0 left-0 bottom-0 w-[280px] bg-gray-900 z-50 lg:hidden overflow-y-auto"
              role="dialog"
              aria-modal="true"
              aria-label="Main navigation"
            >
              {/* Menu Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-800">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-casino-gold-400 to-casino-gold-600 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-lg">📚</span>
                  </div>
                  <div>
                    <h2 className="text-lg font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-casino-gold-400 to-casino-gold-200">
                      Scholars Casino
                    </h2>
                  </div>
                </div>
                <button
                  onClick={toggleMenu}
                  className="text-gray-400 hover:text-white"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* User Profile */}
              <div className="p-4 border-b border-gray-800">
                <div className="flex items-center space-x-3">
                  <img
                    src={userAvatar}
                    alt=""
                    className="w-12 h-12 rounded-full border-2 border-casino-gold-400"
                  />
                  <div>
                    <p className="text-white font-medium">{userName}</p>
                    <button 
                      className="text-sm text-gray-400 hover:text-white flex items-center space-x-1"
                      onClick={() => handleNavigation('profile')}
                    >
                      <User className="w-3 h-3" />
                      <span>View Profile</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Navigation Items */}
              <nav className="p-4">
                <ul className="space-y-2">
                  {menuItems.map((item) => (
                    <li key={item.view}>
                      <button
                        onClick={() => handleNavigation(item.view)}
                        className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 text-left transition-colors"
                      >
                        <item.icon className="w-5 h-5 text-casino-gold-400" />
                        <span className="text-white">{item.label}</span>
                      </button>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 pt-6 border-t border-gray-800">
                  <button
                    onClick={() => handleNavigation('settings')}
                    className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 text-left transition-colors"
                  >
                    <Settings className="w-5 h-5 text-gray-400" />
                    <span className="text-white">Settings</span>
                  </button>
                  
                  <button
                    onClick={() => handleNavigation('logout')}
                    className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 text-left transition-colors"
                  >
                    <LogOut className="w-5 h-5 text-gray-400" />
                    <span className="text-white">Logout</span>
                  </button>
                </div>
              </nav>

              {/* Version Info */}
              <div className="p-4 mt-auto">
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