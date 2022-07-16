import fs from 'fs';
import path from 'path';
import { mergeConfig, UserConfigExport } from 'vite';
import dts from 'vite-plugin-dts';
import tsconfigPaths from 'vite-tsconfig-paths';

const srcEntry = path.resolve(process.cwd(), 'src/index.ts');
const testSetup = path.resolve(process.cwd(), './test.setup.ts');

export const createConfig = (config: UserConfigExport) =>
  mergeConfig(
    {
      plugins: [tsconfigPaths(), dts({ insertTypesEntry: true })],
      build: {
        lib: {
          entry: srcEntry,
          formats: ['es', 'cjs'],
        },
        rollupOptions: {
          external: (id) => !(id.startsWith('.') || path.isAbsolute(id)),
        },
      },
      test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: fs.existsSync(testSetup) ? testSetup : '',
      },
    },
    config,
  );
