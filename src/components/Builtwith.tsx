'use client'

import { useDarkMode } from "@/hooks/useDarkMode";
import { getBuiltwithData } from "@/data/builtwith";
import Marquee from 'react-fast-marquee';
import clsx from "clsx";

 

export const Builtwith = () => {
  const { isDarkMode } = useDarkMode();
  const builtwithData = getBuiltwithData();
  const items = builtwithData.items;
  
  return (
    <div
      className={clsx(
        'rounded-[5px]',
        'border',
        'border-solid',
        'md:max-w-[364px]',
        'w-full',
        'h-fit',
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
        <h2 className={clsx( isDarkMode ? 'text-[#99a1b3]' : 'text-[#5e687e]')}>Built with</h2>
      </div>
      <div className={clsx('p-[35]')}>
        <Marquee
          gradient={true}
          gradientWidth={100}   
          speed={20}
          pauseOnHover
          autoFill
        >
          {items.map(({ icon: Icon }, index) => (
            <div key={index} className={clsx('flex', 'items-center', 'gap-2', 'mr-6')}>
              <Icon
                className={clsx(
                  'transition-colors',
                  'duration-300',
                  isDarkMode ? 'text-[#cbd5e1] hover:text-white' : 'text-[#334155] hover:text-[#1e293b]'
                )}
                size={30}
              />
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  )
}
