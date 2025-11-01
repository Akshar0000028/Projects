/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'beige': '#F5F5DC',
        'beige-light': '#FAFAF5',
        'beige-dark': '#E8E8D3',
        'gold': '#D4AF37',
        'gold-light': '#E5C158',
        'gold-dark': '#B8941F',
      },
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif'],
        'poppins': ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

