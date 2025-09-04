/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "main-color":"#634C9F",
        "main-color-light":"#e5e7eb"
      },
      fontFamily:{
        display:["Open Sans", "sans-serif"],
      },
      screens:{
        phone:"560px"
      }
    },
  },
  plugins: [require('@tailwindcss/forms')],
}