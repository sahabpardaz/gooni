module.exports = {
  '*.{ts,tsx,js,jsx}': (files) => {
    return [`eslint --max-warnings 0 ${files.join(' ')}`, 'yarn type:check'];
  },
  '*.{js,jsx,ts,tsx,json,css,scss,md}': 'prettier --write',
};
