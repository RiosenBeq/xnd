import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        hakkimizda: resolve(__dirname, 'hakkimizda.html'),
        hizmetler: resolve(__dirname, 'hizmetler.html'),
        iletisim: resolve(__dirname, 'iletisim.html'),
        markaDetay: resolve(__dirname, 'marka-detay.html'),
        basinOdasi: resolve(__dirname, 'basin-odasi.html'),
        kariyer: resolve(__dirname, 'kariyer.html'),
        yasal: resolve(__dirname, 'yasal.html'),
        yatirimciIliskileri: resolve(__dirname, 'yatirimci-iliskileri.html'),
        kvkk: resolve(__dirname, 'kvkk.html'),
        haberDetay: resolve(__dirname, 'haber-detay.html'),
      },
    },
    // Enable CSS code splitting for better caching
    cssCodeSplit: true,
    // Minify output
    minify: 'esbuild',
    // Asset optimization
    assetsInlineLimit: 4096,
  },
  // Performance: use esbuild for faster dev
  esbuild: {
    drop: ['console', 'debugger'],
  },
});
