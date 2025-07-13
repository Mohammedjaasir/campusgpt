import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Smile, Meh, Frown, Send } from 'lucide-react';
import { aiService } from '../services/api';
import { LoadingSpinner } from './LoadingSpinner';

export const MoodJournal: React.FC = () => {
  const [mood, setMood] = useState('');
  const [entry, setEntry] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const apiResponse = await aiService.analyzeJournal({ mood, entry });
      
      if (apiResponse.success) {
        setResponse(apiResponse.response);
      }
    } catch (error) {
      console.error('Error analyzing journal:', error);
    } finally {
      setLoading(false);
    }
  };

  const moods = [
    { value: 'great', label: 'Great', icon: Smile, color: 'text-green-500' },
    { value: 'good', label: 'Good', icon: Smile, color: 'text-blue-500' },
    { value: 'okay', label: 'Okay', icon: Meh, color: 'text-yellow-500' },
    { value: 'stressed', label: 'Stressed', icon: Frown, color: 'text-orange-500' },
    { value: 'sad', label: 'Sad', icon: Frown, color: 'text-red-500' },
  ];

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center space-x-3 mb-6"
      >
        <Heart className="text-pink-500" size={28} />
        <h2 className="text-2xl font-bold text-gray-800">Mood Journal</h2>
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
              <label className="block text-sm font-medium text-gray-700 mb-4">
                How are you feeling today?
              </label>
              <div className="grid grid-cols-3 gap-3">
                {moods.map((moodOption) => {
                  const Icon = moodOption.icon;
                  return (
                    <motion.button
                      key={moodOption.value}
                      type="button"
                      onClick={() => setMood(moodOption.value)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        mood === moodOption.value
                          ? 'border-pink-500 bg-pink-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Icon size={24} className={`mx-auto mb-2 ${moodOption.color}`} />
                      <span className="text-sm font-medium">{moodOption.label}</span>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Journal Entry
              </label>
              <textarea
                value={entry}
                onChange={(e) => setEntry(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none"
                rows={6}
                placeholder="Write about your day, thoughts, feelings, challenges, or anything on your mind..."
                required
              />
            </div>

            <motion.button
              type="submit"
              disabled={loading || !mood || !entry}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {loading ? <LoadingSpinner /> : <Send size={18} />}
              <span>{loading ? 'Analyzing...' : 'Get Support'}</span>
            </motion.button>
          </form>
        </motion.div>

        {/* AI Response */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-lg p-6"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4">AI Support & Affirmations</h3>
          
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <LoadingSpinner size="large" />
            </div>
          ) : response ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="prose prose-sm max-w-none"
            >
              <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                {response}
              </div>
            </motion.div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <Heart size={48} className="mx-auto mb-4 text-gray-300" />
              <p>Share your thoughts and receive personalized support</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};