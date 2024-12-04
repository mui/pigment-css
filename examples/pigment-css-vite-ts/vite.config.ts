import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { pigment, extendTheme } from '@pigment-css/vite-plugin';

// To learn more about theming, visit https://github.com/mui/pigment-css/blob/master/README.md#theming
const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        background: '0 0% 100%',
        foreground: '240 10% 3.9%',
        primary: '240 5.9% 10%',
        border: '240 5.9% 90%',
      },
    },
    dark: {
      palette: {
        background: '240 10% 3.9%',
        foreground: '0 0% 80%',
        primary: '0 0% 98%',
        border: '240 3.7% 15.9%',
      },
    },
  },
  getSelector: (colorScheme: string) => {
    return `.${colorScheme}`;
  },
});

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    pigment({
      theme,
    }),
    react(),
  ],
  optimizeDeps: {
    include: ['react-is', 'prop-types'],
  },
});
