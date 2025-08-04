'use client'

import { useState, useEffect } from 'react';

export const useDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSystemMode, setIsSystemMode] = useState(true);

  useEffect(() => {
    // 初期化時にローカルストレージから設定を読み込み
    const savedMode = localStorage.getItem('darkMode');
    const savedSystemMode = localStorage.getItem('systemMode');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const useSystemMode = savedSystemMode ? JSON.parse(savedSystemMode) : true;
    setIsSystemMode(useSystemMode);
    
    if (useSystemMode) {
      setIsDarkMode(prefersDark);
    } else {
      setIsDarkMode(savedMode ? JSON.parse(savedMode) : prefersDark);
    }
  }, []);

  useEffect(() => {
    // システムテーマの変更を監視
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    console.log(mediaQuery);
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      if (isSystemMode) {
        setIsDarkMode(e.matches);
      }
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);

    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
    };
  }, [isSystemMode]);

  useEffect(() => {
    // ダークモードの状態が変更されたときにHTMLクラスを更新
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // ローカルストレージに保存（システムモードでない場合のみ）
    if (!isSystemMode) {
      localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
    }
  }, [isDarkMode, isSystemMode]);

  const toggleDarkMode = () => {
    setIsSystemMode(false);
    setIsDarkMode(!isDarkMode);
    localStorage.setItem('systemMode', 'false');
  };

  const setSystemMode = () => {
    setIsSystemMode(true);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(prefersDark);
    localStorage.setItem('systemMode', 'true');
  };

  return { 
    isDarkMode, 
    isSystemMode,
    toggleDarkMode, 
    setSystemMode 
  };
}; 