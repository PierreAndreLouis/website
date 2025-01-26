/** @type {import('vite').UserConfig} */
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Assure que le dossier de sortie est 'dist' (par défaut pour Vite)
  },
  server: {
    open: true, // Ouvre l'application automatiquement dans le navigateur
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "src/styles/variables.scss";`, // Si tu utilises SCSS (facultatif)
      },
    },
  },
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
      },
    },
  },
  plugins: [],
});




// /** @type {import('tailwindcss').Config} */
// export default {
  
//   darkMode: 'class', 
//    content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {
//       screens: {
//         'xs': '480px',
//       },
//       fontFamily: {
//         sans: ["Poppins", "sans-serif"],
//         cursive: ["Pacifico", "Sriracha", "cursive"],
//         cursive2: ["Sriracha", "cursive"],
//       }
//     },
//   },
//   plugins: [],
// }

