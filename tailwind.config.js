/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        base: {
          dark: '#0A0A0F',
          DEFAULT: '#12121A',
          light: '#1A1A23',
        },
        surface: {
          dark: 'rgba(24, 24, 34, 0.7)',
          DEFAULT: 'rgba(32, 32, 44, 0.7)',
          light: 'rgba(40, 40, 54, 0.7)',
        },
        accent: {
          pink: {
            light: '#FF4D94',
            DEFAULT: '#FF1A75',
            dark: '#CC0052',
          },
          purple: {
            light: '#9C6FFF',
            DEFAULT: '#7C3AFF',
            dark: '#5B00FF',
          }
        },
        stroke: {
          dark: 'rgba(255, 255, 255, 0.1)',
          DEFAULT: 'rgba(255, 255, 255, 0.15)',
          light: 'rgba(255, 255, 255, 0.2)',
        }
      }
    },
  },
  plugins: [],
}