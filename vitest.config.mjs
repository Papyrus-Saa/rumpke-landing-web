import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/setupTests.ts'],
    pool: 'vmThreads',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      include: [
        'src/hooks/**/*.{ts,tsx}',
        'src/components/ai-assistant/AIButton.tsx',
        'src/context/ThemeContext.tsx',
      ],
      exclude: [
        'src/**/*.d.ts',
        'src/**/*.stories.tsx',
        'src/**/index.ts',
        'src/hooks/useRainBow.tsx',
      ],
      thresholds: {
        lines: 78,
        functions: 80,
        branches: 70,
        statements: 77,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
