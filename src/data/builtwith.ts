import { IconType } from 'react-icons';
import { FaReact } from 'react-icons/fa';
import { SiNextdotjs, SiTypescript, SiTailwindcss, SiJavascript } from 'react-icons/si';

export interface BuiltwithItem {
  icon: IconType;
  label: string;
}

export interface Builtwith {
  items: BuiltwithItem[];
}

export const getBuiltwithData = (): Builtwith => ({
  items: [
    { icon: FaReact, label: 'React' },
    { icon: SiNextdotjs, label: 'Next.js' },
    { icon: SiTypescript, label: 'TypeScript' },
    { icon: SiTailwindcss, label: 'Tailwind CSS' },
    { icon: SiJavascript, label: 'JavaScript' },
  ],
});