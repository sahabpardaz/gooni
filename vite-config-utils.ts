import fs from 'fs';
import path from 'path';
import { defineConfig, mergeConfig, UserConfigExport } from 'vite';
import dts from 'vite-plugin-dts';
import tsconfigPaths from 'vite-tsconfig-paths';

const srcEntry = path.resolve(process.cwd(), 'src/index.ts');
const testSetup = path.resolve(process.cwd(), './test.setup.ts');

export const createConfig = (config: UserConfigExport) =>
  mergeConfig(
    defineConfig({
      plugins: [tsconfigPaths(), dts({ insertTypesEntry: true })],
      build: {
        lib: {
          entry: srcEntry,
          formats: ['es', 'cjs'],
          fileName(format) {
            const formatsName = {
              es: 'module',
              cjs: 'common',
            };
            return `index.${formatsName[format]}.js`;
          },
        },
        rollupOptions: {
          external: (id) =>
            !(
              id.startsWith('.') ||
              id.startsWith('src/') ||
              path.isAbsolute(id)
            ),
        },
      },
      test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: fs.existsSync(testSetup) ? testSetup : '',
      },
    }),
    config,
  );
