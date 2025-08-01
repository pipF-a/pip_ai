'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { DarkModeToggle } from './DarkModeToggle';


type HeaderProps = {
  title?: string;
  className?: string;
};

export const Header: React.FC<HeaderProps> = ({ 
  title = 'pip_ai', 
}) => {

  return (
    <header className="">
      <div className="p-4 flex items-baseline justify-between">
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
        <DarkModeToggle />
      </div>
    </header>
  );
}; 