/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');
module.exports = {
  theme: {
    extend: {
    },
  },
  content: [
    './client/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  plugins: [],
}