import { fileURLToPath } from 'node:url';
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config';
import viteConfig from './vite.config';

export default mergeConfig(
  viteConfig,
  defineConfig( {
    test: {
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'e2e/**'],
      root: fileURLToPath( new URL( './', import.meta.url ) ),
      coverage: {
        provider: 'v8',
        reporter: ['text', 'json', 'html', 'lcov'],
        exclude: [
          'node_modules/',
          'dist/',
          'cypress/',
          'lab-imdb-vue3/',
          '**/*.config.*',
          '**/*.d.ts',
          '**/main.ts',
          '**/env.d.ts',
          '**/__tests__/**',
          '**/icons/**',
          '**/assets/**',
        ],
        include: [
          'src/**/*.{js,ts,vue}',
        ],
        all: true,
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80,
      },
    },
  } ),
);
