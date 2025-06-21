import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Accessibility, 
  Eye, 
  Type, 
  ZoomIn, 
  Zap, 
  X, 
  Check,
  Volume2,
  Moon,
  Sun
} from 'lucide-react';
import { useAccessibility } from './AccessibilityProvider';
import { hapticImpact } from '../../capacitorApp';

interface AccessibilityMenuProps {
  className?: string;
}

export const AccessibilityMenu: React.FC<AccessibilityMenuProps> = ({ className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { 
    highContrast, 
    largeText, 
    reduceMotion, 
    screenReader,
    toggleHighContrast,
    toggleLargeText,
    toggleReduceMotion,
    toggleScreenReader
  } = useAccessibility();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    hapticImpact();
  };

  const handleToggle = (toggle: () => void) => {
    toggle();
    hapticImpact();
  };

  return (
    <div className={`relative z-50 ${className}`}>
      <button
        onClick={toggleMenu}
        className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-colors"
        aria-label="Accessibility options"
      >
        <Accessibility className="w-5 h-5" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            className="absolute bottom-full mb-2 right-0 bg-white dark:bg-gray-800 rounded-lg shadow-xl p-4 w-64"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-800 dark:text-white font-semibold">Accessibility</h3>
              <button
                onClick={toggleMenu}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                aria-label="Close accessibility menu"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => handleToggle(toggleHighContrast)}
                className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                aria-pressed={highContrast}
              >
                <div className="flex items-center space-x-3">
                  {highContrast ? <Moon className="w-5 h-5 text-purple-600" /> : <Sun className="w-5 h-5 text-yellow-500" />}
                  <span className="text-gray-800 dark:text-white text-sm">High Contrast</span>
                </div>
                <div className={`w-10 h-5 rounded-full relative ${highContrast ? 'bg-blue-600' : 'bg-gray-300'}`}>
                  <div className={`absolute w-4 h-4 rounded-full bg-white top-0.5 transition-all ${highContrast ? 'right-0.5' : 'left-0.5'}`}></div>
                </div>
              </button>

              <button
                onClick={() => handleToggle(toggleLargeText)}
                className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                aria-pressed={largeText}
              >
                <div className="flex items-center space-x-3">
                  <Type className={`w-5 h-5 ${largeText ? 'text-blue-600' : 'text-gray-500'}`} />
                  <span className="text-gray-800 dark:text-white text-sm">Larger Text</span>
                </div>
                <div className={`w-10 h-5 rounded-full relative ${largeText ? 'bg-blue-600' : 'bg-gray-300'}`}>
                  <div className={`absolute w-4 h-4 rounded-full bg-white top-0.5 transition-all ${largeText ? 'right-0.5' : 'left-0.5'}`}></div>
                </div>
              </button>

              <button
                onClick={() => handleToggle(toggleReduceMotion)}
                className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                aria-pressed={reduceMotion}
              >
                <div className="flex items-center space-x-3">
                  <Zap className={`w-5 h-5 ${reduceMotion ? 'text-blue-600' : 'text-gray-500'}`} />
                  <span className="text-gray-800 dark:text-white text-sm">Reduce Motion</span>
                </div>
                <div className={`w-10 h-5 rounded-full relative ${reduceMotion ? 'bg-blue-600' : 'bg-gray-300'}`}>
                  <div className={`absolute w-4 h-4 rounded-full bg-white top-0.5 transition-all ${reduceMotion ? 'right-0.5' : 'left-0.5'}`}></div>
                </div>
              </button>

              <button
                onClick={() => handleToggle(toggleScreenReader)}
                className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                aria-pressed={screenReader}
              >
                <div className="flex items-center space-x-3">
                  <Volume2 className={`w-5 h-5 ${screenReader ? 'text-blue-600' : 'text-gray-500'}`} />
                  <span className="text-gray-800 dark:text-white text-sm">Screen Reader</span>
                </div>
                <div className={`w-10 h-5 rounded-full relative ${screenReader ? 'bg-blue-600' : 'bg-gray-300'}`}>
                  <div className={`absolute w-4 h-4 rounded-full bg-white top-0.5 transition-all ${screenReader ? 'right-0.5' : 'left-0.5'}`}></div>
                </div>
              </button>
            </div>

            <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                These settings help make Scholars Casino more accessible for everyone.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};