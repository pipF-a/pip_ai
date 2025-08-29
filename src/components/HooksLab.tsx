'use client'

import Image from 'next/image'
import clsx from 'clsx'
import { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'

import { useDarkMode } from '@/hooks/useDarkMode';
import { getHooksData } from '@/data/hooks';
import { CodeBlock } from './CodeBlock';

export const HoolsLab = () => {
  const [selectedHook, setSelectedHook] = useState<string | null>(null);
  
  const { isDarkMode } = useDarkMode();
  // データファイルからデータを取得
  const hooksData = getHooksData(isDarkMode);

  return (
    <div
      className={clsx(
        'overflow-hidden',
        'rounded-[5px]',
        'border',
        'border-solid',
        'w-full',
        'max-w-full',
        'h-fit',
        'mt-4',
        'sm:mt-0',
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
        <h2 className={clsx( isDarkMode ? 'text-[#99a1b3]' : 'text-[#5e687e]')}>HooksLab.tsx</h2>
      </div>
      
      <div className="p-4 w-full">
        <Swiper
          modules={[Navigation]}
          spaceBetween={16}
          slidesPerView={3}
          centeredSlides={true}
          centeredSlidesBounds={true}
          roundLengths={true}
          loop={true}
          loopAdditionalSlides={3}
          navigation={true}
          className="hooks-swiper"
          breakpoints={{
            320: {
              slidesPerView: 3,
              spaceBetween: 12
            },
            375: {
              slidesPerView: 2,
              spaceBetween: 12
            },
            460: {
              slidesPerView: 3,
              spaceBetween: 12
            },
            640: {
              slidesPerView: 1,
              spaceBetween: 12
            },
            750: {
              slidesPerView: 2,
              spaceBetween: 12
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 16
            }
          }}
          style={{
            '--swiper-navigation-color': isDarkMode ? '#3b82f6' : '#3b82f6'
          } as React.CSSProperties}
        >
          {hooksData.hooks.map((hook, index) => (
            <SwiperSlide key={index}>
              <div className={clsx(
                'p-4 rounded-lg border h-full text-center transition-transform duration-200',
                isDarkMode ? 'bg-[#2a2e36] border-[#3a3f4a]' : 'bg-white border-[#e5e7eb]'
              )}>
              <Image
                  src={hooksData.icon.src}
                  alt={hooksData.icon.alt}
                  width={hooksData.icon.width}
                  height={hooksData.icon.height}
                  className={clsx('inline-block')}
                />
                <p className={clsx(
                  'font-medium mt-1',
                  isDarkMode ? 'text-[#e5e7eb]' : 'text-[#374151]'
                )}>
                  {hook.name}
                </p>
                <button 
                  onClick={() => setSelectedHook(selectedHook === hook.name ? null : hook.name)}
                  className={clsx(
                    'px-3 py-0.5 text-xs rounded-[100vmax] transition-colors cursor-pointer shadow-custom hover:text-[#0a7ea4]',
                    isDarkMode 
                      ? 'text-white' 
                      : 'text-[#374151]',
                  )}
                >
                  usage
                </button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        
        {/* Code Examples Section */}
        {selectedHook && (
          <div className={clsx(
            'absolute',
            'inset-0',
            'max-w-[900px]',
            'm-auto'
          )}>
            {(() => {
              const hook = hooksData.hooks.find(h => h.name === selectedHook);
              return hook ? (
                <CodeBlock
                  code={hook.codeExample}
                  language="tsx"
                  filename={hook.fileName}
                  title={selectedHook}
                  description={hook.description}
                  hint={hook.hint}
                  showLineNumbers={true}
                  showCopyButton={true}
                  onHide={() => setSelectedHook(null)}
                />
              ) : null;
            })()}
          </div>
        )}
      </div>
    </div>
  )
}