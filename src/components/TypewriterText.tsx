'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { useTypewriter } from '@/hooks/useTypewriter';

type TypewriterTextProps = {
  text: string;
  speed?: number;
  className?: string;
};

export const TypewriterText: React.FC<TypewriterTextProps> = ({ 
  text, 
  speed = 80,
  className = "text-[30px] font-medium"
}) => {
  const { displayText } = useTypewriter(text, speed);

  return (
    <h2 className={className} style={{ fontFamily: "'Bitcount Prop Single', monospace" }}>
      {displayText}
      <motion.span
        className="inline-block w-0.5 h-5 ml-1"
        style={{ 
          verticalAlign: 'baseline',
          transform: 'translateY(3px)',
          background: "linear-gradient(90deg, #ff005a, #fffd38, #00ffae, #0099ff, #ff005a)",
          backgroundSize: "1000% 100%",
          backgroundPosition: "100% 50%",
        }}
        animate={{ 
          opacity: [1, 0, 1],
          backgroundPosition: [
            "100% 50%",
            "0% 50%",
            "100% 50%"
          ]
        }}
        transition={{ 
          opacity: { duration: 1.2, repeat: Infinity },
          backgroundPosition: {
            duration: 16,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear"
          }
        }}
      />
    </h2>
  );
}; 