import createCache from '@emotion/cache';
import rtlPlugin from 'stylis-plugin-rtl';

export const tssCacheRtl = createCache({
  key: 'tss-cache-rtl',
  prepend: true,
  stylisPlugins: [rtlPlugin],
});

export const muiCacheRtl = createCache({
  key: 'mui-rtl',
  prepend: true,
  stylisPlugins: [rtlPlugin],
});
