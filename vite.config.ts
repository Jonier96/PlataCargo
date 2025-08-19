import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        icon: true,
        exportType: "named",
        namedExport: "ReactComponent",
      },
    }),
  ],
  server: {
    proxy: {
      // Proxy para todas las rutas que comiencen con /api
      '/api': {
        target: 'http://localhost:3000', // URL de tu backend
        changeOrigin: true, // Necesario para entornos virtuales
        secure: false, // Para conexiones HTTP locales
        rewrite: (path) => path.replace(/^\/api/, '') // Opcional: quita el prefijo /api
      },
      
      // Si necesitas otras rutas, puedes agregar más configuraciones
      '/otra-ruta': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      }
    }
  }
});