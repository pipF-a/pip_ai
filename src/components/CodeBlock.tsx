'use client'

import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import clsx from 'clsx';
import { useDarkMode } from '@/hooks/useDarkMode';

type CodeBlockProps = {
  code: string;
  language: string;
  filename?: string;
  showLineNumbers?: boolean;
  showCopyButton?: boolean;
  title?: string;
  description?: string;
  hint?: string;
  onHide?: () => void;
};

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language,
  filename,
  showLineNumbers = true,
  showCopyButton = true,
  title,
  description,
  hint,
  onHide,
}) => {
  const { isDarkMode } = useDarkMode();
  const [copied, setCopied] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  //コードのコピー
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const theme = isDarkMode ? oneDark : oneLight;

  return (
    <>
    <div className={clsx(
      'fixed',
      'top-0',
      'left-0',
      'z-[1]',
      'items-center',
      'justify-center',
      'w-full',
      'h-full',
      'bg-black/60'
    )}></div>
    <div className={clsx(
      'max-w-full',
      'rounded-lg',
      'border',
      'border-solid',
      'overflow-hidden',
      'shadow-lg',
      'relative',
      'z-[1]',
      'mx-4',
      isDarkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-white'
    )}>
      {/* Header */}
      <div className={clsx(
        'flex',
        'items-center',
        'justify-between',
        'px-4',
        'py-2',
        'text-sm',
        isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-50 text-gray-600'
      )}>
        <div className="flex items-center space-x-2">
          <button
            type="button"
            aria-label="Hide"
            onClick={() => {
              if (onHide) {
                onHide();
              } else {
                setIsCollapsed(true);
              }
            }}
            className={clsx(
              'w-3',
              'h-3',
              'rounded-full',
              'cursor-pointer',
              isDarkMode ? 'bg-red-500' : 'bg-red-400'
            )}
          />
        </div>
      
        {filename && (
          <span className={clsx(
            'font-mono',
            'text-xs',
            isDarkMode ? 'text-gray-400' : 'text-gray-500'
          )}>
            {filename}
          </span>
        )}
        
        {showCopyButton && (
          <button
            onClick={handleCopy}
            className={clsx(
              'px-2',
              'py-1',
              'text-xs',
              'rounded',
              'transition-colors',
              'duration-200',
              isDarkMode
                ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                : 'bg-gray-200 hover:bg-gray-300 text-gray-600'
            )}
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        )}
      </div>

      {/* Content Section */}
      {!isCollapsed && (title || description || hint) && (
        <div className={clsx(
          'px-4',
          'py-3',
          'border-b',
          isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'
        )}>
          {title && (
            <h3 className={clsx(
              'text-lg',
              'font-semibold',
              'mb-3',
              isDarkMode ? 'text-gray-200' : 'text-gray-800'
            )}>
              {title}
            </h3>
          )}
          {description && (
            <p className={clsx(
              'text-sm',
              'mb-3',
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            )}>
              {description}
            </p>
          )}
          {hint && (
            <div className={clsx(
              'p-3',
              'rounded',
              'text-sm',
              isDarkMode ? 'bg-blue-900/20 border-blue-800 text-blue-200' : 'bg-blue-50 border-blue-200 text-blue-800',
              'border'
            )}>
              <strong>Hint:</strong> {hint}
            </div>
          )}
        </div>
      )}

      {/* Code content */}
      {!isCollapsed && (
        <div className="relative">
          <SyntaxHighlighter
            language={language}
            style={theme}
            showLineNumbers={showLineNumbers}
            customStyle={{
              margin: 0,
              padding: '1rem',
              fontSize: '0.875rem',
              lineHeight: '1.5',
              backgroundColor: 'transparent',
            }}
            lineNumberStyle={{
              color: isDarkMode ? '#6b7280' : '#9ca3af',
              marginRight: '1rem',
              minWidth: '2rem',
            }}
          >
            {code}
          </SyntaxHighlighter>
        </div>
      )}
    </div>
    </>

  );
};
