const { defineConfig, mergeConfig } = require('vite');
const { default: tsconfigPaths } = require('vite-tsconfig-paths');

module.exports = {
  stories: ['../src/**/*.stories.@(ts|tsx|js|jsx|mdx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/preset-create-react-app',
  ],
  // https://storybook.js.org/docs/react/configure/typescript#mainjs-configuration
  typescript: {
    check: true, // type-check stories during Storybook build
  },
  core: {
    builder: '@storybook/builder-vite',
  },
  async viteFinal(config, options) {
    return mergeConfig(
      config,
      defineConfig({
        plugins: [tsconfigPaths()],
      }),
    );
  },
};
