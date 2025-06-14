module.exports = {
  root: true,
  extends: '@react-native',
  ignorePatterns: ['vendor/**/*', 'jest.setup.js'],
  rules: {
    'prettier/prettier': 'off',
    '@typescript-eslint/func-call-spacing': 'off',
  },
};
