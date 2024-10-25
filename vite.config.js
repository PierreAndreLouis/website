import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: process.env.PORT || 3000, // Utilise le port de Render ou 3000 par défaut
    proxy: {
      '/api': {
        target: 'http://31.207.37.89:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  plugins: [
    react(),
    VitePWA({
      workbox: {
        maximumFileSizeToCacheInBytes: 20 * 1024 * 1024, // 10 Mo
      },
      registerType: 'prompt',
      includeAssets: ['img/dish.png',
        'img/icons/profil.png',
        'profil.png',
        'favicon.svg',
        'favicon.png',
        'favicon.ico',
        'robots.txt',
        'apple-touch-icon.png'],
      
      
      manifest: {
        name: 'PWA App',
        short_name: 'PWA',
        description: 'My PWA App',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'profil-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'profil-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          }
        ]
      }
    })
  ]
});
