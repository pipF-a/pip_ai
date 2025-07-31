'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { CiCloudSun, CiCloudMoon } from 'react-icons/ci';
import { useDarkMode } from '../hooks/useDarkMode';

type HeaderProps = {
  title?: string;
  className?: string;
};

export const Header: React.FC<HeaderProps> = ({ 
  title = 'pip_ai', 
}) => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <header className="">
      <div className="p-4 flex items-center justify-between">
        <motion.h1
          className="font-bold relative inline-block"
          style={{
            fontFamily: "'Bitcount Prop Single', monospace",
            fontSize: "36px",
            background: "linear-gradient(90deg, #ff005a, #fffd38, #00ffae, #0099ff, #ff005a)",
            backgroundSize: "1000% 100%",
            backgroundPosition: "100% 50%",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
          animate={{
            backgroundPosition: [
              "100% 50%",
              "0% 50%",
              "100% 50%"
            ]
          }}
          transition={{
            backgroundPosition: {
              duration: 16,
              repeat: Infinity,
              repeatType: "loop",
              ease: "linear"
            }
          }}
        >
          {title}
        </motion.h1>
        
        <motion.button
          onClick={toggleDarkMode}
          className=" dark:bg-gray-800 text-gray-700 dark:text-gray-300  dark:hover:bg-gray-700 transition-colors duration-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label={isDarkMode ? 'ライトモードに切り替え' : 'ダークモードに切り替え'}
        >
          {isDarkMode ? (
            <CiCloudSun className="w-6 h-6" />
          ) : (
            <CiCloudMoon className="w-6 h-6" />
          )}
        </motion.button>
      </div>
    </header>
  );
}; 