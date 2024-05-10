import { defineConfig } from 'vitest/config';
import viteReact from '@vitejs/plugin-react';
import baseConfig from '../../vitest.config';

export default defineConfig({
  ...baseConfig,
  plugins: [...(baseConfig.plugins ?? []), viteReact()],
});
