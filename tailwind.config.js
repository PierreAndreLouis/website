/** @type {import('tailwindcss').Config} */
export default {
  
  darkMode: 'class', 
   content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '480px',
      },
      fontFamily: {
        // sans: ["Poppins", "sans-serif"],
        // cursive: ["Pacifico", "Sriracha", "cursive"],
        // cursive2: ["Sriracha", "cursive"],
      }
    },
  },
  plugins: [],
}

