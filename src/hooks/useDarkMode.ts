'use client'

import { useState, useEffect } from 'react';

// グローバルな状態を管理
let globalIsDarkMode = false;
let globalIsSystemMode = true;
const listeners: Set<(isDark: boolean) => void> = new Set();

export const useDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(globalIsDarkMode);
  const [isSystemMode, setIsSystemMode] = useState(globalIsSystemMode);

  useEffect(() => {
    
    const listener = (isDark: boolean) => {
      setIsDarkMode(isDark);
    };
    listeners.add(listener);

    // 初期化時にローカルストレージから設定を読み込み
    const savedMode = localStorage.getItem('darkMode');
    const savedSystemMode = localStorage.getItem('systemMode');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const useSystemMode = savedSystemMode ? JSON.parse(savedSystemMode) : true;
    globalIsSystemMode = useSystemMode; 
    setIsSystemMode(useSystemMode);
    
    if (useSystemMode) {
      globalIsDarkMode = prefersDark; 
      setIsDarkMode(prefersDark);
    } else {
      globalIsDarkMode = savedMode ? JSON.parse(savedMode) : prefersDark; 
      setIsDarkMode(globalIsDarkMode);
    }

    return () => {
      listeners.delete(listener); 
    };
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
    console.log('toggleDarkMode called, current isDarkMode:', isDarkMode);
    globalIsSystemMode = false; 
    setIsSystemMode(false);
    const newDarkMode = !isDarkMode;
    globalIsDarkMode = newDarkMode; 
    setIsDarkMode(newDarkMode);
    
    // 他のコンポーネントに通知（これを追加）
    listeners.forEach(listener => listener(newDarkMode));
    
    localStorage.setItem('systemMode', 'false');
    localStorage.setItem('darkMode', JSON.stringify(newDarkMode));
    
    // 即座にHTMLクラスを更新
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
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