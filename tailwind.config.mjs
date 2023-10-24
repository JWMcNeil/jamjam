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
        'bg-wrapper': '#070707',
      },
    },
  },
  plugins: [],
};
