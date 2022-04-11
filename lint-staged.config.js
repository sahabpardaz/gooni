module.exports = {
  '**/*.{ts,tsx,js,jsx}': (files) => {
    return [
      `import-sort --write ${files.join(' ')}`,
      `utsdx lint --max-warnings 0 ${files.join(
        ' ',
      )} --ignore-pattern '!.storybook'`,
      'lerna run type:check',
    ];
  },
  '**/*.{js,jsx,ts,tsx,json,css,scss,md}': (files) => {
    return `prettier --write ${files.join(' ')}`;
  },
};
