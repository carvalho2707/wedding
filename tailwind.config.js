/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sage: {
          50: '#f6f7f6',
          100: '#e3e7e3',
          200: '#c7d0c7',
          300: '#a3b1a3',
          400: '#7d8f7d',
          500: '#6B7B6B',
          600: '#526152',
          700: '#434f43',
          800: '#384038',
          900: '#2f352f',
        },
        cream: {
          50: '#FEFDFB',
          100: '#FBF9F3',
          200: '#F5F5DC',
          300: '#EDE8D0',
          400: '#E0D9BC',
        },
      },
      fontFamily: {
        script: ['"Great Vibes"', 'cursive'],
        sans: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
