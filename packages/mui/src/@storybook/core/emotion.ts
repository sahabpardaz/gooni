import createCache from '@emotion/cache';
import rtlPlugin from 'stylis-plugin-rtl';

export const tssCacheRtl = createCache({
  key: 'tss',
  stylisPlugins: [rtlPlugin],
});

export const muiCacheRtl = createCache({
  key: 'mui',
  prepend: true,
  stylisPlugins: [rtlPlugin],
});
