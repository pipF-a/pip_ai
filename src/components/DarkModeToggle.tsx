'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { CiCloudSun, CiCloudMoon } from 'react-icons/ci';
import { useDarkMode } from '../hooks/useDarkMode';

export const DarkModeToggle: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <motion.button
      onClick={toggleDarkMode}
      className="dark:bg-gray-800 text-gray-700 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors duration-200"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={isDarkMode ? 'ライトモードに切り替え' : 'ダークモードに切り替え'}
    >
      {isDarkMode ? (
        <CiCloudSun className="w-7 h-7 text-white" />
      ) : (
        <CiCloudMoon className="w-7 h-7" />
      )}
    </motion.button>
  );
}; 