import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, Book, Send } from 'lucide-react';
import { aiService } from '../services/api';
import { LoadingSpinner } from './LoadingSpinner';

export const DoubtSolver: React.FC = () => {
  const [subject, setSubject] = useState('');
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await aiService.solveDoubt({ subject, question });
      
      if (response.success) {
        setAnswer(response.answer);
      }
    } catch (error) {
      console.error('Error solving doubt:', error);
    } finally {
      setLoading(false);
    }
  };

  const subjects = [
    'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science',
    'English', 'History', 'Geography', 'Economics', 'Other'
  ];

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center space-x-3 mb-6"
      >
        <HelpCircle className="text-green-500" size={28} />
        <h2 className="text-2xl font-bold text-gray-800">Doubt Solver</h2>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                <Book size={16} />
                <span>Subject</span>
              </label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              >
                <option value="">Select a subject</option>
                {subjects.map((subj) => (
                  <option key={subj} value={subj}>{subj}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Question
              </label>
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                rows={6}
                placeholder="Describe your doubt in detail. The more specific you are, the better the AI can help you..."
                required
              />
            </div>

            <motion.button
              type="submit"
              disabled={loading || !subject || !question}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {loading ? <LoadingSpinner /> : <Send size={18} />}
              <span>{loading ? 'Solving...' : 'Get Answer'}</span>
            </motion.button>
          </form>
        </motion.div>

        {/* AI Response */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4">AI Solution</h3>
          
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <LoadingSpinner size="large" />
            </div>
          ) : answer ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="prose prose-sm max-w-none"
            >
              <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                {answer}
              </div>
            </motion.div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <HelpCircle size={48} className="mx-auto mb-4 text-gray-300" />
              <p>Ask any academic question and get detailed explanations</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};