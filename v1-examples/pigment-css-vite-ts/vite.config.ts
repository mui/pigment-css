import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import pigment from '@pigment-css/plugin/vite';

import { lightTheme, darkTheme } from './src/theme';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    pigment({
      theme: {
        colorSchemes: {
          light: lightTheme,
          dark: darkTheme,
        },
        defaultScheme: 'light',
        getSelector(mode) {
          if (mode === 'light') {
            return ':root,[data-theme="light"]';
          }
          return `[data-theme="${mode}"]`;
        },
      },
    }),
  ],
});
