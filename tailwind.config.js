/** @type {import('tailwindcss').Config} */ 
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage:{
        'hero':"url('./images/feet.jpeg')",
        'hero2':"url('./images/blush.png')"
      }
    },
  },
  plugins: [],
}
