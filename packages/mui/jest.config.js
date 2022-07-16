module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  setupFilesAfterEnv: ['./jest.setup.js'],
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',
    'src/(.*)': '<rootDir>/src/$1',
  },
};
