import React from 'react';
import { motion } from 'framer-motion';
import { useAccessibility } from '../A11y/AccessibilityProvider';

interface CasinoTableProps {
  children: React.ReactNode;
  className?: string;
}

export const CasinoTable: React.FC<CasinoTableProps> = ({ children, className = '' }) => {
  const { reduceMotion } = useAccessibility();
  
  return (
    <motion.div
      className={`relative bg-gradient-to-br from-casino-green-800 to-casino-green-900 rounded-lg sm:rounded-xl lg:rounded-3xl shadow-2xl border-2 sm:border-4 lg:border-8 border-yellow-600 overflow-hidden mx-2 sm:mx-0 ${className}`}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: reduceMotion ? 0.1 : 0.6 }}
    >
      {/* Table felt texture */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-casino-green-700/30 to-casino-green-900/50 pointer-events-none" />
      
      {/* Decorative border pattern */}
      <div className="absolute inset-0 border-2 sm:border-4 border-casino-gold-400/20 rounded-lg sm:rounded-xl lg:rounded-3xl pointer-events-none" />
      
      {/* Casino chips scattered decoration */}
      <div className="absolute top-2 sm:top-4 left-2 sm:left-4 w-4 h-4 sm:w-6 sm:h-6 bg-casino-red-500 rounded-full shadow-lg border-1 sm:border-2 border-white opacity-60" />
      <div className="absolute top-4 sm:top-8 right-4 sm:right-8 w-3 h-3 sm:w-5 sm:h-5 bg-casino-gold-500 rounded-full shadow-lg border-1 sm:border-2 border-white opacity-40" />
      <div className="absolute bottom-3 sm:bottom-6 left-4 sm:left-8 w-3 h-3 sm:w-4 sm:h-4 bg-blue-500 rounded-full shadow-lg border-1 sm:border-2 border-white opacity-50" />
      
      {/* Content */}
      <div className="relative z-10 p-3 sm:p-6 lg:p-8">
        {children}
      </div>
    </motion.div>
  );
};