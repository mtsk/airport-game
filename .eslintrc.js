/* global module */

module.exports = {
  'env': {
    'browser': true,
  },
  'extends': 'eslint:recommended',
  'parserOptions': {
    'ecmaVersion': 5,
    'sourceType': 'module',
  },
  'rules': {
    'comma-dangle': [
      'error',
      'always-multiline',
    ],
    'indent': [
      'error',
      2,
      { 'SwitchCase': 1 },
    ],
    'linebreak-style': [
      'error',
      'windows',
    ],
    'no-console': 0,
    'quotes': [
      'error',
      'single',
      { 'avoidEscape': true },
    ],
    'semi': [
      'error',
      'always',
    ],
  },
};
