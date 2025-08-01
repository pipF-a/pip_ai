'use client'

import React, { useState, useEffect } from 'react';
import { GoFileDirectory } from 'react-icons/go';
import { CiFileOn } from 'react-icons/ci';



// Types
type FileNode = {
  name: string;
  type: 'file' | 'directory';
  children?: FileNode[];
};

type DirectoryTreeItemProps = {
  data: FileNode;
  level?: number;
};

type DirectoryTreeProps = {
  items: FileNode[];
  title?: string;
};

const DirectoryTreeItem: React.FC<DirectoryTreeItemProps> = ({ 
  data, 
  level = 0 
}) => {
  const [isExpanded, setIsExpanded] = useState(level < 2);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const hasChildren = data.children && data.children.length > 0;

  useEffect(() => {
    const checkDarkMode = () => {
      const hasDarkClass = document.documentElement.classList.contains('dark');
      setIsDarkMode(hasDarkClass);
    };

    // 初期チェック
    checkDarkMode();

    // MutationObserverでdarkクラスの変更を監視
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  const handleToggle = () => {
    if (hasChildren) {
      setIsExpanded(!isExpanded);
    }
  };

  const getItemClassName = () => {
    const baseClasses = "flex items-center gap-1 px-2 py-1 cursor-pointer transition-colors";
    const indentClass = level > 0 ? 'ml-6' : '';
    return `${baseClasses} ${indentClass}`;
  };

  const getTextClassName = () => {
    const baseClasses = "text-sm";
    
    if (data.type === 'directory') {
      return `${baseClasses} font-medium ${isDarkMode ? 'text-white' : 'text-gray-700'}`;
    } else {
      return `${baseClasses} ${isDarkMode ? 'text-white' : 'text-gray-600'}`;
    }
  };
  return (
    
    <div className="select-none">
      <div className={getItemClassName()} onClick={handleToggle}>
        {data.type === 'directory' ? (
          <GoFileDirectory className={`w-4 h-4 ${isDarkMode ? 'text-blue-300' : 'text-blue-500'}`} />
        ) : (
          <CiFileOn className={`w-4 h-4 ${isDarkMode ? 'text-white' : 'text-gray-500'}`} />
        )}
        <span className={getTextClassName()}>
          {data.name}
        </span>
      </div>
      
      {hasChildren && isExpanded && (
        <div className="mt-1">
          {data.children!.map((child, index) => (
            <DirectoryTreeItem
              key={`${child.name}-${index}`}
              data={child}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export const DirectoryTree: React.FC<DirectoryTreeProps> = ({ 
  items, 
}) => {

  return (
    <div className="p-3">
      <div className="space-y-1">
        {items.map((item, index) => (
          <DirectoryTreeItem
            key={`${item.name}-${index}`}
            data={item}
          />
        ))}
      </div>
    </div>
  );
}; 