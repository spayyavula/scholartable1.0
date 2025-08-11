import React from 'react';
import { motion } from 'framer-motion';
import { DivideIcon as LucideIcon } from 'lucide-react';
import { useAccessibility } from '../A11y/AccessibilityProvider';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, color, trend }) => {
  const { reduceMotion } = useAccessibility();
  
  return (
    <motion.div
      className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-3 sm:p-4 lg:p-6 border border-gray-700/50 shadow-xl touch-manipulation"
      whileHover={reduceMotion ? {} : { scale: 1.02, y: -2 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduceMotion ? 0.1 : 0.5 }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3 sm:space-x-4 flex-1 min-w-0">
          <div className={`p-2 sm:p-3 rounded-xl ${color} flex-shrink-0`}>
            <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <div>
            <p className="text-gray-400 text-xs sm:text-sm font-body">{title}</p>
            <p className="text-xl sm:text-2xl font-heading font-bold text-white">
              {typeof value === 'number' ? value.toLocaleString() : value}
            </p>
          </div>
        </div>
        
        {trend && (
          <div className={`flex items-center space-x-1 text-xs sm:text-sm flex-shrink-0 ${
            trend.isPositive ? 'text-green-400' : 'text-red-400'
          }`}>
            <span>{trend.isPositive ? '↗' : '↘'}</span>
            <span>{Math.abs(trend.value)}%</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};