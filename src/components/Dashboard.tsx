import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, HelpCircle, Heart, MapPin, LogOut, User, Sparkles, Star, Zap, Crown, Rocket, Brain } from 'lucide-react';
import { User as UserType } from '../types';
import { SmartScheduler } from './SmartScheduler';
import { DoubtSolver } from './DoubtSolver';
import { MoodJournal } from './MoodJournal';
import { CampusAssistant } from './CampusAssistant';

interface DashboardProps {
  user: UserType;
  onLogout: () => void;
}

type ActiveTab = 'scheduler' | 'doubts' | 'journal' | 'campus';

export const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('scheduler');

  const tabs = [
    { 
      id: 'scheduler' as ActiveTab, 
      label: 'Smart Scheduler', 
      icon: Calendar, 
      gradient: 'from-cyan-400 via-blue-500 to-purple-600',
      bgGradient: 'from-cyan-50 via-blue-50 to-purple-50',
      description: '🚀 AI-powered study planning',
      emoji: '📅'
    },
    { 
      id: 'doubts' as ActiveTab, 
      label: 'Doubt Solver', 
      icon: HelpCircle, 
      gradient: 'from-emerald-400 via-green-500 to-teal-600',
      bgGradient: 'from-emerald-50 via-green-50 to-teal-50',
      description: '🧠 Get instant academic help',
      emoji: '❓'
    },
    { 
      id: 'journal' as ActiveTab, 
      label: 'Mood Journal', 
      icon: Heart, 
      gradient: 'from-pink-400 via-rose-500 to-red-600',
      bgGradient: 'from-pink-50 via-rose-50 to-red-50',
      description: '💖 Track your emotional wellness',
      emoji: '📝'
    },
    { 
      id: 'campus' as ActiveTab, 
      label: 'Campus Assistant', 
      icon: MapPin, 
      gradient: 'from-violet-400 via-purple-500 to-indigo-600',
      bgGradient: 'from-violet-50 via-purple-50 to-indigo-50',
      description: '🏫 Navigate campus life easily',
      emoji: '🗺️'
    },
  ];

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'scheduler':
        return <SmartScheduler />;
      case 'doubts':
        return <DoubtSolver />;
      case 'journal':
        return <MoodJournal />;
      case 'campus':
        return <CampusAssistant />;
      default:
        return <SmartScheduler />;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    }
  };

  const tabVariants = {
    inactive: {
      scale: 1,
      y: 0,
      rotateY: 0,
      rotateX: 0,
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
    },
    active: {
      scale: 1.08,
      y: -12,
      rotateY: 5,
      rotateX: 5,
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 30px rgba(139, 92, 246, 0.3)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25
      }
    },
    hover: {
      scale: 1.05,
      y: -8,
      rotateY: 2,
      boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.2)",
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 30
      }
    }
  };

  const sparkleAnimation = {
    animate: {
      scale: [1, 1.5, 1],
      rotate: [0, 180, 360],
      opacity: [0.7, 1, 0.7],
      x: [0, 10, -10, 0],
      y: [0, -10, 10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const floatingAnimation = {
    animate: {
      y: [0, -20, 0],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div 
      className="min-h-screen relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)',
        backgroundSize: '400% 400%',
        animation: 'gradientShift 15s ease infinite',
      }}
    >
      {/* Ultra Dynamic Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated Gradient Orbs */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`bg-orb-${i}`}
            className="absolute rounded-full blur-3xl opacity-20"
            style={{
              background: `linear-gradient(45deg, 
                ${['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB6BD9', '#3742FA', '#2ED573', '#FFA502'][i]}, 
                ${['#FF8E53', '#6C5CE7', '#A29BFE', '#FD79A8', '#FDCB6E', '#E17055', '#00B894', '#E84393', '#5F27CD', '#00D2D3', '#FF9FF3', '#54A0FF'][i]})`,
              width: `${Math.random() * 300 + 150}px`,
              height: `${Math.random() * 300 + 150}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 300 - 150, 0],
              y: [0, Math.random() * 300 - 150, 0],
              scale: [1, 1.3, 1],
              rotate: [0, 360],
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 5,
            }}
          />
        ))}

        {/* Floating Particles */}
        {[...Array(80)].map((_, i) => (
          <motion.div
            key={`bg-particle-${i}`}
            className="absolute w-1 h-1 rounded-full"
            style={{
              background: `linear-gradient(45deg, 
                ${['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD'][i % 6]}, 
                ${['#FF8E53', '#6C5CE7', '#A29BFE', '#FD79A8', '#FDCB6E', '#E17055'][i % 6]})`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              boxShadow: `0 0 10px ${['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD'][i % 6]}`,
            }}
            animate={{
              y: [0, -300, 0],
              x: [0, Math.random() * 200 - 100, 0],
              opacity: [0, 1, 0],
              scale: [0, 2, 0],
            }}
            transition={{
              duration: 10 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 8,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ 
          type: "spring", 
          stiffness: 200, 
          damping: 25,
          duration: 1 
        }}
        className="bg-white/10 backdrop-blur-2xl shadow-2xl border-b border-white/20 sticky top-0 z-50 relative overflow-hidden"
      >
        {/* Header Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <motion.div
            className="absolute inset-0"
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%'],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, #FF6B6B 0%, transparent 50%), 
                               radial-gradient(circle at 75% 75%, #4ECDC4 0%, transparent 50%)`,
              backgroundSize: '100px 100px',
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex justify-between items-center h-24">
            <motion.div 
              className="flex items-center space-x-6"
              whileHover={{ scale: 1.02 }}
            >
              <motion.div 
                className="w-16 h-16 rounded-2xl flex items-center justify-center relative overflow-hidden"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 1 }}
                style={{
                  background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4, #45B7D1, #96CEB4, #FFEAA7)',
                  backgroundSize: '300% 300%',
                  animation: 'gradientShift 4s ease infinite',
                }}
              >
                <Brain className="text-white drop-shadow-lg" size={32} />
                <motion.div
                  className="absolute -top-1 -right-1"
                  variants={sparkleAnimation}
                  animate="animate"
                >
                  <Crown className="text-yellow-300" size={16} />
                </motion.div>
              </motion.div>
              <div>
                <motion.h1 
                  className="text-4xl font-bold text-white drop-shadow-lg"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  CampusGPT
                </motion.h1>
                <motion.p 
                  className="text-white/80 text-lg font-medium"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  🚀 Your AI-powered campus companion
                </motion.p>
              </div>
            </motion.div>
            
            <motion.div 
              className="flex items-center space-x-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <motion.div 
                className="flex items-center space-x-4 bg-white/10 backdrop-blur-xl px-6 py-3 rounded-full border border-white/20"
                whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(255,255,255,0.2)" }}
              >
                <motion.div
                  className="w-10 h-10 rounded-full flex items-center justify-center relative overflow-hidden"
                  whileHover={{ rotate: 180 }}
                  transition={{ duration: 0.5 }}
                  style={{
                    background: 'linear-gradient(45deg, #667eea, #764ba2)',
                  }}
                >
                  <User size={20} className="text-white" />
                </motion.div>
                <div>
                  <span className="text-white font-bold text-lg">{user.name}</span>
                  <p className="text-white/70 text-sm">{user.email}</p>
                </div>
              </motion.div>
              <motion.button
                whileHover={{ 
                  scale: 1.1,
                  boxShadow: "0 15px 30px rgba(239, 68, 68, 0.4)"
                }}
                whileTap={{ scale: 0.9 }}
                onClick={onLogout}
                className="flex items-center space-x-3 bg-gradient-to-r from-red-500 via-pink-500 to-red-600 hover:from-red-600 hover:via-pink-600 hover:to-red-700 text-white px-8 py-4 rounded-full transition-all shadow-xl font-bold"
              >
                <LogOut size={20} />
                <span>Logout</span>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </motion.header>

      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Welcome Section */}
        <motion.div 
          variants={itemVariants}
          className="text-center mb-16"
        >
          <motion.h2 
            className="text-6xl font-bold text-white mb-6 drop-shadow-lg"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1 }}
          >
            Welcome back, <span className="bg-gradient-to-r from-yellow-300 via-pink-300 to-cyan-300 bg-clip-text text-transparent">{user.name.split(' ')[0]}!</span>
          </motion.h2>
          <motion.p 
            className="text-white/90 text-2xl font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
          >
            🎯 Ready to supercharge your productivity today?
          </motion.p>
          <motion.div
            className="flex justify-center space-x-4 mt-6"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <motion.div variants={sparkleAnimation} animate="animate">
              <Rocket className="text-yellow-300" size={32} />
            </motion.div>
            <motion.div variants={sparkleAnimation} animate="animate" style={{ animationDelay: '1s' }}>
              <Star className="text-pink-300" size={28} />
            </motion.div>
            <motion.div variants={sparkleAnimation} animate="animate" style={{ animationDelay: '2s' }}>
              <Zap className="text-cyan-300" size={30} />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
        >
          {tabs.map((tab, index) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <motion.button
                key={tab.id}
                variants={tabVariants}
                initial="inactive"
                animate={isActive ? "active" : "inactive"}
                whileHover="hover"
                whileTap={{ scale: 0.9 }}
                onClick={() => setActiveTab(tab.id)}
                className="relative p-8 rounded-3xl transition-all duration-500 group overflow-hidden"
                style={{
                  transformStyle: 'preserve-3d',
                  background: isActive
                    ? `linear-gradient(135deg, ${tab.gradient.split(' ').join(', ')})`
                    : 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(20px)',
                  border: isActive ? '2px solid rgba(255,255,255,0.3)' : '2px solid rgba(255,255,255,0.1)',
                  color: isActive ? 'white' : 'rgba(255,255,255,0.8)',
                }}
              >
                {/* Background Gradient Overlay */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(135deg, ${tab.gradient.split(' ').join(', ')})`,
                  }}
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                />

                {/* Floating Particles */}
                {isActive && (
                  <>
                    <motion.div
                      className="absolute top-4 right-4"
                      variants={sparkleAnimation}
                      animate="animate"
                    >
                      <Sparkles className="text-white/70" size={20} />
                    </motion.div>
                    <motion.div
                      className="absolute bottom-4 left-4"
                      variants={sparkleAnimation}
                      animate="animate"
                      style={{ animationDelay: '1s' }}
                    >
                      <Star className="text-white/50" size={16} />
                    </motion.div>
                  </>
                )}

                {/* Icon */}
                <motion.div
                  className="mb-6 relative"
                  whileHover={{ 
                    rotate: [0, -15, 15, 0],
                    scale: 1.2
                  }}
                  transition={{ duration: 0.6 }}
                >
                  <motion.div
                    className="text-6xl mb-2"
                    variants={floatingAnimation}
                    animate="animate"
                  >
                    {tab.emoji}
                  </motion.div>
                  <Icon size={48} className="mx-auto" />
                </motion.div>

                {/* Content */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <h3 className="font-bold text-xl mb-3">{tab.label}</h3>
                  <p className="text-sm opacity-80 leading-relaxed">
                    {tab.description}
                  </p>
                </motion.div>

                {/* Active Indicator */}
                {isActive && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-2 bg-white/40 rounded-b-3xl"
                    layoutId="activeTab"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}

                {/* Hover Glow Effect */}
                <motion.div
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(135deg, ${tab.gradient.split(' ').join(', ')})`,
                    filter: 'blur(20px)',
                    transform: 'scale(1.1)',
                    zIndex: -1,
                  }}
                />
              </motion.button>
            );
          })}
        </motion.div>

        {/* Active Component */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 200, scale: 0.8, rotateY: 90 }}
            animate={{ opacity: 1, x: 0, scale: 1, rotateY: 0 }}
            exit={{ opacity: 0, x: -200, scale: 0.8, rotateY: -90 }}
            transition={{ 
              type: "spring", 
              stiffness: 200, 
              damping: 25,
              duration: 0.8 
            }}
            className="bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl p-10 border border-white/20 relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
            }}
          >
            {/* Component Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <motion.div
                className="absolute inset-0"
                animate={{
                  backgroundPosition: ['0% 0%', '100% 100%'],
                }}
                transition={{
                  duration: 30,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{
                  backgroundImage: `radial-gradient(circle at 20% 20%, #FF6B6B 0%, transparent 50%), 
                                   radial-gradient(circle at 80% 80%, #4ECDC4 0%, transparent 50%),
                                   radial-gradient(circle at 40% 60%, #45B7D1 0%, transparent 50%)`,
                  backgroundSize: '200px 200px',
                }}
              />
            </div>
            
            <div className="relative z-10">
              {renderActiveComponent()}
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      <style jsx>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </motion.div>
  );
};