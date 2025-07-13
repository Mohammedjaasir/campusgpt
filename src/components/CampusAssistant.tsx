import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Send, MessageCircle } from 'lucide-react';
import { aiService } from '../services/api';
import { LoadingSpinner } from './LoadingSpinner';

export const CampusAssistant: React.FC = () => {
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await aiService.askCampusQuestion({ question });
      
      if (response.success) {
        setAnswer(response.answer);
      }
    } catch (error) {
      console.error('Error asking campus question:', error);
    } finally {
      setLoading(false);
    }
  };

  const quickQuestions = [
    "Where is the library?",
    "What are the cafeteria timings?",
    "How do I apply for a library card?",
    "Where is the computer lab?",
    "What clubs can I join?",
    "How do I contact the placement office?",
  ];

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center space-x-3 mb-6"
      >
        <MapPin className="text-purple-500" size={28} />
        <h2 className="text-2xl font-bold text-gray-800">Campus Assistant</h2>
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
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ask about campus facilities, procedures, or services
              </label>
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                rows={4}
                placeholder="e.g., Where is the robotics lab? What are the library hours? How do I join clubs?"
                required
              />
            </div>

            <motion.button
              type="submit"
              disabled={loading || !question}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {loading ? <LoadingSpinner /> : <Send size={18} />}
              <span>{loading ? 'Searching...' : 'Ask Assistant'}</span>
            </motion.button>
          </form>

          {/* Quick Questions */}
          <div className="mt-6">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Quick Questions</h4>
            <div className="space-y-2">
              {quickQuestions.map((q, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  onClick={() => setQuestion(q)}
                  className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm transition-colors"
                >
                  {q}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* AI Response */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg p-6"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Campus Information</h3>
          
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
              <MessageCircle size={48} className="mx-auto mb-4 text-gray-300" />
              <p>Ask any question about campus life and facilities</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};