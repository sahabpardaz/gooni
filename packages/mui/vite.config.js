import react from '@vitejs/plugin-react';
import { createConfig } from '../../vite-config-utils';

export default createConfig({
  plugins: [react()],
});
