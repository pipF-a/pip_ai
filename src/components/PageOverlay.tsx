'use client'

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TypewriterText } from './TypewriterText';
import { useDarkMode } from '@/hooks/useDarkMode';
import clsx from 'clsx';

type PageOverlayProps = {
  children: React.ReactNode;
  onAnimationComplete?: () => void;
};

export function PageOverlay({
  children, 
  onAnimationComplete 
}: PageOverlayProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isTypewriterComplete, setIsTypewriterComplete] = useState(false);
  const { isDarkMode } = useDarkMode();

  useEffect(() => {
    if (isTypewriterComplete) {
      // タイプライター完了後、少し待ってからフェードアウト
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [isTypewriterComplete]);

  useEffect(() => {
    if (!isVisible) {
      // オーバーレイが完全に消えた後にコールバックを実行
      const timer = setTimeout(() => {
        onAnimationComplete?.();
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [isVisible, onAnimationComplete]);

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className={clsx(
              'fixed inset-0 z-50 flex items-center justify-center',
              isDarkMode
                ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-black'
                : 'bg-gradient-to-br from-white via-gray-50 to-gray-100'
            )}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <div className="text-center">
              <TypewriterText 
                text="Welcome to pip_ai" 
                speed={80}
                className={clsx(
                  'text-[40px] font-medium',
                  isDarkMode ? 'text-white' : 'text-gray-900'
                )}
                onComplete={() => setIsTypewriterComplete(true)}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.div
        className="min-h-screen flex flex-col"
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 0 : 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        {children}
      </motion.div>
    </>
  );
}; 