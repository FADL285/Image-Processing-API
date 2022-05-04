module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    'prettier/prettier': 2,
    'no-use-before-define': ['error', { functions: true, classes: true }],
    'no-var': 'error',
    'prefer-const': 'error',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  }
};
