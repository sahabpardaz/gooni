import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import React from 'react';
import rtlPlugin from 'stylis-plugin-rtl';
import { TssCacheProvider } from 'tss-react';

const muiCacheRtl = createCache({
  key: 'mui-rtl',
  stylisPlugins: [rtlPlugin],
});

const tssCacheRtl = createCache({
  key: 'tss-cache-rtl',
  prepend: true,
  stylisPlugins: [rtlPlugin],
});

interface OwnProps {}

type Props = React.PropsWithChildren<OwnProps>;

export function RTLProvider(props: Props) {
  return (
    <TssCacheProvider value={tssCacheRtl}>
      <CacheProvider value={muiCacheRtl}>{props.children}</CacheProvider>
    </TssCacheProvider>
  );
}
