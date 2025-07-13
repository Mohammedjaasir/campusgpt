import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Lock, GraduationCap, Eye, EyeOff, Sparkles, Mail, Star, Zap, Heart } from 'lucide-react';
import { authService } from '../services/api';
import { User as UserType } from '../types';

interface LoginFormProps {
  onLogin: (user: UserType) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (!isLogin && password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const response = isLogin 
        ? await authService.login({ email, password })
        : await authService.register({ email, password, name });
      
      if (response.success) {
        if (isLogin) {
          onLogin(response.user);
        } else {
          setSuccess('🎉 Account created successfully! Please login.');
          setIsLogin(true);
          setPassword('');
          setConfirmPassword('');
          setName('');
        }
      } else {
        setError(response.message || `${isLogin ? 'Login' : 'Registration'} failed`);
      }
    } catch (err) {
      setError(`${isLogin ? 'Login' : 'Registration'} failed. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.3, 
      y: 100,
      rotateX: -90
    },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.3, 
      y: -100,
      rotateX: 90,
      transition: { 
        duration: 0.5,
        ease: "backIn"
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      x: -100, 
      scale: 0.5,
      rotateY: -90
    },
    visible: { 
      opacity: 1, 
      x: 0, 
      scale: 1,
      rotateY: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
        duration: 0.8
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [-20, 20, -20],
      rotate: [0, 10, -10, 0],
      scale: [1, 1.1, 1],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const sparkleVariants = {
    animate: {
      scale: [0.5, 1.5, 0.5],
      opacity: [0.3, 1, 0.3],
      rotate: [0, 180, 360],
      x: [0, 30, -30, 0],
      y: [0, -30, 30, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const orbitVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 20,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.3, 1],
      opacity: [0.7, 1, 0.7],
      boxShadow: [
        "0 0 20px rgba(139, 92, 246, 0.3)",
        "0 0 60px rgba(139, 92, 246, 0.8)",
        "0 0 20px rgba(139, 92, 246, 0.3)"
      ],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 via-indigo-900 to-pink-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Ultra Dynamic Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated Gradient Orbs */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`orb-${i}`}
            className="absolute rounded-full blur-3xl opacity-20"
            style={{
              background: `linear-gradient(45deg, 
                ${['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F'][i]}, 
                ${['#FF8E53', '#6C5CE7', '#A29BFE', '#FD79A8', '#FDCB6E', '#E17055', '#00B894', '#E84393'][i]})`,
              width: `${Math.random() * 400 + 200}px`,
              height: `${Math.random() * 400 + 200}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 200 - 100, 0],
              y: [0, Math.random() * 200 - 100, 0],
              scale: [1, 1.2, 1],
              rotate: [0, 360],
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 5,
            }}
          />
        ))}

        {/* Floating Particles */}
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1 h-1 rounded-full"
            style={{
              background: `linear-gradient(45deg, 
                ${['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'][i % 5]}, 
                ${['#FF8E53', '#6C5CE7', '#A29BFE', '#FD79A8', '#FDCB6E'][i % 5]})`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              boxShadow: `0 0 10px ${['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'][i % 5]}`,
            }}
            animate={{
              y: [0, -200, 0],
              x: [0, Math.random() * 100 - 50, 0],
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Floating Icons */}
      <motion.div
        className="absolute top-20 left-20"
        variants={sparkleVariants}
        animate="animate"
      >
        <Sparkles className="text-yellow-300 opacity-80 drop-shadow-lg" size={32} />
      </motion.div>
      <motion.div
        className="absolute top-40 right-32"
        variants={sparkleVariants}
        animate="animate"
        style={{ animationDelay: '1s' }}
      >
        <Star className="text-pink-300 opacity-80 drop-shadow-lg" size={28} />
      </motion.div>
      <motion.div
        className="absolute bottom-32 left-40"
        variants={sparkleVariants}
        animate="animate"
        style={{ animationDelay: '2s' }}
      >
        <Zap className="text-blue-300 opacity-80 drop-shadow-lg" size={36} />
      </motion.div>
      <motion.div
        className="absolute bottom-40 right-20"
        variants={sparkleVariants}
        animate="animate"
        style={{ animationDelay: '3s' }}
      >
        <Heart className="text-red-300 opacity-80 drop-shadow-lg" size={30} />
      </motion.div>

      {/* Orbiting Elements */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-96 h-96 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        variants={orbitVariants}
        animate="animate"
      >
        <motion.div className="absolute top-0 left-1/2 w-4 h-4 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full blur-sm" />
        <motion.div className="absolute bottom-0 right-1/2 w-3 h-3 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full blur-sm" />
        <motion.div className="absolute left-0 top-1/2 w-5 h-5 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full blur-sm" />
        <motion.div className="absolute right-0 bottom-1/2 w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full blur-sm" />
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={isLogin ? 'login' : 'register'}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl p-8 w-full max-w-md border border-white/30 relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
          }}
        >
          {/* Animated Background Pattern */}
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

          {/* Logo Section */}
          <motion.div
            variants={itemVariants}
            className="text-center mb-8 relative z-10"
          >
            <motion.div
              variants={pulseVariants}
              animate="animate"
              className="bg-gradient-to-r from-cyan-400 via-purple-500 via-pink-500 to-yellow-400 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 relative"
              style={{
                background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4, #45B7D1, #96CEB4, #FFEAA7, #DDA0DD)',
                backgroundSize: '300% 300%',
                animation: 'gradientShift 3s ease infinite',
              }}
            >
              <motion.div
                whileHover={{ 
                  rotate: 360,
                  scale: 1.2,
                }}
                transition={{ duration: 0.8 }}
              >
                <GraduationCap className="text-white drop-shadow-lg" size={48} />
              </motion.div>
              
              {/* Orbiting mini icons */}
              <motion.div
                className="absolute inset-0"
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="absolute -top-2 left-1/2 text-yellow-300" size={16} />
                <Star className="absolute top-1/2 -right-2 text-pink-300" size={14} />
                <Zap className="absolute -bottom-2 left-1/2 text-blue-300" size={16} />
                <Heart className="absolute top-1/2 -left-2 text-red-300" size={14} />
              </motion.div>
            </motion.div>
            
            <motion.h1 
              className="text-5xl font-bold mb-3 relative"
              initial={{ opacity: 0, y: 30, scale: 0.5 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.5, duration: 1, type: "spring", stiffness: 200 }}
              style={{
                background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4, #45B7D1, #96CEB4, #FFEAA7)',
                backgroundSize: '300% 300%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                animation: 'gradientShift 4s ease infinite',
              }}
            >
              CampusGPT
            </motion.h1>
            <motion.p 
              className="text-cyan-100 text-xl font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
            >
              🚀 Your AI-powered campus companion
            </motion.p>
          </motion.div>

          {/* Tab Switcher */}
          <motion.div 
            variants={itemVariants}
            className="flex bg-white/10 rounded-2xl p-1 mb-8 relative overflow-hidden"
          >
            <motion.div
              className="absolute inset-y-1 rounded-xl"
              animate={{
                x: isLogin ? 4 : '50%',
                width: '48%',
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              style={{
                background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4, #45B7D1)',
                backgroundSize: '200% 200%',
                animation: 'gradientShift 3s ease infinite',
              }}
            />
            <motion.button
              type="button"
              onClick={() => {
                setIsLogin(true);
                setError('');
                setSuccess('');
              }}
              className="flex-1 py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 relative z-10"
              style={{ color: isLogin ? 'white' : 'rgba(255,255,255,0.7)' }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Login
            </motion.button>
            <motion.button
              type="button"
              onClick={() => {
                setIsLogin(false);
                setError('');
                setSuccess('');
              }}
              className="flex-1 py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 relative z-10"
              style={{ color: !isLogin ? 'white' : 'rgba(255,255,255,0.7)' }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Sign Up
            </motion.button>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            <AnimatePresence>
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0, y: -20, scale: 0.8 }}
                  animate={{ opacity: 1, height: 'auto', y: 0, scale: 1 }}
                  exit={{ opacity: 0, height: 0, y: -20, scale: 0.8 }}
                  transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
                  variants={itemVariants}
                >
                  <label className="block text-sm font-bold text-cyan-100 mb-3">
                    ✨ Full Name
                  </label>
                  <motion.div 
                    className="relative group"
                    whileFocus={{ scale: 1.02 }}
                  >
                    <User className="absolute left-4 top-4 text-cyan-300 group-focus-within:text-white transition-colors" size={20} />
                    <motion.input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 bg-white/10 border-2 border-white/20 rounded-xl focus:ring-4 focus:ring-cyan-400/50 focus:border-cyan-400 transition-all text-white placeholder-cyan-200 backdrop-blur-sm font-medium"
                      placeholder="Enter your awesome name"
                      required={!isLogin}
                      whileFocus={{ 
                        boxShadow: "0 0 30px rgba(34, 211, 238, 0.4)",
                        borderColor: "rgba(34, 211, 238, 0.8)",
                        scale: 1.02,
                      }}
                      style={{
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                      }}
                    />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div variants={itemVariants}>
              <label className="block text-sm font-bold text-cyan-100 mb-3">
                📧 Email Address
              </label>
              <motion.div 
                className="relative group"
                whileFocus={{ scale: 1.02 }}
              >
                <Mail className="absolute left-4 top-4 text-cyan-300 group-focus-within:text-white transition-colors" size={20} />
                <motion.input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white/10 border-2 border-white/20 rounded-xl focus:ring-4 focus:ring-cyan-400/50 focus:border-cyan-400 transition-all text-white placeholder-cyan-200 backdrop-blur-sm font-medium"
                  placeholder="your.email@college.edu"
                  required
                  whileFocus={{ 
                    boxShadow: "0 0 30px rgba(34, 211, 238, 0.4)",
                    borderColor: "rgba(34, 211, 238, 0.8)",
                    scale: 1.02,
                  }}
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                  }}
                />
              </motion.div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="block text-sm font-bold text-cyan-100 mb-3">
                🔒 Password
              </label>
              <motion.div 
                className="relative group"
                whileFocus={{ scale: 1.02 }}
              >
                <Lock className="absolute left-4 top-4 text-cyan-300 group-focus-within:text-white transition-colors" size={20} />
                <motion.input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-4 bg-white/10 border-2 border-white/20 rounded-xl focus:ring-4 focus:ring-cyan-400/50 focus:border-cyan-400 transition-all text-white placeholder-cyan-200 backdrop-blur-sm font-medium"
                  placeholder="Create a strong password"
                  required
                  whileFocus={{ 
                    boxShadow: "0 0 30px rgba(34, 211, 238, 0.4)",
                    borderColor: "rgba(34, 211, 238, 0.8)",
                    scale: 1.02,
                  }}
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                  }}
                />
                <motion.button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-4 text-cyan-300 hover:text-white transition-colors"
                  whileHover={{ scale: 1.2, rotate: 15 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </motion.button>
              </motion.div>
            </motion.div>

            <AnimatePresence>
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0, y: -20, scale: 0.8 }}
                  animate={{ opacity: 1, height: 'auto', y: 0, scale: 1 }}
                  exit={{ opacity: 0, height: 0, y: -20, scale: 0.8 }}
                  transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
                  variants={itemVariants}
                >
                  <label className="block text-sm font-bold text-cyan-100 mb-3">
                    🔐 Confirm Password
                  </label>
                  <motion.div 
                    className="relative group"
                    whileFocus={{ scale: 1.02 }}
                  >
                    <Lock className="absolute left-4 top-4 text-cyan-300 group-focus-within:text-white transition-colors" size={20} />
                    <motion.input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 bg-white/10 border-2 border-white/20 rounded-xl focus:ring-4 focus:ring-cyan-400/50 focus:border-cyan-400 transition-all text-white placeholder-cyan-200 backdrop-blur-sm font-medium"
                      placeholder="Confirm your password"
                      required={!isLogin}
                      whileFocus={{ 
                        boxShadow: "0 0 30px rgba(34, 211, 238, 0.4)",
                        borderColor: "rgba(34, 211, 238, 0.8)",
                        scale: 1.02,
                      }}
                      style={{
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                      }}
                    />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.8 }}
                  className="bg-red-500/20 border-2 border-red-400/50 text-red-200 px-6 py-4 rounded-xl backdrop-blur-sm font-medium"
                  style={{
                    background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.2) 0%, rgba(239, 68, 68, 0.1) 100%)',
                  }}
                >
                  ❌ {error}
                </motion.div>
              )}
              {success && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.8 }}
                  className="bg-green-500/20 border-2 border-green-400/50 text-green-200 px-6 py-4 rounded-xl backdrop-blur-sm font-medium"
                  style={{
                    background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.2) 0%, rgba(34, 197, 94, 0.1) 100%)',
                  }}
                >
                  {success}
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              type="submit"
              disabled={loading}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
              }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-5 rounded-xl font-bold text-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-2xl relative overflow-hidden"
              style={{
                background: loading 
                  ? 'linear-gradient(45deg, #6B7280, #9CA3AF)' 
                  : 'linear-gradient(45deg, #FF6B6B, #4ECDC4, #45B7D1, #96CEB4, #FFEAA7)',
                backgroundSize: '300% 300%',
                animation: loading ? 'none' : 'gradientShift 3s ease infinite',
                color: 'white',
              }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.8 }}
              />
              <span className="relative z-10 flex items-center justify-center space-x-3">
                {loading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                    />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <span>{isLogin ? '🚀 Launch Into CampusGPT' : '✨ Create My Account'}</span>
                  </>
                )}
              </span>
            </motion.button>
          </form>

          <motion.div
            variants={itemVariants}
            className="mt-8 text-center text-sm text-cyan-200"
          >
            {isLogin ? "New to CampusGPT? " : "Already have an account? "}
            <motion.button
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
                setSuccess('');
                setEmail('');
                setPassword('');
                setConfirmPassword('');
                setName('');
              }}
              className="text-cyan-300 hover:text-white font-bold transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {isLogin ? '🎯 Join the revolution!' : '⚡ Sign in here'}
            </motion.button>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      <style jsx>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
};