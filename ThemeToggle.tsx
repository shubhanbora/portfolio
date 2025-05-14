import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';

interface ThemeToggleProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, toggleTheme }) => {
  return (
    <motion.button
      className="fixed right-5 top-20 z-50 p-2 rounded-full bg-white dark:bg-dark-800 shadow-md"
      onClick={toggleTheme}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {theme === 'light' ? (
        <Moon size={20} className="text-dark-800" />
      ) : (
        <Sun size={20} className="text-yellow-400" />
      )}
    </motion.button>
  );
};

export default ThemeToggle;