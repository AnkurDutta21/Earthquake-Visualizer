/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        base: {
          dark: '#2B2B2B',
          DEFAULT: '#3A3A3A',
          light: '#E0E0E0',
        },
        surface: {
          dark: 'rgba(43, 43, 43, 0.7)',
          DEFAULT: 'rgba(58, 58, 58, 0.7)',
          light: 'rgba(224, 224, 224, 0.7)',
        },
        accent: {
          pink: {
            light: '#FFB3C1',
            DEFAULT: '#FF6F91',
            dark: '#FF3D71',
          },
          purple: {
            light: '#D1C4E9',
            DEFAULT: '#9575CD',
            dark: '#7E57C2',
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