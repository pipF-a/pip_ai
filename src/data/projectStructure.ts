export const projectStructure = {
  name: "src",
  type: "directory" as const,
  children: [
    {
      name: "app",
      type: "directory" as const,
      children: [
        { name: "favicon.ico", type: "file" as const },
        { name: "globals.css", type: "file" as const },
        { name: "layout.tsx", type: "file" as const },
        { name: "page.tsx", type: "file" as const }
      ]
    },
    {
      name: "components",
      type: "directory" as const,
      children: [
        { name: "DarkModeToggle.tsx", type: "file" as const },
        { name: "Header.tsx", type: "file" as const },
        { name: "TypewriterText.tsx", type: "file" as const },
        { name: "DirectoryTree.tsx", type: "file" as const }
      ]
    },
    {
      name: "hooks",
      type: "directory" as const,
      children: [
        { name: "useDarkMode.ts", type: "file" as const },
        { name: "useTypewriter.ts", type: "file" as const }
      ]
    },
    {
      name: "data",
      type: "directory" as const,
      children: [
        { name: "projectStructure.ts", type: "file" as const }
      ]
    }
  ]
};

export const rootFiles: Array<{
  name: string;
  type: 'file' | 'directory';
  children?: Array<{
    name: string;
    type: 'file' | 'directory';
  }>;
}> = [
  {
    name: "public",
    type: "directory" as const,
    children: [
      { name: "file.svg", type: "file" as const },
      { name: "globe.svg", type: "file" as const },
      { name: "next.svg", type: "file" as const },
      { name: "vercel.svg", type: "file" as const },
      { name: "window.svg", type: "file" as const }
    ]
  },
  { name: "eslint.config.mjs", type: "file" as const },
  { name: "next.config.ts", type: "file" as const },
  { name: "package-lock.json", type: "file" as const },
  { name: "package.json", type: "file" as const },
  { name: "postcss.config.mjs", type: "file" as const },
  { name: "README.md", type: "file" as const },
  { name: "tailwind.config.js", type: "file" as const },
  { name: "tsconfig.json", type: "file" as const }
]; 