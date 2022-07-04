module.exports = {
  '*.{ts,tsx,js,jsx}': (files) => {
    return [
      `eslint --max-warnings 0 ${files.map((file) => `"${file}"`).join(' ')}`,
      'lerna run type:check',
    ];
  },
  '*.{js,jsx,ts,tsx,json,css,scss,md}': 'prettier --write',
};
