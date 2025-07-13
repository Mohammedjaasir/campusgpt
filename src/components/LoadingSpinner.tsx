import React from 'react';
import { motion } from 'framer-motion';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'medium', 
  color = 'border-white' 
}) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-6 h-6',
    large: 'w-12 h-12',
  };

  const variants = {
    spin: {
      rotate: 360,
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: "linear"
      }
    },
    pulse: {
      scale: [1, 1.2, 1],
      opacity: [0.7, 1, 0.7],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  if (size === 'large') {
    return (
      <div className="flex items-center justify-center space-x-2">
        <motion.div
          className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
          variants={variants}
          animate="pulse"
          style={{ animationDelay: '0s' }}
        />
        <motion.div
          className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
          variants={variants}
          animate="pulse"
          style={{ animationDelay: '0.2s' }}
        />
        <motion.div
          className="w-3 h-3 bg-gradient-to-r from-pink-500 to-red-500 rounded-full"
          variants={variants}
          animate="pulse"
          style={{ animationDelay: '0.4s' }}
        />
      </div>
    );
  }

  return (
    <motion.div
      variants={variants}
      animate="spin"
      className={`${sizeClasses[size]} border-2 ${color} border-t-transparent rounded-full`}
    />
  );
};