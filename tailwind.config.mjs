/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Noto Sans', 'sans-serif'],
        serif: ['Noto Serif', 'serif'],
        monospace: ['Roboto Mono', 'monospace'],
      },
      colors: {
        'bg-black': '#000000',
        'wrapper': '#070707',
        'platinum': "#DBDBDB",
        'accent': '#91DB43',
        'darkGray': '#0c0c0c',
      },
      borderWidth: {
      DEFAULT: '1px',
      '0': '0',
      '1': '1px',
      '2': '2px',
      '3': '3px',
      '4': '4px',
      '6': '6px',
      '8': '8px',
    },
    },
  },
  plugins: [],
};
