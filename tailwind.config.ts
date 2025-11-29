import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        tutu: {
          yellow: "#FFD93D", // 图图黄
          red: "#FF6B6B",    // 脸蛋红
          bg: "#FFFBEB",     // 米色背景
          text: "#4A4A4A",   // 深灰文字
        }
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      fontFamily: {
        // 可以在 globals.css 中引入具体字体，这里预留
        sans: ['var(--font-varela)', 'system-ui', 'sans-serif'],
        happy: ['var(--font-happy)', 'cursive', 'system-ui'],
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
export default config;

