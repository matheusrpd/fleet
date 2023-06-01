const colors = require('./src/theme/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: 'Roboto_400Regular',
        title: 'Roboto_700Bold',
      },
      fontSize: {
        '3xl': ['32px', '36px'],
      },
      colors,
    },
  },
  plugins: [],
}
