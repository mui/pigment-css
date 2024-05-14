import * as path from 'node:path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [],
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['tests/**/*.test.(js|jsx|ts|tsx)'],
    exclude: ['**/*.spec.*'],
    setupFiles: [path.join(__dirname, 'vitest-setup.ts')],
    coverage: {
      exclude: ['build/', 'coverage/', 'tests'],
    },
  },
});
