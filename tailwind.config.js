/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#e5414e',
        secondary: '#c7d5e0',
        veryDarkBlue: '#171a21',
        darkBlue: '#2d313b',
        lightBlue: '#7393b3',
      },
    },
  },
  plugins: [],
};
