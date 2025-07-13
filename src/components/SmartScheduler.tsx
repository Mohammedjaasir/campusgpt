import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, BookOpen, Send, Sparkles, Target, Zap } from 'lucide-react';
import { aiService } from '../services/api';
import { LoadingSpinner } from './LoadingSpinner';

export const SmartScheduler: React.FC = () => {
  const [exams, setExams] = useState('');
  const [deadlines, setDeadlines] = useState('');
  const [preferences, setPreferences] = useState('');
  const [loading, setLoading] = useState(false);
  const [schedule, setSchedule] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await aiService.generateSchedule({
        exams,
        deadlines,
        preferences,
      });
      
      if (response.success) {
        setSchedule(response.schedule);
      }
    } catch (error) {
      console.error('Error generating schedule:', error);
    } finally {
      setLoading(false);
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
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  const inputVariants = {
    focus: {
      scale: 1.02,
      boxShadow: "0 0 20px rgba(59, 130, 246, 0.2)",
      borderColor: "rgba(59, 130, 246, 0.5)",
      transition: { duration: 0.2 }
    },
    blur: {
      scale: 1,
      boxShadow: "0 0 0px rgba(59, 130, 246, 0)",
      borderColor: "rgba(209, 213, 219, 1)",
      transition: { duration: 0.2 }
    }
  };

  return (
    <motion.div 
      className="space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        variants={itemVariants}
        className="flex items-center space-x-4 mb-8"
      >
        <motion.div
          className="bg-gradient-to-r from-blue-500 to-cyan-500 p-3 rounded-2xl"
          whileHover={{ 
            rotate: [0, -10, 10, 0],
            scale: 1.1
          }}
          transition={{ duration: 0.5 }}
        >
          <Calendar className="text-white" size={32} />
        </motion.div>
        <div>
          <motion.h2 
            className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            Smart Scheduler
          </motion.h2>
          <motion.p 
            className="text-gray-600 mt-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Let AI create your perfect study plan
          </motion.p>
        </div>
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Sparkles className="text-blue-400" size={24} />
        </motion.div>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Form */}
        <motion.div
          variants={itemVariants}
          className="space-y-6"
        >
          <motion.form 
            onSubmit={handleSubmit} 
            className="space-y-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <motion.div variants={itemVariants}>
              <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-3">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <BookOpen size={18} className="text-blue-500" />
                </motion.div>
                <span>Upcoming Exams</span>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Target size={14} className="text-red-400" />
                </motion.div>
              </label>
              <motion.textarea
                value={exams}
                onChange={(e) => setExams(e.target.value)}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all bg-gradient-to-br from-blue-50/50 to-cyan-50/50"
                rows={3}
                placeholder="e.g., Math exam on March 15, Physics exam on March 20, Chemistry practical on March 25..."
                required
                variants={inputVariants}
                whileFocus="focus"
                initial="blur"
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-3">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                >
                  <Clock size={18} className="text-orange-500" />
                </motion.div>
                <span>Assignment Deadlines</span>
                <motion.div
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <Zap size={14} className="text-yellow-400" />
                </motion.div>
              </label>
              <motion.textarea
                value={deadlines}
                onChange={(e) => setDeadlines(e.target.value)}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all bg-gradient-to-br from-orange-50/50 to-yellow-50/50"
                rows={3}
                placeholder="e.g., Chemistry report due March 10, Programming project due March 18, Literature essay due March 22..."
                required
                variants={inputVariants}
                whileFocus="focus"
                initial="blur"
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Study Preferences & Goals
              </label>
              <motion.textarea
                value={preferences}
                onChange={(e) => setPreferences(e.target.value)}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all bg-gradient-to-br from-purple-50/50 to-pink-50/50"
                rows={3}
                placeholder="e.g., I prefer studying in the morning, 2-hour study sessions, need breaks every hour, want to focus more on weak subjects..."
                variants={inputVariants}
                whileFocus="focus"
                initial="blur"
              />
            </motion.div>

            <motion.button
              type="submit"
              disabled={loading || !exams || !deadlines}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)",
                background: "linear-gradient(45deg, #3B82F6, #06B6D4, #8B5CF6)"
              }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-600 text-white py-4 rounded-xl font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3 shadow-lg relative overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.6 }}
              />
              <span className="relative z-10 flex items-center space-x-2">
                {loading ? <LoadingSpinner /> : <Send size={20} />}
                <span>{loading ? 'Creating Magic...' : 'Generate My Schedule'}</span>
              </span>
            </motion.button>
          </motion.form>
        </motion.div>

        {/* AI Response */}
        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-br from-blue-50 via-cyan-50 to-indigo-50 rounded-2xl p-6 border border-blue-100 relative overflow-hidden"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233B82F6' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />
          </div>

          <motion.div
            className="relative z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="flex items-center space-x-3 mb-6">
              <motion.div
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 p-2 rounded-lg"
              >
                <Sparkles className="text-white" size={20} />
              </motion.div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Your AI-Generated Study Plan
              </h3>
            </div>
            
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex flex-col items-center justify-center py-16 space-y-4"
                >
                  <LoadingSpinner size="large" />
                  <motion.p 
                    className="text-blue-600 font-medium"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    AI is crafting your perfect schedule...
                  </motion.p>
                  <motion.div
                    className="flex space-x-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                  >
                    {['Analyzing', 'your', 'preferences...'].map((word, i) => (
                      <motion.span
                        key={i}
                        className="text-sm text-gray-500"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ 
                          duration: 1.5, 
                          repeat: Infinity, 
                          delay: i * 0.2 
                        }}
                      >
                        {word}
                      </motion.span>
                    ))}
                  </motion.div>
                </motion.div>
              ) : schedule ? (
                <motion.div
                  key="schedule"
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
                  className="prose prose-sm max-w-none"
                >
                  <motion.div 
                    className="whitespace-pre-wrap text-gray-700 leading-relaxed bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-white/50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 1 }}
                  >
                    {schedule}
                  </motion.div>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-16 space-y-4"
                >
                  <motion.div
                    animate={{ 
                      y: [0, -10, 0],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <Calendar size={64} className="mx-auto text-blue-300" />
                  </motion.div>
                  <motion.p 
                    className="text-gray-500 text-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    Fill out the form to get your personalized study schedule
                  </motion.p>
                  <motion.p 
                    className="text-blue-400 text-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                  >
                    ✨ Powered by advanced AI for optimal learning
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};