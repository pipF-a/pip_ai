'use client'

import Image from 'next/image'
import clsx from 'clsx';
import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import { useDarkMode } from '@/hooks/useDarkMode';
import { getAboutData } from '@/data/about';

export const About = () => {
  const controls = useAnimation();
  const { isDarkMode } = useDarkMode();
  
  // データファイルからデータを取得
  const aboutData = getAboutData(isDarkMode);

  // アイコンアニメーション
  useEffect(() => {
    controls.start({
      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
      transition: {
        backgroundPosition: {
          duration: 8,
          repeat: Infinity,
          repeatType: 'loop',
          ease: 'linear'
        }
      }
    });
  }, [controls]);

  return (
    <section
      className={clsx(
        'w-[410px]',
        'rounded-[5px]',
        'border',
        'border-solid',
        isDarkMode ? 'border-[#26282f]' : 'border-[#f3edf5]'
      )}
    >
      <div className={clsx(
        'text-xs',
        isDarkMode ? 'bg-[#23272f]': 'bg-[#f6f7f9]',
        'rounded-tl-[3px]',
        'rounded-tr-[3px]',
        'py-1',
        'px-2'
      )}>
        <h2 className={clsx( isDarkMode ? 'text-[#99a1b3]' : 'text-[#5e687e]')}>{aboutData.title}</h2>
      </div>
      <div className={clsx('p-4')}>
        <motion.div
          className={clsx(
            'w-[80px]',
            'h-[80px]',
            'rounded-full',
            'p-[2px]',
            'm-auto'
          )}
          style={{
            background: 'linear-gradient(90deg, #ff005a, #fffd38, #00ffae, #0099ff, #ff005a)',
            backgroundSize: '400% 400%',
          }}
          animate={controls}
        >
          <div
            className={clsx(
              'w-full',
              'h-full',
              'rounded-full',
            )}
            style={{
              backgroundImage: isDarkMode ? "url('/about/profile_dark.png')" : "url('/about/profile.png')",
              backgroundSize: "cover",
              backgroundPosition: "top right -2px",
            }}
          />
        </motion.div>
        <h3 className={clsx(
          'text-xl',
          'text-center'
        )}>
          {aboutData.name}
        </h3>
        <div className={clsx(
            'w-fit',
            'pt-0.5',
            'px-3',
            'mt-3',
            'border-b-1'
        )}>
        <h4 className={clsx(
          'text-sm',
        )}>{aboutData.career.title}</h4>
        </div>
        <p className={clsx(
          'mt-1',
          'text-sm',
          'mt-2'
        )}>{aboutData.career.description}</p>
        <div className={clsx('flex','justify-between','gap-7','mt-4')}>
          <div>
            <div className={clsx(
                'w-fit',
                'pt-0.5',
                'px-3',
                'mt-3',
                'border-b-1'
            )}>
            <h4 className={clsx(
              'text-sm',
            )}>{aboutData.skills.title}</h4>
            </div>
            <ul className={clsx('flex','mt-3', 'gap-5')}>
              {aboutData.skills.items.map((image) => (
                <li key={image.alt} className={clsx('flex', 'items-center', 'gap-2', 'mb-1')}>
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    className={clsx('inline-block')}
                  />
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className={clsx(
                'w-fit',
                'pt-0.5',
                'px-3',
                'mt-3',
                'border-b-1'
            )}>
              <h4 className={clsx(
                'text-sm',
              )}>{aboutData.social.title}</h4>
            </div>
            <ul className={clsx('flex','mt-3', 'gap-5')}>
              {aboutData.social.items.map((image) => (
                <li key={image.alt} className={clsx('flex', 'items-center', 'gap-2', 'mb-1')}>
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    className={clsx('inline-block')}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </section>
  );
}
