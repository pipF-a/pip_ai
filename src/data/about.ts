export interface SkillImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface SocialImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface AboutData {
  title: string;
  name: string;
  about: {
    title: string;
    description: string;
  };
  skills: {
    title: string;
    items: SkillImage[];
  };
  social: {
    title: string;
    items: SocialImage[];
  };
}

export const getAboutData = (isDarkMode: boolean): AboutData => ({
  title: "About.tsx",
  name: "pip",
  about: {
    title: "About",
    description: "ふろんとえんどえんじにあ。"
  },
  skills: {
    title: "Skills",
    items: [
      { src: "/about/html5.svg", alt: "HTML5", width: 20, height: 20 },
      { src: "/about/sass.svg", alt: "Sass", width: 24, height: 24 },
      { src: "/nextjs.svg", alt: "Next.js", width: 24, height: 24 },
      { src: isDarkMode ? "/react_dark.svg" : "/react_light.svg", alt: "React", width: 24, height: 24 },
      { src: "/about/javascript.svg", alt: "JavaScript", width: 24, height: 24 },
      { src: "/typescript.svg", alt: "TypeScript", width: 24, height: 24 },
      { src: "/tailwindcss.svg", alt: "Tailwind CSS", width: 24, height: 24 },
    ]
  },
  social: {
    title: "Social",
    items: [
      { 
        src: isDarkMode ? "/about/x_dark.svg" : "/about/x_light.svg", 
        alt: "X (Twitter)", 
        width: 20, 
        height: 20 
      },
      { 
        src: isDarkMode ? "/about/github_dark.svg" : "/about/github_light.svg", 
        alt: "GitHub", 
        width: 24, 
        height: 24 
      },
    ]
  }
});
