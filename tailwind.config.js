/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        body: 'Roboto_400Regular',
        title: 'Roboto_700Bold',
      },
      fontSize: {
        xs: 12,
        sm: 14,
        md: 16,
        lg: 18,
        xl: 20,
        xxl: 24,
        xxxl: 32,
      },
      colors: {
        gray: {
          100: '#E1E1E6',
          200: '#C4C4CC',
          300: '#8D8D99',
          400: '#7C7C8A',
          500: '#505059',
          800: '#202024',
          700: '#29292E',
          600: '#323238',
        },
      },
    },
    colors: {
      brand: {
        400: '#00B37E',
        700: '#00875F',
      },
    },
  },
  plugins: [],
}
